import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="portfolio-container">
        <nav className="flex h-16 items-center justify-between">
          <NavLink
            to="/"
            className="text-lg font-bold text-slate-950"
          >
            Mohmed Fatih
          </NavLink>

          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-950"
            >
              Home
            </NavLink>

            <NavLink
              to="/projects"
              className="text-sm font-medium text-slate-600 hover:text-slate-950"
            >
              Projects
            </NavLink>

            <NavLink
              to="/about"
              className="text-sm font-medium text-slate-600 hover:text-slate-950"
            >
              About
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;