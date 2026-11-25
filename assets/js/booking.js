import { services } from "./site-data.js";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const priceFormatter = new Intl.NumberFormat("ru-RU");

function localDateValue(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function serviceLabel(service) {
  const price = service.price === null ? "Цена уточняется" : `${priceFormatter.format(service.price)} ₽`;
  return `${service.name} — ${price}`;
}

function makeServiceOptions(select) {
  services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.id;
    option.textContent = serviceLabel(service);
    select.append(option);
  });
}

function createModal(initialServiceId, onClose) {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.setAttribute("role", "presentation");

  const dialog = document.createElement("section");
  dialog.className = "booking-modal";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "booking-title");
  dialog.setAttribute("aria-describedby", "booking-description");
  dialog.tabIndex = -1;
  dialog.innerHTML = `
    <button class="modal-close" type="button" aria-label="Закрыть окно записи"><span></span><span></span></button>
    <span class="eyebrow">Онлайн-запись</span>
    <h2 id="booking-title">Запись на услугу</h2>
    <p class="modal-service" id="booking-description">Выберите услугу и предпочтительное время. Заявка будет только показана в демонстрационном режиме.</p>
    <form novalidate>
      <label for="booking-service"><span>Услуга</span><select id="booking-service" name="service" required><option value="" selected disabled>Выберите услугу</option></select></label>
      <label for="booking-name"><span>Ваше имя</span><input id="booking-name" name="name" type="text" autocomplete="name" maxlength="100" required /></label>
      <label for="booking-phone"><span>Номер телефона</span><input id="booking-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="24" required /></label>
      <div class="form-row">
        <label for="booking-date"><span>Предпочтительная дата</span><input id="booking-date" name="date" type="date" required /></label>
        <label for="booking-time"><span>Предпочтительное время</span><input id="booking-time" name="time" type="time" required /></label>
      </div>
      <p class="form-message" role="alert" aria-live="assertive" hidden></p>
      <button class="button button-light submit-button" type="submit">Показать демо-подтверждение</button>
    </form>`;

  backdrop.append(dialog);
  const serviceSelect = dialog.querySelector("#booking-service");
  makeServiceOptions(serviceSelect);
  if (services.some(({ id }) => id === initialServiceId)) {
    serviceSelect.value = initialServiceId;
  }

  const form = dialog.querySelector("form");
  const message = dialog.querySelector(".form-message");
  const abortController = new AbortController();
  const { signal } = abortController;
  let closed = false;

  const close = () => {
    if (closed) return;
    closed = true;
    abortController.abort();
    backdrop.remove();
    document.body.classList.remove("has-open-modal");
    onClose();
  };

  const showValidation = () => {
    const phoneField = form.elements.namedItem("phone");
    const phoneDigits = phoneField.value.replace(/\D/g, "").length;
    phoneField.setCustomValidity(
      phoneDigits >= 10 ? "" : "Введите номер телефона, содержащий минимум 10 цифр.",
    );
    const invalidFields = [...form.elements].filter(
      (field) => field.willValidate && !field.validity.valid,
    );

    form.querySelectorAll("[aria-invalid='true']").forEach((field) => {
      field.removeAttribute("aria-invalid");
    });

    if (!invalidFields.length) {
      message.hidden = true;
      message.textContent = "";
      return true;
    }

    invalidFields.forEach((field) => field.setAttribute("aria-invalid", "true"));
    const firstInvalid = invalidFields[0];
    const label = form.querySelector(`label[for="${firstInvalid.id}"] span`);
    message.textContent = label
      ? `Проверьте поле «${label.textContent.toLowerCase()}».`
      : "Проверьте заполнение формы.";
    message.hidden = false;
    firstInvalid.focus();
    return false;
  };

  form.addEventListener(
    "input",
    (event) => {
      if (event.target.name === "phone") event.target.setCustomValidity("");
      event.target.removeAttribute("aria-invalid");
      message.hidden = true;
      message.textContent = "";
    },
    { signal },
  );
  form.addEventListener(
    "change",
    (event) => {
      event.target.removeAttribute("aria-invalid");
      message.hidden = true;
      message.textContent = "";
    },
    { signal },
  );
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      if (!showValidation()) return;

      const success = document.createElement("div");
      success.className = "success-state";
      success.setAttribute("role", "status");
      success.setAttribute("aria-live", "polite");

      const eyebrow = document.createElement("span");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = "Демонстрационный режим";
      const title = document.createElement("h2");
      title.id = "booking-title";
      title.innerHTML = "Данные<br />проверены";
      const explanation = document.createElement("p");
      explanation.id = "booking-success-description";
      explanation.textContent =
        "Заявка не отправлена, а введённые данные никуда не передавались. Для реальной записи понадобится подключить систему бронирования.";
      dialog.setAttribute("aria-describedby", explanation.id);
      const done = document.createElement("button");
      done.className = "button button-light";
      done.type = "button";
      done.textContent = "Готово";
      done.addEventListener("click", close, { signal });

      success.append(eyebrow, title, explanation, done);
      dialog.replaceChildren(success);
      done.focus();
    },
    { signal },
  );

  dialog.querySelector(".modal-close").addEventListener("click", close, { signal });
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [...dialog.querySelectorAll(focusableSelector)];
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    { signal },
  );

  dialog.querySelector("#booking-date").min = localDateValue();
  return { backdrop, dialog, close };
}

export function initBooking(servicesRoot) {
  let activeModal = null;

  const open = (trigger, serviceId = "") => {
    if (activeModal) return;

    const returnTarget = trigger.closest(".nav") && window.matchMedia("(max-width: 960px)").matches
      ? document.querySelector(".menu-toggle")
      : trigger;
    document.body.classList.add("has-open-modal");

    const modal = createModal(serviceId, () => {
      activeModal = null;
      if (returnTarget?.isConnected && !returnTarget.closest("[inert]")) {
        returnTarget.focus();
      }
    });
    activeModal = modal;
    document.body.append(modal.backdrop);
    modal.dialog.querySelector("#booking-service").focus();
  };

  document.querySelectorAll("[data-book-button]").forEach((button) => {
    button.addEventListener("click", () => open(button));
  });

  servicesRoot?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-service]");
    if (button) open(button, button.dataset.service);
  });
}
