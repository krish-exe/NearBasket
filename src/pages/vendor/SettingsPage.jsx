import { Store, MapPin, Clock, BadgeCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-lg">
      <div>
        <h1 className="font-display text-headline-md text-on-surface mb-xs">Shop Settings</h1>
        <p className="font-body text-body-md text-on-surface-variant">Manage your store's public profile and operational details.</p>
      </div>

      <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-label text-label-md px-4 py-2 rounded-full">
        <BadgeCheck size={16} />
        Verified Vendor
      </span>

      {/* Basic Information */}
      <section className="bg-surface-container-lowest rounded-md p-lg shadow-card space-y-md">
        <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2">
          <Store size={20} className="text-primary" />
          Basic Information
        </h2>

        <label className="block space-y-1">
          <span className="font-label text-label-md text-on-surface-variant">Shop Name</span>
          <input
            defaultValue="Sharma General Store"
            className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="block space-y-1">
          <span className="font-label text-label-md text-on-surface-variant">Shop Type</span>
          <select className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Kirana / Grocery</option>
            <option>Bakery</option>
            <option>Pharmacy</option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="font-label text-label-md text-on-surface-variant">Contact Phone</span>
          <input
            defaultValue="+91 98765 43210"
            className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label className="block space-y-1">
          <span className="font-label text-label-md text-on-surface-variant">Short Description</span>
          <textarea
            rows={3}
            defaultValue="Your friendly neighborhood store for daily groceries, fresh dairy, and household essentials. Serving the community since 2015."
            className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </label>
      </section>

      {/* Location Details */}
      <section className="bg-surface-container-lowest rounded-md p-lg shadow-card space-y-md">
        <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2">
          <MapPin size={20} className="text-primary" />
          Location Details
        </h2>

        <label className="block space-y-1">
          <span className="font-label text-label-md text-on-surface-variant">Street Address</span>
          <input
            defaultValue="Shop No. 4, Local Market, Sector 12"
            className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <div className="grid grid-cols-2 gap-md">
          <label className="block space-y-1">
            <span className="font-label text-label-md text-on-surface-variant">City</span>
            <input
              defaultValue="Metro City"
              className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <label className="block space-y-1">
            <span className="font-label text-label-md text-on-surface-variant">Pincode</span>
            <input
              defaultValue="1100XX"
              className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
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
          <button className="font-label text-label-md text-primary hover:underline">Edit</button>
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
        <button className="flex-1 py-3 bg-primary text-on-primary font-label text-label-md rounded-full hover:bg-primary-container transition-colors shadow-sm">
          Save Changes
        </button>
        <button className="flex-1 py-3 border border-outline-variant text-on-surface font-label text-label-md rounded-full hover:bg-surface-container-high transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}
