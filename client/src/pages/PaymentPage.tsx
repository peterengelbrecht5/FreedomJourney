import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function PaymentPage() {
  const [amount, setAmount] = useState("100.00");
  const { toast } = useToast();

  const createCheckoutMutation = useMutation({
    mutationFn: async (amountInRands: number) => {
      const amountInCents = Math.round(amountInRands * 100);
      const response = await apiRequest("POST", "/api/yoco/create-checkout", {
        amount: amountInCents,
        currency: "ZAR",
        metadata: {
          source: "financial-freedom-landing",
        },
      });
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    },
    onError: (error: any) => {
      console.error("Checkout error:", error);
      
      let errorMessage = "Failed to initialize payment. Please try again.";
      
      if (error.message) {
        const match = error.message.match(/\d+: ({.*})/);
        if (match) {
          try {
            const errorData = JSON.parse(match[1]);
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            errorMessage = error.message;
          }
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    
    if (isNaN(amountValue) || amountValue < 2) {
      toast({
        title: "Invalid Amount",
        description: "Minimum payment amount is R2.00",
        variant: "destructive",
      });
      return;
    }

    createCheckoutMutation.mutate(amountValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/5 to-primary/5 px-6 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Final Step to Your Dream Life
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            You're about to unlock financial freedom and transform your future. Complete your secure payment to begin your journey.
          </p>
        </div>

        <Card className="max-w-md mx-auto p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Payment Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="amount" className="text-lg font-medium mb-2 block">
                Payment Amount (ZAR)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">R</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="2"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100.00"
                  className="h-14 text-lg pl-10"
                  data-testid="input-amount"
                  disabled={createCheckoutMutation.isPending}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Minimum: R2.00</p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold mt-8"
              data-testid="button-proceed-payment"
              disabled={createCheckoutMutation.isPending}
            >
              {createCheckoutMutation.isPending ? "Processing..." : "Proceed to Secure Payment"}
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Secured by Yoco Payment Gateway</span>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            You will be redirected to Yoco's secure payment page to complete your transaction. All payment information is encrypted and secure.
          </p>
        </Card>
      </div>
    </div>
  );
}
