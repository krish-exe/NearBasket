import { useCallback, useEffect, useRef, useState } from "react";
import { subscribe } from "../services/deliveryTrackingService";
import { isActiveOrder, isTerminalStatus } from "../utils/trackingStatus";

// Follows one order's delivery. Timers live in the service and are released on unmount.
// The subscription is keyed on order id (not the order object) so status updates written back to
// OrderContext don't restart the simulation.
export default function useDeliveryTracking(order) {
  const orderId = order?.id;
  const active = isActiveOrder(order);

  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const orderRef = useRef(order);
  const controllerRef = useRef(null);
  const manuallyPausedRef = useRef(false);

  useEffect(() => {
    orderRef.current = order;
  });

  useEffect(() => {
    if (!orderId || !active) return undefined;
    setTracking(null);
    setError(null);
    setPaused(false);
    manuallyPausedRef.current = false;

    let controller;
    try {
      controller = subscribe(orderRef.current, setTracking, setError);
    } catch (e) {
      setError(e);
      return undefined;
    }
    controllerRef.current = controller;

    // Stop moving the rider while the tab is hidden
    const onVisibility = () => {
      if (document.hidden) controller.pause();
      else if (!manuallyPausedRef.current) controller.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      controller.unsubscribe();
      controllerRef.current = null;
    };
  }, [orderId, active, attempt]);

  const pauseTracking = useCallback(() => {
    manuallyPausedRef.current = true;
    controllerRef.current?.pause();
    setPaused(true);
  }, []);

  const resumeTracking = useCallback(() => {
    manuallyPausedRef.current = false;
    controllerRef.current?.resume();
    setPaused(false);
  }, []);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const isTracking =
    active && !error && !paused && tracking !== null && !isTerminalStatus(tracking.status);

  return { tracking, isTracking, error, pauseTracking, resumeTracking, retry };
}
