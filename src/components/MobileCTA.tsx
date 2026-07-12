import { MessageCircle, MapPin, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";

export function MobileCTA() {
  const { t } = useI18n();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-3">
        <Link
          to="/contact"
          hash="reserve"
          className="flex items-center justify-center gap-2 bg-primary py-3 text-sm font-medium text-primary-foreground"
        >
          <Calendar size={16} /> {t("cta.reserve")}
        </Link>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-emerald-deep py-3 text-sm font-medium text-ivory"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <a
          href={CONTACT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-charcoal py-3 text-sm font-medium text-ivory"
        >
          <MapPin size={16} /> {t("cta.directions")}
        </a>
      </div>
    </div>
  );
}
