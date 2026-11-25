export const siteInfo = Object.freeze({
  name: "VoidBarber",
  locale: "ru",
  currency: "RUB",
  phone: "+7 999 777-22-11",
  email: "hello@voidbarber.ru",
  address: "Московская область, г. Москва, ул. Строителей, д. 14",
  addressNeedsGeographicVerification: true,
  openingHours: null,
});

export const socialLinks = Object.freeze([
  Object.freeze({ id: "vk", label: "ВКонтакте", href: null }),
  Object.freeze({ id: "telegram", label: "Telegram", href: null }),
  Object.freeze({ id: "instagram", label: "Instagram", href: null }),
  Object.freeze({
    id: "whatsapp",
    label: "WhatsApp",
  }),
]);

export const services = Object.freeze([
  Object.freeze({
    id: "mens-haircut",
    category: "haircuts",
    name: "Мужская стрижка",
    price: 1200,
    durationMinutes: null,
    description:
      "Консультация, стрижка и укладка с учётом формы лица и структуры волос.",
    ageRestriction: null,
  }),
  Object.freeze({
    id: "fade-skin-fade",
    category: "haircuts",
    name: "Fade / Skin Fade",
    price: null,
    durationMinutes: null,
    description:
      "Чистый переход, точный контур и идеальная детализация каждого участка.",
    ageRestriction: null,
  }),
  Object.freeze({
    id: "scissor-haircut",
    category: "haircuts",
    name: "Стрижка ножницами",
    price: null,
    durationMinutes: null,
    description:
      "Классическая техника для естественной формы, объёма и текстуры.",
    ageRestriction: null,
  }),
  Object.freeze({
    id: "child-haircut",
    category: "haircuts",
    name: "Детская стрижка",
    price: 900,
    durationMinutes: null,
    description: "Аккуратная стрижка для юных джентльменов.",
    ageRestriction: null,
  }),
  Object.freeze({
    id: "beard-modeling",
    category: "beard",
    name: "Моделирование бороды",
    price: null,
    durationMinutes: null,
    description:
      "Подбор формы, чёткий контур и уход с премиальными средствами.",
    ageRestriction: null,
  }),
  Object.freeze({
    id: "shave",
    category: "beard",
    name: "Бритьё",
    price: 1000,
    durationMinutes: null,
    description:
      "Распаривание, бритьё опасной бритвой и восстанавливающий уход.",
    ageRestriction: null,
  }),
  Object.freeze({
    id: "beard-trim",
    category: "beard",
    name: "Стрижка бороды",
    price: null,
    durationMinutes: null,
    description:
      "Коррекция длины и формы для ухоженного, выразительного образа.",
    ageRestriction: null,
  }),
  Object.freeze({
    id: "haircut-and-beard",
    category: "beard",
    name: "Стрижка + Борода",
    price: null,
    durationMinutes: null,
    description:
      "Полный комплекс для цельного образа и безупречного результата.",
    ageRestriction: null,
  }),
]);

export const siteImages = Object.freeze({
  hero: Object.freeze({
    src: "./assets/images/voidbarber-hero-1621645582931.webp",
    width: 1800,
    height: 2250,
    alt: "Кресло в интерьере современного барбершопа",
  }),
  about: Object.freeze({
    src: "./assets/images/voidbarber-about-1672257493626.webp",
    width: 1800,
    height: 1135,
    alt: "Интерьер барбершопа с креслами и зеркалами",
  }),
  legacy: Object.freeze({
    hero: "./assets/images/hero-barbershop.webp",
    about: "./assets/images/about-interior.webp",
  }),
  figmaPreview: Object.freeze({
    src: "./assets/images/figma-make-resource-83eff80e8dcf50a6dde6890a502f019de03a3524.png",
    useAsSectionImage: false,
  }),
});
