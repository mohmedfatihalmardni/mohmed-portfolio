import { useMemo, useState } from "react";
import { ArrowRight, Code2, Search } from "lucide-react";
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

  return (
    <div>
      {/* Header */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Portfolio
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            Projects & Interactive Demos
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Explore application concepts built around Flutter, web
            technologies, databases, APIs, and frontend simulations.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                No projects found
              </h2>

              <p className="mt-2 text-slate-500">
                Try another search term or category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Code2 className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-slate-900">
                    {project.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <div className="mb-4">
                      <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        {project.type}
                      </span>
                    </div>

                    <Link
                      to={project.route}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:text-blue-700"
                    >
                      Open project
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
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