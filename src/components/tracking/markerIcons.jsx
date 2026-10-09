import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Bike, House, Store } from "lucide-react";

// Built once at module load: Leaflet markers take HTML, so the lucide icons are rendered to static markup.
function createMarkerIcon(Icon, modifier, size) {
  const html = `<div class="nb-marker nb-marker--${modifier}">${renderToStaticMarkup(
    <Icon size={Math.round(size * 0.5)} strokeWidth={2.25} aria-hidden="true" />
  )}</div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export const storeIcon = createMarkerIcon(Store, "store", 40);
export const destinationIcon = createMarkerIcon(House, "home", 40);
export const driverIcon = createMarkerIcon(Bike, "driver", 46);
