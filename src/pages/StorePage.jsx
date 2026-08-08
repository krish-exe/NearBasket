import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Map, Plus, ShoppingBasket } from "lucide-react";
import { storeProducts } from "../data/mockData";

export default function StorePage() {
  const { storeId } = useParams();
  const store = storeProducts[storeId] || storeProducts["green-valley-organics"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: { product, qty: (prev[product.id]?.qty || 0) + 1 },
    }));
  };

  const cartItems = Object.values(cart);
  const subtotal = useMemo(
    () => cartItems.reduce((sum, { product, qty }) => sum + product.price * qty, 0),
    [cartItems]
  );
  const serviceFee = cartItems.length ? 1.5 : 0;
  const total = subtotal + serviceFee;

  return (
    <main className="flex-grow w-full max-w-content mx-auto px-margin-mobile md:px-margin-desktop py-xl space-y-xl">
      {/* Banner */}
      <section className="relative rounded-lg overflow-hidden h-[280px] md:h-[340px]">
        <img src={store.banner} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-lg flex items-center gap-md">
          <div className="w-16 h-16 rounded-full bg-surface-container-lowest border-4 border-surface-container-lowest overflow-hidden shrink-0 flex items-center justify-center">
            <ShoppingBasket className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="font-display text-headline-md md:text-display-lg-mobile text-white">{store.name}</h1>
            <div className="flex items-center gap-2 text-white/90 font-body text-body-sm mt-1">
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-secondary-container text-secondary-container" />
                {store.rating} ({store.reviews} reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Map size={14} />
                {store.distance}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-primary-fixed">
                <span className="w-2 h-2 rounded-full bg-primary-fixed inline-block" />
                {store.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_340px] gap-xl items-start">
        {/* Categories */}
        <aside className="space-y-xs">
          <h2 className="font-display text-headline-sm text-on-surface mb-md hidden lg:block">Categories</h2>
          <div className="flex lg:flex-col gap-sm overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {store.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-md py-2.5 rounded-md text-left font-label text-label-md whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-secondary-container text-on-secondary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Products */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
          {store.products.map((product) => (
            <div
              key={product.id}
              className="bg-surface-container-lowest rounded-md overflow-hidden shadow-card card-hover-lift border border-outline-variant/20"
            >
              <div className="h-40 w-full">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-md">
                <h3 className="font-display text-headline-sm text-on-surface">{product.name}</h3>
                <p className="font-body text-body-sm text-on-surface-variant mb-sm">{product.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-headline-sm text-primary">Rs. {product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary transition-colors active:scale-95 shadow-sm"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Cart */}
        <aside className="bg-surface-container-low rounded-lg p-lg shadow-card sticky top-24">
          <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2 mb-md">
            <ShoppingBasket size={20} />
            Your Cart
          </h2>
          <div className="border-t border-outline-variant/30" />

          {cartItems.length === 0 ? (
            <p className="font-body text-body-sm text-on-surface-variant py-lg text-center">
              Your cart is empty. Add items to get started.
            </p>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {cartItems.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between items-start py-md">
                  <div>
                    <p className="font-body text-body-md text-on-surface">{product.name}</p>
                    <p className="font-body text-body-sm text-on-surface-variant">
                      {product.unit} x {qty}
                    </p>
                  </div>
                  <span className="font-label text-label-md text-on-surface font-semibold">
                    Rs. {(product.price * qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-outline-variant/30 pt-md mt-md space-y-2">
            <div className="flex justify-between font-body text-body-md text-on-surface-variant">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-body text-body-md text-on-surface-variant">
              <span>Service Fee</span>
              <span>Rs. {serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-display text-headline-sm text-on-surface pt-2">
              <span>Total</span>
              <span className="text-primary">Rs. {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            disabled={cartItems.length === 0}
            className="w-full mt-lg py-3 bg-primary text-on-primary font-label text-label-md rounded-full hover:bg-primary-container transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}
