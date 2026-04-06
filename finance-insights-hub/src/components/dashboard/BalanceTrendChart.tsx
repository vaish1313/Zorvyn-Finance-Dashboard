import { useDashboard } from "@/context/DashboardContext";
import { getMonthlyData } from "@/data/mockData";
import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function BalanceTrendChart() {
  const { transactions } = useDashboard();
  const data = useMemo(() => getMonthlyData(transactions), [transactions]);

  return (
    <div className="glass-card rounded-xl p-4 sm:p-5 lg:p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">Balance Trend</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Income vs Expenses over time</p>
      <div className="h-[220px] sm:h-[280px]">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-xs sm:text-sm">No data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(346, 77%, 50%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(346, 77%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215, 20%, 65%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215, 20%, 65%)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "hsl(222, 47%, 8%)", 
                  borderRadius: 12, 
                  border: "1px solid hsl(217, 33%, 17%)", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(12px)",
                  fontSize: "12px"
                }}
                labelStyle={{ color: "hsl(210, 40%, 98%)", fontSize: "12px" }}
                itemStyle={{ color: "hsl(215, 20%, 65%)", fontSize: "11px" }}
                formatter={(value: number) => [`${value.toLocaleString()}`, undefined]}
              />
              <Area type="monotone" dataKey="income" stroke="hsl(142, 76%, 36%)" fill="url(#incomeGrad)" strokeWidth={2} name="Income" />
              <Area type="monotone" dataKey="expense" stroke="hsl(346, 77%, 50%)" fill="url(#expenseGrad)" strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
