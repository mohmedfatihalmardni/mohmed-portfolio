import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="text-7xl font-bold text-blue-600">404</p>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-slate-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;