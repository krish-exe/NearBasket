import { Link } from "react-router-dom";
import { MapPinOff, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex-grow w-full flex items-center justify-center px-margin-mobile py-2xl">
      <div className="w-full max-w-md text-center space-y-lg">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <MapPinOff className="text-primary" size={32} />
        </div>
        <div className="space-y-xs">
          <h1 className="font-display text-display-lg-mobile text-on-surface">404</h1>
          <h2 className="font-display text-headline-sm text-on-surface">This page wandered off</h2>
          <p className="font-body text-body-md text-on-surface-variant">
            We couldn't find the page you're looking for. It may have been moved or the link might be broken.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-on-primary font-label text-label-md rounded-full hover:bg-primary-container transition-colors shadow-sm"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
