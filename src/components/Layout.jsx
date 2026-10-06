import { ArrowUpRight } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-slate-200/80 bg-white">
        <div className="portfolio-container">
          <div className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white">
                  MF
                </div>

                <div>
                  <p className="text-sm font-bold tracking-tight text-slate-950">
                    Mohmed Fatih
                  </p>

                  <p className="text-xs text-slate-500">
                    Developer
                  </p>
                </div>
              </Link>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
                Computer Science graduate focused on Flutter and full-stack
                web technologies.
              </p>
            </div>

            <div>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-950"
              >
                View projects
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-100 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Mohmed Fatih Al-Mardani</p>

            <p>Madinah, Saudi Arabia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;