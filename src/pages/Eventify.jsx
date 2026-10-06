import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  MapPin,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "eventify_events";

const initialEvents = [
  {
    id: 1,
    title: "Portfolio Review",
    date: "2026-10-08",
    time: "10:00",
    location: "Home Office",
    category: "Work",
    description: "Review portfolio projects and improve presentation details.",
    reminder: true,
  },
  {
    id: 2,
    title: "React Practice",
    date: "2026-10-10",
    time: "16:00",
    location: "Study Room",
    category: "Study",
    description: "Practice React components, routing, and state management.",
    reminder: true,
  },
  {
    id: 3,
    title: "Gym Session",
    date: "2026-10-12",
    time: "18:30",
    location: "Fitness Center",
    category: "Personal",
    description: "Regular workout session.",
    reminder: false,
  },
  {
    id: 4,
    title: "GitHub Update",
    date: "2026-10-15",
    time: "11:30",
    location: "Home Office",
    category: "Work",
    description: "Review repositories and update project documentation.",
    reminder: true,
  },
];

const categoryOptions = ["Work", "Study", "Personal", "Meeting", "Other"];

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(
    undefined,
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    },
  );
}

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getMonthName(year, month) {
  return new Date(year, month, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function getCategoryClasses(category) {
  const classes = {
    Work: "bg-blue-50 text-blue-700 border-blue-200",
    Study: "bg-purple-50 text-purple-700 border-purple-200",
    Personal: "bg-green-50 text-green-700 border-green-200",
    Meeting: "bg-orange-50 text-orange-700 border-orange-200",
    Other: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return classes[category] || classes.Other;
}

function getInitialForm() {
  const today = new Date();

  return {
    title: "",
    date: getDateKey(today),
    time: "10:00",
    location: "",
    category: "Work",
    description: "",
    reminder: true,
  };
}

function Eventify() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEY);

    if (savedEvents) {
      try {
        return JSON.parse(savedEvents);
      } catch {
        return initialEvents;
      }
    }

    return initialEvents;
  });

  const [selectedDate, setSelectedDate] = useState(() => getDateKey(new Date()));
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();

    return {
      year: today.getFullYear(),
      month: today.getMonth(),
    };
  });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(getInitialForm());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return events
      .filter((event) => {
        const matchesSearch =
          !normalizedSearch ||
          event.title.toLowerCase().includes(normalizedSearch) ||
          event.location.toLowerCase().includes(normalizedSearch) ||
          event.description.toLowerCase().includes(normalizedSearch);

        const matchesCategory =
          categoryFilter === "All" || event.category === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const first = `${a.date} ${a.time}`;
        const second = `${b.date} ${b.time}`;

        return first.localeCompare(second);
      });
  }, [events, search, categoryFilter]);

  const selectedDateEvents = filteredEvents.filter(
    (event) => event.date === selectedDate,
  );

  const upcomingEvents = useMemo(() => {
    const now = new Date();

    return events
      .filter((event) => {
        const eventDate = new Date(`${event.date}T${event.time}`);

        return eventDate >= now;
      })
      .sort((a, b) => {
        const first = new Date(`${a.date}T${a.time}`);
        const second = new Date(`${b.date}T${b.time}`);

        return first - second;
      })
      .slice(0, 4);
  }, [events]);

  const stats = useMemo(() => {
    const todayKey = getDateKey(new Date());

    const todayEvents = events.filter(
      (event) => event.date === todayKey,
    ).length;

    const reminderCount = events.filter(
      (event) => event.reminder,
    ).length;

    return {
      total: events.length,
      today: todayEvents,
      upcoming: upcomingEvents.length,
      reminders: reminderCount,
    };
  }, [events, upcomingEvents]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      currentMonth.year,
      currentMonth.month,
      1,
    ).getDay();

    const daysInMonth = getDaysInMonth(
      currentMonth.year,
      currentMonth.month,
    );

    const previousMonthDays = getDaysInMonth(
      currentMonth.year,
      currentMonth.month - 1,
    );

    const days = [];

    for (let index = firstDay - 1; index >= 0; index -= 1) {
      const day = previousMonthDays - index;

      const previousDate = new Date(
        currentMonth.year,
        currentMonth.month - 1,
        day,
      );

      days.push({
        date: getDateKey(previousDate),
        day,
        outside: true,
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(
        currentMonth.year,
        currentMonth.month,
        day,
      );

      days.push({
        date: getDateKey(date),
        day,
        outside: false,
      });
    }

    let nextDay = 1;

    while (days.length < 42) {
      const nextDate = new Date(
        currentMonth.year,
        currentMonth.month + 1,
        nextDay,
      );

      days.push({
        date: getDateKey(nextDate),
        day: nextDay,
        outside: true,
      });

      nextDay += 1;
    }

    return days;
  }, [currentMonth]);

  function openCreateModal(date = selectedDate) {
    setEditingEvent(null);
    setForm({
      ...getInitialForm(),
      date,
    });
    setIsModalOpen(true);
  }

  function openEditModal(event) {
    setEditingEvent(event);
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description,
      reminder: event.reminder,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingEvent(null);
  }

  function handleFormChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.date || !form.time) {
      return;
    }

    if (editingEvent) {
      setEvents((current) =>
        current.map((item) =>
          item.id === editingEvent.id
            ? {
                ...item,
                ...form,
                title: form.title.trim(),
              }
            : item,
        ),
      );
    } else {
      const newEvent = {
        id: Date.now(),
        ...form,
        title: form.title.trim(),
      };

      setEvents((current) => [...current, newEvent]);
    }

    setSelectedDate(form.date);

    const selected = new Date(`${form.date}T00:00:00`);

    setCurrentMonth({
      year: selected.getFullYear(),
      month: selected.getMonth(),
    });

    closeModal();
  }

  function deleteEvent(eventId) {
    const confirmed = window.confirm(
      "Delete this event?",
    );

    if (!confirmed) {
      return;
    }

    setEvents((current) =>
      current.filter((event) => event.id !== eventId),
    );
  }

  function changeMonth(direction) {
    setCurrentMonth((current) => {
      const nextDate = new Date(
        current.year,
        current.month + direction,
        1,
      );

      return {
        year: nextDate.getFullYear(),
        month: nextDate.getMonth(),
      };
    });
  }

  function goToToday() {
    const today = new Date();
    const todayKey = getDateKey(today);

    setSelectedDate(todayKey);

    setCurrentMonth({
      year: today.getFullYear(),
      month: today.getMonth(),
    });
  }

  function getCountdown(event) {
    const now = new Date();
    const eventDate = new Date(`${event.date}T${event.time}`);
    const difference = eventDate - now;

    if (difference <= 0) {
      return "Started";
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor(
      (difference % 86400000) / 3600000,
    );
    const minutes = Math.floor(
      (difference % 3600000) / 60000,
    );

    if (days > 0) {
      return `${days}d ${hours}h`;
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <CalendarDays className="h-4 w-4" />
              
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Eventify
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Plan events, manage your calendar, and keep track of
              upcoming activities with a responsive frontend simulation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openCreateModal()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create Event
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Events
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Today
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.today}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Upcoming
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.upcoming}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Reminders
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.reminders}
            </p>
          </div>
        </div>

        {/* Search / Filter */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search events..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All Categories</option>

              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          {/* Calendar */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {getMonthName(
                    currentMonth.year,
                    currentMonth.month,
                  )}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a date to view its events.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToToday}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Today
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-5">
              <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              <div className="grid grid-cols-7 overflow-hidden rounded-xl border border-slate-200">
                {calendarDays.map((day) => {
                  const dayEvents = events.filter(
                    (event) => event.date === day.date,
                  );

                  const isSelected =
                    selectedDate === day.date;

                  const isToday =
                    getDateKey(new Date()) === day.date;

                  return (
                    <button
                      key={day.date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(day.date);

                        const clickedDate = new Date(
                          `${day.date}T00:00:00`,
                        );

                        setCurrentMonth({
                          year: clickedDate.getFullYear(),
                          month: clickedDate.getMonth(),
                        });
                      }}
                      className={`min-h-24 border-b border-r border-slate-200 p-2 text-left transition last:border-r-0 sm:min-h-28 ${
                        isSelected
                          ? "bg-indigo-50"
                          : "bg-white hover:bg-slate-50"
                      } ${day.outside ? "opacity-40" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                            isToday
                              ? "bg-indigo-600 text-white"
                              : isSelected
                                ? "text-indigo-700"
                                : "text-slate-700"
                          }`}
                        >
                          {day.day}
                        </span>

                        {dayEvents.length > 0 && (
                          <span className="text-xs font-medium text-indigo-600">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 hidden space-y-1 sm:block">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`truncate rounded-md border px-1.5 py-1 text-[10px] font-medium ${getCategoryClasses(
                              event.category,
                            )}`}
                          >
                            {event.title}
                          </div>
                        ))}

                        {dayEvents.length > 2 && (
                          <p className="text-[10px] font-medium text-slate-500">
                            +{dayEvents.length - 2} more
                          </p>
                        )}
                      </div>

                      {dayEvents.length > 0 && (
                        <div className="mt-2 flex gap-1 sm:hidden">
                          {dayEvents.slice(0, 3).map((event) => (
                            <span
                              key={event.id}
                              className="h-1.5 w-1.5 rounded-full bg-indigo-500"
                              title={event.title}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Selected Day */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-indigo-600">
                    Selected Day
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {formatDate(selectedDate)}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => openCreateModal(selectedDate)}
                  className="rounded-lg bg-indigo-50 p-2 text-indigo-600 transition hover:bg-indigo-100"
                  aria-label="Add event"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="max-h-[500px] space-y-3 overflow-y-auto p-5">
              {selectedDateEvents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                  <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No events found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Add an event to this date.
                  </p>

                  <button
                    type="button"
                    onClick={() => openCreateModal(selectedDate)}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Event
                  </button>
                </div>
              ) : (
                selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span
                          className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${getCategoryClasses(
                            event.category,
                          )}`}
                        >
                          {event.category}
                        </span>

                        <h3 className="mt-2 truncate font-bold text-slate-900">
                          {event.title}
                        </h3>
                      </div>

                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(event)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          aria-label="Edit event"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteEvent(event.id)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {formatTime(event.time)}
                      </div>

                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="truncate">
                            {event.location}
                          </span>
                        </div>
                      )}

                      {event.reminder && (
                        <div className="flex items-center gap-2 text-indigo-600">
                          <Bell className="h-4 w-4" />
                          Reminder enabled
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-500">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Upcoming Events */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Upcoming Events
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your next scheduled activities.
            </p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
            {upcomingEvents.length === 0 ? (
              <div className="md:col-span-2 xl:col-span-4">
                <p className="py-8 text-center text-sm text-slate-500">
                  No upcoming events.
                </p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => {
                    setSelectedDate(event.date);

                    const eventDate = new Date(
                      `${event.date}T00:00:00`,
                    );

                    setCurrentMonth({
                      year: eventDate.getFullYear(),
                      month: eventDate.getMonth(),
                    });
                  }}
                  className="rounded-xl border border-slate-200 p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full border px-2 py-1 text-xs font-medium ${getCategoryClasses(
                        event.category,
                      )}`}
                    >
                      {event.category}
                    </span>

                    <span className="text-xs font-semibold text-indigo-600">
                      {getCountdown(event)}
                    </span>
                  </div>

                  <h3 className="mt-3 font-bold text-slate-900">
                    {event.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(event.date)}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4 text-slate-400" />
                    {formatTime(event.time)}
                  </div>

                  {event.location && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="truncate">
                        {event.location}
                      </span>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingEvent ? "Edit Event" : "Create Event"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your event details.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >
              <div>
                <label
                  htmlFor="event-title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Event Title
                </label>

                <input
                  id="event-title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Team Meeting"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="event-date"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Date
                  </label>

                  <input
                    id="event-date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-time"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Time
                  </label>

                  <input
                    id="event-time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="event-location"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Location
                  </label>

                  <input
                    id="event-location"
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleFormChange}
                    placeholder="e.g. Home Office"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-category"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Category
                  </label>

                  <select
                    id="event-category"
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="event-description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id="event-description"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows="4"
                  placeholder="Add notes about this event..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <input
                  name="reminder"
                  type="checkbox"
                  checked={form.reminder}
                  onChange={handleFormChange}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    Enable reminder
                  </span>

                  <span className="block text-xs text-slate-500">
                    Simulation only — no real notification is sent.
                  </span>
                </span>
              </label>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  {editingEvent ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Eventify;