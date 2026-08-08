const STYLES = {
  Pending: "bg-secondary-container/10 text-secondary",
  Accepted: "bg-[#1976D2]/10 text-[#1976D2]",
  Ready: "bg-tertiary/10 text-tertiary",
  Completed: "bg-primary/10 text-primary",
  Cancelled: "bg-error/10 text-error",
  Active: "bg-primary/10 text-primary",
  "Low Stock": "bg-secondary-container/10 text-secondary",
  Draft: "bg-surface-container-high text-on-surface-variant",
};

export default function StatusBadge({ status, className = "" }) {
  const style = STYLES[status] || "bg-surface-container text-on-surface-variant";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap ${style} ${className}`}
    >
      {status}
    </span>
  );
}
