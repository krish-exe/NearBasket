# NearBasket

A React + Vite + Tailwind implementation of the NearBasket / Vendor Hub design system, built from `DESIGN.md` and the provided mockups.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Pages

Customer-facing (NearBasket):
- `/` — Home page: hero, category grid, top stores near you
- `/store/:storeId` — Store page with product grid and live cart (try `/store/green-valley-organics`)

Vendor-facing (Vendor Hub):
- `/vendor` — Dashboard: stat cards, recent orders, popular products
- `/vendor/inventory` — Inventory table with editable stock counts
- `/vendor/orders` — Orders list
- `/vendor/settings` — Shop settings form

## Design system

All colors, typography, spacing, radii and shadows in `tailwind.config.js` are taken directly from `DESIGN.md`'s token list, so every component references the same palette (`primary`, `surface-container`, etc.) instead of hard-coded hex values. Fonts are Plus Jakarta Sans (display/body) and Inter (labels), loaded via Google Fonts in `index.html`.

Icons use `lucide-react` in place of the Material Symbols font referenced in the original mockups, matched one-for-one by meaning (e.g. `location_on` → `MapPin`, `shopping_basket` → `ShoppingBasket`).

## Structure

```
src/
  components/    Header, Footer, StoreCard, StatusBadge, VendorLayout
  pages/         HomePage, StorePage
  pages/vendor/  DashboardPage, InventoryPage, OrdersPage, SettingsPage
  data/          mockData.js — sample stores, products, orders, inventory
```
