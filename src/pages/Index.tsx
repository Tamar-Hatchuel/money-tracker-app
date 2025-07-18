import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import TransactionModal from "@/components/TransactionModal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (email: string, password: string) => {
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAuthenticated(true);
    toast({
      title: "Welcome back!",
      description: "You've successfully signed in to SpendTrack.",
    });
  };

  const handleSignUp = async (email: string, password: string) => {
    // Simulate account creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAuthenticated(true);
    toast({
      title: "Account created!",
      description: "Welcome to SpendTrack! ✨",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  if (!isAuthenticated) {
    return (
      <AuthForm 
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLogoutClick={handleLogout}
        onProfileClick={() => toast({ title: "Profile", description: "Profile settings coming soon!" })}
      />
      
      <main>
        <Dashboard onAddTransaction={() => setShowTransactionModal(true)} />
      </main>

      <TransactionModal
        open={showTransactionModal}
        onOpenChange={setShowTransactionModal}
      />
    </div>
  );
};

export default Index;
