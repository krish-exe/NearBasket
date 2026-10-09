// Delivery lifecycle shared by the tracking service, the UI and the Orders page.
// OrderContext stores the human-readable label (e.g. "Out for delivery") in order.status,
// so existing "Placed" / "Delivered" / "Cancelled" orders keep working unchanged.

export const TRACKING_STATUS = Object.freeze({
  PLACED: "PLACED",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  READY_FOR_PICKUP: "READY_FOR_PICKUP",
  PICKED_UP: "PICKED_UP",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
});

// Order in which an active order moves through the statuses
export const STATUS_FLOW = [
  TRACKING_STATUS.PLACED,
  TRACKING_STATUS.CONFIRMED,
  TRACKING_STATUS.PREPARING,
  TRACKING_STATUS.READY_FOR_PICKUP,
  TRACKING_STATUS.PICKED_UP,
  TRACKING_STATUS.OUT_FOR_DELIVERY,
  TRACKING_STATUS.DELIVERED,
];

export const STATUS_LABEL = Object.freeze({
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  READY_FOR_PICKUP: "Ready for pickup",
  PICKED_UP: "Picked up",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
});

// "Out for delivery" / "out-for-delivery" / "OUT_FOR_DELIVERY" -> OUT_FOR_DELIVERY (null if unknown)
export function toTrackingStatus(value) {
  if (typeof value !== "string") return null;
  const key = value.trim().toUpperCase().replace(/[\s-]+/g, "_");
  return TRACKING_STATUS[key] || null;
}

export function isTerminalStatus(status) {
  return status === TRACKING_STATUS.DELIVERED || status === TRACKING_STATUS.CANCELLED;
}

// Orders whose delivery can still be followed (drives the "Track Order" button)
export function isActiveOrder(order) {
  const status = toTrackingStatus(order?.status);
  return status !== null && !isTerminalStatus(status);
}

// Condensed customer-facing timeline (several backend statuses share one step)
export const TIMELINE_STEPS = Object.freeze([
  { key: "placed", label: "Order placed", statuses: [TRACKING_STATUS.PLACED] },
  { key: "confirmed", label: "Confirmed", statuses: [TRACKING_STATUS.CONFIRMED] },
  { key: "packed", label: "Packed", statuses: [TRACKING_STATUS.PREPARING, TRACKING_STATUS.READY_FOR_PICKUP] },
  { key: "delivery", label: "Out for delivery", statuses: [TRACKING_STATUS.PICKED_UP, TRACKING_STATUS.OUT_FOR_DELIVERY] },
  { key: "delivered", label: "Delivered", statuses: [TRACKING_STATUS.DELIVERED] },
]);

export function getTimelineIndex(status) {
  return TIMELINE_STEPS.findIndex((step) => step.statuses.includes(status));
}

export function getStatusCopy(status, { driverName, storeName, isArriving }) {
  const store = storeName || "The store";
  switch (status) {
    case TRACKING_STATUS.PLACED:
      return { title: "Order placed", description: `Your order has been sent to ${store}.` };
    case TRACKING_STATUS.CONFIRMED:
      return { title: "Order confirmed", description: `${store} has accepted your order.` };
    case TRACKING_STATUS.PREPARING:
      return { title: "Preparing your order", description: `${store} is packing your groceries.` };
    case TRACKING_STATUS.READY_FOR_PICKUP:
      return { title: "Ready for pickup", description: `Your order is packed and waiting for ${driverName}.` };
    case TRACKING_STATUS.PICKED_UP:
      return { title: "Picked up", description: `${driverName} has collected your order and is setting off.` };
    case TRACKING_STATUS.OUT_FOR_DELIVERY:
      return isArriving
        ? { title: "Arriving now", description: `${driverName} is almost at your door.` }
        : { title: "Out for delivery", description: `${driverName} is on the way to deliver your order.` };
    default:
      return { title: STATUS_LABEL[status] || "Order update", description: "" };
  }
}

// Never show "0 mins": the last minute becomes "Arriving" in the UI
export function formatDistance(km) {
  return km >= 0.1 ? `${km.toFixed(1)} km away` : "Arriving";
}

export function getTimeliness(delayMinutes = 0) {
  if (delayMinutes <= 0) return { key: "ON_TIME", label: "ON TIME" };
  if (delayMinutes <= 5) return { key: "SLIGHTLY_DELAYED", label: "SLIGHTLY DELAYED" };
  return { key: "DELAYED", label: "DELAYED" };
}
