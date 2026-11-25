import { services } from "./site-data.js";

const categoryLabels = Object.freeze({
  haircuts: "Стрижки",
  beard: "Борода",
});

const priceFormatter = new Intl.NumberFormat("ru-RU");

function createArrow() {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("class", "arrow");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M5 12h14M14 7l5 5-5 5");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "1.5");
  icon.append(path);
  return icon;
}

function formatPrice(price) {
  return price === null ? "Цена уточняется" : `${priceFormatter.format(price)} ₽`;
}

function createServiceCard(service, index) {
  const card = document.createElement("article");
  card.className = "service-card";
  card.dataset.reveal = "";

  const cardTop = document.createElement("div");
  cardTop.className = "card-top";
  const number = document.createElement("span");
  number.textContent = String(index + 1).padStart(2, "0");
  const line = document.createElement("span");
  line.className = "card-line";
  line.setAttribute("aria-hidden", "true");
  cardTop.append(number, line);

  const title = document.createElement("h4");
  title.textContent = service.name;
  const description = document.createElement("p");
  description.textContent = service.description;

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";
  const price = document.createElement("strong");
  price.textContent = formatPrice(service.price);
  const bookButton = document.createElement("button");
  bookButton.type = "button";
  bookButton.dataset.service = service.id;
  bookButton.setAttribute("aria-label", `Записаться: ${service.name}`);
  bookButton.append(document.createTextNode("Записаться"), createArrow());
  bottom.append(price, bookButton);

  card.append(cardTop, title, description, bottom);
  return card;
}

export function renderServices(target) {
  if (!target) return;

  const categories = [...new Set(services.map(({ category }) => category))];
  const fragment = document.createDocumentFragment();
  let serviceIndex = 0;

  categories.forEach((category) => {
    const categoryServices = services.filter((service) => service.category === category);
    const group = document.createElement("section");
    group.className = "service-group";
    group.dataset.reveal = "";
    group.setAttribute("aria-label", categoryLabels[category] ?? "Услуги");

    const heading = document.createElement("h3");
    heading.textContent = categoryLabels[category] ?? "Услуги";
    const grid = document.createElement("div");
    grid.className = "service-grid";

    categoryServices.forEach((service) => {
      grid.append(createServiceCard(service, serviceIndex));
      serviceIndex += 1;
    });

    group.append(heading, grid);
    fragment.append(group);
  });

  target.replaceChildren(fragment);
}
