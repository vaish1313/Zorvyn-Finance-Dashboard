import { useDashboard } from "@/context/DashboardContext";
import { Category } from "@/data/types";
import { Search, ArrowUpDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddTransactionDialog from "./AddTransactionDialog";

const allCategories: Category[] = [
  "Salary", "Freelance", "Investments", "Food & Dining", "Shopping",
  "Transportation", "Entertainment", "Utilities", "Healthcare", "Travel", "Education", "Rent",
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function TransactionsTable() {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useDashboard();
  const [dialogOpen, setDialogOpen] = useState(false);
  const isAdmin = role === "admin";

  return (
    <div className="glass-card rounded-xl p-5 lg:p-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">Transactions</h3>
          <p className="text-sm text-muted-foreground">{filteredTransactions.length} results</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <select
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value as any }))}
          className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value as any }))}
          className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="all">All Categories</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={() =>
            setFilters((f) => ({
              ...f,
              sortOrder: f.sortOrder === "asc" ? "desc" : "asc",
            }))
          }
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-input bg-background text-sm hover:bg-accent transition-colors"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
          {filters.sortOrder === "desc" ? "Newest" : "Oldest"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No transactions found. Try adjusting your filters.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Amount</th>
                {isAdmin && <th className="text-right py-3 px-2 font-medium text-muted-foreground w-10"></th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.slice(0, 20).map((txn) => (
                <tr key={txn.id} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                  <td className="py-3 px-2 text-muted-foreground whitespace-nowrap">
                    {new Date(txn.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="py-3 px-2 font-medium text-foreground">{txn.description}</td>
                  <td className="py-3 px-2 hidden sm:table-cell">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                      {txn.category}
                    </span>
                  </td>
                  <td className={`py-3 px-2 text-right font-semibold ${txn.type === "income" ? "text-income" : "text-expense"}`}>
                    {txn.type === "income" ? "+" : "-"}{formatCurrency(txn.amount)}
                  </td>
                  {isAdmin && (
                    <td className="py-3 px-2 text-right">
                      <button onClick={() => deleteTransaction(txn.id)} className="p-1 rounded hover:bg-expense-muted text-muted-foreground hover:text-expense transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddTransactionDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
