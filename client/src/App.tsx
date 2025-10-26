import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/LandingPage";
import CongratulationsPage from "@/pages/CongratulationsPage";
import PaymentPage from "@/pages/PaymentPage";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentFailure from "@/pages/PaymentFailure";
import NotFound from "@/pages/not-found";
import type { InsertContact } from "@shared/schema";

function Router() {
  const [, setLocation] = useLocation();
  const [contactData, setContactData] = useState<InsertContact | null>(null);

  const handleSignup = (data: InsertContact) => {
    setContactData(data);
    setLocation("/congratulations");
  };

  const handleRedirect = () => {
    setLocation("/payment");
  };

  return (
    <Switch>
      <Route path="/" component={() => <LandingPage onSubmit={handleSignup} />} />
      <Route path="/congratulations" component={() => <CongratulationsPage onRedirect={handleRedirect} />} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route path="/payment/failure" component={PaymentFailure} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
