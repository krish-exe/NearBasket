import { useState } from "react";
import { Search, ChevronDown, FileUp, Minus, Plus, ImageIcon, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import { inventoryItems } from "../../data/mockData";

export default function InventoryPage() {
  const [items, setItems] = useState(inventoryItems);

  const updateStock = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item))
    );
  };

  return (
    <div className="space-y-lg">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-lg">
        <div>
          <h1 className="font-display text-headline-md text-on-surface mb-xs">Inventory</h1>
          <p className="font-body text-body-md text-on-surface-variant">Manage your products, stock levels, and pricing.</p>
        </div>
        <div className="flex flex-wrap items-center gap-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input
              className="pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-md font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              placeholder="Search products, SKUs..."
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-md font-label text-label-md text-on-surface">
            All Categories
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-primary text-primary rounded-full font-label text-label-md hover:bg-primary/5 transition-colors">
            <FileUp size={16} />
            Bulk Import
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-md shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-outline-variant/20">
                <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Image</th>
                <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Product Name</th>
                <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">SKU</th>
                <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Category</th>
                <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Price</th>
                <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Stock Level</th>
                <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Status</th>
                <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={`border-b border-outline-variant/10 last:border-0 ${item.warning ? "bg-secondary-container/5" : ""}`}>
                  <td className="px-lg py-md">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-surface-container-high flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={20} className="text-on-surface-variant" />
                      )}
                    </div>
                  </td>
                  <td className="px-lg py-md">
                    <div className="flex items-center gap-1.5">
                      <p className="font-body text-body-md font-semibold text-on-surface">{item.name}</p>
                      {item.warning && <AlertTriangle size={14} className="text-error" />}
                    </div>
                    <p className="font-body text-body-sm text-on-surface-variant">{item.subtitle}</p>
                  </td>
                  <td className="px-lg py-md font-body text-body-sm text-on-surface-variant">{item.id}</td>
                  <td className="px-lg py-md font-body text-body-md text-on-surface">{item.category}</td>
                  <td className="px-lg py-md font-label text-label-md text-primary font-semibold">{item.price}</td>
                  <td className="px-lg py-md">
                    <div className={`flex items-center gap-2 border rounded-md px-2 py-1 w-fit ${item.warning ? "border-error/40" : "border-outline-variant"}`}>
                      <button onClick={() => updateStock(item.id, -1)} className="text-on-surface-variant hover:text-primary">
                        <Minus size={14} />
                      </button>
                      <span className={`font-label text-label-md w-6 text-center ${item.warning ? "text-error" : "text-on-surface"}`}>
                        {item.stock}
                      </span>
                      <button onClick={() => updateStock(item.id, 1)} className="text-on-surface-variant hover:text-primary">
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-lg py-md">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-lg py-md">
                    <button className="font-label text-label-md text-primary hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-lg py-md border-t border-outline-variant/20">
          <p className="font-body text-body-sm text-on-surface-variant">Showing 1–10 of 42 products</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container-high">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 flex items-center justify-center rounded-md font-label text-label-md ${
                  n === 1 ? "bg-primary text-on-primary" : "text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-on-surface-variant">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-md font-label text-label-md text-on-surface hover:bg-surface-container-high">
              5
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container-high">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
