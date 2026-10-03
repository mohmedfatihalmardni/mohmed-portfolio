import {
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Mail,
  MapPin,
  Smartphone,
  Wrench,
} from "lucide-react";

const skillGroups = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["Flutter", "Dart"],
  },
  {
    title: "Frontend",
    icon: Code2,
    skills: ["HTML5", "CSS3", "JavaScript", "React.js"],
  },
  {
    title: "Backend",
    icon: BriefcaseBusiness,
    skills: ["Node.js", "Express.js"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  },
];

function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            About
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            About Me
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            A Computer Science graduate focused on building practical digital
            solutions through mobile and web technologies.
          </p>
        </div>
      </section>

      {/* Profile */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-3 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Professional Profile
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
              <p>
                I am Mohmed Fatih Al-Mardani, a Computer Science graduate from
                IUST, with a focus on Flutter and full-stack web technologies.
              </p>

              <p>
                My technical interests include mobile application development,
                frontend development, backend technologies, databases, and
                developer tools.
              </p>

              <p>
                This portfolio demonstrates application concepts through
                interactive frontend simulations using local state, sample
                data, and browser storage where appropriate.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Quick Info</h2>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    Madinah, Saudi Arabia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Education
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    BSc Computer Science
                  </p>

                  <p className="text-sm text-slate-500">IUST • 2024</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Contact
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Add your professional contact link when ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Skills
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Technical Skills
            </h2>

            <p className="mt-4 text-slate-600">
              Technologies and tools included in the current professional
              profile.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="font-bold text-slate-900">
                      {group.title}
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;