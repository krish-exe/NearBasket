import { ArrowLeft } from "lucide-react";

export default function TrackingHeader({ orderId, onBack, overlay = false }) {
  return (
    <header
      className={
        overlay
          ? "absolute top-3 left-3 right-3 lg:right-auto z-20 flex items-center gap-3"
          : "flex items-center gap-3 px-margin-mobile py-3 md:px-margin-desktop"
      }
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="w-11 h-11 shrink-0 rounded-full bg-surface-container-lowest text-on-surface shadow-lift flex items-center justify-center hover:bg-surface-container-low active:scale-95 transition cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <ArrowLeft size={20} aria-hidden="true" />
      </button>
      <div className="min-w-0 rounded-full bg-surface-container-lowest shadow-lift px-4 py-1.5">
        <h1 className="font-display text-body-md font-bold text-on-surface leading-5">Track Order</h1>
        <p className="font-label text-label-sm text-on-surface-variant truncate">Order #{orderId}</p>
      </div>
    </header>
  );
}
