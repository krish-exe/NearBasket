import StatusBadge from "../../components/StatusBadge";
import { recentOrders } from "../../data/mockData";

export default function OrdersPage() {
  return (
    <div className="space-y-lg">
      <div>
        <h1 className="font-display text-headline-md text-on-surface mb-xs">Orders</h1>
        <p className="font-body text-body-md text-on-surface-variant">Track and manage incoming orders from your customers.</p>
      </div>

      <div className="bg-surface-container-low rounded-md shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-outline-variant/20">
              <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Order ID</th>
              <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Customer Name</th>
              <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Items</th>
              <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Total</th>
              <th className="font-label text-label-sm text-on-surface-variant px-lg py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-outline-variant/10 last:border-0">
                <td className="px-lg py-md font-label text-label-md text-primary">{order.id}</td>
                <td className="px-lg py-md font-body text-body-md text-on-surface">{order.customer}</td>
                <td className="px-lg py-md font-body text-body-md text-on-surface-variant">{order.items}</td>
                <td className="px-lg py-md font-body text-body-md text-on-surface">{order.total}</td>
                <td className="px-lg py-md">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
