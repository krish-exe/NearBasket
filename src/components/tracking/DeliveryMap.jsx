import { memo, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, ZoomControl, AttributionControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed } from "lucide-react";
import { storeIcon, destinationIcon, driverIcon } from "./markerIcons";

const toLatLng = (p) => [p.latitude, p.longitude];
const DESKTOP_QUERY = "(min-width: 1024px)";

// Fits store + destination (the route always lies inside that box). Re-runs when fitKey changes,
// so the map is not re-centred as the rider moves and the user can pan freely.
function FitBounds({ store, destination, fitKey }) {
  const map = useMap();
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;
    map.fitBounds(L.latLngBounds([toLatLng(store), toLatLng(destination)]), {
      paddingTopLeft: [32, 88],
      // leave room for the floating side panel on desktop
      paddingBottomRight: [desktop ? 460 : 32, 40],
      maxZoom: 17,
    });
  }, [map, store, destination, fitKey]);
  return null;
}

function DeliveryMap({ tracking }) {
  const { storeLocation, destinationLocation, driverLocation, route, routeIndex } = tracking;
  const [fitKey, setFitKey] = useState(0);
  const [tilesLoaded, setTilesLoaded] = useState(false);

  // Don't leave the skeleton up forever if tiles can't load (offline)
  useEffect(() => {
    const timer = setTimeout(() => setTilesLoaded(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const routeLatLngs = useMemo(() => route.map(toLatLng), [route]);
  const center = useMemo(
    () => [
      (storeLocation.latitude + destinationLocation.latitude) / 2,
      (storeLocation.longitude + destinationLocation.longitude) / 2,
    ],
    [storeLocation, destinationLocation]
  );

  const driverPoint = driverLocation ? toLatLng(driverLocation) : null;
  const traveled = driverPoint ? [...routeLatLngs.slice(0, routeIndex + 1), driverPoint] : [];
  const remaining = driverPoint ? [driverPoint, ...routeLatLngs.slice(routeIndex + 1)] : routeLatLngs;

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={15}
        zoomControl={false}
        attributionControl={false}
        className="nb-map h-full w-full"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
          eventHandlers={{ load: () => setTilesLoaded(true) }}
        />
        <ZoomControl position="bottomleft" />
        <AttributionControl position="bottomleft" prefix={false} />
        <FitBounds store={storeLocation} destination={destinationLocation} fitKey={fitKey} />

        {traveled.length > 1 && (
          <Polyline positions={traveled} pathOptions={{ color: "#a9b3a5", weight: 6, opacity: 0.9 }} />
        )}
        <Polyline
          positions={remaining}
          pathOptions={{ color: "#ff8f00", weight: 6, opacity: 0.95, lineCap: "round", lineJoin: "round" }}
        />

        <Marker position={toLatLng(storeLocation)} icon={storeIcon} keyboard={false} title="Store" />
        <Marker position={toLatLng(destinationLocation)} icon={destinationIcon} keyboard={false} title="Your address" />
        {driverPoint && (
          <Marker position={driverPoint} icon={driverIcon} keyboard={false} zIndexOffset={1000} title="Delivery partner" />
        )}
      </MapContainer>

      <button
        type="button"
        onClick={() => setFitKey((k) => k + 1)}
        aria-label="Recenter map"
        className="absolute right-3 bottom-10 lg:right-[calc(400px+3rem)] lg:bottom-6 z-[500] w-11 h-11 rounded-full bg-surface-container-lowest text-on-surface shadow-lift flex items-center justify-center hover:bg-surface-container-low active:scale-95 transition cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <LocateFixed size={20} aria-hidden="true" />
      </button>

      <div
        aria-hidden={tilesLoaded}
        className={`pointer-events-none absolute inset-0 z-[600] flex items-center justify-center bg-surface-container transition-opacity duration-300 ${
          tilesLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-2 font-label text-label-md text-on-surface-variant animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          Loading live location...
        </div>
      </div>
    </div>
  );
}

export default memo(DeliveryMap);
