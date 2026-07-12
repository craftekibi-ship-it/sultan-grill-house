import { createFileRoute } from "@tanstack/react-router";
import { Flame, Fish, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-restaurant.jpg";
import mezzeImg from "@/assets/featured-mezze.jpg";
import baklavaImg from "@/assets/dish-baklava.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sultan Grill House | Ottoman Tradition in Sultanahmet" },
      {
        name: "description",
        content:
          "Our story: a Turkish grill and seafood restaurant in Sultanahmet, Istanbul, blending Ottoman culinary heritage with modern hospitality.",
      },
      { property: "og:title", content: "About Sultan Grill House" },
      {
        property: "og:description",
        content: "From Ottoman palace kitchens to your table — in the heart of Sultanahmet.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={heroImg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-4xl px-4 py-28 text-center text-ivory md:px-8 md:py-36">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">{t("about.kicker")}</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{t("about.title")}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
        <p className="text-lg leading-relaxed text-foreground/90">{t("about.p1")}</p>
        <div className="gold-divider my-10"><span>✦</span></div>
        <p className="text-lg leading-relaxed text-foreground/90">{t("about.p2")}</p>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="text-center font-display text-4xl text-foreground md:text-5xl">
            {t("about.values.title")}
          </h2>
          <div className="gold-divider mx-auto mt-5 w-full max-w-xs"><span>✦</span></div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <ValueCard icon={<Flame />} title={t("about.v1.t")} body={t("about.v1.b")} />
            <ValueCard icon={<Fish />} title={t("about.v2.t")} body={t("about.v2.b")} />
            <ValueCard icon={<Heart />} title={t("about.v3.t")} body={t("about.v3.b")} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2">
          <img src={mezzeImg} alt="Mezze platter" loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full rounded-md object-cover" />
          <img src={baklavaImg} alt="Baklava" loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full rounded-md object-cover sm:mt-12" />
        </div>
      </section>
    </>
  );
}

function ValueCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
