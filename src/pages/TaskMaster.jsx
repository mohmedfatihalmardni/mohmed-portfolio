import { useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  Circle,
  Edit3,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Plus,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";

const TASKS_STORAGE_KEY = "taskmaster_tasks";
const USER_STORAGE_KEY = "taskmaster_user";

const initialTasks = [
  {
    id: 1,
    title: "Review React fundamentals",
    description: "Practice components, props, state, and hooks.",
    category: "Development",
    priority: "High",
    completed: true,
  },
  {
    id: 2,
    title: "Build portfolio section",
    description: "Create a responsive project showcase section.",
    category: "Portfolio",
    priority: "High",
    completed: false,
  },
  {
    id: 3,
    title: "Read JavaScript documentation",
    description: "Review array methods and modern JavaScript syntax.",
    category: "Learning",
    priority: "Medium",
    completed: false,
  },
  {
    id: 4,
    title: "Organize project files",
    description: "Review folders and remove unnecessary files.",
    category: "Development",
    priority: "Low",
    completed: false,
  },
];

const demoUser = {
  name: "Mohmed Fatih",
  email: "demo@taskmaster.local",
};

const emptyTaskForm = {
  title: "",
  description: "",
  category: "Development",
  priority: "Medium",
};

const emptyAuthForm = {
  name: "",
  email: "",
  password: "",
};

function getSavedTasks() {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
  } catch {
    // Use demo tasks when localStorage is unavailable.
  }

  return initialTasks;
}

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (savedUser) {
      return JSON.parse(savedUser);
    }
  } catch {
    // Use logged-out state when localStorage is unavailable.
  }

  return null;
}

function TaskMaster() {
  const [user, setUser] = useState(getSavedUser);
  const [tasks, setTasks] = useState(getSavedTasks);

  const [authMode, setAuthMode] = useState("signin");
  const [authForm, setAuthForm] = useState(emptyAuthForm);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState(emptyTaskForm);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(updatedTasks),
    );
  };

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(tasks.map((task) => task.category)),
    ];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        search === "" ||
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search) ||
        task.category.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && task.completed) ||
        (statusFilter === "Pending" && !task.completed);

      const matchesCategory =
        categoryFilter === "All" ||
        task.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [tasks, searchTerm, statusFilter, categoryFilter]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High" && !task.completed,
  ).length;

  const openCreateModal = () => {
    setEditingTask(null);
    setTaskForm(emptyTaskForm);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);

    setTaskForm({
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
    });

    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
    setTaskForm(emptyTaskForm);
  };

  const handleTaskFormChange = (event) => {
    const { name, value } = event.target;

    setTaskForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();

    if (!taskForm.title.trim()) {
      return;
    }

    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: taskForm.title.trim(),
              description: taskForm.description.trim(),
              category: taskForm.category,
              priority: taskForm.priority,
            }
          : task,
      );

      saveTasks(updatedTasks);
    } else {
      const newTask = {
        id: Date.now(),
        title: taskForm.title.trim(),
        description: taskForm.description.trim(),
        category: taskForm.category,
        priority: taskForm.priority,
        completed: false,
      };

      saveTasks([newTask, ...tasks]);
    }

    closeTaskModal();
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
          }
        : task,
    );

    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    saveTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAuthChange = (event) => {
    const { name, value } = event.target;

    setAuthForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();

    const nextUser = {
      name:
        authMode === "signup"
          ? authForm.name.trim() || "TaskMaster User"
          : "Mohmed Fatih",
      email:
        authForm.email.trim() || demoUser.email,
    };

    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(nextUser),
    );

    setUser(nextUser);

    setAuthForm(emptyAuthForm);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    setIsProfileOpen(false);
  };

  const priorityClasses = {
    High: "bg-red-50 text-red-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-emerald-50 text-emerald-700",
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Check className="h-6 w-6" />
                  </div>

                  <div>
                    <h1 className="text-xl font-bold text-slate-900">
                      TaskMaster Pro
                    </h1>

                    <p className="text-sm text-slate-500">
                      Personal task management
                    </p>
                  </div>
                </div>
              </div>

              <span className="hidden rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 sm:inline-flex">
                
              </span>
            </div>
          </div>
        </section>

        <main className="mx-auto flex min-h-[calc(100vh-105px)] max-w-7xl items-center justify-center px-6 py-12 lg:px-8">
          <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
            <div className="hidden bg-slate-900 p-10 text-white lg:block">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                    <Check className="h-6 w-6" />
                  </div>

                  <h2 className="mt-8 text-4xl font-bold leading-tight">
                    Organize your work.
                    <br />
                    Focus on what matters.
                  </h2>

                  <p className="mt-6 max-w-md leading-7 text-slate-300">
                    TaskMaster Pro combines task management, priorities,
                    categories, progress tracking, and a simple account
                    experience in one application.
                  </p>
                </div>

                <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 p-5">
                  <p className="text-sm font-semibold text-slate-200">
                    Demo account
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Use any email and password to enter the frontend
                    simulation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="mx-auto max-w-md">
                <div className="flex rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      authMode === "signin"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      authMode === "signup"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    TaskMaster Pro
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {authMode === "signin"
                      ? "Welcome back"
                      : "Create your account"}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {authMode === "signin"
                      ? "Sign in to access your task dashboard."
                      : "Create a demo account to start managing your tasks."}
                  </p>
                </div>

                <form
                  onSubmit={handleAuthSubmit}
                  className="mt-8 space-y-5"
                >
                  {authMode === "signup" && (
                    <div>
                      <label
                        htmlFor="auth-name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Name
                      </label>

                      <input
                        id="auth-name"
                        name="name"
                        type="text"
                        value={authForm.name}
                        onChange={handleAuthChange}
                        placeholder="Your name"
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="auth-email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="auth-email"
                      name="email"
                      type="email"
                      value={authForm.email}
                      onChange={handleAuthChange}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="auth-password"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <input
                      id="auth-password"
                      name="password"
                      type="password"
                      value={authForm.password}
                      onChange={handleAuthChange}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    {authMode === "signin"
                      ? "Sign In"
                      : "Create Account"}
                  </button>
                </form>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs font-semibold text-amber-800">
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-700">
                    Authentication is simulated with localStorage. No real
                    account, backend, JWT, or password storage is used.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Check className="h-5 w-5" />
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                TaskMaster Pro
              </h1>

              <p className="text-xs text-slate-500">
                Task management dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-slate-100"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500">
                  {user.email}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:inline-flex"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Simulation notice */}
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-800">
               + LocalStorage
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700">
              This demo simulates authentication and task persistence
              entirely in the browser.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-amber-700">
            No real backend
          </span>
        </div>

        {/* Dashboard heading */}
        <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Good to see you, {user.name.split(" ")[0]}.
            </h2>

            <p className="mt-2 text-slate-500">
              Here is your task overview for today.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Tasks
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalTasks}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ListTodo className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {completedTasks}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {pendingTasks}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Circle className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  High Priority
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {highPriorityTasks}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Circle className="h-5 w-5" />
              </div>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <LayoutDashboard className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Overall Progress
                </h3>

                <p className="text-sm text-slate-500">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
            </div>

            <span className="text-lg font-bold text-blue-600">
              {progress}%
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Filters */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search tasks..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All"
                    ? "All Categories"
                    : category}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Task list */}
        <section className="mt-6">
          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <ListTodo className="h-7 w-7" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                No tasks found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your filters or create a new task.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <article
                  key={task.id}
                  className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                    task.completed
                      ? "border-emerald-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          task.completed
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-300 text-transparent hover:border-blue-500"
                        }`}
                        aria-label={
                          task.completed
                            ? "Mark task as incomplete"
                            : "Mark task as complete"
                        }
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className={`text-lg font-bold ${
                              task.completed
                                ? "text-slate-400 line-through"
                                : "text-slate-900"
                            }`}
                          >
                            {task.title}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              priorityClasses[task.priority]
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <p
                          className={`mt-2 text-sm leading-6 ${
                            task.completed
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          {task.description ||
                            "No description provided."}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {task.category}
                          </span>

                          <span
                            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                              task.completed
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {task.completed
                              ? "Completed"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(task)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Task modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingTask ? "Edit Task" : "Create Task"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingTask
                    ? "Update the task details."
                    : "Add a new task to your dashboard."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeTaskModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleTaskSubmit}
              className="space-y-5 p-6"
            >
              <div>
                <label
                  htmlFor="task-title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Task title
                </label>

                <input
                  id="task-title"
                  name="title"
                  type="text"
                  value={taskForm.title}
                  onChange={handleTaskFormChange}
                  placeholder="e.g. Finish portfolio homepage"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id="task-description"
                  name="description"
                  value={taskForm.description}
                  onChange={handleTaskFormChange}
                  placeholder="Add some details..."
                  rows="3"
                  className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="task-category"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Category
                  </label>

                  <select
                    id="task-category"
                    name="category"
                    value={taskForm.category}
                    onChange={handleTaskFormChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Development">
                      Development
                    </option>
                    <option value="Portfolio">
                      Portfolio
                    </option>
                    <option value="Learning">
                      Learning
                    </option>
                    <option value="Personal">
                      Personal
                    </option>
                    <option value="Work">Work</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="task-priority"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Priority
                  </label>

                  <select
                    id="task-priority"
                    name="priority"
                    value={taskForm.priority}
                    onChange={handleTaskFormChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeTaskModal}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {editingTask
                    ? "Save Changes"
                    : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <h2 className="text-xl font-bold text-slate-900">
                Profile
              </h2>

              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close profile"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {user.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Demo Profile
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      This profile is stored locally for the frontend
                      simulation.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskMaster;