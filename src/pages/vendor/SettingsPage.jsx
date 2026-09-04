import { useState } from "react";
import { Store, MapPin, Clock, BadgeCheck, CheckCircle2 } from "lucide-react";

const INITIAL_FORM = {
  shopName: "Sharma General Store",
  shopType: "Kirana / Grocery",
  phone: "+91 98765 43210",
  description:
    "Your friendly neighborhood store for daily groceries, fresh dairy, and household essentials. Serving the community since 2015.",
  street: "Shop No. 4, Local Market, Sector 12",
  city: "Metro City",
  pincode: "1100XX",
};

const PHONE_RE = /^\+91\s?\d{5}\s?\d{5}$/;
const PINCODE_RE = /^\d{6}$/;

function validate(form) {
  const errors = {};

  if (!form.shopName.trim()) errors.shopName = "Shop name is required.";
  else if (form.shopName.trim().length < 3) errors.shopName = "Shop name must be at least 3 characters.";

  if (!PHONE_RE.test(form.phone.trim())) errors.phone = "Enter a valid phone, e.g. +91 98765 43210.";

  if (!form.description.trim()) errors.description = "Description is required.";
  else if (form.description.trim().length > 200) errors.description = "Keep the description under 200 characters.";

  if (!form.street.trim()) errors.street = "Street address is required.";

  if (!form.city.trim()) errors.city = "City is required.";

  if (!PINCODE_RE.test(form.pincode.trim())) errors.pincode = "Pincode must be exactly 6 digits.";

  return errors;
}

function Field({ label, error, children }) {
  return (
    <label className="block space-y-1">
      <span className="font-label text-label-md text-on-surface-variant">{label}</span>
      {children}
      {error && <span className="block font-body text-body-sm text-error">{error}</span>}
    </label>
  );
}

export default function SettingsPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 bg-surface-container-low border rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
      errors[field] ? "border-error focus:ring-error" : "border-outline-variant"
    }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSaved(Object.keys(nextErrors).length === 0);
  };

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSaved(false);
  };

  return (
    <form className="max-w-2xl space-y-lg" onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className="font-display text-headline-md text-on-surface mb-xs">Shop Settings</h1>
        <p className="font-body text-body-md text-on-surface-variant">Manage your store's public profile and operational details.</p>
      </div>

      <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-label text-label-md px-4 py-2 rounded-full">
        <BadgeCheck size={16} />
        Verified Vendor
      </span>

      {saved && (
        <div className="flex items-center gap-2 bg-primary/10 text-primary font-label text-label-md px-4 py-3 rounded-md">
          <CheckCircle2 size={18} />
          Changes saved successfully.
        </div>
      )}

      {/* Basic Information */}
      <section className="bg-surface-container-lowest rounded-md p-lg shadow-card space-y-md">
        <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2">
          <Store size={20} className="text-primary" />
          Basic Information
        </h2>

        <Field label="Shop Name" error={errors.shopName}>
          <input value={form.shopName} onChange={handleChange("shopName")} className={inputClass("shopName")} />
        </Field>

        <Field label="Shop Type">
          <select
            value={form.shopType}
            onChange={handleChange("shopType")}
            className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Kirana / Grocery</option>
            <option>Bakery</option>
            <option>Pharmacy</option>
          </select>
        </Field>

        <Field label="Contact Phone" error={errors.phone}>
          <input value={form.phone} onChange={handleChange("phone")} className={inputClass("phone")} />
        </Field>

        <Field label="Short Description" error={errors.description}>
          <textarea
            rows={3}
            value={form.description}
            onChange={handleChange("description")}
            className={`${inputClass("description")} resize-none`}
          />
        </Field>
      </section>

      {/* Location Details */}
      <section className="bg-surface-container-lowest rounded-md p-lg shadow-card space-y-md">
        <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2">
          <MapPin size={20} className="text-primary" />
          Location Details
        </h2>

        <Field label="Street Address" error={errors.street}>
          <input value={form.street} onChange={handleChange("street")} className={inputClass("street")} />
        </Field>

        <div className="grid grid-cols-2 gap-md">
          <Field label="City" error={errors.city}>
            <input value={form.city} onChange={handleChange("city")} className={inputClass("city")} />
          </Field>
          <Field label="Pincode" error={errors.pincode}>
            <input value={form.pincode} onChange={handleChange("pincode")} className={inputClass("pincode")} />
          </Field>
        </div>

        <div className="h-40 w-full bg-surface-container-high rounded-md flex items-center justify-center">
          <MapPin size={28} className="text-on-surface-variant" />
        </div>
      </section>

      {/* Hours */}
      <section className="bg-surface-container-lowest rounded-md p-lg shadow-card space-y-md">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Hours
          </h2>
          <button type="button" className="font-label text-label-md text-primary hover:underline">Edit</button>
        </div>
        <div className="flex justify-between font-body text-body-md">
          <span className="text-on-surface-variant">Mon - Sat</span>
          <span className="text-on-surface font-semibold">08:00 AM – 10:00 PM</span>
        </div>
        <div className="flex justify-between font-body text-body-md">
          <span className="text-on-surface-variant">Sunday</span>
          <span className="text-on-surface font-semibold">08:00 AM – 02:00 PM</span>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-md pb-xl">
        <button type="submit" className="flex-1 py-3 bg-primary text-on-primary font-label text-label-md rounded-full hover:bg-primary-container transition-colors shadow-sm">
          Save Changes
        </button>
        <button type="button" onClick={handleCancel} className="flex-1 py-3 border border-outline-variant text-on-surface font-label text-label-md rounded-full hover:bg-surface-container-high transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
