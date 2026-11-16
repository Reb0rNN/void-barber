import { FormEvent, useEffect, useRef, useState } from "react";

type Service = {
  number: string;
  name: string;
  price: string;
  description: string;
};

const haircutServices: Service[] = [
  {
    number: "01",
    name: "Мужская стрижка",
    price: "1 200 ₽",
    description: "Консультация, стрижка и укладка с учётом формы лица и структуры волос.",
  },
  {
    number: "02",
    name: "Fade / Skin Fade",
    price: "1 500 ₽",
    description: "Чистый переход, точный контур и идеальная детализация каждого участка.",
  },
  {
    number: "03",
    name: "Стрижка ножницами",
    price: "1 400 ₽",
    description: "Классическая техника для естественной формы, объёма и текстуры.",
  },
  {
    number: "04",
    name: "Детская стрижка",
    price: "900 ₽",
    description: "Аккуратная стрижка для юных джентльменов от 6 до 12 лет.",
  },
];

const beardServices: Service[] = [
  {
    number: "05",
    name: "Моделирование бороды",
    price: "800 ₽",
    description: "Подбор формы, чёткий контур и уход с премиальными средствами.",
  },
  {
    number: "06",
    name: "Королевское бритьё",
    price: "1 000 ₽",
    description: "Распаривание, бритьё опасной бритвой и восстанавливающий уход.",
  },
  {
    number: "07",
    name: "Стрижка бороды",
    price: "600 ₽",
    description: "Коррекция длины и формы для ухоженного, выразительного образа.",
  },
  {
    number: "08",
    name: "Стрижка + Борода",
    price: "1 800 ₽",
    description: "Полный комплекс для цельного образа и безупречного результата.",
  },
];

const socialLinks = [
  { label: "ВКонтакте", detail: "vk.com/voidbarber", href: "https://vk.com/" },
  { label: "Telegram", detail: "@voidbarber", href: "https://t.me/" },
  { label: "Instagram", detail: "@voidbarber", href: "https://instagram.com/" },
  { label: "WhatsApp", detail: "+7 999 777-22-11", href: "https://wa.me/79997772211" },
  { label: "Email", detail: "hello@voidbarber.ru", href: "mailto:hello@voidbarber.ru" },
  { label: "Телефон", detail: "+7 999 777-22-11", href: "tel:+79997772211" },
];

const heroImage =
  "https://images.unsplash.com/photo-1621645582931-d1d3e6564943?auto=format&fit=crop&w=1800&q=88";
const aboutImage =
  "https://images.unsplash.com/photo-1672257493626-038f96997ade?auto=format&fit=crop&w=1800&q=88";

function Arrow({ direction = "right" }: { direction?: "right" | "left" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "left" ? "arrow arrow-left" : "arrow"}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BookingModal({
  selectedService,
  onClose,
}: {
  selectedService: string;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    const firstInput = dialogRef.current?.querySelector<HTMLInputElement>("input");
    firstInput?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Закрыть окно">
          <span />
          <span />
        </button>

        {submitted ? (
          <div className="success-state">
            <span className="eyebrow">Заявка отправлена</span>
            <h2>
              До встречи
              <br />в VoidBarber
            </h2>
            <p>Мы свяжемся с вами в ближайшее время, чтобы подтвердить запись.</p>
            <button className="button button-light" onClick={onClose}>
              Готово
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Онлайн-запись</span>
            <h2 id="booking-title">Запись на услугу</h2>
            <p className="modal-service">
              Выбрано: <strong>{selectedService || "Выбрать на месте"}</strong>
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Ваше имя</span>
                <input name="name" type="text" placeholder="Александр" required />
              </label>
              <label>
                <span>Номер телефона</span>
                <input name="phone" type="tel" placeholder="+7 999 000-00-00" required />
              </label>
              <div className="form-row">
                <label>
                  <span>Дата</span>
                  <input name="date" type="date" required />
                </label>
                <label>
                  <span>Время</span>
                  <select name="time" defaultValue="" required>
                    <option value="" disabled>
                      Выберите
                    </option>
                    <option>10:00</option>
                    <option>12:30</option>
                    <option>15:00</option>
                    <option>17:30</option>
                    <option>20:00</option>
                  </select>
                </label>
              </div>
              <button className="button button-light submit-button" type="submit">
                Подтвердить запись <Arrow />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openBooking = (service = "") => {
    setSelectedService(service);
    setBookingOpen(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="site-shell">
      <header className="header">
        <a className="logo" href="#home" aria-label="VoidBarber — главная">
          VOID<span>/</span>BARBER
        </a>
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Основная навигация">
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Главная
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            О нас
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            Услуги
          </a>
          <a href="#contacts" onClick={() => setMenuOpen(false)}>
            Контакты
          </a>
          <a href="#contacts" onClick={() => setMenuOpen(false)}>
            Соц-сети
          </a>
          <button className="nav-book" onClick={() => openBooking()}>
            Записаться <Arrow />
          </button>
        </nav>
        <button
          className={`menu-toggle ${menuOpen ? "menu-toggle-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image-wrap">
            <img src={heroImage} alt="Кресло в интерьере современного барбершопа" />
            <div className="hero-shade" />
          </div>
          <div className="hero-content">
            <div className="hero-kicker" data-reveal>
              <span>Барбершоп нового поколения</span>
              <span>Москва · 2026</span>
            </div>
            <h1 data-reveal>
              VOID<span>BARBER</span>
            </h1>
            <div className="hero-bottom" data-reveal>
              <p>
                Место, где стиль становится характером. Современные мужские стрижки, точные линии и
                внимание к каждой детали.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#about">
                  О нас <Arrow />
                </a>
                <button className="button button-ghost" onClick={() => openBooking()}>
                  Записаться
                </button>
              </div>
            </div>
          </div>
          <div className="scroll-mark">
            <span>Листайте</span>
            <i />
          </div>
        </section>

        <section className="about section" id="about">
          <div className="section-tag" data-reveal>
            <span>01</span>
            <span>О нас</span>
          </div>
          <div className="about-layout">
            <div className="about-image" data-reveal>
              <img
                src={aboutImage}
                alt="Тёмный интерьер премиального барбершопа с креслами и зеркалами"
              />
              <span className="image-caption">Пространство Void / Москва</span>
            </div>
            <div className="about-copy">
              <h2 data-reveal>
                Больше, чем
                <br />
                просто стрижка
              </h2>
              <p className="lead" data-reveal>
                VoidBarber — пространство мужского стиля, где внимание к деталям, профессионализм и
                индивидуальный подход становятся основой каждой работы. Мы создаём образ, который
                подчёркивает характер и уверенность.
              </p>
              <div className="stats" data-reveal>
                <div>
                  <strong>500+</strong>
                  <span>отзывов</span>
                </div>
                <div>
                  <strong>1 200+</strong>
                  <span>клиентов</span>
                </div>
                <div>
                  <strong>5+</strong>
                  <span>лет опыта</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-tag light-tag" data-reveal>
            <span>02</span>
            <span>Услуги и цены</span>
          </div>
          <div className="services-heading" data-reveal>
            <h2>Наши услуги</h2>
            <p>
              Точность, стиль и внимание
              <br />к деталям в каждой работе.
            </p>
          </div>

          <ServiceGroup title="Стрижки" services={haircutServices} onBook={openBooking} />
          <ServiceGroup title="Борода" services={beardServices} onBook={openBooking} />
        </section>

        <section className="contacts section" id="contacts">
          <div className="section-tag" data-reveal>
            <span>03</span>
            <span>Контакты</span>
          </div>
          <div className="contacts-layout">
            <div className="contacts-intro" data-reveal>
              <h2>
                Всегда
                <br />
                на связи
              </h2>
              <p>
                Следи за нашими работами, знакомься с новыми образами и записывайся на удобное
                время. Мы всегда открыты к общению.
              </p>
            </div>
            <div className="social-list" data-reveal>
              {socialLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <Arrow direction="left" />
                  <span className="social-name">{link.label}</span>
                  <span className="social-detail">{link.detail}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div>
            <a className="footer-logo" href="#home">
              VOID/BARBER
            </a>
            <p>
              Мужской стиль. Точность. Характер.
              <br />
              Пространство, где каждая деталь имеет значение.
            </p>
          </div>
          <div className="footer-meta">
            <span>Контакты</span>
            <a href="tel:+79997772211">+7 999 777-22-11</a>
            <a href="mailto:hello@voidbarber.ru">hello@voidbarber.ru</a>
          </div>
          <button className="footer-book" onClick={() => openBooking()}>
            Записаться <Arrow />
          </button>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Void Barber. Все права защищены.</span>
          <span>Москва · Ежедневно 10:00–22:00</span>
        </div>
      </footer>

      {bookingOpen && (
        <BookingModal selectedService={selectedService} onClose={() => setBookingOpen(false)} />
      )}
    </div>
  );
}

function ServiceGroup({
  title,
  services,
  onBook,
}: {
  title: string;
  services: Service[];
  onBook: (service: string) => void;
}) {
  return (
    <div className="service-group" data-reveal>
      <h3>{title}</h3>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.name}>
            <div className="card-top">
              <span>{service.number}</span>
              <span className="card-line" />
            </div>
            <h4>{service.name}</h4>
            <p>{service.description}</p>
            <div className="card-bottom">
              <strong>{service.price}</strong>
              <button
                onClick={() => onBook(service.name)}
                aria-label={`Записаться: ${service.name}`}
              >
                Записаться <Arrow />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default App;
