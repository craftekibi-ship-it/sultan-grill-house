import { createFileRoute } from "@tanstack/react-router";
import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { menuData } from "@/data/menu";
import patternImg from "@/assets/pattern-iznik.jpg";

const menuGroups = [
  {
    id: "mornings",
    labels: { tr: "Kahvaltı", en: "Breakfast", ru: "Завтрак", es: "Desayuno" },
    categoryIds: ["breakfast"],
  },
  {
    id: "appetizers",
    labels: { tr: "Başlangıçlar", en: "Starters", ru: "Закуски", es: "Entrantes" },
    categoryIds: ["soup", "starters", "meze"],
  },
  {
    id: "main-meals",
    labels: { tr: "Ana Yemekler", en: "Main Meals", ru: "Основные блюда", es: "Platos principales" },
    categoryIds: ["kebab", "grills", "chicken", "beef-doner", "meatballs", "fajita-saute", "burger", "pizza", "vegetarian"],
  },
  {
    id: "fish-group",
    labels: { tr: "Balıklar", en: "Fish", ru: "Рыба", es: "Pescados" },
    categoryIds: ["fish", "fish-meze"],
  },
  {
    id: "pasta-salads",
    labels: { tr: "Makarnalar & Salatalar", en: "Pasta & Salads", ru: "Паста и салаты", es: "Pastas y ensaladas" },
    categoryIds: ["pasta", "salads"],
  },
  {
    id: "desserts",
    labels: { tr: "Tatlılar", en: "Desserts", ru: "Десерты", es: "Postres" },
    categoryIds: ["dessert"],
  },
  {
    id: "drinks",
    labels: { tr: "İçecekler", en: "Drinks", ru: "Напитки", es: "Bebidas" },
    categoryIds: ["hot-drinks", "cold-drinks"],
  },
];

const imageSlug = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const firstCategoryId = menuGroups[0].categoryIds[0];
const firstCategoryItems = menuData.find((c) => c.id === firstCategoryId)?.items ?? [];
const preloadImages = firstCategoryItems.slice(0, 6).map((item) => `/menu/800/${imageSlug(item.tr)}.webp`);

const SITE_URL = "https://sultangrillhouse.com";

type FeaturedLocalized = {
  category: string;
  tr: string;
  descriptions: { tr: string; en: string; ru: string; es: string };
};

const featuredItems: FeaturedLocalized[] = [
  {
    category: "dessert",
    tr: "Baklava",
    descriptions: {
      tr: "Sultan Grill House'da taze hazırlanan geleneksel Türk baklavası: katmanlı kat kat yufka, bol cevizli iç ve hafif şerbetiyle ikram edilir.",
      en: "Traditional Turkish baklava with layers of crisp filo, chopped walnuts and light syrup, freshly prepared at Sultan Grill House.",
      ru: "Традиционная турецкая пахлава со слоями хрустящего теста фило, рублёными грецкими орехами и лёгким сиропом, свежеприготовленная в Sultan Grill House.",
      es: "Baklava turca tradicional con capas de masa filo crujiente, nueces picadas y almíbar ligero, recién preparada en Sultan Grill House.",
    },
  },
  {
    category: "pasta",
    tr: "Tavuklu Fettuccine",
    descriptions: {
      tr: "Izgara tavuk parçaları ve kremalı sosla hazırlanan tavuklu fettuccine; Sultan Grill House'da sıcak servis edilir.",
      en: "Creamy chicken fettuccine with tender grilled chicken pieces in a rich cream sauce, served hot at Sultan Grill House.",
      ru: "Fettuccine с курицей: нежные кусочки куриного гриля в сливочном соусе, подаётся горячей в Sultan Grill House.",
      es: "Fettuccine con pollo a la parrilla en una cremosa salsa, servida caliente en Sultan Grill House.",
    },
  },
];

const localizedValue = (
  values: { tr: string; en: string; ru: string; es: string },
) => [
  { "@value": values.tr, "@language": "tr" },
  { "@value": values.en, "@language": "en" },
  { "@value": values.ru, "@language": "ru" },
  { "@value": values.es, "@language": "es" },
];

const featuredJsonLd = featuredItems
  .map((featured) => {
    const cat = menuData.find((c) => c.id === featured.category);
    const item = cat?.items.find((i) => i.tr === featured.tr);
    if (!cat || !item) return null;
    const slug = imageSlug(item.tr);
    return {
      "@context": "https://schema.org",
      "@type": "MenuItem",
      "@id": `${SITE_URL}/menu#${slug}`,
      name: localizedValue({ tr: item.tr, en: item.en, ru: item.ru, es: item.es }),
      description: localizedValue(featured.descriptions),
      image: [
        `${SITE_URL}/menu/${slug}.webp`,
        `${SITE_URL}/menu/800/${slug}.webp`,
        `${SITE_URL}/menu/400/${slug}.webp`,
      ],
      offers: {
        "@type": "Offer",
        price: item.price.toFixed(2),
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/menu#${slug}`,
      },
      menuAddOn: {
        "@type": "MenuSection",
        name: localizedValue({ tr: cat.tr, en: cat.en, ru: cat.ru, es: cat.es }),
      },
      offeredBy: {
        "@type": "Restaurant",
        name: "Sultan Grill House",
        url: SITE_URL,
      },
    };
  })
  .filter(Boolean);

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Sultan Grill House | Turkish Kebab, Baklava, Chicken Pasta & Seafood" },
      {
        name: "description",
        content:
          "Full bilingual menu: Adana & Urfa kebab, grilled sea bass, mezze, Turkish breakfast, fresh baklava (₺480) and creamy chicken pasta / Tavuklu Makarna (₺620). Prices in Turkish Lira.",
      },
      { name: "keywords", content: "Sultan Grill House, baklava, Tavuklu Makarna, chicken pasta, Turkish baklava, Turkish restaurant menu, kebab, Adana, Urfa, mezze" },
      { property: "og:title", content: "Menu — Sultan Grill House | Baklava & Tavuklu Makarna" },
      {
        property: "og:description",
        content: "Bilingual TR/EN menu — kebabs, seafood, mezze, fresh baklava and creamy chicken pasta (Tavuklu Makarna).",
      },
      { property: "og:image", content: `${SITE_URL}/menu/baklava.webp` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/menu/baklava.webp` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/menu` },
      ...preloadImages.map((href) => ({
        rel: "preload",
        as: "image",
        href,
        type: "image/webp",
      })),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": featuredJsonLd,
        }),
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState(menuGroups[0].id);
  const [openCats, setOpenCats] = useState<Set<string>>(new Set());
  const [activeSubCat, setActiveSubCat] = useState<string | null>(null);



  const activeGroupData = menuGroups.find((group) => group.id === activeGroup) ?? menuGroups[0];
  const normalizedQuery = query.trim().toLowerCase();
  const matchingCategories = useMemo(
    () =>
      menuData
        .map((cat) => ({
          ...cat,
          items: normalizedQuery
            ? cat.items.filter((item) =>
                [item.tr, item.en, item.ru, item.es].some((name) => name.toLowerCase().includes(normalizedQuery)),
              )
            : cat.items,
        }))
        .filter((cat) => cat.items.length > 0),
    [normalizedQuery],
  );
  const matchingCategoryIds = useMemo(() => new Set(matchingCategories.map((cat) => cat.id)), [matchingCategories]);
  const visibleGroups = normalizedQuery
    ? menuGroups.filter((group) => group.categoryIds.some((id) => matchingCategoryIds.has(id)))
    : menuGroups;
  const allActiveCategories = activeGroupData.categoryIds.flatMap((id) => {
    const category = matchingCategories.find((cat) => cat.id === id);
    return category ? [category] : [];
  });
  const activeCategories =
    activeSubCat && allActiveCategories.some((c) => c.id === activeSubCat)
      ? allActiveCategories.filter((c) => c.id === activeSubCat)
      : allActiveCategories;
  const showSubTabs = !normalizedQuery && allActiveCategories.length > 1;

  useEffect(() => {
    if (!visibleGroups.find((g) => g.id === activeGroup) && visibleGroups[0]) {
      setActiveGroup(visibleGroups[0].id);
    }
  }, [visibleGroups, activeGroup]);

  // Auto-expand all when searching, expand the selected sub-category, otherwise collapse all.
  useEffect(() => {
    if (normalizedQuery) {
      setOpenCats(new Set(activeCategories.map((c) => c.id)));
    } else if (activeSubCat) {
      setOpenCats(new Set([activeSubCat]));
    } else {
      setOpenCats(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedQuery, activeGroup, activeSubCat]);

  const selectGroup = (group: (typeof menuGroups)[number]) => {
    setActiveGroup(group.id);
    setActiveSubCat(null);
  };

  const toggleCat = (id: string) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Prefetch images of categories scrolling near the viewport.
  const prefetchedRef = useRef<Set<string>>(new Set());
  const prefetchCategory = useCallback((cat: { id: string; items: { tr: string }[] }) => {
    if (prefetchedRef.current.has(cat.id)) return;
    prefetchedRef.current.add(cat.id);
    for (const item of cat.items) {
      const href = `/menu/800/${imageSlug(item.tr)}.webp`;
      if (document.head.querySelector(`link[data-prefetch="${href}"]`)) continue;
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = href;
      link.setAttribute("data-prefetch", href);
      document.head.appendChild(link);
    }
  }, []);

  const focusMenuControl = (scope: "group" | "category" | "result", id?: string) => {
    requestAnimationFrame(() => {
      const selector = id ? `[data-menu-${scope}="${id}"]` : `[data-menu-${scope}]`;
      document.querySelector<HTMLElement>(selector)?.focus();
    });
  };

  const handleGroupKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = visibleGroups.findIndex((group) => group.id === activeGroup);
    if (currentIndex < 0 || visibleGroups.length === 0) return;

    const keyActions: Record<string, number> = {
      ArrowRight: (currentIndex + 1) % visibleGroups.length,
      ArrowDown: (currentIndex + 1) % visibleGroups.length,
      ArrowLeft: (currentIndex - 1 + visibleGroups.length) % visibleGroups.length,
      ArrowUp: (currentIndex - 1 + visibleGroups.length) % visibleGroups.length,
      Home: 0,
      End: visibleGroups.length - 1,
    };

    const nextIndex = keyActions[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextGroup = visibleGroups[nextIndex];
    selectGroup(nextGroup);
    focusMenuControl("group", nextGroup.id);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "Enter") return;
    if (activeCategories.length === 0) return;
    event.preventDefault();
    focusMenuControl("category");
  };

  return (
    <>
      {/* Banner */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={patternImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center md:px-8 md:py-28">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">
            Sultan Grill House
          </p>
          <h1 className="mt-4 font-display text-5xl text-foreground md:text-6xl">{t("menu.title")}</h1>
          <div className="gold-divider mx-auto mt-5 w-full max-w-xs">
            <span>✦</span>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground text-balance">
            {t("menu.subtitle")}
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-16 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={t("menu.search")}
                aria-label={t("menu.search")}
                className="w-full rounded-full border border-input bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu groups" onKeyDown={handleGroupKeyDown}>
              {visibleGroups.map((group) => (
                <CatPill
                  key={group.id}
                  id={group.id}
                  label={group.labels[lang]}
                  active={activeGroup === group.id}
                  onClick={() => selectGroup(group)}
                />
              ))}
            </div>
          </div>
          {showSubTabs && (
            <div className="flex gap-2 overflow-x-auto pb-1 pt-3" role="tablist" aria-label="Sub categories">
              <CatPill
                id={`sub-all-${activeGroup}`}
                label={lang === "tr" ? "Tümü" : lang === "en" ? "All" : lang === "ru" ? "Все" : "Todos"}
                active={activeSubCat === null}
                onClick={() => setActiveSubCat(null)}
              />
              {allActiveCategories.map((cat) => (
                <CatPill
                  key={cat.id}
                  id={`sub-${cat.id}`}
                  label={cat[lang]}
                  active={activeSubCat === cat.id}
                  onClick={() => setActiveSubCat(cat.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Menu list */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        {activeCategories.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">{t("menu.empty")}</p>
        ) : (
          <div className="space-y-6">
            {activeCategories.map((cat) => {
              const isOpen = openCats.has(cat.id);
              const panelId = `cat-panel-${cat.id}`;
              return (
                <div
                  key={cat.id}
                  ref={(el) => {
                    if (!el || typeof IntersectionObserver === "undefined") return;
                    const io = new IntersectionObserver(
                      (entries) => {
                        for (const entry of entries) {
                          if (entry.isIntersecting) {
                            prefetchCategory(cat);
                            io.disconnect();
                            break;
                          }
                        }
                      },
                      { rootMargin: "600px 0px" },
                    );
                    io.observe(el);
                  }}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <button
                    type="button"
                    data-menu-category={cat.id}
                    onClick={() => toggleCat(cat.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-6 py-7 text-left transition-colors hover:bg-accent/40 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background md:px-10 md:py-9"
                  >
                    <span className="font-display text-3xl text-foreground md:text-5xl">
                      {cat[lang]}
                    </span>
                    <span className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="tabular-nums">{cat.items.length}</span>
                      <ChevronDown
                        size={28}
                        className={"transition-transform " + (isOpen ? "rotate-180 text-primary" : "")}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      className="grid gap-8 border-t border-border bg-background/40 px-4 py-8 md:grid-cols-2 md:px-8 md:py-10"
                      role="list"
                      aria-label={`${cat[lang]} menu items`}
                    >
                      {cat.items.map((item, itemIdx) => {
                        const eager = activeCategories[0]?.id === cat.id && itemIdx < 6;
                        const itemId = imageSlug(item.tr);
                        return (
                        <article
                          key={item.en}
                          id={itemId}
                          tabIndex={0}
                          data-menu-result={itemId}
                          role="listitem"
                          aria-label={`${item[lang]}, ₺${item.price.toLocaleString()}`}
                          className="overflow-hidden rounded-lg border border-border bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background scroll-mt-32"
                        >
                          <MenuImage
                            slug={itemId}
                            alt={
                              lang === "tr"
                                ? `${item.tr} – ${cat.tr} kategorisinden, Sultan Grill House menüsünden bir yemek fotoğrafı`
                                : lang === "en"
                                  ? `${item.en} – a dish from the ${cat.en} section of the Sultan Grill House menu`
                                  : lang === "ru"
                                    ? `${item.ru} – блюдо из раздела «${cat.ru}» меню Sultan Grill House`
                                    : `${item.es} – un plato de la sección ${cat.es} del menú de Sultan Grill House`
                            }
                            eager={eager}
                          />
                          <div className="p-6 md:p-7">
                            <div className="flex items-start justify-between gap-5">
                              <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                                {item[lang]}
                              </h3>
                              <div className="shrink-0 font-display text-3xl text-primary tabular-nums md:text-4xl">
                                ₺{item.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </article>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-16 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("menu.note")}
        </p>
      </section>
    </>
  );
}

function MenuImage({ slug, alt, eager }: { slug: string; alt: string; eager: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const mountedAt = useRef<number>(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const reveal = () => {
    const elapsed = Date.now() - mountedAt.current;
    const remaining = Math.max(0, 200 - elapsed);
    if (remaining === 0) setLoaded(true);
    else timerRef.current = setTimeout(() => setLoaded(true), remaining);
  };

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-accent/30 to-muted"
        />
      )}
      <img
        src={`/menu/800/${slug}.webp`}
        srcSet={`/menu/400/${slug}.webp 400w, /menu/800/${slug}.webp 800w, /menu/${slug}.webp 1200w`}
        sizes="(min-width: 768px) 400px, 100vw"
        alt={alt}
        width={800}
        height={1000}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={reveal}
        onError={reveal}
        {...(eager ? { fetchPriority: "high" as const } : {})}
        className={
          "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-out " +
          (loaded ? "opacity-100" : "opacity-0")
        }
      />
    </div>
  );
}

function CatPill({
  id,
  label,
  active,
  onClick,
}: {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      data-menu-group={id}
      onClick={onClick}
      className={
        "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-gold hover:text-foreground")
      }
    >
      {label}
    </button>
  );
}
