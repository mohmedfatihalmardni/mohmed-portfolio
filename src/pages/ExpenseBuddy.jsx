import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  DollarSign,
  Plus,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const STORAGE_KEY = "expensebuddy_transactions";
const BUDGET_KEY = "expensebuddy_budget";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

const initialTransactions = [
  {
    id: 1,
    type: "expense",
    title: "Groceries",
    category: "Food",
    amount: 185,
    date: "2026-10-05",
  },
  {
    id: 2,
    type: "expense",
    title: "Taxi",
    category: "Transport",
    amount: 45,
    date: "2026-10-04",
  },
  {
    id: 3,
    type: "income",
    title: "Monthly Income",
    category: "Other",
    amount: 4500,
    date: "2026-10-01",
  },
  {
    id: 4,
    type: "expense",
    title: "Online Course",
    category: "Education",
    amount: 120,
    date: "2026-10-02",
  },
];

const categorySymbols = {
  Food: "🍔",
  Transport: "🚕",
  Shopping: "🛍️",
  Bills: "📄",
  Entertainment: "🎬",
  Health: "❤️",
  Education: "📚",
  Other: "📦",
};

function ExpenseBuddy() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialTransactions;
    } catch {
      return initialTransactions;
    }
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem(BUDGET_KEY);
    return saved ? Number(saved) : 2000;
  });

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    type: "expense",
    title: "",
    category: "Food",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, String(budget));
  }, [budget]);

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [transactions],
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [transactions],
  );

  const balance = totalIncome - totalExpenses;

  const categoryData = useMemo(() => {
    return categories
      .map((category) => ({
        name: category,
        value: transactions
          .filter(
            (transaction) =>
              transaction.type === "expense" &&
              transaction.category === category,
          )
          .reduce((sum, transaction) => sum + transaction.amount, 0),
      }))
      .filter((item) => item.value > 0);
  }, [transactions]);

  const budgetPercentage =
    budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filter === "income") return transaction.type === "income";
      if (filter === "expense") return transaction.type === "expense";
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(form.amount);

    if (!form.title.trim() || !amount || amount <= 0) {
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: form.type,
      title: form.title.trim(),
      category: form.category,
      amount,
      date: form.date,
    };

    setTransactions((current) => [newTransaction, ...current]);

    setForm({
      type: "expense",
      title: "",
      category: "Food",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });

    setShowForm(false);
  }

  function deleteTransaction(id) {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id),
    );
  }

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
            <Wallet size={15} />
            
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                ExpenseBuddy
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Take control of your money.
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Track income, manage expenses, monitor your budget, and
                understand where your money goes.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <Plus size={19} />
              Add Transaction
            </button>
          </div>
        </section>

        {/* Summary cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Balance"
            value={formatAmount(balance)}
            icon={<Wallet size={21} />}
            description="Income minus expenses"
          />

          <SummaryCard
            title="Total Income"
            value={formatAmount(totalIncome)}
            icon={<ArrowUpCircle size={21} />}
            description="Money received"
          />

          <SummaryCard
            title="Total Expenses"
            value={formatAmount(totalExpenses)}
            icon={<ArrowDownCircle size={21} />}
            description="Money spent"
          />

          <SummaryCard
            title="Monthly Budget"
            value={formatAmount(budget)}
            icon={<BarChart3 size={21} />}
            description={`${Math.round(budgetPercentage)}% used`}
          />
        </section>

        {/* Main content */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Transactions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-semibold">Transactions</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your recent financial activity.
                </p>
              </div>

              <div className="flex rounded-xl border border-slate-700 bg-slate-950 p-1">
                {[
                  ["all", "All"],
                  ["income", "Income"],
                  ["expense", "Expenses"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setFilter(value)}
                    className={`rounded-lg px-3 py-2 text-sm transition ${
                      filter === value
                        ? "bg-slate-700 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {filteredTransactions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center text-slate-500">
                  No transactions found.
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-lg">
                      {categorySymbols[transaction.category] || "📦"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {transaction.title}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>{transaction.category}</span>
                        <span>•</span>
                        <span>{transaction.date}</span>
                      </div>
                    </div>

                    <p
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatAmount(transaction.amount)}
                    </p>

                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      aria-label={`Delete ${transaction.title}`}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            {/* Expense chart */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
              <div>
                <h2 className="text-xl font-semibold">Expense Breakdown</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Spending by category.
                </p>
              </div>

              {categoryData.length > 0 ? (
                <>
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={58}
                          outerRadius={90}
                          paddingAngle={3}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${entry.name}`}
                              fill={`hsl(${index * 48}, 70%, 55%)`}
                            />
                          ))}
                        </Pie>

                        <Tooltip
                          formatter={(value) => formatAmount(Number(value))}
                          contentStyle={{
                            background: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "12px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-2">
                    {categoryData.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-400">{item.name}</span>
                        <span className="font-medium">
                          {formatAmount(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex h-64 items-center justify-center text-sm text-slate-500">
                  Add an expense to see the chart.
                </div>
              )}
            </div>

            {/* Budget */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Budget</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Set your monthly spending limit.
                  </p>
                </div>

                <DollarSign className="text-emerald-400" size={22} />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm text-slate-400"
                >
                  Monthly limit
                </label>

                <input
                  id="budget"
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(event) =>
                    setBudget(Number(event.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500"
                />

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${budgetPercentage}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-slate-500">
                    {formatAmount(totalExpenses)} spent
                  </span>

                  <span
                    className={
                      totalExpenses > budget
                        ? "text-red-400"
                        : "text-emerald-400"
                    }
                  >
                    {totalExpenses > budget ? "Over budget" : "Within budget"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Add transaction modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Add Transaction</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add income or expense to your wallet.
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
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-950 p-1">
                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      type: "expense",
                    }))
                  }
                  className={`rounded-lg py-2 text-sm font-medium ${
                    form.type === "expense"
                      ? "bg-red-500/15 text-red-400"
                      : "text-slate-500"
                  }`}
                >
                  Expense
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      type: "income",
                    }))
                  }
                  className={`rounded-lg py-2 text-sm font-medium ${
                    form.type === "income"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-slate-500"
                  }`}
                >
                  Income
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="e.g. Groceries"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Amount
                  </label>
                  <input
                    required
                    min="0.01"
                    step="0.01"
                    type="number"
                    value={form.amount}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        date: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function SummaryCard({ title, value, icon, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">{title}</span>
        <span className="rounded-lg bg-slate-800 p-2 text-emerald-400">
          {icon}
        </span>
      </div>

      <p className="mt-5 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

export default ExpenseBuddy;