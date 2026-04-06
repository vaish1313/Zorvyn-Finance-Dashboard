import { Transaction, Category } from "./types";

const categories: { income: Category[]; expense: Category[] } = {
  income: ["Salary", "Freelance", "Investments"],
  expense: ["Food & Dining", "Shopping", "Transportation", "Entertainment", "Utilities", "Healthcare", "Travel", "Education", "Rent"],
};

const incomeDescriptions: Record<string, string[]> = {
  Salary: ["Monthly Salary", "Bonus Payment", "Overtime Pay"],
  Freelance: ["Design Project", "Consulting Fee", "Content Writing"],
  Investments: ["Dividend Income", "Stock Sale", "Interest Payment"],
};

const expenseDescriptions: Record<string, string[]> = {
  "Food & Dining": ["Grocery Store", "Restaurant Dinner", "Coffee Shop", "Food Delivery"],
  Shopping: ["Amazon Purchase", "Clothing Store", "Electronics", "Home Goods"],
  Transportation: ["Gas Station", "Uber Ride", "Car Maintenance", "Parking Fee"],
  Entertainment: ["Netflix Subscription", "Movie Tickets", "Concert Tickets", "Gaming"],
  Utilities: ["Electric Bill", "Water Bill", "Internet Bill", "Phone Bill"],
  Healthcare: ["Pharmacy", "Doctor Visit", "Gym Membership", "Dental Checkup"],
  Travel: ["Flight Booking", "Hotel Stay", "Travel Insurance"],
  Education: ["Online Course", "Book Purchase", "Workshop Fee"],
  Rent: ["Monthly Rent", "Lease Renewal Fee"],
};

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTransactions(): Transaction[] {
  const txns: Transaction[] = [];
  const start = new Date("2024-07-01");
  const end = new Date("2025-06-30");

  // Generate income transactions
  for (let i = 0; i < 24; i++) {
    const cat = pick(categories.income);
    txns.push({
      id: `inc-${i}`,
      date: randomDate(start, end),
      description: pick(incomeDescriptions[cat]),
      amount: cat === "Salary" ? 4500 + Math.round(Math.random() * 1000) : 200 + Math.round(Math.random() * 2000),
      type: "income",
      category: cat,
    });
  }

  // Generate expense transactions
  for (let i = 0; i < 60; i++) {
    const cat = pick(categories.expense);
    txns.push({
      id: `exp-${i}`,
      date: randomDate(start, end),
      description: pick(expenseDescriptions[cat]),
      amount: cat === "Rent" ? 1200 + Math.round(Math.random() * 300) : 10 + Math.round(Math.random() * 300),
      type: "expense",
      category: cat,
    });
  }

  return txns.sort((a, b) => b.date.localeCompare(a.date));
}

export const mockTransactions = generateTransactions();

export function getMonthlyData(transactions: Transaction[]) {
  const months: Record<string, { income: number; expense: number }> = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!months[month]) months[month] = { income: 0, expense: 0 };
    months[month][t.type] += t.amount;
  });

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense,
    }));
}

export function getCategoryBreakdown(transactions: Transaction[]) {
  const cats: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      cats[t.category] = (cats[t.category] || 0) + t.amount;
    });

  const colors = [
    "hsl(172, 66%, 40%)", "hsl(350, 65%, 55%)", "hsl(38, 92%, 50%)",
    "hsl(220, 60%, 55%)", "hsl(280, 50%, 55%)", "hsl(160, 50%, 50%)",
    "hsl(20, 70%, 55%)", "hsl(200, 60%, 50%)", "hsl(320, 50%, 50%)",
  ];

  return Object.entries(cats)
    .map(([category, amount], i) => ({ category, amount, fill: colors[i % colors.length] }))
    .sort((a, b) => b.amount - a.amount);
}
