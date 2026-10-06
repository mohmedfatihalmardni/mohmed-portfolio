import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Flame,
  Plus,
  Target,
  Trash2,
  Trophy,
  X,
} from "lucide-react";

const STORAGE_KEY = "habittracker_habits";

const categories = [
  "Health",
  "Fitness",
  "Learning",
  "Productivity",
  "Mindfulness",
  "Other",
];

const initialHabits = [
  {
    id: 1,
    name: "Drink 2L of water",
    category: "Health",
    target: 7,
    completedDates: [],
  },
  {
    id: 2,
    name: "Read for 30 minutes",
    category: "Learning",
    target: 5,
    completedDates: [],
  },
  {
    id: 3,
    name: "Exercise",
    category: "Fitness",
    target: 5,
    completedDates: [],
  },
];

function getDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function HabitTracker() {
  const today = useMemo(() => new Date(), []);
  const todayKey = getDateKey(today);

  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return initialHabits;
      }

      const parsed = JSON.parse(saved);

      return parsed.map((habit) => ({
        ...habit,
        completedDates: Array.isArray(habit.completedDates)
          ? habit.completedDates
          : [],
      }));
    } catch {
      return initialHabits;
    }
  });

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "Health",
    target: "7",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const completedToday = habits.filter((habit) =>
    habit.completedDates.includes(todayKey),
  ).length;

  const todayProgress =
    habits.length > 0
      ? Math.round((completedToday / habits.length) * 100)
      : 0;

  const totalCompletions = habits.reduce(
    (total, habit) => total + habit.completedDates.length,
    0,
  );

  const bestStreak = Math.max(
    0,
    ...habits.map((habit) => calculateCurrentStreak(habit.completedDates)),
  );

  const monthStats = useMemo(() => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const days = getDaysInMonth(year, month);

    let possible = habits.length * days;
    let completed = 0;

    habits.forEach((habit) => {
      habit.completedDates.forEach((date) => {
        const current = new Date(`${date}T00:00:00`);

        if (
          current.getFullYear() === year &&
          current.getMonth() === month
        ) {
          completed += 1;
        }
      });
    });

    return {
      days,
      completed,
      possible,
      percentage:
        possible > 0 ? Math.round((completed / possible) * 100) : 0,
    };
  }, [habits, today]);

  function toggleToday(habitId) {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== habitId) {
          return habit;
        }

        const completed = habit.completedDates.includes(todayKey);

        return {
          ...habit,
          completedDates: completed
            ? habit.completedDates.filter((date) => date !== todayKey)
            : [...habit.completedDates, todayKey],
        };
      }),
    );
  }

  function deleteHabit(id) {
    setHabits((current) =>
      current.filter((habit) => habit.id !== id),
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      target: Number(form.target),
      completedDates: [],
    };

    setHabits((current) => [...current, newHabit]);

    setForm({
      name: "",
      category: "Health",
      target: "7",
    });

    setShowForm(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-sm text-violet-300">
            <Target size={15} />
            
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
                HabitTracker Go
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Build habits. Build momentum.
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Track your daily habits, maintain streaks, and see your
                progress over time.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-semibold text-white transition hover:bg-violet-400"
            >
              <Plus size={19} />
              Add Habit
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Check size={20} />}
            title="Today"
            value={`${completedToday}/${habits.length}`}
            description={`${todayProgress}% completed`}
          />

          <StatCard
            icon={<Flame size={20} />}
            title="Best Current Streak"
            value={`${bestStreak} days`}
            description="Across your habits"
          />

          <StatCard
            icon={<Trophy size={20} />}
            title="Total Completions"
            value={totalCompletions}
            description="All-time check-ins"
          />

          <StatCard
            icon={<Target size={20} />}
            title="Monthly Progress"
            value={`${monthStats.percentage}%`}
            description={`${monthStats.completed} completed`}
          />
        </section>

        {/* Today's progress */}
        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Today&apos;s Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {completedToday === habits.length && habits.length > 0
                  ? "Amazing! All habits completed today."
                  : "Complete your habits to keep your momentum going."}
              </p>
            </div>

            <span className="text-2xl font-bold text-violet-400">
              {todayProgress}%
            </span>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-500"
              style={{ width: `${todayProgress}%` }}
            />
          </div>
        </section>

        {/* Habit list */}
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">My Habits</h2>
            <p className="mt-1 text-sm text-slate-500">
              Complete each habit once per day.
            </p>
          </div>

          {habits.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
              <Target
                size={40}
                className="mx-auto mb-4 text-slate-600"
              />

              <h3 className="text-lg font-semibold">
                No habits yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Add your first habit to start tracking.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-5 rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold"
              >
                Add Habit
              </button>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {habits.map((habit) => {
                const completed = habit.completedDates.includes(
                  todayKey,
                );

                const streak = calculateCurrentStreak(
                  habit.completedDates,
                );

                const monthCompleted =
                  getCurrentMonthCompletions(
                    habit.completedDates,
                  );

                return (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    completed={completed}
                    streak={streak}
                    monthCompleted={monthCompleted}
                    onToggle={() => toggleToday(habit.id)}
                    onDelete={() => deleteHabit(habit.id)}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* Monthly grid */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
          <div>
            <h2 className="text-xl font-semibold">
              Monthly Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your habit activity for{" "}
              {today.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
              .
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[650px]">
              <div className="mb-2 grid grid-cols-[180px_repeat(31,minmax(18px,1fr))] gap-1">
                <div />

                {Array.from(
                  { length: monthStats.days },
                  (_, index) => (
                    <div
                      key={index}
                      className="text-center text-[10px] text-slate-600"
                    >
                      {index + 1}
                    </div>
                  ),
                )}
              </div>

              <div className="space-y-2">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="grid grid-cols-[180px_repeat(31,minmax(18px,1fr))] items-center gap-1"
                  >
                    <div className="truncate pr-3 text-sm text-slate-400">
                      {habit.name}
                    </div>

                    {Array.from(
                      { length: monthStats.days },
                      (_, index) => {
                        const date = new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          index + 1,
                        );

                        const key = getDateKey(date);
                        const active =
                          habit.completedDates.includes(key);
                        const isToday = key === todayKey;

                        return (
                          <div
                            key={key}
                            title={`${habit.name} — ${key}`}
                            className={`aspect-square rounded-[4px] ${
                              active
                                ? "bg-violet-500"
                                : isToday
                                  ? "bg-slate-600 ring-1 ring-violet-400"
                                  : "bg-slate-800"
                            }`}
                          />
                        );
                      },
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2 text-xs text-slate-500">
            <span>Less</span>
            <span className="h-3 w-3 rounded-sm bg-slate-800" />
            <span className="h-3 w-3 rounded-sm bg-violet-500" />
            <span>More</span>
          </div>
        </section>
      </div>

      {/* Add habit modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Add New Habit
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose something you want to practice regularly.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="habit-name"
                  className="mb-2 block text-sm text-slate-400"
                >
                  Habit name
                </label>

                <input
                  id="habit-name"
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="e.g. Practice JavaScript"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-violet-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="habit-category"
                    className="mb-2 block text-sm text-slate-400"
                  >
                    Category
                  </label>

                  <select
                    id="habit-category"
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="habit-target"
                    className="mb-2 block text-sm text-slate-400"
                  >
                    Weekly target
                  </label>

                  <select
                    id="habit-target"
                    value={form.target}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        target: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-violet-500"
                  >
                    <option value="3">3 days</option>
                    <option value="4">4 days</option>
                    <option value="5">5 days</option>
                    <option value="6">6 days</option>
                    <option value="7">7 days</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-violet-500 py-3 font-semibold text-white transition hover:bg-violet-400"
              >
                Create Habit
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function HabitCard({
  habit,
  completed,
  streak,
  monthCompleted,
  onToggle,
  onDelete,
}) {
  return (
    <article
      className={`rounded-2xl border p-5 shadow-xl shadow-black/10 transition ${
        completed
          ? "border-violet-500/30 bg-violet-500/5"
          : "border-slate-800 bg-slate-900/70"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={onToggle}
          aria-label={
            completed
              ? `Mark ${habit.name} incomplete`
              : `Complete ${habit.name}`
          }
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${
            completed
              ? "border-violet-400 bg-violet-500 text-white"
              : "border-slate-700 bg-slate-950 text-slate-600 hover:border-violet-400 hover:text-violet-400"
          }`}
        >
          <Check size={22} strokeWidth={3} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-semibold ${
                completed
                  ? "text-violet-200 line-through"
                  : "text-white"
              }`}
            >
              {habit.name}
            </h3>

            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] text-slate-400">
              {habit.category}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Flame
                size={14}
                className={
                  streak > 0
                    ? "text-orange-400"
                    : "text-slate-600"
                }
              />
              {streak} day streak
            </span>

            <span>
              {monthCompleted} completed this month
            </span>

            <span>Target: {habit.target}/7 days</span>
          </div>
        </div>

        <button
          onClick={onDelete}
          aria-label={`Delete ${habit.name}`}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}

function StatCard({ icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">{title}</span>

        <span className="rounded-lg bg-slate-800 p-2 text-violet-400">
          {icon}
        </span>
      </div>

      <p className="mt-5 text-2xl font-bold">{value}</p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

function calculateCurrentStreak(completedDates) {
  if (!completedDates.length) {
    return 0;
  }

  const completed = new Set(completedDates);
  const current = new Date();

  let streak = 0;

  while (true) {
    const key = getDateKey(current);

    if (!completed.has(key)) {
      break;
    }

    streak += 1;
    current.setDate(current.getDate() - 1);
  }

  return streak;
}

function getCurrentMonthCompletions(completedDates) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return completedDates.filter((date) => {
    const current = new Date(`${date}T00:00:00`);

    return (
      current.getFullYear() === year &&
      current.getMonth() === month
    );
  }).length;
}

export default HabitTracker;