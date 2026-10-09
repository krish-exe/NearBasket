// Development / demo data for delivery tracking. None of this is real personal data.

export const DEMO_DRIVER = Object.freeze({
  id: "DEL-001",
  name: "Satish",
  phone: "+919876543210",
  rating: 4.8,
  vehicleType: "Bike",
  vehicleNumber: "MH 01 AB 1234",
});

// Approximate demo coordinates for each store, plus a fixed demo drop-off point.
// Orders carry only a free-text address, so the destination is not geocoded: an order may
// provide its own `destinationLocation`, otherwise the store's demo destination is used.
export const STORE_LOCATIONS = Object.freeze({
  "green-valley-organics": {
    store: { latitude: 12.9784, longitude: 77.6408 },
    destination: { latitude: 12.9838, longitude: 77.6482 },
  },
  "sharma-general-store": {
    store: { latitude: 12.9698, longitude: 77.6455 },
    destination: { latitude: 12.9752, longitude: 77.6381 },
  },
  "fresh-mart-daily": {
    store: { latitude: 12.9352, longitude: 77.6245 },
    destination: { latitude: 12.9417, longitude: 77.6318 },
  },
  "punjabi-spice-bazaar": {
    store: { latitude: 12.9791, longitude: 77.6389 },
    destination: { latitude: 12.9729, longitude: 77.6461 },
  },
});

export const DEFAULT_LOCATIONS = Object.freeze({
  store: { latitude: 12.9784, longitude: 77.6408 },
  destination: { latitude: 12.9838, longitude: 77.6482 },
});

export const DEMO_ORDER_ID = "NB-DEMO-001";

// Dev-only order that is already out for delivery (seeded by OrderContext when import.meta.env.DEV)
export function createDemoOrder() {
  const now = new Date();
  const item = (id, name, unit, price, storeId, image, qty) => ({
    product: { id, name, unit, price, image, storeId, categoryId: "fruits-veg" },
    qty,
  });
  const items = [
    item("organic-tomatoes", "Hybrid Red Tomatoes", "1 kg", 35, "sharma-general-store",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600&auto=format&fit=crop", 2),
    item("fresh-bananas", "Robusta Fresh Bananas", "1 kg", 50, "green-valley-organics",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop", 1),
  ];
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  return {
    id: DEMO_ORDER_ID,
    date: now.toISOString(),
    formattedDate: now.toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    }),
    customer: "Demo Customer",
    email: "demo@example.com",
    storeName: "Sharma General Store",
    storeId: "sharma-general-store",
    items,
    subtotal,
    discount: 0,
    deliveryFee: 25,
    total: subtotal + 25,
    offerCode: null,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Out for delivery",
    address: "Flat 402, Sunshine Apartments, Indiranagar, Bengaluru",
  };
}
