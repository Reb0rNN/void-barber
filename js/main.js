import { closeBookingModal, renderBookingModal, renderServices } from "./components.js";

renderServices();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
function setMenuOpen(open) {
  nav.inert = !open && window.innerWidth <= 960;
  nav.classList.toggle("nav-open", open);
  menuButton.classList.toggle("menu-toggle-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  document.body.classList.toggle("menu-is-open", open);
}
menuButton.addEventListener("click", () => setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true"));
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
nav.inert = window.innerWidth <= 960;
window.addEventListener("resize", () => {
  if (window.innerWidth > 960) setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  const booking = event.target.closest("[data-booking], [data-booking-service]");
  if (!booking) return;
  renderBookingModal(booking.dataset.bookingService || "");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.querySelector(".booking-modal")) closeBookingModal();
});

document.addEventListener("keydown", (event) => {
  const dialog = document.querySelector(".booking-modal");
  if (event.key !== "Tab" || !dialog) return;
  const focusable = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]')]
    .filter((element) => element.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
