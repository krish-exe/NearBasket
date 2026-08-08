import { Search, Camera, Mic, ShoppingBasket, Cookie, Droplet, SprayCan, Leaf, Croissant } from "lucide-react";
import StoreCard from "../components/StoreCard";
import { categories, stores } from "../data/mockData";

const ICONS = {
  basket: ShoppingBasket,
  cookie: Cookie,
  droplet: Droplet,
  spray: SprayCan,
  leaf: Leaf,
  croissant: Croissant,
};

export default function HomePage() {
  return (
    <main className="flex-grow w-full max-w-content mx-auto px-margin-mobile md:px-margin-desktop py-xl space-y-2xl">
      {/* Hero */}
      <section className="relative rounded-lg overflow-hidden bg-surface-container-low min-h-[400px] flex items-center shadow-card">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full opacity-40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1600&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="relative z-10 p-xl md:p-2xl max-w-2xl">
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface mb-sm">
            Your neighborhood market, online.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant mb-xl">
            Fresh groceries, daily staples, and local favorites delivered from stores right around the corner.
            Support local, shop fresh.
          </p>

          <div className="md:hidden w-full relative mb-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded-full shadow-sm font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search products or stores..."
              type="text"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
                <Camera size={18} />
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
                <Mic size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-md">
            <button className="px-8 py-3 bg-primary-container text-on-primary font-label text-label-md rounded-full hover:bg-primary transition-colors shadow-sm">
              Find Stores Nearby
            </button>
            <button className="px-8 py-3 bg-surface text-primary border border-primary font-label text-label-md rounded-full hover:bg-surface-container-low transition-colors">
              Browse Deals
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-lg">
        <h2 className="font-display text-headline-md text-on-surface">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-md">
          {categories.map((cat) => {
            const Icon = ICONS[cat.icon];
            return (
              <a
                key={cat.id}
                href="#"
                className="bg-surface-container-lowest border border-outline-variant/30 rounded-md p-md flex flex-col items-center justify-center gap-sm aspect-square card-hover-lift shadow-card-sm"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.bg} ${cat.fg}`}>
                  <Icon size={26} />
                </div>
                <span className="font-label text-label-md text-on-surface text-center">{cat.name}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Top Stores */}
      <section className="space-y-lg">
        <div className="flex justify-between items-end">
          <h2 className="font-display text-headline-md text-on-surface">Top Stores Near You</h2>
          <a className="font-label text-label-md text-primary hover:underline" href="#">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>
    </main>
  );
}
