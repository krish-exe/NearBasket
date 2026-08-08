import { NavLink, Outlet } from "react-router-dom";
import { LayoutGrid, Archive, ShoppingBag, Settings, Bell, HelpCircle, Plus, Store } from "lucide-react";

const NAV = [
  { to: "/vendor", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/vendor/inventory", label: "Inventory", icon: Archive },
  { to: "/vendor/orders", label: "Orders", icon: ShoppingBag },
  { to: "/vendor/settings", label: "Settings", icon: Settings },
];

export default function VendorLayout() {
  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside className="w-[300px] shrink-0 bg-surface-container-low border-r border-outline-variant/20 flex flex-col p-lg hidden md:flex">
        <div className="flex items-center gap-sm mb-2xl">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden shrink-0">
            <Store size={20} className="text-primary" />
          </div>
          <div>
            <p className="font-display text-headline-sm font-bold text-primary leading-tight">Vendor Hub</p>
            <p className="font-body text-body-sm text-on-surface-variant leading-tight">Manage your shop</p>
          </div>
        </div>

        <nav className="flex flex-col gap-xs flex-grow">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-md px-md py-3 rounded-md font-label text-label-md transition-colors ${
                  isActive
                    ? "bg-secondary-container text-on-secondary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-md pt-lg border-t border-outline-variant/20">
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-label text-label-md py-3 rounded-full hover:bg-primary-container transition-colors shadow-sm">
            <Plus size={18} />
            Add New Product
          </button>
          <button className="w-full flex items-center gap-2 text-on-surface-variant font-body text-body-sm hover:text-primary transition-colors">
            <HelpCircle size={18} />
            Help Center
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-grow flex flex-col min-w-0">
        <header className="h-16 border-b border-outline-variant/20 bg-surface flex items-center justify-between px-lg shrink-0">
          <h1 className="font-display text-headline-sm font-bold text-on-surface">Shop Manager</h1>
          <div className="flex items-center gap-md">
            <span className="flex items-center gap-1 font-label text-label-md text-primary">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              Online
            </span>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <Bell size={20} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <Settings size={20} />
            </button>
            <button className="px-4 py-1.5 border border-outline-variant rounded-full font-label text-label-md text-on-surface hover:bg-surface-container-high transition-colors">
              Profile
            </button>
          </div>
        </header>
        <main className="flex-grow p-lg md:p-xl overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
