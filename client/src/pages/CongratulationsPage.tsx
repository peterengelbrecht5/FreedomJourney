import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface CongratulationsPageProps {
  onRedirect: () => void;
}

export default function CongratulationsPage({ onRedirect }: CongratulationsPageProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRedirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-6">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8 animate-pulse">
          <CheckCircle className="w-12 h-12 text-primary" data-testid="icon-success" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Congratulations! You're Ready for Financial Freedom
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-lg mx-auto">
          You've taken the first step toward living the life of your dreams. Get ready to unlock unlimited possibilities.
        </p>

        <p className="text-lg text-muted-foreground/70" data-testid="text-redirect">
          Redirecting you to secure payment in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}
