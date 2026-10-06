
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Code2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory;

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        search === "" ||
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.technologies.some((technology) =>
          technology.toLowerCase().includes(search),
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 portfolio-grid opacity-60" />

        <div className="portfolio-container relative py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 shadow-sm">
              <Code2 className="h-3.5 w-3.5 text-blue-600" />
              Selected work
            </div>

            <h1 className="text-4xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
              Projects built around
              <span className="block text-blue-600">
                real application ideas.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Explore a collection of application projects covering
              productivity, finance, weather, food, habits, and event
              planning.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="portfolio-container py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <SlidersHorizontal className="mr-1 hidden h-4 w-4 shrink-0 text-slate-400 sm:block" />

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="portfolio-section pt-12 lg:pt-14">
        <div className="portfolio-container">
          {/* Results header */}
          <div className="mb-7 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredProjects.length}
              </span>{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </p>

            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Clear filter
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="portfolio-card p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Search className="h-5 w-5" />
              </div>

              <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
                No projects found
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Try a different search term or choose another category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-5 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className="group flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  {/* Card visual */}
                  <div className="relative flex h-36 items-center justify-center overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 portfolio-grid opacity-20" />

                    <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-blue-400 backdrop-blur-sm">
                      <Code2 className="h-6 w-6" />
                    </div>

                    <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-bold tracking-tight text-slate-950 transition group-hover:text-blue-600">
                      {project.title}
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <Link
                        to={project.route}
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-blue-600"
                      >
                        Explore project
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Projects;
