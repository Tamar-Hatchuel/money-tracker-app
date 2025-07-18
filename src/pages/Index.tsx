// src/pages/Index.tsx

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import TransactionModal from "@/components/TransactionModal";
import { useToast } from "@/hooks/use-toast";

export default function IndexPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Check existing session and subscribe to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsAuthenticated(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") setIsAuthenticated(true);
      if (event === "SIGNED_OUT") setIsAuthenticated(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Sign‑in handler
  const handleSignIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!", description: "You've successfully signed in." });
  };

  // Sign‑up handler
  const handleSignUp = async (email: string, password: string) => {
    // 1️⃣ Create the auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      toast({ title: "Sign up failed", description: signUpError.message, variant: "destructive" });
      return;
    }

    // 2️⃣ Insert profile row
    const user = authData.user!;
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: "",
        avatar_url: null,
        preferred_currency: "₪",
        date_format: "DD/MM/YYYY",
        timezone: "Asia/Jerusalem",
      });
    if (profileError) {
      toast({ title: "Profile creation failed", description: profileError.message, variant: "destructive" });
      return;
    }

    toast({ title: "Account created!", description: "✅ Check your inbox for a verification link." });
  };

  // Remove sample data on first real login
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const uid = session.user.id;
        supabase.from("categories").delete().neq("user_id", uid);
        supabase.from("transactions").delete().neq("user_id", uid);
        supabase.from("budgets").delete().neq("user_id", uid);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Render AuthForm until user is authenticated
  if (!isAuthenticated) {
    return <AuthForm onSignIn={handleSignIn} onSignUp={handleSignUp} />;
  }

  // Once signed in, show the main app
  return (
    <div className="min-h-screen bg-background">
      <Header onSignOut={() => supabase.auth.signOut()} />
      <Dashboard />
      <TransactionModal />
    </div>
  );
}
