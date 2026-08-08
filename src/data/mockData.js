export const categories = [
  { id: "staples", name: "Staples", icon: "basket", bg: "bg-surface-container", fg: "text-primary" },
  { id: "snacks", name: "Snacks", icon: "cookie", bg: "bg-secondary-fixed", fg: "text-on-secondary-fixed" },
  { id: "dairy", name: "Dairy", icon: "droplet", bg: "bg-tertiary-fixed", fg: "text-on-tertiary-fixed" },
  { id: "household", name: "Household", icon: "spray", bg: "bg-surface-container", fg: "text-primary" },
  { id: "personal-care", name: "Personal Care", icon: "leaf", bg: "bg-secondary-fixed", fg: "text-on-secondary-fixed" },
  { id: "bakery", name: "Bakery", icon: "croissant", bg: "bg-tertiary-fixed", fg: "text-on-tertiary-fixed" },
];

export const stores = [
  {
    id: "sharma-general-store",
    name: "Sharma General Store",
    rating: 4.8,
    reviews: 210,
    distance: "450m away",
    delivery: "Delivery in 20 mins",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "fresh-mart-daily",
    name: "Fresh Mart Daily",
    rating: 4.6,
    reviews: 156,
    distance: "1.2km away",
    delivery: "Delivery in 35 mins",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "green-valley-organics",
    name: "Green Valley Organics",
    rating: 4.9,
    reviews: 340,
    distance: "800m away",
    delivery: "Delivery in 25 mins",
    status: "closing",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
  },
];

export const storeProducts = {
  "green-valley-organics": {
    name: "Green Valley Market",
    rating: 4.8,
    reviews: 340,
    distance: "1.2km away",
    status: "Open",
    banner:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    categories: ["All", "Fresh Fruits", "Vegetables", "Dairy & Eggs", "Bakery"],
    products: [
      {
        id: "apples",
        name: "Organic Red Apples",
        unit: "1 kg",
        price: 4.99,
        image:
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "kale",
        name: "Fresh Kale Bunch",
        unit: "1 bunch",
        price: 2.49,
        image:
          "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "sourdough",
        name: "Artisan Sourdough",
        unit: "1 loaf",
        price: 5.5,
        image:
          "https://images.unsplash.com/photo-1585478259715-4d3a5f5b8b9a?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
};

export const inventoryItems = [
  {
    id: "VEG-001",
    name: "Organic Asparagus",
    subtitle: "Local farm",
    category: "Produce",
    price: "Rs. 4.99",
    stock: 45,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1515471209610-2b0c229d3128?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "BAK-042",
    name: "Artisan Sourdough",
    subtitle: "Fresh baked daily",
    category: "Bakery",
    price: "Rs. 6.50",
    stock: 2,
    status: "Low Stock",
    warning: true,
    image:
      "https://images.unsplash.com/photo-1585478259715-4d3a5f5b8b9a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PAN-112",
    name: "Local Honey (16oz)",
    subtitle: "Wildflower blend",
    category: "Pantry",
    price: "Rs. 12.00",
    stock: 18,
    status: "Draft",
    image: null,
  },
];

export const recentOrders = [
  { id: "#NB-8492", customer: "Priya Patel", items: "4 items", total: "Rs. 34.50", status: "Pending" },
  { id: "#NB-8491", customer: "Aiden M.", items: "12 items", total: "Rs. 112.00", status: "Accepted" },
  { id: "#NB-8490", customer: "Sarah Jenkins", items: "2 items", total: "Rs. 18.25", status: "Accepted" },
  { id: "#NB-8489", customer: "David L.", items: "6 items", total: "Rs. 45.90", status: "Completed" },
];

export const popularProducts = [
  { name: "Organic Bananas (Bunch)", sold: 42, pct: 100 },
  { name: "Local Whole Milk (1 Gallon)", sold: 38, pct: 90 },
  { name: "Fresh Sourdough Bread", sold: 24, pct: 57 },
  { name: "Farm Free-Range Eggs (Dozen)", sold: 19, pct: 45 },
];
