// Delivery tracking source for the tracking page.
//
// subscribe() is the only entry point the UI uses. Today it runs a client-side simulation; to go
// live, replace the body with a WebSocket / SSE subscription that calls onUpdate with the same
// TrackingState shape (see buildTracking) and keep the returned { unsubscribe, pause, resume }.
//
// TrackingState: {
//   orderId, status, driver, driverLocation | null, storeLocation, destinationLocation,
//   etaMinutes, distanceKm, progress (0-100), isArriving, delayMinutes,
//   route: [{ latitude, longitude }], routeIndex, lastUpdated (ISO)
// }

import { DEMO_DRIVER, STORE_LOCATIONS, DEFAULT_LOCATIONS } from "../data/trackingData";
import { TRACKING_STATUS, STATUS_FLOW, toTrackingStatus, isTerminalStatus } from "../utils/trackingStatus";

const STORAGE_KEY = "nearbasket_tracking_v1";
const TICK_MS = 250;
const PERSIST_MS = 1000;
const STEP_MS = 4000; // demo: each pre-delivery status lasts 4s
const DELIVERY_MS = 80000; // demo: store -> door takes 80s of simulated time
const SPEED_KM_PER_MIN = 0.28;
const ARRIVING_FRACTION = 0.9;

const OUT_INDEX = STATUS_FLOW.indexOf(TRACKING_STATUS.OUT_FOR_DELIVERY);
const PICKED_UP_INDEX = STATUS_FLOW.indexOf(TRACKING_STATUS.PICKED_UP);

function readSaved(orderId) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const entry = all[orderId];
    if (entry && Number.isFinite(entry.elapsedMs) && STATUS_FLOW.includes(entry.startStatus)) return entry;
  } catch {
    // unreadable storage: start fresh
  }
  return null;
}

function writeSaved(orderId, entry) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    all[orderId] = entry;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // tracking still works without persistence
  }
}

const isValidPoint = (p) =>
  p && Number.isFinite(p.latitude) && Number.isFinite(p.longitude) &&
  Math.abs(p.latitude) <= 90 && Math.abs(p.longitude) <= 180;

// Orders only carry a free-text address, so locations fall back to demo coordinates per store.
// An order may supply its own storeLocation / destinationLocation (e.g. once geocoded).
function resolveLocations(order) {
  const defaults = STORE_LOCATIONS[order.storeId] || DEFAULT_LOCATIONS;
  const pick = (own, fallback, name) => {
    if (own === undefined || own === null) return fallback;
    if (!isValidPoint(own)) throw new Error(`Order has invalid ${name}`);
    return own;
  };
  return {
    store: pick(order.storeLocation, defaults.store, "storeLocation"),
    destination: pick(order.destinationLocation, defaults.destination, "destinationLocation"),
  };
}

function haversineKm(a, b) {
  const rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad;
  const dLng = (b.longitude - a.longitude) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// Street-like path (alternating east-west / north-south legs) between store and destination.
// Built once per store/destination pair, never per render.
const routeCache = new Map();

function getRoute({ store, destination }) {
  const key = `${store.latitude},${store.longitude}>${destination.latitude},${destination.longitude}`;
  if (routeCache.has(key)) return routeCache.get(key);

  const midLng = store.longitude + (destination.longitude - store.longitude) * 0.45;
  const midLat = store.latitude + (destination.latitude - store.latitude) * 0.55;
  const points = [
    store,
    { latitude: store.latitude, longitude: midLng },
    { latitude: midLat, longitude: midLng },
    { latitude: midLat, longitude: destination.longitude },
    destination,
  ];
  const cumKm = [0];
  for (let i = 1; i < points.length; i += 1) {
    cumKm.push(cumKm[i - 1] + haversineKm(points[i - 1], points[i]));
  }
  const totalKm = cumKm[cumKm.length - 1];
  const route = {
    points,
    cumKm,
    totalKm,
    etaMinutes: Math.max(3, Math.round(totalKm / SPEED_KM_PER_MIN)),
  };
  routeCache.set(key, route);
  return route;
}

// Position `fraction` (0-1) of the way along the route, plus the segment it falls in
function pointAt(route, fraction) {
  const target = route.totalKm * fraction;
  let i = 1;
  while (i < route.points.length - 1 && route.cumKm[i] < target) i += 1;
  const segLen = route.cumKm[i] - route.cumKm[i - 1] || 1;
  const t = Math.min(1, Math.max(0, (target - route.cumKm[i - 1]) / segLen));
  const from = route.points[i - 1];
  const to = route.points[i];
  return {
    index: i - 1,
    location: {
      latitude: from.latitude + (to.latitude - from.latitude) * t,
      longitude: from.longitude + (to.longitude - from.longitude) * t,
    },
  };
}

const noopController = { unsubscribe() {}, pause() {}, resume() {} };

export function subscribe(order, onUpdate, onError) {
  let locations;
  let route;
  try {
    locations = resolveLocations(order);
    route = getRoute(locations);
  } catch (error) {
    onError(error);
    return noopController;
  }

  const saved = readSaved(order.id);
  const startStatus = saved?.startStatus ?? toTrackingStatus(order.status);
  if (!startStatus || isTerminalStatus(startStatus)) {
    onError(new Error("Order is not trackable"));
    return noopController;
  }

  const startIndex = STATUS_FLOW.indexOf(startStatus);
  const prepMs = Math.max(0, OUT_INDEX - startIndex) * STEP_MS;
  let elapsedMs = Math.max(0, saved?.elapsedMs ?? 0);

  function buildTracking() {
    let status;
    let fraction = 0;
    if (elapsedMs < prepMs) {
      status = STATUS_FLOW[startIndex + Math.floor(elapsedMs / STEP_MS)];
    } else {
      fraction = Math.min(1, (elapsedMs - prepMs) / DELIVERY_MS);
      status = fraction >= 1 ? TRACKING_STATUS.DELIVERED : TRACKING_STATUS.OUT_FOR_DELIVERY;
    }

    const statusIndex = STATUS_FLOW.indexOf(status);
    const driverVisible = statusIndex >= PICKED_UP_INDEX;
    const { index, location } = pointAt(route, fraction);

    let etaMinutes;
    if (status === TRACKING_STATUS.DELIVERED) etaMinutes = 0;
    else if (status === TRACKING_STATUS.OUT_FOR_DELIVERY) etaMinutes = Math.ceil(route.etaMinutes * (1 - fraction));
    else etaMinutes = route.etaMinutes + (OUT_INDEX - statusIndex) * 2;

    return {
      orderId: order.id,
      status,
      driver: DEMO_DRIVER,
      driverLocation: driverVisible ? location : null,
      storeLocation: locations.store,
      destinationLocation: locations.destination,
      etaMinutes,
      distanceKm: Math.round(route.totalKm * (1 - fraction) * 100) / 100,
      progress: status === TRACKING_STATUS.DELIVERED ? 100 : Math.min(99, Math.round(fraction * 100)),
      isArriving: status === TRACKING_STATUS.OUT_FOR_DELIVERY && fraction >= ARRIVING_FRACTION,
      delayMinutes: 0,
      route: route.points,
      routeIndex: index,
      lastUpdated: new Date().toISOString(),
    };
  }

  const persist = () => writeSaved(order.id, { startStatus, elapsedMs, updatedAt: Date.now() });

  let timer = null;
  let lastTick = 0;
  let lastPersist = 0;

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  const tick = () => {
    const now = performance.now();
    // Clamp so a throttled background tab doesn't teleport the rider
    elapsedMs += Math.min(now - lastTick, 1000);
    lastTick = now;
    const tracking = buildTracking();
    onUpdate(tracking);
    if (tracking.status === TRACKING_STATUS.DELIVERED) {
      stop();
      persist();
    } else if (now - lastPersist >= PERSIST_MS) {
      lastPersist = now;
      persist();
    }
  };

  const start = () => {
    if (timer !== null) return;
    lastTick = performance.now();
    lastPersist = lastTick;
    timer = setInterval(tick, TICK_MS);
  };

  const initial = buildTracking();
  onUpdate(initial);
  if (initial.status !== TRACKING_STATUS.DELIVERED) start();

  return {
    unsubscribe() {
      stop();
      persist();
    },
    pause() {
      stop();
      persist();
    },
    resume() {
      if (buildTracking().status !== TRACKING_STATUS.DELIVERED) start();
    },
  };
}
