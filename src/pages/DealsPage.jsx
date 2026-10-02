import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Plus, Check, Search, Tag, Filter } from "lucide-react";
import { products as allProducts, categories } from "../data/mockData";
import { useCart } from "../context/CartContext";

export default function DealsPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [addedItemIds, setAddedItemIds] = useState(new Set());

  const { addToCart } = useCart();

  // Filter deal products
  const dealProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const isDealProduct = p.isDeal || (p.originalPrice && p.originalPrice > p.price);
      if (!isDealProduct) return false;

      const matchesCat =
        selectedCategory === "all" || p.categoryId === selectedCategory;

      const matchesSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedItemIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItemIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <main className="flex-grow w-full max-w-content mx-auto px-margin-mobile md:px-margin-desktop py-xl space-y-xl">
      {/* Deals Header Banner */}
      <section className="relative rounded-lg overflow-hidden bg-gradient-to-r from-secondary-container via-primary-container to-tertiary-container p-xl md:p-2xl text-on-secondary-container shadow-card">
        <div className="relative z-10 max-w-2xl space-y-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-label text-label-sm font-bold uppercase tracking-wider">
            <Sparkles size={16} />
            Hot Daily Deals & Discounts
          </div>
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-white font-bold">
            Neighborhood Super Deals
          </h1>
          <p className="font-body text-body-lg text-white/90">
            Save big on fresh produce, dairy, bakery, and everyday pantry staples directly from local vendors.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="flex flex-col md:flex-row gap-md justify-between items-stretch md:items-center bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="font-label text-label-md font-bold text-on-surface flex items-center gap-1 shrink-0 mr-1">
            <Filter size={16} /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-label text-label-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input
            type="text"
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-full font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </section>

      {/* Deals Products Grid */}
      <section>
        {dealProducts.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-lg p-2xl text-center border border-outline-variant/30 space-y-md">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto text-on-surface-variant">
              <Tag size={32} />
            </div>
            <h3 className="font-display text-headline-sm text-on-surface">No deals match your criteria</h3>
            <p className="font-body text-body-md text-on-surface-variant max-w-md mx-auto">
              Try changing your category filter or search term to discover available deals.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
              }}
              className="px-6 py-2.5 bg-primary text-on-primary font-label text-label-md rounded-full hover:bg-primary-container transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
            {dealProducts.map((product) => {
              const discountPct = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              const isAdded = addedItemIds.has(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-card card-hover-lift border border-outline-variant/20 flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full bg-surface-container-low">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    
                    {/* Deal Badge */}
                    <div className="absolute top-3 left-3 bg-secondary text-on-secondary font-label text-label-sm font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Tag size={12} />
                      {product.dealTag || `${discountPct}% OFF`}
                    </div>

                    <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-on-surface font-label text-label-sm font-bold px-2.5 py-1 rounded-full border border-outline-variant/30">
                      ★ {product.rating}
                    </div>
                  </div>

                  <div className="p-md flex-grow flex flex-col justify-between space-y-md">
                    <div>
                      <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-display text-headline-sm text-on-surface line-clamp-1 mt-0.5">
                        {product.name}
                      </h3>
                      <p className="font-body text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-sm border-t border-outline-variant/20">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-headline-sm text-primary font-bold">
                            Rs. {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="font-body text-body-sm text-on-surface-variant line-through">
                              Rs. {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] text-on-surface-variant">{product.unit}</span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2.5 rounded-full font-label text-label-md flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95 ${
                          isAdded
                            ? "bg-primary text-on-primary"
                            : "bg-primary-container text-on-primary hover:bg-primary"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
