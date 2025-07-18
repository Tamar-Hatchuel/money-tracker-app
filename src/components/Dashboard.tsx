import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  type: "expense" | "income";
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface DashboardProps {
  onAddTransaction?: () => void;
}

const Dashboard = ({ onAddTransaction }: DashboardProps) => {
  const { toast } = useToast();
  const [balance] = useState(2847.50);
  const [recentTransactions] = useState<Transaction[]>([
    { id: "1", type: "expense", amount: 85.20, description: "Grocery shopping", category: "Food", date: "2024-01-18" },
    { id: "2", type: "income", amount: 3200.00, description: "Salary", category: "Work", date: "2024-01-17" },
    { id: "3", type: "expense", amount: 45.00, description: "Coffee & lunch", category: "Food", date: "2024-01-17" },
    { id: "4", type: "expense", amount: 120.00, description: "Gas station", category: "Transport", date: "2024-01-16" },
    { id: "5", type: "expense", amount: 25.99, description: "Netflix subscription", category: "Entertainment", date: "2024-01-15" },
  ]);

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} clicked`,
      description: `Opening ${action.toLowerCase()} form...`,
    });
    onAddTransaction?.();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">
      {/* Current Balance */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 hover-lift transition-smooth">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground">Current Balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-foreground">₪{balance.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">.50</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-600">+2.5% from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={() => handleQuickAction("Add Expense")}
          variant="outline"
          className="h-20 flex-col space-y-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-smooth"
        >
          <TrendingDown className="h-6 w-6 text-primary" />
          <span className="text-primary font-medium">Add Expense</span>
        </Button>
        
        <Button
          onClick={() => handleQuickAction("Add Income")}
          variant="outline"
          className="h-20 flex-col space-y-2 border-accent/30 hover:bg-accent/10 hover:border-accent/50 transition-smooth"
        >
          <TrendingUp className="h-6 w-6 text-green-600" />
          <span className="text-green-600 font-medium">Add Income</span>
        </Button>
        
        <Button
          onClick={() => handleQuickAction("Set Budget")}
          variant="outline"
          className="h-20 flex-col space-y-2 border-sky/30 hover:bg-sky/10 hover:border-sky/50 transition-smooth"
        >
          <DollarSign className="h-6 w-6 text-sky" />
          <span className="text-sky font-medium">Set Budget</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="border-border shadow-sm hover-lift transition-smooth">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Transactions
              <Button size="sm" onClick={onAddTransaction} className="bg-secondary hover:bg-secondary/80">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </CardTitle>
            <CardDescription>Your latest 5 transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth border border-transparent hover:border-border"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === "expense" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-green-100 text-green-600"
                  }`}>
                    {transaction.type === "expense" 
                      ? <TrendingDown className="h-4 w-4" /> 
                      : <TrendingUp className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === "expense" ? "text-primary" : "text-green-600"
                  }`}>
                    {transaction.type === "expense" ? "-" : "+"}₪{transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="border-border shadow-sm hover-lift transition-smooth">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-accent" />
              <span>Category Breakdown</span>
            </CardTitle>
            <CardDescription>This week's spending by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { category: "Food", amount: 285.20, percentage: 45, color: "bg-primary" },
              { category: "Transport", amount: 120.00, percentage: 19, color: "bg-secondary" },
              { category: "Entertainment", amount: 95.99, percentage: 15, color: "bg-accent" },
              { category: "Shopping", amount: 78.50, percentage: 12, color: "bg-sky" },
              { category: "Bills", amount: 55.00, percentage: 9, color: "bg-peach" },
            ].map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-muted-foreground">₪{item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;