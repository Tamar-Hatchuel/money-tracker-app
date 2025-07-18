// src/pages/Index.tsx

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/ui/AuthForm";
import Header from "@/components/ui/Header";
import Dashboard from "@/components/ui/Dashboard";
import TransactionModal from "@/components/ui/TransactionModal";
import { useToast } from "@/hooks/use-toast";

export default function IndexPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // On mount, check existing session and subscribe to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsAuthenticated(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") setIsAuthenticated(true);
        if (event === "SIGNED_OUT") setIsAuthenticated(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Sign‐in handler
  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signIn({ email, password });
    setIsLoading(false);

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome back!",
      description: "You've successfully signed in.",
    });
  };

  // Sign‐up handler
  const handleSignUp = async (email: string, password: string) => {
    setIsLoading(true);

    // 1️⃣ Create the auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      setIsLoading(false);
      toast({
        title: "Sign up failed",
        description: signUpError.message,
        variant: "destructive",
      });
      return;
    }

    // 2️⃣ Insert a matching profile row
    const user = authData.user!;
    const { error: profileError } = await sup
