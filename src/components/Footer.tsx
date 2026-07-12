import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone, Clock, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-24 border-t border-border bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦁</span>
            <span className="font-display text-xl">Sultan Grill House</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ivory/70">{t("footer.tagline")}</p>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-soft"
          >
            <Instagram size={16} />@{CONTACT.instagramHandle}
          </a>
        </div>

        <div>
          <h3 className="font-display text-lg text-gold">{t("footer.find")}</h3>
          <ul className="mt-4 space-y-3 text-sm text-ivory/80">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-gold">{CONTACT.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">{CONTACT.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>{t("contact.everyday")} · {CONTACT.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-gold">{t("footer.explore")}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-ivory/80 hover:text-gold">{t("nav.home")}</Link></li>
            <li><Link to="/menu" className="text-ivory/80 hover:text-gold">{t("nav.menu")}</Link></li>
            <li><Link to="/about" className="text-ivory/80 hover:text-gold">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="text-ivory/80 hover:text-gold">{t("nav.contact")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-5 text-center text-xs text-ivory/50">
        © {new Date().getFullYear()} Sultan Grill House. {t("footer.rights")}
      </div>
    </footer>
  );
}
