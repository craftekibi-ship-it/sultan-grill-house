import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "en" | "ru" | "es";

type Entry = { tr: string; en: string; ru: string; es: string };
type Dict = Record<string, Entry>;

export const dict = {
  "nav.home": { tr: "Anasayfa", en: "Home", ru: "Главная", es: "Inicio" },
  "nav.menu": { tr: "Menü", en: "Menu", ru: "Меню", es: "Menú" },
  "nav.about": { tr: "Hakkımızda", en: "About", ru: "О нас", es: "Nosotros" },
  "nav.contact": { tr: "İletişim", en: "Contact", ru: "Контакты", es: "Contacto" },

  "cta.menu": { tr: "Menüyü Gör", en: "View Menu", ru: "Смотреть меню", es: "Ver menú" },
  "cta.directions": { tr: "Yol Tarifi", en: "Directions", ru: "Маршрут", es: "Cómo llegar" },
  "cta.whatsapp": { tr: "WhatsApp", en: "WhatsApp", ru: "WhatsApp", es: "WhatsApp" },
  "cta.reserve": { tr: "Rezervasyon", en: "Reserve", ru: "Бронировать", es: "Reservar" },
  "cta.call": { tr: "Ara", en: "Call", ru: "Позвонить", es: "Llamar" },

  "hero.tag": {
    tr: "Sultanahmet · 1453'ten Beri Lezzet",
    en: "Sultanahmet · A Taste of Tradition",
    ru: "Султанахмет · Вкус традиций с 1453 года",
    es: "Sultanahmet · Sabor con tradición desde 1453",
  },
  "hero.title": { tr: "Sultan Grill House", en: "Sultan Grill House", ru: "Sultan Grill House", es: "Sultan Grill House" },
  "hero.subtitle": {
    tr: "Ayasofya'ya 2 dakika, Sultanahmet Camii'ne 4 dakika — Sultanahmet'in helal sertifikalı Türk ızgarası. Kömür ateşinde pişen kebaplar ve taze deniz mahsulleri, her gün 09:00'dan 02:00'ye kadar açık.",
    en: "The halal restaurant near Hagia Sophia — 2 minutes from the Blue Mosque. Charcoal-grilled kebabs and fresh seafood, served from 09:00 to 02:00 every night.",
    ru: "В 2 минутах от Айя-Софии и 4 минутах от Голубой мечети — турецкий гриль с сертификатом халяль. Кебабы на углях и свежие морепродукты, ежедневно с 09:00 до 02:00.",
    es: "A 2 minutos de Santa Sofía y 4 de la Mezquita Azul — la parrilla turca halal de Sultanahmet. Kebabs al carbón y pescados frescos, todos los días de 09:00 a 02:00.",
  },

  "home.featured.kicker": { tr: "Şefin Seçimi", en: "Chef's Selection", ru: "Выбор шефа", es: "Selección del chef" },
  "home.featured.title": { tr: "Vazgeçilmez Lezzetler", en: "Signature Dishes", ru: "Наши фирменные блюда", es: "Platos imprescindibles" },
  "home.featured.subtitle": {
    tr: "Misafirlerimizin en sevdiği, bizi biz yapan tabaklar.",
    en: "The dishes our guests love most — and the ones that define us.",
    ru: "Любимые блюда наших гостей — те, что делают нас особенными.",
    es: "Los platos favoritos de nuestros clientes — los que nos hacen únicos.",
  },

  "home.story.kicker": { tr: "Hikayemiz", en: "Our Story", ru: "Наша история", es: "Nuestra historia" },
  "home.story.title": {
    tr: "Saray Mutfağından Sofranıza",
    en: "From Palace Kitchens to Your Table",
    ru: "От дворцовой кухни — к вашему столу",
    es: "De las cocinas del palacio a tu mesa",
  },
  "home.story.body": {
    tr: "Sultan Grill House, Osmanlı mutfak geleneğini modern bir zarafetle buluşturur. Yerebatan Sarnıcı'nın tam karşısında, Topkapı Sarayı'nın yanı başında — eski şehrin helal ızgarası olarak misafirlerimizi ağırlıyoruz. Akşam Ayasofya gezisinden sonra geç saatlere kadar (02:00) helal yemek arayan gezginler için ideal adres.",
    en: "Sultan Grill House blends Ottoman culinary heritage with modern elegance. Directly opposite the Basilica Cistern and a short walk from Topkapı Palace, we're the halal grill in the Sultanahmet old city. The natural choice for late-night halal dining near the Blue Mosque, open from 09:00 to 02:00 every evening.",
    ru: "Sultan Grill House объединяет традиции османской кухни с современной элегантностью. Прямо напротив Цистерны Базилика и в нескольких шагах от дворца Топкапы — мы халяльный гриль в Старом городе Султанахмет. Идеальное место для путешественников, ищущих халяльный ужин допоздна (до 02:00) после прогулки по Айя-Софии.",
    es: "Sultan Grill House une la tradición culinaria otomana con la elegancia moderna. Justo frente a la Cisterna Basílica y a pasos del Palacio de Topkapi — somos la parrilla halal del casco antiguo de Sultanahmet. El lugar ideal para viajeros que buscan cena halal hasta tarde (02:00) tras visitar Santa Sofía.",
  },
  "home.story.cta": { tr: "Daha Fazla Oku", en: "Read More", ru: "Узнать больше", es: "Leer más" },

  "home.visit.kicker": { tr: "Bize Gelin", en: "Visit Us", ru: "Приходите к нам", es: "Visítanos" },
  "home.visit.title": {
    tr: "Eski Şehrin Kalbinde",
    en: "In the Heart of the Old City",
    ru: "В самом сердце Старого города",
    es: "En el corazón de la Ciudad Vieja",
  },
  "home.visit.body": {
    tr: "Her gün açığız. Rezervasyon önerilir, özellikle akşam yemeği için.",
    en: "Open every day. Reservations recommended, especially for dinner.",
    ru: "Открыто каждый день. Рекомендуем бронировать столик, особенно на ужин.",
    es: "Abierto todos los días. Se recomienda reservar, especialmente para la cena.",
  },

  "menu.title": { tr: "Menü", en: "Our Menu", ru: "Наше меню", es: "Nuestro menú" },
  "menu.subtitle": {
    tr: "16 kategori, 90+ tabak. Türk mutfağının tamamı tek bir sofrada.",
    en: "16 categories, 90+ dishes. The full breadth of Turkish cuisine on one table.",
    ru: "16 категорий, более 90 блюд. Вся палитра турецкой кухни за одним столом.",
    es: "16 categorías, más de 90 platos. Toda la cocina turca en una sola mesa.",
  },
  "menu.search": { tr: "Yemek ara...", en: "Search dishes...", ru: "Поиск блюд...", es: "Buscar platos..." },
  "menu.all": { tr: "Tümü", en: "All", ru: "Все", es: "Todos" },
  "menu.empty": { tr: "Sonuç bulunamadı.", en: "No matching dishes.", ru: "Ничего не найдено.", es: "No se encontraron platos." },
  "menu.note": {
    tr: "Tüm fiyatlar Türk Lirası (₺) cinsindendir. KDV dahildir.",
    en: "All prices are in Turkish Lira (₺). VAT included.",
    ru: "Все цены указаны в турецких лирах (₺). НДС включён.",
    es: "Todos los precios están en liras turcas (₺). IVA incluido.",
  },

  "about.title": { tr: "Hakkımızda", en: "About Us", ru: "О нас", es: "Sobre nosotros" },
  "about.kicker": { tr: "Sultanahmet, İstanbul", en: "Sultanahmet, Istanbul", ru: "Султанахмет, Стамбул", es: "Sultanahmet, Estambul" },
  "about.p1": {
    tr: "Sultan Grill House, Yerebatan Caddesi No:36'da — Ayasofya'ya 2 dakika, Sultanahmet Camii'ne 4 dakika yürüme mesafesinde, Yerebatan Sarnıcı'nın tam karşısında konumlanır. Helal sertifikalı Türk ızgarası olarak; Adana'dan Karadeniz'e, Ege'den Akdeniz'e Türkiye'nin tüm zenginliğini tek bir menüde buluşturuyoruz.",
    en: "Sultan Grill House sits at Yerebatan Cd. No:36 — 2 minutes from Hagia Sophia, 4 minutes from the Blue Mosque, directly across from the Basilica Cistern. As a halal-certified Turkish grill, we bring the full richness of Turkey — Adana, the Black Sea, the Aegean, the Mediterranean — to one menu.",
    ru: "Sultan Grill House расположен на Yerebatan Cd. №36 — в 2 минутах ходьбы от Айя-Софии, 4 минутах от Голубой мечети и прямо напротив Цистерны Базилика. Как турецкий гриль с сертификатом халяль, мы собираем всё богатство Турции — от Аданы до Чёрного моря, от Эгейского до Средиземного — в одном меню.",
    es: "Sultan Grill House está en Yerebatan Cd. No:36 — a 2 minutos de Santa Sofía, 4 minutos de la Mezquita Azul y justo frente a la Cisterna Basílica. Reconocidos como parrilla turca halal, reunimos toda la riqueza de Turquía — Adana, el Mar Negro, el Egeo y el Mediterráneo — en un solo menú.",
  },
  "about.p2": {
    tr: "Kebaplarımız gerçek meşe kömürü üzerinde pişer. Balıklarımız her sabah taze gelir. Mezelerimiz el yapımıdır. Ve baklavamız — kendi şefimizin elinden.",
    en: "Our kebabs are cooked over real oak charcoal. Our fish arrives fresh every morning. Our mezze is made by hand. And our baklava — by our own pastry chef.",
    ru: "Наши кебабы готовятся на настоящих дубовых углях. Рыбу привозят свежей каждое утро. Мезе готовится вручную. А баклаву печёт наш собственный кондитер.",
    es: "Nuestros kebabs se cocinan sobre carbón de roble auténtico. El pescado llega fresco cada mañana. Los mezze se preparan a mano. Y la baklava — la hace nuestro propio pastelero.",
  },
  "about.values.title": { tr: "Değerlerimiz", en: "Our Values", ru: "Наши ценности", es: "Nuestros valores" },
  "about.v1.t": { tr: "Gerçek Kömür Ateşi", en: "Real Charcoal Fire", ru: "Настоящий уголь", es: "Auténtico fuego de carbón" },
  "about.v1.b": {
    tr: "Hiçbir kestirme yol yok. Her kebap, ödün vermeden, geleneksel yöntemle pişer.",
    en: "No shortcuts. Every kebab is grilled the traditional way, no compromises.",
    ru: "Никаких компромиссов. Каждый кебаб готовится по традиционной технологии — без сокращений.",
    es: "Sin atajos. Cada kebab se asa al estilo tradicional, sin concesiones.",
  },
  "about.v2.t": { tr: "Günlük Taze Balık", en: "Daily Fresh Catch", ru: "Свежий улов каждый день", es: "Pescado fresco a diario" },
  "about.v2.b": {
    tr: "Boğaz ve Marmara'dan her sabah gelen, mevsiminde balık.",
    en: "Seasonal fish, delivered each morning from the Bosphorus and Marmara.",
    ru: "Сезонная рыба, доставляемая каждое утро из Босфора и Мраморного моря.",
    es: "Pescado de temporada, traído cada mañana del Bósforo y el Mar de Mármara.",
  },
  "about.v3.t": { tr: "Misafirperverlik", en: "Hospitality", ru: "Гостеприимство", es: "Hospitalidad" },
  "about.v3.b": {
    tr: "Türk misafirperverliği bir gelenek değil, bir yaşam biçimidir.",
    en: "Turkish hospitality isn't a tradition — it's a way of life.",
    ru: "Турецкое гостеприимство — это не традиция, а образ жизни.",
    es: "La hospitalidad turca no es una tradición — es una forma de vida.",
  },

  "contact.title": { tr: "İletişim", en: "Contact", ru: "Контакты", es: "Contacto" },
  "contact.subtitle": {
    tr: "Sizi ağırlamayı dört gözle bekliyoruz.",
    en: "We can't wait to welcome you.",
    ru: "Будем рады приветствовать вас.",
    es: "Estamos deseando recibirte.",
  },
  "contact.address": { tr: "Adres", en: "Address", ru: "Адрес", es: "Dirección" },
  "contact.hours": { tr: "Çalışma Saatleri", en: "Opening Hours", ru: "Часы работы", es: "Horario" },
  "contact.phone": { tr: "Telefon", en: "Phone", ru: "Телефон", es: "Teléfono" },
  "contact.everyday": { tr: "Her gün", en: "Every day", ru: "Ежедневно", es: "Todos los días" },

  "footer.tagline": {
    tr: "Sultanahmet'in kalbinde, kömür ateşinin sıcaklığında.",
    en: "In the heart of Sultanahmet, by the warmth of charcoal embers.",
    ru: "В сердце Султанахмета, у тепла угольного очага.",
    es: "En el corazón de Sultanahmet, al calor de las brasas.",
  },
  "footer.rights": { tr: "Tüm hakları saklıdır.", en: "All rights reserved.", ru: "Все права защищены.", es: "Todos los derechos reservados." },
  "footer.find": { tr: "Bizi Bulun", en: "Find Us", ru: "Найти нас", es: "Encuéntranos" },
  "footer.explore": { tr: "Keşfet", en: "Explore", ru: "Навигация", es: "Explorar" },

  "reserve.kicker": { tr: "Rezervasyon", en: "Reservations", ru: "Бронирование", es: "Reservas" },
  "reserve.title": {
    tr: "Masanızı Ayırın",
    en: "Book Your Table",
    ru: "Забронируйте столик",
    es: "Reserva tu mesa",
  },
  "reserve.subtitle": {
    tr: "Tarih ve saati seçin, WhatsApp veya e-posta ile anında bize ulaştırın.",
    en: "Pick a date and time, then send it to us instantly via WhatsApp or email.",
    ru: "Выберите дату и время — отправьте нам мгновенно через WhatsApp или email.",
    es: "Elige fecha y hora, y envíanoslo al instante por WhatsApp o email.",
  },
  "reserve.name": { tr: "Adınız", en: "Your name", ru: "Ваше имя", es: "Tu nombre" },
  "reserve.guests": { tr: "Kişi sayısı", en: "Guests", ru: "Гостей", es: "Personas" },
  "reserve.date": { tr: "Tarih", en: "Date", ru: "Дата", es: "Fecha" },
  "reserve.time": { tr: "Saat", en: "Time", ru: "Время", es: "Hora" },
  "reserve.notes": { tr: "Not (opsiyonel)", en: "Notes (optional)", ru: "Примечание (необязательно)", es: "Notas (opcional)" },
  "reserve.notesPh": {
    tr: "Doğum günü, alerji, yüksek sandalye…",
    en: "Birthday, allergies, high chair…",
    ru: "День рождения, аллергии, детский стул…",
    es: "Cumpleaños, alergias, trona…",
  },
  "reserve.viaWhatsapp": { tr: "WhatsApp ile Gönder", en: "Send via WhatsApp", ru: "Отправить в WhatsApp", es: "Enviar por WhatsApp" },
  "reserve.viaEmail": { tr: "E-posta ile Gönder", en: "Send via Email", ru: "Отправить по email", es: "Enviar por email" },
  "reserve.fillRequired": {
    tr: "Lütfen ad, tarih ve saati doldurun.",
    en: "Please fill in your name, date and time.",
    ru: "Пожалуйста, укажите имя, дату и время.",
    es: "Por favor, completa nombre, fecha y hora.",
  },

  "hours.title": { tr: "Çalışma Saatleri", en: "Opening Hours", ru: "Часы работы", es: "Horario" },
  "hours.openNow": { tr: "Şu an açık", en: "Open now", ru: "Сейчас открыто", es: "Abierto ahora" },
  "hours.closedNow": { tr: "Şu an kapalı", en: "Closed now", ru: "Сейчас закрыто", es: "Cerrado ahora" },
  "hours.closesAt": { tr: "kapanış", en: "closes", ru: "закрытие", es: "cierra" },
  "hours.opensAt": { tr: "açılış", en: "opens", ru: "открытие", es: "abre" },
  "hours.day.0": { tr: "Pazar", en: "Sunday", ru: "Воскресенье", es: "Domingo" },
  "hours.day.1": { tr: "Pazartesi", en: "Monday", ru: "Понедельник", es: "Lunes" },
  "hours.day.2": { tr: "Salı", en: "Tuesday", ru: "Вторник", es: "Martes" },
  "hours.day.3": { tr: "Çarşamba", en: "Wednesday", ru: "Среда", es: "Miércoles" },
  "hours.day.4": { tr: "Perşembe", en: "Thursday", ru: "Четверг", es: "Jueves" },
  "hours.day.5": { tr: "Cuma", en: "Friday", ru: "Пятница", es: "Viernes" },
  "hours.day.6": { tr: "Cumartesi", en: "Saturday", ru: "Суббота", es: "Sábado" },
} satisfies Dict;

export type DictKey = keyof typeof dict;

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
};

const Ctx = createContext<I18nCtx | null>(null);

const SUPPORTED: Lang[] = ["tr", "en", "ru", "es"];

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("sgh-lang")) as Lang | null;
    if (saved && SUPPORTED.includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("sgh-lang", l);
      document.documentElement.lang = l;
    }
  };

  const t = (k: DictKey) => dict[k]?.[lang] ?? dict[k]?.tr ?? k;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
