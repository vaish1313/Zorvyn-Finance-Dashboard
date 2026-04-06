import { DashboardProvider } from "@/context/DashboardContext";
import Header from "@/components/dashboard/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Shield, Eye } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import ComponentLoader from "@/components/ui/component-loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'admin' | 'viewer' | null>(null);
  const [loadingStates, setLoadingStates] = useState({
    summary: true,
    balanceTrend: true,
    spendingBreakdown: true,
    transactions: true,
    insights: true,
  });

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'admin' | 'viewer' | null;
    if (!role) {
      navigate('/');
    } else {
      setUserRole(role);
    }

    // Set timers for each component to finish loading after 5 seconds
    const timers = [
      setTimeout(() => setLoadingStates(prev => ({ ...prev, summary: false })), 5000),
      setTimeout(() => setLoadingStates(prev => ({ ...prev, balanceTrend: false })), 5000),
      setTimeout(() => setLoadingStates(prev => ({ ...prev, spendingBreakdown: false })), 5000),
      setTimeout(() => setLoadingStates(prev => ({ ...prev, transactions: false })), 5000),
      setTimeout(() => setLoadingStates(prev => ({ ...prev, insights: false })), 5000),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  if (!userRole) {
    return null;
  }

  return (
    <DashboardProvider>
      <BeamsBackground intensity="subtle" className="min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
          {/* User Info Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 glass-card rounded-xl shadow-xl">
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex-shrink-0 ${
                userRole === 'admin' 
                  ? 'bg-primary/20 border border-primary/30' 
                  : 'bg-secondary/50 border border-border'
              }`}>
                {userRole === 'admin' ? (
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base font-semibold text-foreground truncate">
                  {userRole === 'admin' ? 'Admin Dashboard' : 'Viewer Dashboard'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole === 'admin' ? 'Full access to all features' : 'View-only access'}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 backdrop-blur-sm w-full sm:w-auto"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">Logout</span>
            </Button>
          </div>

          <Header />
          
          {loadingStates.summary ? (
            <ComponentLoader height="auto" />
          ) : (
            <SummaryCards />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-3 sm:mt-4 lg:mt-6">
            <div className="lg:col-span-2 w-full">
              {loadingStates.balanceTrend ? (
                <ComponentLoader height="280px sm:380px" />
              ) : (
                <BalanceTrendChart />
              )}
            </div>
            <div className="w-full">
              {loadingStates.spendingBreakdown ? (
                <ComponentLoader height="280px sm:380px" />
              ) : (
                <SpendingBreakdown />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-3 sm:mt-4 lg:mt-6">
            <div className="lg:col-span-2 w-full">
              {loadingStates.transactions ? (
                <ComponentLoader height="400px sm:500px" />
              ) : (
                <TransactionsTable />
              )}
            </div>
            <div className="w-full">
              {loadingStates.insights ? (
                <ComponentLoader height="400px sm:500px" />
              ) : (
                <InsightsPanel />
              )}
            </div>
          </div>
        </div>
      </BeamsBackground>
    </DashboardProvider>
  );
};

export default Dashboard;
