
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
      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 portfolio-grid opacity-60" />

        <div className="portfolio-container relative py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-blue-600">
              About me
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
              Developer focused on
              <span className="block text-blue-600">
                practical solutions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              I'm Mohmed Fatih Al-Mardani, a Computer Science graduate with an
              interest in building useful digital experiences across mobile
              and web platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
            {/* Main Profile */}
            <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-50 blur-3xl" />

              <div className="relative">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white shadow-sm">
                    MF
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                      Professional profile
                    </p>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                      Mohmed Fatih Al-Mardani
                    </h2>
                  </div>
                </div>

                <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
                  <p>
                    I am a Computer Science graduate from IUST with a focus on
                    Flutter and full-stack web technologies.
                  </p>

                  <p>
                    My interests span mobile application development,
                    frontend development, backend technologies, databases, and
                    the tools used throughout the software development
                    workflow.
                  </p>

                  <p>
                    I enjoy working on application ideas that combine clear
                    interfaces with practical functionality, while continuing
                    to strengthen my skills across both mobile and web
                    development.
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Primary focus
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      Flutter & Full-stack Web
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Education
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      BSc Computer Science
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">
                Profile
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight">
                Quick information
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Location</p>

                    <p className="mt-1 text-sm font-medium text-slate-200">
                      Madinah, Saudi Arabia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <GraduationCap className="h-4 w-4 text-blue-400" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Education</p>

                    <p className="mt-1 text-sm font-medium text-slate-200">
                      BSc Computer Science
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      IUST · 2024
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Profile</p>

                    <p className="mt-1 text-sm font-medium text-slate-200">
                      Open to developer opportunities
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-xs leading-5 text-slate-500">
                  Focused on continuous learning and building a strong
                  foundation across mobile and web development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-slate-200/80 bg-white">
        <div className="portfolio-container portfolio-section">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-600">
                Technical skills
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Tools I work with.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              A technology foundation covering mobile, frontend, backend,
              databases, and development tools.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.title}
                  className="portfolio-card portfolio-card-hover p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="font-bold tracking-tight text-slate-950">
                      {group.title}
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600"
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

      {/* Closing CTA */}
      <section className="bg-white pb-24">
        <div className="portfolio-container">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-6 py-10 sm:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Explore the portfolio
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                  See the projects in action.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Explore the different applications and interfaces included
                  in the portfolio.
                </p>
              </div>

              <a
                href="/projects"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                View projects
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
