import { createFileRoute } from "@tanstack/react-router";
import { MapPin, MessageCircle, Instagram, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";
import { ReservationForm } from "@/components/ReservationForm";
import { HoursTable } from "@/components/OpenStatus";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sultan Grill House | Sultanahmet, Istanbul" },
      {
        name: "description",
        content:
          "Visit Sultan Grill House in Sultanahmet, Istanbul. Address, opening hours, WhatsApp and Google Maps directions.",
      },
      { property: "og:title", content: "Contact Sultan Grill House" },
      { property: "og:description", content: "Address, hours, WhatsApp and directions in Sultanahmet, Istanbul." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-8 md:py-24">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">Sultan Grill House</p>
          <h1 className="mt-4 font-display text-5xl text-foreground md:text-6xl">{t("contact.title")}</h1>
          <div className="gold-divider mx-auto mt-5 w-full max-w-xs"><span>✦</span></div>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <InfoBlock icon={<MapPin />} title={t("contact.address")}>
              <p>{CONTACT.address}</p>
              <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-primary hover:underline">
                {t("cta.directions")} →
              </a>
            </InfoBlock>
            <HoursTable />
            <InfoBlock icon={<Mail />} title="Email">
              <a href={`mailto:${CONTACT.email}`} className="text-foreground hover:text-primary">
                {CONTACT.email}
              </a>
            </InfoBlock>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-deep px-3 py-3 text-xs font-medium uppercase tracking-wider text-ivory transition-opacity hover:opacity-90"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail size={16} /> Email
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-3 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-gold"
              >
                <Instagram size={16} /> Instagram
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="overflow-hidden rounded-md border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
              <iframe
                title="Sultan Grill House location"
                src={CONTACT.mapsEmbed}
                width="100%"
                height="520"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section id="reserve" className="border-t border-border bg-card scroll-mt-24">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
          <ReservationForm />
        </div>
      </section>
    </>
  );
}

function InfoBlock({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h2 className="font-display text-lg text-foreground">{title}</h2>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
