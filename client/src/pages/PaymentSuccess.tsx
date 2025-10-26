import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-6">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-8">
          <CheckCircle className="w-12 h-12 text-green-500" data-testid="icon-payment-success" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Payment Successful!
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-lg mx-auto">
          Welcome to your journey of financial freedom! Your payment has been processed successfully.
        </p>

        <p className="text-lg text-muted-foreground mb-8">
          Check your email for confirmation details and next steps.
        </p>

        <Button
          onClick={() => setLocation("/")}
          className="h-12 px-8 text-lg"
          data-testid="button-back-home"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
