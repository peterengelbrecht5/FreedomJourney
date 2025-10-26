import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment submitted:", { cardNumber, expiryDate, cvv, cardholderName });
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
              <Label htmlFor="cardholderName" className="text-lg font-medium mb-2 block">
                Cardholder Name
              </Label>
              <Input
                id="cardholderName"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                placeholder="John Smith"
                className="h-14 text-lg"
                data-testid="input-cardholder-name"
              />
            </div>

            <div>
              <Label htmlFor="cardNumber" className="text-lg font-medium mb-2 block">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="h-14 text-lg"
                maxLength={19}
                data-testid="input-card-number"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="expiryDate" className="text-lg font-medium mb-2 block">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="h-14 text-lg"
                  maxLength={5}
                  data-testid="input-expiry"
                />
              </div>

              <div>
                <Label htmlFor="cvv" className="text-lg font-medium mb-2 block">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="h-14 text-lg"
                  maxLength={4}
                  type="password"
                  data-testid="input-cvv"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold mt-8"
              data-testid="button-complete-payment"
            >
              Complete Payment
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Secured by Yoco Payment Gateway</span>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </Card>
      </div>
    </div>
  );
}
