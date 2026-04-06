import { LayoutDashboard } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="p-1.5 sm:p-2 md:p-2.5 rounded-xl bg-primary/10 border border-primary/20">
          <LayoutDashboard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Finance Dashboard</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Track your financial activity</p>
        </div>
      </div>
    </header>
  );
}
