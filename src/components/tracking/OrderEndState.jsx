// Full-page message used for unknown, delivered, cancelled and tracking-unavailable orders.
export default function OrderEndState({ icon: Icon, tone = "neutral", title, message, detail, actions }) {
  const toneClass =
    tone === "success"
      ? "bg-primary/10 text-primary"
      : tone === "error"
        ? "bg-error/10 text-error"
        : "bg-surface-container text-on-surface-variant";

  return (
    <div className="flex-grow flex items-center justify-center px-margin-mobile py-xl">
      <div className="animate-in zoom-in-95 w-full max-w-md bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/30 p-xl text-center space-y-md">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${toneClass}`}>
          <Icon size={32} aria-hidden="true" />
        </div>
        <h2 className="font-display text-headline-md font-bold text-on-surface">{title}</h2>
        <p className="font-body text-body-md text-on-surface-variant">{message}</p>
        {detail && <p className="font-label text-label-md text-on-surface">{detail}</p>}
        <div className="flex flex-col sm:flex-row gap-sm justify-center pt-sm">
          {actions.map(({ label, onClick, primary }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className={`px-6 py-2.5 rounded-full font-label text-label-md transition-colors cursor-pointer ${
                primary
                  ? "bg-primary text-on-primary hover:bg-primary-container shadow-sm"
                  : "border border-primary text-primary hover:bg-primary/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
