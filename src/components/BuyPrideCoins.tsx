import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coins, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BuyPrideCoins = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  // 💳 Здесь добавь реальные ссылки для каждой платформы
  const paymentLinks = {
    20: {
      stripe: "https://buy.stripe.com/3cI28qezY7HufL74gZaVa0K",
      paypal: "https://www.paypal.com/pay?amount=20",
      coinbase: "https://commerce.coinbase.com/checkout/83c1716b-c032-4e52-b7b5-efbc01cd57b3",
    },
    50: {
      stripe: "https://buy.stripe.com/test_50usd_link",
      paypal: "https://www.paypal.com/pay?amount=50",
      coinbase: "https://commerce.coinbase.com/checkout/147565e8-9550-490d-abc7-99f47097b1f2",
    },
    100: {
      stripe: "https://buy.stripe.com/test_100usd_link",
      paypal: "https://www.paypal.com/pay?amount=100",
      coinbase: "https://commerce.coinbase.com/checkout/83c1716b-c032-4e52-b7b5-efbc01cd57b3",
    },
  };

  const amounts = [
    { value: 20, coins: "200" },
    { value: 50, coins: "500" },
    { value: 100, coins: "1,000" },
  ];

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setShowPaymentDialog(true);
  };

  const handlePaymentMethod = (method: string) => {
    if (!selectedAmount) return;

    const urls = paymentLinks[selectedAmount];
    let link = "";

    if (method === "Stripe") link = urls.stripe;
    if (method === "PayPal") link = urls.paypal;
    if (method === "Coinbase Commerce") link = urls.coinbase;

    // 🔗 Открываем ссылку в новой вкладке
    if (link) window.open(link, "_blank", "noopener,noreferrer");

    setShowPaymentDialog(false);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Coins className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Get Started</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Buy PRIDE Coins
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your amount and select your preferred payment method
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {amounts.map((amount) => (
            <Card
              key={amount.value}
              className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => handleAmountClick(amount.value)}
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    ${amount.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get {amount.coins} PRIDE
                  </div>
                </div>
                <Button className="w-full" variant="pride">
                  Buy Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
            <DialogDescription>
              Select how you'd like to pay for ${selectedAmount} worth of PRIDE coins
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full h-14 text-lg"
              onClick={() => handlePaymentMethod("Stripe")}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Pay with Stripe
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 text-lg"
              onClick={() => handlePaymentMethod("PayPal")}
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 0 1-.794.68H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z" />
              </svg>
              Pay with PayPal
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 text-lg"
              onClick={() => handlePaymentMethod("Coinbase Commerce")}
            >
              <Coins className="mr-2 h-5 w-5" />
              Pay with Coinbase Commerce
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BuyPrideCoins;
