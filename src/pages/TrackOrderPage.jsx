import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircleCheck, CircleX, MapPinOff, PackageSearch, Plus, Pencil } from "lucide-react";
import { useOrders } from "../context/OrderContext";
import useDeliveryTracking from "../hooks/useDeliveryTracking";
import { STATUS_LABEL, TRACKING_STATUS, isTerminalStatus, toTrackingStatus } from "../utils/trackingStatus";
import DeliveryMap from "../components/tracking/DeliveryMap";
import DeliveryInstructions from "../components/tracking/DeliveryInstructions";
import DeliveryPartnerCard from "../components/tracking/DeliveryPartnerCard";
import OrderEndState from "../components/tracking/OrderEndState";
import OrderSummary from "../components/tracking/OrderSummary";
import TrackingErrorBoundary from "../components/tracking/TrackingErrorBoundary";
import TrackingHeader from "../components/tracking/TrackingHeader";
import TrackingProgress from "../components/tracking/TrackingProgress";
import TrackingStatusCard from "../components/tracking/TrackingStatusCard";

function formatDeliveredAt(iso) {
  const delivered = new Date(iso);
  if (Number.isNaN(delivered.getTime())) return null;
  if (Date.now() - delivered.getTime() < 2 * 60 * 1000) return "Delivered just now";
  const time = delivered.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }).toUpperCase();
  return `Delivered at ${time}`;
}

function TrackingUnavailable({ onRetry, onBack }) {
  return (
    <OrderEndState
      icon={MapPinOff}
      tone="error"
      title="Live tracking unavailable"
      message="We're unable to get the delivery partner's current location right now."
      actions={[
        { label: "Retry", onClick: onRetry, primary: true },
        { label: "Back to Orders", onClick: onBack },
      ]}
    />
  );
}

function ActiveTracking({ order, onBack }) {
  const { updateOrder } = useOrders();
  const { tracking, error, retry } = useDeliveryTracking(order);
  const [sheetOpen, setSheetOpen] = useState(false);
  const trackingStatus = tracking?.status;

  // Keep the stored order in step with the simulated delivery so the Orders page agrees with this one
  useEffect(() => {
    if (!trackingStatus) return;
    const label = STATUS_LABEL[trackingStatus];
    if (order.status === label) return;
    updateOrder(
      order.id,
      trackingStatus === TRACKING_STATUS.DELIVERED
        ? { status: label, deliveredAt: new Date().toISOString() }
        : { status: label }
    );
  }, [trackingStatus, order.id, order.status, updateOrder]);

  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const saveInstructions = useCallback(
    (deliveryInstructions) => {
      updateOrder(order.id, { deliveryInstructions });
      setSheetOpen(false);
    },
    [order.id, updateOrder]
  );

  if (error) return <TrackingUnavailable onRetry={retry} onBack={onBack} />;

  if (!tracking) {
    return (
      <div className="flex-grow flex items-center justify-center font-label text-label-md text-on-surface-variant animate-pulse">
        Loading live location...
      </div>
    );
  }

  const saved = order.deliveryInstructions;
  const savedText = saved ? [saved.preset, saved.note].filter(Boolean).join(" — ") : "";

  return (
    <div className="relative flex-grow lg:overflow-hidden">
      <div className="isolate relative z-0 h-[58dvh] lg:absolute lg:inset-0 lg:h-full">
        <TrackingErrorBoundary
          renderFallback={(retryMap) => (
            <div className="h-full flex flex-col items-center justify-center gap-3 bg-surface-container text-center px-lg">
              <p className="font-display text-headline-sm text-on-surface">Live tracking unavailable</p>
              <p className="font-body text-body-sm text-on-surface-variant">The map couldn't be loaded.</p>
              <button
                type="button"
                onClick={retryMap}
                className="px-6 py-2 rounded-full bg-primary text-on-primary font-label text-label-md cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}
        >
          <DeliveryMap tracking={tracking} />
        </TrackingErrorBoundary>
      </div>

      <TrackingHeader orderId={order.id} onBack={onBack} overlay />

      <div className="animate-in slide-in-from-bottom relative z-10 -mt-6 lg:mt-0 rounded-t-[24px] lg:rounded-xl bg-surface-container-lowest shadow-lift px-margin-mobile pt-3 pb-xl space-y-lg lg:absolute lg:right-6 lg:top-6 lg:bottom-6 lg:w-[400px] lg:overflow-y-auto lg:px-lg lg:pt-lg">
        <div aria-hidden="true" className="mx-auto w-10 h-1 rounded-full bg-outline-variant lg:hidden" />

        <TrackingStatusCard tracking={tracking} storeName={order.storeName} />
        <TrackingProgress status={tracking.status} />

        <div className="border-t border-outline-variant/30 pt-md">
          {saved ? (
            <div className="flex items-start gap-3">
              <CircleCheck size={20} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="font-label text-label-md font-bold text-on-surface">Delivery instructions added</p>
                <p className="font-body text-body-sm text-on-surface-variant break-words">{savedText}</p>
              </div>
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                aria-label="Edit delivery instructions"
                className="w-9 h-9 shrink-0 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <Pencil size={16} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-label="Add delivery instructions"
              className="flex items-center gap-3 w-full font-label text-label-md font-bold text-primary cursor-pointer rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus size={18} aria-hidden="true" />
              </span>
              Add Delivery Instructions
            </button>
          )}
        </div>

        <div className="border-t border-outline-variant/30 pt-md">
          <DeliveryPartnerCard driver={tracking.driver} />
        </div>

        <div className="border-t border-outline-variant/30 pt-md">
          <OrderSummary order={order} />
        </div>
      </div>

      {sheetOpen && <DeliveryInstructions initial={saved} onCancel={closeSheet} onSave={saveInstructions} />}
    </div>
  );
}

export default function TrackOrderPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  const backToOrders = () => navigate("/orders");
  const status = toTrackingStatus(order?.status);
  const malformed = order && (status === null || !Array.isArray(order.items));

  let body;
  if (!order || malformed) {
    body = (
      <OrderEndState
        icon={PackageSearch}
        title="Order Not Found"
        message="We couldn't find this order."
        actions={[{ label: "Back to Orders", onClick: backToOrders, primary: true }]}
      />
    );
  } else if (status === TRACKING_STATUS.CANCELLED) {
    body = (
      <OrderEndState
        icon={CircleX}
        tone="error"
        title="Order Cancelled"
        message="This order has been cancelled and is no longer being delivered."
        actions={[{ label: "Back to Orders", onClick: backToOrders, primary: true }]}
      />
    );
  } else if (isTerminalStatus(status)) {
    body = (
      <OrderEndState
        icon={CircleCheck}
        tone="success"
        title="Delivered"
        message="Your order has been delivered."
        detail={order.deliveredAt ? formatDeliveredAt(order.deliveredAt) : `Placed on ${order.formattedDate}`}
        actions={[
          { label: "View Order Details", onClick: () => navigate(`/orders?order=${encodeURIComponent(order.id)}`), primary: true },
          { label: "Back to Orders", onClick: backToOrders },
        ]}
      />
    );
  } else {
    body = <ActiveTracking key={order.id} order={order} onBack={backToOrders} />;
  }

  const isActive = body.type === ActiveTracking;

  return (
    <div className="min-h-dvh lg:h-dvh flex flex-col bg-surface">
      {!isActive && <TrackingHeader orderId={orderId} onBack={backToOrders} />}
      {body}
    </div>
  );
}
