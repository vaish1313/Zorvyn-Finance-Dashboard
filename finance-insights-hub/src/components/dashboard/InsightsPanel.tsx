import { useDashboard } from "@/context/DashboardContext";
import { getCategoryBreakdown, getMonthlyData } from "@/data/mockData";
import { useMemo } from "react";
import { Lightbulb, TrendingUp, AlertTriangle, PiggyBank } from "lucide-react";

export default function InsightsPanel() {
  const { transactions, totalIncome, totalExpenses } = useDashboard();

  const insights = useMemo(() => {
    const result: { icon: any; title: string; description: string; color: string }[] = [];

    const breakdown = getCategoryBreakdown(transactions);
    if (breakdown.length > 0) {
      result.push({
        icon: AlertTriangle,
        title: "Highest Spending",
        description: `${breakdown[0].category} is your top expense at $${breakdown[0].amount.toLocaleString()}`,
        color: "text-warning",
      });
    }

    const monthly = getMonthlyData(transactions);
    if (monthly.length >= 2) {
      const last = monthly[monthly.length - 1];
      const prev = monthly[monthly.length - 2];
      const diff = last.expense - prev.expense;
      result.push({
        icon: TrendingUp,
        title: "Monthly Comparison",
        description: diff > 0
          ? `Spending increased by $${diff.toLocaleString()} vs last month`
          : `Spending decreased by $${Math.abs(diff).toLocaleString()} vs last month`,
        color: diff > 0 ? "text-expense" : "text-income",
      });
    }

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(0) : 0;
    result.push({
      icon: PiggyBank,
      title: "Savings Rate",
      description: `You're saving ${savingsRate}% of your income. ${Number(savingsRate) >= 20 ? "Great job!" : "Try to save at least 20%."}`,
      color: Number(savingsRate) >= 20 ? "text-income" : "text-warning",
    });

    if (breakdown.length >= 3) {
      const top3 = breakdown.slice(0, 3).map((b) => b.category).join(", ");
      result.push({
        icon: Lightbulb,
        title: "Top 3 Categories",
        description: `${top3} make up most of your spending`,
        color: "text-primary",
      });
    }

    return result;
  }, [transactions, totalIncome, totalExpenses]);

  return (
    <div className="glass-card rounded-xl p-5 lg:p-6 animate-slide-up" style={{ animationDelay: "500ms" }}>
      <h3 className="text-base font-semibold text-foreground mb-1">Insights</h3>
      <p className="text-sm text-muted-foreground mb-4">Smart observations from your data</p>

      {insights.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">Add more transactions to unlock insights</div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-accent/50">
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${insight.color}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{insight.title}</p>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
