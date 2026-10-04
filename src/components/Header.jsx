import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { MapPin, ChevronDown, Search, Camera, Mic, MicOff, CircleUserRound, ShoppingCart, LocateFixed, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useVoiceSearch } from "../hooks/useVoiceSearch";

export default function Header() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  // Keep the box in sync if the URL's search param changes elsewhere (e.g. cleared on nav)
  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const runSearch = (text) => {
    const trimmed = text.trim();
    if (location.pathname !== "/") navigate("/");
    const params = new URLSearchParams(trimmed ? { search: trimmed } : {});
    navigate({ pathname: "/", search: params.toString() });
  };

  const { isListening, isSupported, error, startListening, stopListening } = useVoiceSearch({
    onResult: (transcript) => {
      setQuery(transcript);
      runSearch(transcript);
    },
  });

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

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
          <form onSubmit={handleSubmit} className="relative flex items-center w-full">
            <Search className="absolute left-4 text-on-surface-variant" size={18} />
            <input
              className="w-full pl-12 pr-20 py-2.5 bg-surface-container-low border border-outline-variant rounded-full font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-on-surface-variant"
              placeholder={isListening ? "Listening..." : "Search for groceries"}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute right-4 flex items-center gap-3">
              <button type="button" className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center">
                <Camera size={18} />
              </button>
              <button
                type="button"
                onClick={handleMicClick}
                aria-label={isListening ? "Stop voice search" : "Search by voice"}
                title={!isSupported ? "Voice search isn't supported in this browser" : undefined}
                disabled={!isSupported}
                className={`flex items-center cursor-pointer active:scale-95 transition-colors ${
                  isListening
                    ? "text-error animate-pulse"
                    : "text-on-surface-variant hover:text-primary"
                } ${!isSupported ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>
          </form>
          {error && error !== "aborted" && (
            <p className="absolute mt-1 text-[11px] text-error font-body">
              {error === "not-allowed"
                ? "Microphone access denied. Please allow mic permissions."
                : "Couldn't hear that, try again."}
            </p>
          )}
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
            {isLoggedIn ? (
              <div
                className="relative"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95">
                  <CircleUserRound size={22} className="text-primary" />
                  <span className="hidden lg:inline font-label text-label-md text-on-surface max-w-[120px] truncate">
                    {user?.name || user?.email}
                  </span>
                </button>
                {accountOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-lift border border-outline-variant/30 overflow-hidden z-50">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-md p-md hover:bg-surface-container-low transition-colors text-left"
                    >
                      <LogOut className="text-on-surface-variant" size={18} />
                      <span className="font-label text-label-md text-on-surface">Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95"
              >
                <CircleUserRound size={22} />
              </Link>
            )}
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