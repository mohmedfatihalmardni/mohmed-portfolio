import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Hash,
  Menu,
  Pin,
  PinOff,
  Plus,
  Save,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "cloudnotes_notes";

const initialNotes = [
  {
    id: 1,
    title: "Portfolio Ideas",
    content:
      "Build polished interactive projects with React, Tailwind CSS, and localStorage.",
    category: "Projects",
    tags: ["portfolio", "react"],
    pinned: true,
    updatedAt: "2026-10-06T10:30:00.000Z",
  },
  {
    id: 2,
    title: "React Learning",
    content:
      "Review component composition, state management, routing, and reusable UI patterns.",
    category: "Learning",
    tags: ["react", "learning"],
    pinned: false,
    updatedAt: "2026-10-05T15:20:00.000Z",
  },
  {
    id: 3,
    title: "Ideas",
    content:
      "Explore dashboard layouts, analytics cards, dark mode interfaces, and useful micro-interactions.",
    category: "Ideas",
    tags: ["ideas", "design"],
    pinned: false,
    updatedAt: "2026-10-04T09:15:00.000Z",
  },
];

function loadNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return initialNotes;
  }

  return initialNotes;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateString) {
  const date = new Date(dateString);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CloudNotes() {
  const [notes, setNotes] = useState(loadNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(notes.map((note) => note.category))];

    return ["All", ...uniqueCategories];
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return notes
      .filter((note) => {
        const matchesSearch =
          !search ||
          note.title.toLowerCase().includes(search) ||
          note.content.toLowerCase().includes(search) ||
          note.tags.some((tag) => tag.toLowerCase().includes(search));

        const matchesCategory =
          selectedCategory === "All" ||
          note.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return Number(b.pinned) - Number(a.pinned);
        }

        return (
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
        );
      });
  }, [notes, searchTerm, selectedCategory]);

  const selectedNote =
    notes.find((note) => note.id === selectedNoteId) || null;

  const updateNote = (field, value) => {
    if (!selectedNote) {
      return;
    }

    setSaveStatus("Saving...");

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              [field]: value,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );

    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  };

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      category: "Personal",
      tags: [],
      pinned: false,
      updatedAt: new Date().toISOString(),
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);
    setSelectedNoteId(newNote.id);
    setSaveStatus("Saved");
    setSidebarOpen(false);
  };

  const deleteNote = (noteId) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );

    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
    }
  };

  const togglePin = (noteId) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              pinned: !note.pinned,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  };

  const addTag = (event) => {
    if (event.key !== "Enter" || !selectedNote) {
      return;
    }

    const value = event.currentTarget.value.trim();

    if (!value || selectedNote.tags.includes(value)) {
      event.currentTarget.value = "";
      return;
    }

    updateNote("tags", [...selectedNote.tags, value]);
    event.currentTarget.value = "";
  };

  const removeTag = (tagToRemove) => {
    if (!selectedNote) {
      return;
    }

    updateNote(
      "tags",
      selectedNote.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 w-80 transform border-r border-white/10 bg-slate-900 transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-500/15 p-2 text-sky-400">
                  <FileText size={21} />
                </div>

                <div>
                  <h1 className="font-bold">CloudNotes</h1>
                  <p className="text-xs text-slate-500">
                    Your ideas, organized.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4">
              <button
                type="button"
                onClick={createNote}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                <Plus size={18} />
                New Note
              </button>
            </div>

            <div className="px-4">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search notes..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-slate-600 focus:border-sky-400/40"
                />
              </div>
            </div>

            <div className="mt-6 px-4">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Categories
              </p>

              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                      selectedCategory === category
                        ? "bg-sky-500/10 text-sky-300"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Tag size={15} />
                      {category}
                    </span>

                    <span className="text-xs text-slate-600">
                      {category === "All"
                        ? notes.length
                        : notes.filter(
                            (note) => note.category === category,
                          ).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto border-t border-white/10 p-4">
              <div className="rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Save size={15} />
                  LocalStorage enabled
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Your notes are stored locally in this browser.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur sm:px-6">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
              <span
                className={`h-2 w-2 rounded-full ${
                  saveStatus === "Saved"
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />
              {saveStatus}
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                  <Hash size={15} />
                  CloudNotes
                </div>

                <h2 className="text-3xl font-bold tracking-tight">
                  Notes workspace
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {filteredNotes.length}{" "}
                  {filteredNotes.length === 1 ? "note" : "notes"} found
                </p>
              </div>

              <div className="rounded-xl border border-amber-400/10 bg-amber-400/5 px-4 py-2 text-xs text-amber-300">
                
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
              <div className="space-y-3">
                {filteredNotes.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
                    <FileText
                      size={30}
                      className="mx-auto text-slate-700"
                    />

                    <h3 className="mt-4 font-semibold">
                      No notes found
                    </h3>

                    <p className="mt-2 text-sm text-slate-600">
                      Try another search or create a new note.
                    </p>

                    <button
                      type="button"
                      onClick={createNote}
                      className="mt-5 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold"
                    >
                      Create note
                    </button>
                  </div>
                ) : (
                  filteredNotes.map((note) => (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => setSelectedNoteId(note.id)}
                      className={`group w-full rounded-2xl border p-4 text-left transition ${
                        selectedNoteId === note.id
                          ? "border-sky-400/40 bg-sky-400/5"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            {note.pinned && (
                              <Pin
                                size={14}
                                className="shrink-0 text-sky-400"
                              />
                            )}

                            <h3 className="truncate font-semibold">
                              {note.title || "Untitled Note"}
                            </h3>
                          </div>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                            {note.content || "Empty note"}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-lg bg-white/5 px-2 py-1 text-[10px] text-slate-500">
                          {note.category}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {note.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-slate-800 px-2 py-1 text-[10px] text-slate-500"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <span className="text-[10px] text-slate-600">
                          {formatDate(note.updatedAt)}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="min-h-[600px] rounded-3xl border border-white/10 bg-white/[0.03]">
                {!selectedNote ? (
                  <div className="flex min-h-[600px] flex-col items-center justify-center p-8 text-center">
                    <div className="rounded-2xl bg-sky-500/10 p-4 text-sky-400">
                      <FileText size={32} />
                    </div>

                    <h3 className="mt-5 text-xl font-bold">
                      Select a note
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                      Choose a note from the list or create a new one to
                      start writing.
                    </p>

                    <button
                      type="button"
                      onClick={createNote}
                      className="mt-6 flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold"
                    >
                      <Plus size={17} />
                      New Note
                    </button>
                  </div>
                ) : (
                  <div className="flex min-h-[600px] flex-col">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Save size={15} />
                        {saveStatus}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => togglePin(selectedNote.id)}
                          title={
                            selectedNote.pinned
                              ? "Unpin note"
                              : "Pin note"
                          }
                          className="rounded-xl p-2.5 text-slate-500 transition hover:bg-white/5 hover:text-sky-400"
                        >
                          {selectedNote.pinned ? (
                            <PinOff size={18} />
                          ) : (
                            <Pin size={18} />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteNote(selectedNote.id)}
                          title="Delete note"
                          className="rounded-xl p-2.5 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 p-5 sm:p-7">
                      <input
                        value={selectedNote.title}
                        onChange={(event) =>
                          updateNote("title", event.target.value)
                        }
                        placeholder="Note title"
                        className="w-full bg-transparent text-2xl font-bold outline-none placeholder:text-slate-700 sm:text-3xl"
                      />

                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <select
                          value={selectedNote.category}
                          onChange={(event) =>
                            updateNote(
                              "category",
                              event.target.value,
                            )
                          }
                          className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-slate-300 outline-none"
                        >
                          <option value="Personal">Personal</option>
                          <option value="Projects">Projects</option>
                          <option value="Learning">Learning</option>
                          <option value="Ideas">Ideas</option>
                          <option value="Work">Work</option>
                        </select>

                        {selectedNote.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="flex items-center gap-1 rounded-xl bg-sky-500/10 px-3 py-2 text-xs text-sky-300 hover:bg-sky-500/20"
                          >
                            #{tag}
                            <X size={12} />
                          </button>
                        ))}

                        <input
                          onKeyDown={addTag}
                          placeholder="+ tag"
                          className="w-20 rounded-xl bg-transparent px-2 py-2 text-xs text-slate-400 outline-none placeholder:text-slate-600"
                        />
                      </div>

                      <textarea
                        value={selectedNote.content}
                        onChange={(event) =>
                          updateNote("content", event.target.value)
                        }
                        placeholder="Start writing..."
                        className="mt-8 min-h-[360px] w-full resize-none bg-transparent text-sm leading-7 text-slate-300 outline-none placeholder:text-slate-700"
                      />
                    </div>

                    <div className="border-t border-white/10 px-5 py-4 text-xs text-slate-600 sm:px-7">
                      Last updated {formatDate(selectedNote.updatedAt)} at{" "}
                      {formatTime(selectedNote.updatedAt)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}