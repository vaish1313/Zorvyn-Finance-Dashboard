import { useDashboard } from "@/context/DashboardContext";
import { getCategoryBreakdown } from "@/data/mockData";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function SpendingBreakdown() {
  const { transactions } = useDashboard();
  const data = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const total = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="glass-card rounded-xl p-4 sm:p-5 lg:p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">Spending Breakdown</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">By category</p>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[220px] sm:h-[280px] text-muted-foreground text-xs sm:text-sm">No expenses yet</div>
      ) : (
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="h-[140px] sm:h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} strokeWidth={0}>
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()}`, undefined]} 
                  contentStyle={{ 
                    backgroundColor: "hsl(222, 47%, 8%)", 
                    borderRadius: 12, 
                    border: "1px solid hsl(217, 33%, 17%)",
                    backdropFilter: "blur(12px)",
                    fontSize: "12px"
                  }}
                  labelStyle={{ color: "hsl(210, 40%, 98%)", fontSize: "12px" }}
                  itemStyle={{ color: "hsl(215, 20%, 65%)", fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full space-y-1.5 sm:space-y-2">
            {data.slice(0, 5).map((item) => (
              <div key={item.category} className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-foreground truncate">{item.category}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <span className="font-medium text-foreground">${item.amount.toLocaleString()}</span>
                  <span className="text-muted-foreground text-xs">({((item.amount / total) * 100).toFixed(0)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
