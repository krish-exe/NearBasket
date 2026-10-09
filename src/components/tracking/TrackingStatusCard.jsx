import { CircleCheck, Clock, TriangleAlert } from "lucide-react";
import { formatDistance, getStatusCopy, getTimeliness, TRACKING_STATUS } from "../../utils/trackingStatus";

const TIMELINESS_STYLE = {
  ON_TIME: { className: "bg-primary/10 text-primary", Icon: CircleCheck },
  SLIGHTLY_DELAYED: { className: "bg-secondary-container/15 text-secondary", Icon: Clock },
  DELAYED: { className: "bg-error/10 text-error", Icon: TriangleAlert },
};

export default function TrackingStatusCard({ tracking, storeName }) {
  const { status, driver, etaMinutes, distanceKm, progress, isArriving, delayMinutes } = tracking;
  const { title, description } = getStatusCopy(status, { driverName: driver.name, storeName, isArriving });
  const timeliness = getTimeliness(delayMinutes);
  const { className, Icon } = TIMELINESS_STYLE[timeliness.key];
  const isOut = status === TRACKING_STATUS.OUT_FOR_DELIVERY;

  return (
    <section aria-label="Delivery status" className="space-y-md">
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label text-label-sm ${className}`}>
        <Icon size={14} aria-hidden="true" />
        {timeliness.label}
      </span>

      <div className="flex items-end justify-between gap-md">
        <div aria-live="polite" aria-atomic="true" className="min-w-0">
          <h2 className="font-display text-headline-md font-bold text-on-surface">{title}</h2>
          <p className="font-body text-body-sm text-on-surface-variant mt-1">{description}</p>
        </div>
        <div className="shrink-0 text-right">
          {isArriving ? (
            <p className="font-display text-headline-sm font-bold text-primary">Arriving</p>
          ) : (
            <>
              <p className="font-display text-display-lg-mobile font-bold text-on-surface leading-none">{etaMinutes}</p>
              <p className="font-label text-label-sm text-on-surface-variant">{etaMinutes === 1 ? "min" : "mins"}</p>
            </>
          )}
        </div>
      </div>

      {isOut && (
        <div className="space-y-1.5">
          <div
            role="progressbar"
            aria-label="Delivery progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="h-1.5 rounded-full bg-surface-container-high overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-secondary-container transition-[width] duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-label text-label-sm text-on-surface-variant">{formatDistance(distanceKm)}</p>
        </div>
      )}
    </section>
  );
}
