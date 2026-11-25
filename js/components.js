const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" stroke-width="1.5" /></svg>';
let previouslyFocusedElement = null;

export const serviceGroups = [
  { title: "Стрижки", services: [
    { number: "01", name: "Мужская стрижка", price: "1 200 ₽", description: "Консультация, стрижка и укладка с учётом формы лица и структуры волос." },
    { number: "02", name: "Fade / Skin Fade", price: "1 500 ₽", description: "Чистый переход, точный контур и идеальная детализация каждого участка." },
    { number: "03", name: "Стрижка ножницами", price: "1 400 ₽", description: "Классическая техника для естественной формы, объёма и текстуры." },
    { number: "04", name: "Детская стрижка", price: "900 ₽", description: "Аккуратная стрижка для юных джентльменов от 6 до 12 лет." },
  ]},
  { title: "Борода", services: [
    { number: "05", name: "Моделирование бороды", price: "800 ₽", description: "Подбор формы, чёткий контур и уход с премиальными средствами." },
    { number: "06", name: "Королевское бритьё", price: "1 000 ₽", description: "Распаривание, бритьё опасной бритвой и восстанавливающий уход." },
    { number: "07", name: "Стрижка бороды", price: "600 ₽", description: "Коррекция длины и формы для ухоженного, выразительного образа." },
    { number: "08", name: "Стрижка + Борода", price: "1 800 ₽", description: "Полный комплекс для цельного образа и безупречного результата." },
  ]},
];

export function renderServices() {
  const target = document.querySelector("#service-groups");
  target.innerHTML = serviceGroups.map(({ title, services }) => `
    <div class="service-group" data-reveal>
      <h3>${title}</h3>
      <div class="service-grid">${services.map((service) => `
        <article class="service-card">
          <div class="card-top"><span>${service.number}</span><span class="card-line"></span></div>
          <h4>${service.name}</h4><p>${service.description}</p>
          <div class="card-bottom"><strong>${service.price}</strong>
            <button type="button" data-booking-service="${service.name}" aria-label="Записаться: ${service.name}">Записаться ${arrow}</button>
          </div>
        </article>`).join("")}</div>
    </div>`).join("");
}

export function renderBookingModal(selectedService = "") {
  previouslyFocusedElement = document.activeElement;
  const root = document.querySelector("#modal-root");
  root.innerHTML = `
    <div class="modal-backdrop">
      <section class="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button class="modal-close" type="button" data-close-modal aria-label="Закрыть окно"><span></span><span></span></button>
        <div class="booking-content">
          <span class="eyebrow">Онлайн-запись</span><h2 id="booking-title">Запись на услугу</h2>
          <p class="modal-service">Выбрано: <strong>${selectedService || "Выбрать на месте"}</strong></p>
          <form>
            <label><span>Ваше имя</span><input name="name" type="text" placeholder="Александр" autocomplete="name" required /></label>
            <label><span>Номер телефона</span><input name="phone" type="tel" placeholder="+7 999 000-00-00" autocomplete="tel" required /></label>
            <div class="form-row">
              <label><span>Дата</span><input name="date" type="date" required /></label>
              <label><span>Время</span><select name="time" required><option value="" disabled selected>Выберите</option><option>10:00</option><option>12:30</option><option>15:00</option><option>17:30</option><option>20:00</option></select></label>
            </div>
            <button class="button button-light submit-button" type="submit">Подтвердить запись ${arrow}</button>
          </form>
        </div>
        <div class="success-state" hidden><span class="eyebrow">Заявка отправлена</span><h2>До встречи<br />в VoidBarber</h2><p>Мы свяжемся с вами в ближайшее время, чтобы подтвердить запись.</p><button class="button button-light" type="button" data-close-modal>Готово</button></div>
      </section>
    </div>`;
  root.querySelector(".modal-backdrop").addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) closeBookingModal();
  });
  root.querySelector("[name=date]").min = new Date().toISOString().slice(0, 10);
  root.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    root.querySelector(".booking-content").hidden = true;
    root.querySelector(".success-state").hidden = false;
    root.querySelector(".success-state button").focus();
  });
  root.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeBookingModal));
  document.body.style.overflow = "hidden";
  root.querySelector("input").focus();
}

export function closeBookingModal() {
  document.querySelector("#modal-root").replaceChildren();
  document.body.style.overflow = "";
  previouslyFocusedElement?.focus();
  previouslyFocusedElement = null;
}
