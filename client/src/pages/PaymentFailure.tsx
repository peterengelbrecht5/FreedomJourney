import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function PaymentFailure() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/10 via-background to-accent/10 px-6">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-8">
          <XCircle className="w-12 h-12 text-destructive" data-testid="icon-payment-failure" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Payment Failed
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-lg mx-auto">
          Your payment could not be processed. This may be due to insufficient funds, an expired card, or a network issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => setLocation("/payment")}
            className="h-12 px-8 text-lg"
            data-testid="button-try-again"
          >
            Try Again
          </Button>
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="h-12 px-8 text-lg"
            data-testid="button-back-home"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
