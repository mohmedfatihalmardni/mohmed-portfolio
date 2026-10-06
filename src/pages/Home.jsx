import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Flutter and Dart for building polished cross-platform application experiences.",
  },
  {
    icon: Code2,
    title: "Web Development",
    description:
      "JavaScript, React.js, Node.js, and Express.js for modern web applications.",
  },
  {
    icon: Layers3,
    title: "Data & Tools",
    description:
      "MongoDB, MySQL, Git, GitHub, VS Code, and Postman across the development workflow.",
  },
];

const technologies = [
  "Flutter",
  "Dart",
  "React.js",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 portfolio-grid opacity-70" />

        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="portfolio-container relative">
          <div className="grid min-h-[calc(100vh-72px)] items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            {/* Hero Content */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                Computer Science Graduate
              </div>

              <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[1.05]">
                Building thoughtful
                <span className="block text-blue-600">
                  digital experiences.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                I'm Mohmed Fatih Al-Mardani, a Computer Science graduate
                focused on Flutter and full-stack web technologies. I enjoy
                turning ideas into clear, practical, and interactive
                applications.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/projects"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-blue-600 hover:shadow-lg"
                >
                  <span className="!text-white">Explore projects</span>

                  <ArrowRight className="h-4 w-4 !text-white transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                >
                  About me
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Technology Strip */}
              <div className="mt-12 border-t border-slate-200/80 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Core technologies
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative lg:pl-6">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/40 blur-2xl" />

                <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                  {/* Browser header */}
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    </div>

                    <div className="rounded-md border border-slate-200 bg-white px-3 py-1 text-[10px] font-medium text-slate-400">
                      portfolio.dev
                    </div>

                    <div className="w-10" />
                  </div>

                  {/* Dashboard */}
                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Developer profile
                        </p>

                        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
                          Mohmed Fatih
                        </h2>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">
                        MF
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs text-slate-400">Education</p>

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          BSc Computer Science
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs text-slate-400">Focus</p>

                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          Flutter + Web
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">
                          Development stack
                        </p>

                        <Code2 className="h-4 w-4 text-blue-600" />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {["React", "Flutter", "Node.js", "MongoDB"].map(
                          (technology) => (
                            <span
                              key={technology}
                              className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                            >
                              {technology}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-950 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-white">
                          Building with purpose
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                          Clean interfaces. Practical solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-600">
                Capabilities
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                A practical approach to development.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              A focused set of technologies and development areas used to
              create modern application experiences.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <div
                  key={capability.title}
                  className="portfolio-card portfolio-card-hover p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-950">
                    {capability.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project CTA */}
      <section className="pb-24">
        <div className="portfolio-container">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 px-6 py-14 text-center shadow-xl shadow-slate-900/10 sm:px-10">
            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-medium text-blue-400">
                Selected work
              </p>

              <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Explore the projects I've built.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Browse the portfolio to explore different application
                concepts, interfaces, and development approaches.
              </p>

              <Link
                to="/projects"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-blue-50"
              >
                View projects

                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;