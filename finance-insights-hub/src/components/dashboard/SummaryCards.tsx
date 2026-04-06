import { useDashboard } from "@/context/DashboardContext";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

const cards = [
  { key: "balance" as const, label: "Total Balance", icon: Wallet, color: "primary" },
  { key: "income" as const, label: "Total Income", icon: TrendingUp, color: "income" },
  { key: "expenses" as const, label: "Total Expenses", icon: TrendingDown, color: "expense" },
] as const;

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useDashboard();

  const values = { balance: totalBalance, income: totalIncome, expenses: totalExpenses };

  const colorMap = {
    primary: { bg: "bg-primary/10", text: "text-primary", icon: "text-primary" },
    income: { bg: "bg-income-muted", text: "text-income", icon: "text-income" },
    expense: { bg: "bg-expense-muted", text: "text-expense", icon: "text-expense" },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {cards.map((card, i) => {
        const cm = colorMap[card.color];
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="glass-card rounded-xl p-4 sm:p-5 lg:p-6 animate-slide-up hover:shadow-md transition-shadow"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{card.label}</span>
              <div className={`p-1.5 sm:p-2 rounded-lg ${cm.bg}`}>
                <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${cm.icon}`} />
              </div>
            </div>
            <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${cm.text} break-all`}>
              {formatCurrency(values[card.key])}
            </p>
            <div className="flex items-center gap-1 mt-1.5 sm:mt-2 text-xs text-muted-foreground">
              {card.key === "expenses" ? (
                <ArrowDownRight className="h-3 w-3 flex-shrink-0 text-expense" />
              ) : (
                <ArrowUpRight className="h-3 w-3 flex-shrink-0 text-income" />
              )}
              <span className="truncate">vs last period</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
