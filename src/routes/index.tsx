import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Clock, MessageCircle, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";
import { ReservationForm } from "@/components/ReservationForm";
import { HoursTable, OpenStatus } from "@/components/OpenStatus";
import heroImg from "@/assets/hero-restaurant.jpg";
import mezzeImg from "@/assets/featured-mezze.jpg";

const SITE_URL = "https://sultangrillhouse.com";
const OG_IMAGE = "https://sultangrillhouse.com/og-image.jpg";

const RESTAURANT_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness", "FoodEstablishment"],
  "@id": "https://sultangrillhouse.com/#restaurant",
  name: "Sultan Grill House",
  url: "https://sultangrillhouse.com",
  telephone: "+90 545 594 26 61",
  image: [
    "https://sultangrillhouse.com/og-image.jpg",
  ],
  description:
    "Halal Turkish grill in Sultanahmet, Istanbul — steps from Hagia Sophia, the Blue Mosque and the Basilica Cistern. Charcoal-grilled kebabs, mixed grill platters, Ottoman classics and house burgers, served until 02:00 daily.",
  servesCuisine: ["Turkish", "Ottoman", "Kebab", "Halal", "Burgers"],
  priceRange: "₺₺",
  currenciesAccepted: "TRY",
  paymentAccepted: "Cash, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alemdar, Yerebatan Cd. No:36",
    addressLocality: "Fatih",
    addressRegion: "Istanbul",
    postalCode: "34110",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0096,
    longitude: 28.9773,
  },
  hasMap: "https://maps.app.goo.gl/jXdLQ4c7f9gybDmo6",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "02:00",
    },
  ],
  openingHours: "Mo-Su 09:00-02:00",
  hasMenu: "https://sultangrillhouse.com/menu",
  acceptsReservations: true,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Halal Certified", value: true },
    { "@type": "LocationFeatureSpecification", name: "Online Ordering", value: true },
    { "@type": "LocationFeatureSpecification", name: "Late Night Dining", value: true },
    { "@type": "LocationFeatureSpecification", name: "Family Friendly", value: true },
    { "@type": "LocationFeatureSpecification", name: "Tourist Friendly", value: true },
    { "@type": "LocationFeatureSpecification", name: "Reservations", value: true },
  ],
  containedInPlace: [
    { "@type": "TouristAttraction", name: "Hagia Sophia", sameAs: "https://en.wikipedia.org/wiki/Hagia_Sophia" },
    { "@type": "TouristAttraction", name: "Blue Mosque (Sultan Ahmed Mosque)", sameAs: "https://en.wikipedia.org/wiki/Sultan_Ahmed_Mosque" },
    { "@type": "TouristAttraction", name: "Basilica Cistern", sameAs: "https://en.wikipedia.org/wiki/Basilica_Cistern" },
    { "@type": "TouristAttraction", name: "Topkapı Palace", sameAs: "https://en.wikipedia.org/wiki/Topkap%C4%B1_Palace" },
    { "@type": "TouristAttraction", name: "Gülhane Park", sameAs: "https://en.wikipedia.org/wiki/G%C3%BClhane_Park" },
  ],
  areaServed: {
    "@type": "Place",
    name: "Sultanahmet, Fatih, Istanbul",
  },
  sameAs: [
    "https://instagram.com/sultangrillhouse_sultanahmet",
    "https://maps.app.goo.gl/jXdLQ4c7f9gybDmo6",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sultan Grill House | Halal Restaurant in Sultanahmet Istanbul" },
      {
        name: "description",
        content:
          "Sultan Grill House — halal Turkish grill on Yerebatan Cd, 2 min from Hagia Sophia. Charcoal kebabs & mixed grills, open until 02:00.",
      },
      { name: "keywords", content: "halal restaurant Sultanahmet, best restaurant near Hagia Sophia, Turkish kebab Istanbul old city, halal food Blue Mosque, late night restaurant Sultanahmet, Sultan Grill House" },
      { name: "author", content: "Sultan Grill House" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "geo.region", content: "TR-34" },
      { name: "geo.placename", content: "Sultanahmet, Istanbul" },
      { name: "geo.position", content: "41.0096;28.9773" },
      { name: "ICBM", content: "41.0096, 28.9773" },
      { property: "og:type", content: "restaurant.restaurant" },
      { property: "og:site_name", content: "Sultan Grill House" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "Sultan Grill House | Halal Restaurant in Sultanahmet Istanbul" },
      {
        property: "og:description",
        content:
          "Sultan Grill House — halal Turkish grill on Yerebatan Cd, 2 min from Hagia Sophia. Charcoal kebabs & mixed grills, open until 02:00.",
      },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "restaurant:contact_info:street_address", content: "Alemdar, Yerebatan Cd. No:36" },
      { property: "restaurant:contact_info:locality", content: "Fatih" },
      { property: "restaurant:contact_info:region", content: "Istanbul" },
      { property: "restaurant:contact_info:postal_code", content: "34110" },
      { property: "restaurant:contact_info:country_name", content: "Türkiye" },
      { property: "place:location:latitude", content: "41.0096" },
      { property: "place:location:longitude", content: "28.9773" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sultan Grill House | Halal Restaurant in Sultanahmet Istanbul" },
      {
        name: "twitter:description",
        content:
          "Sultan Grill House — halal Turkish grill on Yerebatan Cd, 2 min from Hagia Sophia. Charcoal kebabs & mixed grills, open until 02:00.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "alternate", hrefLang: "tr-TR", href: SITE_URL },
      { rel: "alternate", hrefLang: "en", href: SITE_URL },
      { rel: "alternate", hrefLang: "x-default", href: SITE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(RESTAURANT_JSONLD),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Ottoman-style restaurant interior at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center text-ivory md:min-h-[88vh] md:px-8">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-gold md:text-sm">
            {t("hero.tag")}
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-balance md:text-7xl lg:text-8xl">
            {t("hero.title")}
          </h1>
          <div className="gold-divider mt-6 w-full max-w-md">
            <span className="text-lg">✦</span>
          </div>
          <p className="mt-6 max-w-2xl text-base text-ivory/85 text-balance md:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6">
            <OpenStatus className="text-sm" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#reserve"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-body text-sm uppercase tracking-[0.18em] text-primary-foreground shadow-elegant transition-all hover:scale-[1.02] hover:bg-burgundy-deep"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              <Calendar size={16} /> {t("cta.reserve")}
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-charcoal/30 px-7 py-3.5 font-body text-sm uppercase tracking-[0.18em] text-ivory backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold/10"
            >
              {t("cta.menu")} <ArrowRight size={16} />
            </Link>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-charcoal/30 px-7 py-3.5 font-body text-sm uppercase tracking-[0.18em] text-ivory backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold/10"
            >
              <MapPin size={16} /> {t("cta.directions")}
            </a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-elegant" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <img
              src={mezzeImg}
              alt="Turkish mezze and grill spread"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">
              {t("home.story.kicker")}
            </p>
            <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
              {t("home.story.title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("home.story.body")}
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.18em] text-primary hover:text-burgundy-deep"
            >
              {t("home.story.cta")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* RESERVE + HOURS */}
      <section id="reserve" className="bg-background scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <SectionHeader
            kicker={t("reserve.kicker")}
            title={t("reserve.title")}
            subtitle={t("reserve.subtitle")}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3">
              <ReservationForm />
            </div>
            <div className="space-y-6 md:col-span-2">
              <HoursTable />
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold"
                >
                  <MapPin size={16} /> {t("cta.directions")}
                </a>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeader kicker={t("home.visit.kicker")} title={t("home.visit.title")} subtitle={t("home.visit.body")} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <InfoCard icon={<MapPin />} title={t("contact.address")} body={CONTACT.address} href={CONTACT.mapsUrl} />
          <InfoCard icon={<Clock />} title={t("contact.hours")} body={`${t("contact.everyday")} · ${CONTACT.hours}`} />
          <InfoCard icon={<MessageCircle />} title="WhatsApp" body={CONTACT.phoneDisplay} href={CONTACT.whatsappUrl} />
        </div>
      </section>
    </>
  );
}

function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">{kicker}</p>
      <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">{title}</h2>
      <div className="gold-divider mx-auto mt-5 w-full max-w-xs">
        <span className="text-base">✦</span>
      </div>
      <p className="mt-5 text-base text-muted-foreground text-balance">{subtitle}</p>
    </div>
  );
}

function InfoCard({ icon, title, body, href }: { icon: React.ReactNode; title: string; body: string; href?: string }) {
  const content = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </>
  );
  const cls = "block rounded-md border border-border bg-card p-6 transition-all hover:border-gold hover:shadow-soft";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
  ) : (
    <div className={cls}>{content}</div>
  );
}
