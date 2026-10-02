import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { offers } from "../data/mockData";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "nearbasket_cart_v1";
const OFFER_STORAGE_KEY = "nearbasket_offer_v1";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  });

  const [appliedOfferCode, setAppliedOfferCode] = useState(() => {
    try {
      return localStorage.getItem(OFFER_STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to persist cart", e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedOfferCode) {
        localStorage.setItem(OFFER_STORAGE_KEY, appliedOfferCode);
      } else {
        localStorage.removeItem(OFFER_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist offer", e);
    }
  }, [appliedOfferCode]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].qty + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: newQty,
          // Always use latest product price data
          product: product,
        };
        return updated;
      } else {
        return [...prevItems, { product, qty: Math.max(1, quantity) }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, qty: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedOfferCode("");
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Calculations
  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }, [cartItems]);

  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    if (subtotal >= 500) return 0; // Free delivery over Rs. 500
    return 25;
  }, [cartItems, subtotal]);

  const appliedOffer = useMemo(() => {
    if (!appliedOfferCode) return null;
    return offers.find((o) => o.code.toUpperCase() === appliedOfferCode.toUpperCase()) || null;
  }, [appliedOfferCode]);

  const discountAmount = useMemo(() => {
    if (!appliedOffer || subtotal <= 0) return 0;
    if (subtotal < appliedOffer.minOrder) return 0;

    if (appliedOffer.discountType === "flat") {
      return Math.min(appliedOffer.discountValue, subtotal);
    } else if (appliedOffer.discountType === "pct") {
      let disc = (subtotal * appliedOffer.discountValue) / 100;
      if (appliedOffer.maxDiscount) {
        disc = Math.min(disc, appliedOffer.maxDiscount);
      }
      return Math.min(disc, subtotal);
    }
    return 0;
  }, [appliedOffer, subtotal]);

  const total = useMemo(() => {
    return Math.max(0, subtotal + deliveryFee - discountAmount);
  }, [subtotal, deliveryFee, discountAmount]);

  const applyOffer = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const foundOffer = offers.find((o) => o.code.toUpperCase() === cleanCode);
    if (!foundOffer) {
      return { success: false, message: "Invalid offer code. Please check and try again." };
    }
    if (subtotal < foundOffer.minOrder) {
      return {
        success: false,
        message: `Minimum order amount for ${foundOffer.code} is Rs. ${foundOffer.minOrder}. Add items worth Rs. ${(
          foundOffer.minOrder - subtotal
        ).toFixed(0)} more!`,
      };
    }
    setAppliedOfferCode(foundOffer.code);
    return { success: true, message: `Offer '${foundOffer.code}' applied successfully!` };
  };

  const removeOffer = () => {
    setAppliedOfferCode("");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        subtotal,
        deliveryFee,
        appliedOffer,
        discountAmount,
        total,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyOffer,
        removeOffer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}
