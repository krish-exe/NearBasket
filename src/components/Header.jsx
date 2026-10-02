import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MapPin, ChevronDown, Search, Camera, Mic, CircleUserRound, ShoppingCart, LocateFixed, LogOut, Tag, Package, Sparkles, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { products as mockProducts } from "../data/mockData";

export default function Header() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Home - Near Indiranagar, Bengaluru");
  const [locationSearch, setLocationSearch] = useState("");
  const [isListening, setIsListening] = useState(false);

  const { user, isLoggedIn, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const fileInputRef = useRef(null);

  // Search autocomplete results
  const searchResults = searchQuery.trim()
    ? mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (product) => {
    setSearchQuery("");
    setIsSearchFocused(false);
    navigate(`/store/${product.storeId}?product=${product.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/deals?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      if (isListening) {
        setIsListening(false);
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsSearchFocused(true);
        setIsListening(false);
        navigate(`/deals?search=${encodeURIComponent(transcript.trim())}`);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      const sampleQuery = "Organic Apples";
      setSearchQuery(sampleQuery);
      setIsSearchFocused(true);
      navigate(`/deals?search=${encodeURIComponent(sampleQuery)}`);
    }
  };

  const handleCameraSearch = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sampleQuery = "Fresh Fruits";
      setSearchQuery(sampleQuery);
      setIsSearchFocused(true);
      navigate(`/deals?search=${encodeURIComponent(sampleQuery)}`);
    }
  };

  return (
    <header className="bg-surface shadow-sm w-full h-16 sticky top-0 z-40">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-content mx-auto h-full gap-md">
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-lg h-full shrink-0">
          <Link to="/" className="font-display text-headline-md font-bold text-primary hover:opacity-80 transition-opacity">
            NearBasket
          </Link>

          {/* Location Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95 border border-transparent hover:border-outline-variant/40"
            >
              <MapPin className="text-primary" size={18} />
              <span className="font-label text-label-md text-on-surface max-w-[190px] truncate">
                {currentLocation}
              </span>
              <ChevronDown className="text-on-surface-variant" size={16} />
            </button>

            {locationOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-lift border border-outline-variant/30 overflow-hidden z-50 p-md space-y-md">
                <div className="flex justify-between items-center pb-xs border-b border-outline-variant/30">
                  <h4 className="font-label text-label-md font-bold text-on-surface">Select Delivery Location</h4>
                  <button onClick={() => setLocationOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                    <X size={16} />
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                  <input
                    type="text"
                    placeholder="Enter locality or pincode..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={() => {
                    if (locationSearch.trim()) {
                      setCurrentLocation(locationSearch.trim());
                    } else {
                      setCurrentLocation("Indiranagar 100ft Rd, Bengaluru");
                    }
                    setLocationOpen(false);
                    setLocationSearch("");
                  }}
                  className="w-full flex items-center gap-md p-sm hover:bg-surface-container-low rounded-lg transition-colors text-left cursor-pointer"
                >
                  <LocateFixed className="text-primary shrink-0" size={18} />
                  <div>
                    <p className="font-label text-label-md text-primary font-bold">Use Current Location</p>
                    <p className="text-[12px] text-on-surface-variant">Using GPS for local store matching</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Bar with Autocomplete & Camera/Mic */}
        <div className="flex-1 min-w-[260px] max-w-xl hidden md:block relative mx-sm" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <Search className="absolute left-4 text-on-surface-variant pointer-events-none shrink-0" size={18} />
            <input
              className="w-full pl-12 pr-24 py-2.5 bg-surface-container-low border border-outline-variant rounded-full font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-on-surface-variant"
              placeholder="Search groceries, fruits, milk, bakery..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
            />
            <div className="absolute right-3.5 flex items-center gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}

              <button
                type="button"
                onClick={handleCameraSearch}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95 flex items-center p-1"
                title="Search by image/photo"
              >
                <Camera size={18} />
              </button>

              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`transition-colors cursor-pointer active:scale-95 flex items-center p-1 rounded-full ${
                  isListening ? "text-error animate-pulse bg-error/10" : "text-on-surface-variant hover:text-primary"
                }`}
                title={isListening ? "Listening... click to stop" : "Voice search"}
              >
                <Mic size={18} />
              </button>
            </div>
          </form>

          {/* Autocomplete Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 w-full min-w-[320px] sm:min-w-[400px] mt-2 bg-surface-container-lowest rounded-xl shadow-lift border border-outline-variant/30 overflow-hidden z-50 divide-y divide-outline-variant/20 shadow-2xl">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="w-full flex items-center gap-md p-md hover:bg-surface-container-low transition-colors text-left cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover border border-outline-variant/30 shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <p className="font-body text-body-md font-semibold text-on-surface truncate">{product.name}</p>
                      <p className="font-body text-body-sm text-on-surface-variant">{product.category} • {product.unit}</p>
                    </div>
                    <span className="font-label text-label-md font-bold text-primary shrink-0">Rs. {product.price}</span>
                  </button>
                ))
              ) : (
                <div className="p-md text-center text-on-surface-variant text-body-sm">
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Nav & Actions */}
        <div className="flex items-center gap-lg shrink-0">
          <nav className="hidden md:flex items-center gap-md h-full">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-body text-body-md py-1 transition-all border-b-2 ${
                  isActive
                    ? "text-primary border-primary font-bold"
                    : "text-on-surface-variant border-transparent font-medium hover:text-primary"
                }`
              }
              end
            >
              Stores
            </NavLink>
            <NavLink
              to="/deals"
              className={({ isActive }) =>
                `font-body text-body-md py-1 transition-all border-b-2 flex items-center gap-1 ${
                  isActive
                    ? "text-primary border-primary font-bold"
                    : "text-on-surface-variant border-transparent font-medium hover:text-primary"
                }`
              }
            >
              <Sparkles size={16} className="text-secondary" />
              Deals
            </NavLink>
            <NavLink
              to="/offers"
              className={({ isActive }) =>
                `font-body text-body-md py-1 transition-all border-b-2 flex items-center gap-1 ${
                  isActive
                    ? "text-primary border-primary font-bold"
                    : "text-on-surface-variant border-transparent font-medium hover:text-primary"
                }`
              }
            >
              <Tag size={16} className="text-tertiary" />
              Offers
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `font-body text-body-md py-1 transition-all border-b-2 flex items-center gap-1 ${
                  isActive
                    ? "text-primary border-primary font-bold"
                    : "text-on-surface-variant border-transparent font-medium hover:text-primary"
                }`
              }
            >
              <Package size={16} />
              Orders
            </NavLink>
          </nav>

          <div className="flex items-center gap-md border-l border-outline-variant/20 pl-md">
            {/* User Account Menu */}
            {isLoggedIn ? (
              <div
                className="relative"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95">
                  <CircleUserRound size={22} className="text-primary" />
                  <span className="hidden lg:inline font-label text-label-md font-semibold text-on-surface max-w-[120px] truncate">
                    {user?.name || user?.email?.split("@")[0]}
                  </span>
                </button>
                {accountOpen && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-surface-container-lowest rounded-xl shadow-lift border border-outline-variant/30 overflow-hidden z-50 py-xs">
                    <div className="px-md py-sm border-b border-outline-variant/20">
                      <p className="font-label text-label-md font-bold text-on-surface truncate">{user?.name || "Customer"}</p>
                      <p className="text-[12px] text-on-surface-variant truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setAccountOpen(false)}
                      className="w-full flex items-center gap-md px-md py-2.5 hover:bg-surface-container-low transition-colors text-left"
                    >
                      <Package className="text-on-surface-variant" size={18} />
                      <span className="font-label text-label-md text-on-surface">My Orders</span>
                    </Link>
                    <Link
                      to="/offers"
                      onClick={() => setAccountOpen(false)}
                      className="w-full flex items-center gap-md px-md py-2.5 hover:bg-surface-container-low transition-colors text-left"
                    >
                      <Tag className="text-on-surface-variant" size={18} />
                      <span className="font-label text-label-md text-on-surface">My Coupons</span>
                    </Link>
                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-md px-md py-2.5 hover:bg-surface-container-low transition-colors text-left border-t border-outline-variant/20 text-error"
                    >
                      <LogOut size={18} />
                      <span className="font-label text-label-md font-bold">Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer active:scale-95"
                title="Log In"
              >
                <CircleUserRound size={22} className="text-primary" />
                <span className="hidden sm:inline font-label text-label-md font-semibold">Log In</span>
              </Link>
            )}

            {/* Cart Button with Live Badge Count */}
            <button
              onClick={openCart}
              className="relative px-5 py-2 bg-primary text-on-primary font-label text-label-md rounded-full hover:bg-primary-container transition-colors flex items-center gap-2 cursor-pointer active:scale-95 shadow-sm"
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-secondary text-on-secondary text-xs font-bold rounded-full animate-in zoom-in-50">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
