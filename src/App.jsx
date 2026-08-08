import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import VendorLayout from "./components/VendorLayout";
import DashboardPage from "./pages/vendor/DashboardPage";
import InventoryPage from "./pages/vendor/InventoryPage";
import OrdersPage from "./pages/vendor/OrdersPage";
import SettingsPage from "./pages/vendor/SettingsPage";

function CustomerShell({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerShell><HomePage /></CustomerShell>} />
      <Route path="/store/:storeId" element={<CustomerShell><StorePage /></CustomerShell>} />

      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
