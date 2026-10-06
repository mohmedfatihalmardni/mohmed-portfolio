import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  LogIn,
  LogOut,
  Plus,
  Trash2,
  User,
  X,
} from "lucide-react";

const USER_STORAGE_KEY = "authTasker_user";
const TASKS_STORAGE_KEY = "authTasker_tasks";

const initialTasks = [
  {
    id: 1,
    title: "Review React fundamentals",
    priority: "High",
    completed: true,
  },
  {
    id: 2,
    title: "Build portfolio components",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Practice JavaScript",
    priority: "Low",
    completed: false,
  },
];

function loadUser() {
  try {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  } catch {
    return initialTasks;
  }
}

function AuthTasker() {
  const [user, setUser] = useState(loadUser);
  const [tasks, setTasks] = useState(loadTasks);
  const [authMode, setAuthMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const filteredTasks = useMemo(() => {
    if (filter === "Completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "Active") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  const completedCount = tasks.filter((task) => task.completed).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  function handleAuthSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    const displayName =
      authMode === "signup"
        ? name.trim() || email.split("@")[0]
        : email.split("@")[0];

    setUser({
      name: displayName,
      email: email.trim(),
    });

    setEmail("");
    setPassword("");
    setName("");
  }

  function handleLogout() {
    setUser(null);
    setShowProfile(false);
  }

  function addTask(event) {
    event.preventDefault();

    const title = newTask.trim();

    if (!title) {
      return;
    }

    const task = {
      id: Date.now(),
      title,
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
    setNewTask("");
    setPriority("Medium");
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  if (!user) {
    return (
      <section className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <LogIn className="h-7 w-7" />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              AuthTasker
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Task management with a simulated authentication flow.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
                  authMode === "login"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
                  authMode === "signup"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === "signup" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700">
              <strong>:</strong> no real
              account or backend is connected. Login data is stored only in
              your browser.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              AuthTasker
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Welcome back, {user.name}.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowProfile(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <User className="h-4 w-4" />
              Profile
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Progress</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {progress}%
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Overall Progress
            </p>

            <span className="text-sm font-medium text-slate-500">
              {completedCount}/{tasks.length}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Add Task */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Add Task</h2>

          <form
            onSubmit={addTask}
            className="mt-4 grid gap-3 md:grid-cols-[1fr_150px_auto]"
          >
            <input
              type="text"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="What do you need to do?"
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-slate-900">My Tasks</h2>

            <div className="flex gap-2">
              {["All", "Active", "Completed"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
                <p className="text-sm text-slate-500">
                  No tasks in this filter.
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                    task.completed
                      ? "border-green-100 bg-green-50/50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="shrink-0"
                    aria-label={
                      task.completed
                        ? "Mark task as active"
                        : "Mark task as completed"
                    }
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-slate-300 hover:text-blue-500" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-medium ${
                        task.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-900"
                      }`}
                    >
                      {task.title}
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-md px-2 py-1 text-xs font-medium ${
                        task.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : task.priority === "Medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-green-50 text-green-600"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                User Profile
              </h2>

              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close profile"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-xl bg-slate-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700">
              This profile is part of the frontend mock authentication
              experience. No real user account is created.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AuthTasker;