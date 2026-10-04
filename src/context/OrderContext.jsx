import { createContext, useContext, useState, useEffect } from "react";
import { initialOrders, stores } from "../data/mockData";

const OrderContext = createContext(null);

const ORDERS_STORAGE_KEY = "nearbasket_orders_v1";

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load orders from localStorage", e);
    }
    return initialOrders;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders to localStorage", e);
    }
  }, [orders]);

  const placeOrder = ({ customerName, email, address, paymentMethod, cartItems, subtotal, deliveryFee, discount, total, offerCode }) => {
    // No leading "#": the id is passed around in URLs, where "#" starts the fragment
    const newOrderId = `NB-${Date.now().toString().slice(-6)}`;
    const storeIds = [...new Set(cartItems.map((item) => item.product.storeId).filter(Boolean))];
    const storeNames = storeIds.map((id) => stores.find((s) => s.id === id)?.name).filter(Boolean);
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newOrder = {
      id: newOrderId,
      date: now.toISOString(),
      formattedDate,
      customer: customerName || "Valued Customer",
      email: email || "customer@example.com",
      storeName: storeNames.length ? storeNames.join(", ") : "NearBasket Store",
      storeId: storeIds[0] || null,
      items: cartItems.map((item) => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          unit: item.product.unit,
          price: item.product.price,
          image: item.product.image,
          storeId: item.product.storeId,
          categoryId: item.product.categoryId,
        },
        qty: item.qty,
      })),
      subtotal,
      discount,
      deliveryFee,
      total,
      offerCode: offerCode || null,
      paymentMethod: paymentMethod || "Cash on Delivery",
      paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
      status: "Placed",
      address: address || "Indiranagar, Bengaluru",
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId) || null;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside an OrderProvider");
  return ctx;
}
