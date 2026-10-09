import { Phone, Star } from "lucide-react";

export default function DeliveryPartnerCard({ driver }) {
  return (
    <section aria-label="Delivery partner" className="space-y-sm">
      <h3 className="font-label text-label-sm text-on-surface-variant uppercase tracking-wide">Your delivery partner</h3>
      <div className="flex items-center gap-md">
        {driver.avatar ? (
          <img src={driver.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div
            aria-hidden="true"
            className="w-12 h-12 shrink-0 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-display text-headline-sm"
          >
            {driver.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-display text-body-md font-bold text-on-surface">{driver.name}</p>
          <p className="font-label text-label-sm text-on-surface-variant flex items-center gap-1">
            <Star size={12} className="text-secondary-container fill-secondary-container" aria-hidden="true" />
            <span>{driver.rating.toFixed(1)}</span>
          </p>
          <p className="font-body text-body-sm text-on-surface-variant truncate">
            {driver.vehicleType} • {driver.vehicleNumber}
          </p>
        </div>
        <a
          href={`tel:${driver.phone}`}
          aria-label="Call delivery partner"
          className="w-11 h-11 shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm hover:bg-primary-container active:scale-95 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Phone size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
