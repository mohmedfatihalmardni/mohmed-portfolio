import { ArrowRight, Code2, Smartphone, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Computer Science Graduate • Developer
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Building practical digital solutions with{" "}
              <span className="text-blue-600">Flutter</span> and modern web
              technologies.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              I'm Mohmed Fatih Al-Mardani, a Computer Science graduate focused
              on Flutter and full-stack web technologies. This portfolio
              showcases interactive application concepts and frontend
              simulations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                About Me
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg">
              <div className="rounded-2xl bg-slate-900 p-6">
                <div className="mb-6 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <p className="text-slate-500">
                    <span className="text-blue-400">const</span>{" "}
                    developer =
                  </p>

                  <p className="pl-4 text-slate-300">
                    {"{"}
                  </p>

                  <p className="pl-8 text-slate-300">
                    name:{" "}
                    <span className="text-green-400">
                      "Mohmed Fatih Al-Mardani"
                    </span>
                    ,
                  </p>

                  <p className="pl-8 text-slate-300">
                    focus:{" "}
                    <span className="text-green-400">
                      "Flutter + Full Stack"
                    </span>
                    ,
                  </p>

                  <p className="pl-8 text-slate-300">
                    education:{" "}
                    <span className="text-green-400">"BSc Computer Science"</span>
                  </p>

                  <p className="pl-4 text-slate-300">
                    {"}"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills preview */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What I work with
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Technologies and development areas
            </h2>

            <p className="mt-4 text-slate-600">
              A practical technology stack focused on mobile development and
              modern web applications.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Smartphone className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Mobile Development
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Flutter and Dart for building modern cross-platform
                application concepts.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Code2 className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Web Development
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                HTML, CSS, JavaScript, React.js, Node.js, and Express.js for
                web application development.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Layers3 className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Data & Tools
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                MongoDB, MySQL, Git, GitHub, VS Code, and Postman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Explore the interactive projects
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Explore the portfolio projects and interact with frontend
            simulations built around real application concepts.
          </p>

          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;