import { siteInfo, socialLinks } from "./site-data.js";
import { initNavigation } from "./navigation.js";
import { renderServices } from "./services.js";
import { initBooking } from "./booking.js";

const arrowPath = "M5 12h14M14 7l5 5-5 5";

function createArrow({ left = false } = {}) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", left ? "arrow arrow-left" : "arrow");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", arrowPath);
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "1.5");
  svg.append(path);
  return svg;
}

function renderBrand() {
  const upperName = siteInfo.name.toLocaleUpperCase(siteInfo.locale);
  const splitPoint = Math.min(4, upperName.length);
  const firstPart = upperName.slice(0, splitPoint);
  const secondPart = upperName.slice(splitPoint);

  const headerBrand = document.querySelector("[data-brand]");
  const separator = document.createElement("span");
  separator.setAttribute("aria-hidden", "true");
  separator.textContent = "/";
  headerBrand.replaceChildren(document.createTextNode(firstPart), separator, document.createTextNode(secondPart));
  headerBrand.setAttribute("aria-label", `${siteInfo.name} — главная`);

  document.querySelector("[data-brand-solid]").textContent = firstPart;
  document.querySelector("[data-brand-outline]").textContent = secondPart;
  document.querySelector("[data-footer-brand]").textContent = `${firstPart}/${secondPart}`;
  document.querySelector("[data-copyright-brand]").textContent = siteInfo.name;
  document.title = `${siteInfo.name} — Барбершоп нового поколения`;
}

function createContactItem({ label, detail }) {
  const item = document.createElement("div");
  item.className = "social-contact";
  item.append(createArrow({ left: true }));

  const name = document.createElement("span");
  name.className = "social-name";
  name.textContent = label;
  const value = document.createElement("span");
  value.className = "social-detail";
  value.textContent = detail;
  item.append(name, value);
  return item;
}

function renderContacts() {
  const contactList = document.querySelector("[data-contact-links]");
  const footerContacts = document.querySelector("[data-footer-contacts]");
  const address = document.querySelector("[data-site-address]");

  address.textContent = siteInfo.address;

  const whatsapp = socialLinks.find((link) => link.id === "whatsapp");
  const contacts = [
    whatsapp && {
      label: whatsapp.label,
      detail: siteInfo.phone,
    },
    { label: "Email", detail: siteInfo.email },
    { label: "Телефон", detail: siteInfo.phone },
  ].filter(Boolean);

  contactList.replaceChildren(...contacts.map(createContactItem));
  footerContacts.replaceChildren(
    ...[
      siteInfo.phone,
      siteInfo.email,
    ].map((detail) => {
      const item = document.createElement("span");
      item.className = "footer-contact";
      item.textContent = detail;
      return item;
    }),
  );
}

function renderCurrentYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = year;
  });
}

function initReveals() {
  const items = document.querySelectorAll("[data-reveal]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((item) => observer.observe(item));
}

function init() {
  renderBrand();
  renderCurrentYear();
  renderContacts();

  const servicesRoot = document.querySelector("#services-content");
  renderServices(servicesRoot);
  initNavigation();
  initBooking(servicesRoot);
  initReveals();
}

init();
