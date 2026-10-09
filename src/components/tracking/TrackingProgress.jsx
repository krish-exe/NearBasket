import { Check } from "lucide-react";
import { TIMELINE_STEPS, getTimelineIndex } from "../../utils/trackingStatus";

export default function TrackingProgress({ status }) {
  const current = getTimelineIndex(status);

  return (
    <ol aria-label="Order progress" className="flex items-start">
      {TIMELINE_STEPS.map((step, i) => {
        const done = i < current;
        const isCurrent = i === current;
        return (
          <li
            key={step.key}
            aria-current={isCurrent ? "step" : undefined}
            className="relative flex-1 flex flex-col items-center text-center"
          >
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`absolute top-3 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                  i <= current ? "bg-primary" : "bg-outline-variant"
                }`}
              />
            )}
            <span
              className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                done
                  ? "bg-primary border-primary text-on-primary"
                  : isCurrent
                    ? "bg-surface-container-lowest border-primary"
                    : "bg-surface-container-lowest border-outline-variant"
              }`}
            >
              {done && <Check size={13} strokeWidth={3} aria-hidden="true" />}
              {isCurrent && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </span>
            <span
              className={`mt-1.5 px-0.5 font-label text-[11px] leading-[14px] ${
                isCurrent ? "font-bold text-on-surface" : done ? "text-on-surface" : "text-on-surface-variant"
              }`}
            >
              {step.label}
              <span className="sr-only">{done ? " (completed)" : isCurrent ? " (current)" : " (upcoming)"}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
