const money = (value) => `Rs. ${(Number(value) || 0).toFixed(2)}`;

export default function OrderSummary({ order }) {
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <section aria-label="Your order" className="space-y-sm">
      <h3 className="font-label text-label-sm text-on-surface-variant uppercase tracking-wide">Your order</h3>
      <ul className="space-y-1.5 font-body text-body-sm text-on-surface">
        {items.map((item, idx) => (
          <li key={`${item.product?.id ?? idx}-${idx}`} className="flex justify-between gap-md">
            <span className="min-w-0">
              {item.qty} × {item.product?.name}
              {item.product?.unit && <span className="text-on-surface-variant"> ({item.product.unit})</span>}
            </span>
            <span className="shrink-0">{money((item.product?.price ?? 0) * item.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="pt-sm border-t border-outline-variant/30 space-y-1 font-body text-body-sm">
        <div className="flex justify-between text-on-surface-variant">
          <dt>Subtotal</dt>
          <dd>{money(order.subtotal)}</dd>
        </div>
        <div className="flex justify-between text-on-surface-variant">
          <dt>Delivery</dt>
          <dd>{money(order.deliveryFee)}</dd>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-tertiary font-semibold">
            <dt>Discount{order.offerCode ? ` (${order.offerCode})` : ""}</dt>
            <dd>- {money(order.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between pt-1 font-display text-body-md font-bold text-on-surface">
          <dt>Total</dt>
          <dd className="text-primary">{money(order.total)}</dd>
        </div>
      </dl>
    </section>
  );
}
