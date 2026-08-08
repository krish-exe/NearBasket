import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin, ChevronDown, Search, Camera, Mic, CircleUserRound, ShoppingCart, LocateFixed } from "lucide-react";

export default function Header() {
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <header className="bg-surface shadow-sm w-full h-16 sticky top-0 z-50">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-content mx-auto h-full gap-md">
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-lg h-full shrink-0">
          <Link to="/" className="font-display text-headline-md font-bold text-primary hover:opacity-80 transition-opacity">
            NearBasket
          </Link>
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setLocationOpen(true)}
            onMouseLeave={() => setLocationOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95">
              <MapPin className="text-primary" size={20} />
              <span className="font-label text-label-md text-on-surface max-w-[200px] line-clamp-1">
                Home - Near Indiranagar...
              </span>
              <ChevronDown className="text-on-surface-variant" size={18} />
            </button>
            {locationOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-lift border border-outline-variant/30 overflow-hidden z-50">
                <div className="p-md space-y-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                    <input
                      type="text"
                      placeholder="Search for area..."
                      className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button className="w-full flex items-center gap-md p-sm hover:bg-surface-container-low rounded-lg transition-colors text-left">
                    <LocateFixed className="text-primary" size={20} />
                    <div>
                      <p className="font-label text-label-md text-primary">Current Location</p>
                      <p className="text-[12px] text-on-surface-variant">Using GPS</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-grow max-w-2xl hidden md:block">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 text-on-surface-variant" size={18} />
            <input
              className="w-full pl-12 pr-20 py-2.5 bg-surface-container-low border border-outline-variant rounded-full font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-on-surface-variant"
              placeholder="Search for groceries"
              type="text"
            />
            <div className="absolute right-4 flex items-center gap-3">
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center">
                <Camera size={18} />
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center">
                <Mic size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Nav & Actions */}
        <div className="flex items-center gap-lg shrink-0">
          <nav className="hidden md:flex items-center gap-lg h-full">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-body text-body-md font-bold py-1 transition-all ${
                  isActive ? "text-primary border-b-2 border-primary" : "text-on-surface-variant font-medium hover:text-primary"
                }`
              }
              end
            >
              Stores
            </NavLink>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors font-body text-body-md" href="#">
              Deals
            </a>
            <a className="text-on-surface-variant font-medium hover:text-primary transition-colors font-body text-body-md" href="#">
              Orders
            </a>
          </nav>
          <div className="flex items-center gap-md border-l border-outline-variant/20 pl-lg">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95">
              <CircleUserRound size={22} />
            </button>
            <button className="px-6 py-2 bg-primary-container text-on-primary font-label text-label-md rounded-full hover:bg-primary transition-colors flex items-center gap-2 cursor-pointer active:scale-95 shadow-sm">
              <ShoppingCart size={18} />
              Cart
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
