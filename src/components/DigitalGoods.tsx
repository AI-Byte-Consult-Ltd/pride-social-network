import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  ShoppingBag, 
  Coins, 
  CreditCard, 
  Sparkles,
  Palette,
  Award,
  Sticker
} from "lucide-react";

interface DigitalItem {
  id: string;
  name: string;
  description: string | null;
  price_pride: number;
  category: string;
  image_url: string | null;
}

const categoryIcons: Record<string, React.ReactNode> = {
  sticker: <Sticker className="h-10 w-10" />,
  avatar: <Palette className="h-10 w-10" />,
  badge: <Award className="h-10 w-10" />,
  theme: <Sparkles className="h-10 w-10" />,
};

export const DigitalGoods = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<DigitalItem[]>([]);
  const [prideBalance, setPrideBalance] = useState(0);

  useEffect(() => {
    fetchItems();
    if (user) {
      fetchBalance();
    }
  }, [user]);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("shop_items")
      .select("id, name, description, price_pride, category, image_url")
      .eq("is_active", true)
      .order("price_pride", { ascending: true })
      .limit(6);

    if (data) {
      setItems(data);
    }
  };

  const fetchBalance = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("pride_balance")
      .eq("id", user.id)
      .single();

    if (data) {
      setPrideBalance(Number(data.pride_balance) || 0);
    }
  };

  const handlePridePurchase = async (item: DigitalItem) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to make a purchase",
        variant: "destructive",
      });
      return;
    }

    if (prideBalance < item.price_pride) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough PRIDE tokens",
        variant: "destructive",
      });
      return;
    }

    const { error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        item_id: item.id,
        price_paid: item.price_pride,
      });

    if (purchaseError) {
      toast({
        title: "Error",
        description: "Failed to process purchase",
        variant: "destructive",
      });
      return;
    }

    const newBalance = prideBalance - item.price_pride;
    await supabase
      .from("profiles")
      .update({ pride_balance: newBalance })
      .eq("id", user.id);

    setPrideBalance(newBalance);
    
    toast({
      title: "Purchase Successful!",
      description: `You've purchased ${item.name}`,
    });
  };

  const handleStripePurchase = (item: DigitalItem) => {
    toast({
      title: "Coming Soon",
      description: "Stripe payments will be available soon!",
    });
  };

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      sticker: "from-pink-500/20 to-rose-500/20",
      avatar: "from-blue-500/20 to-cyan-500/20",
      badge: "from-purple-500/20 to-violet-500/20",
      theme: "from-amber-500/20 to-orange-500/20",
    };
    return gradients[category] || "from-primary/20 to-accent/20";
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-pride bg-clip-text text-transparent">
            Digital Goods
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Exclusive items to personalize your Pride experience
          </p>
          {user && (
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="font-semibold">{prideBalance} PRIDE available</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {items.map((item) => (
            <Card 
              key={item.id} 
              className={`p-6 border-border/50 bg-gradient-to-br ${getCategoryGradient(item.category)} hover:shadow-pride transition-all group`}
            >
              <div className="flex flex-col h-full">
                <div className="aspect-square bg-card/50 rounded-xl mb-4 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  {categoryIcons[item.category] || <ShoppingBag className="h-10 w-10" />}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold flex-1">{item.name}</h3>
                  <Badge variant="secondary" className="capitalize">
                    {item.category}
                  </Badge>
                </div>
                
                {item.description && (
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {item.description}
                  </p>
                )}
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center justify-center gap-2 text-lg font-bold text-primary">
                    <Coins className="h-5 w-5" />
                    <span>{item.price_pride} PRIDE</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handlePridePurchase(item)}
                      size="sm"
                      className="w-full"
                      disabled={!user || prideBalance < item.price_pride}
                    >
                      <Coins className="h-4 w-4 mr-1" />
                      PRIDE
                    </Button>
                    <Button
                      onClick={() => handleStripePurchase(item)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <CreditCard className="h-4 w-4 mr-1" />
                      Card
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {items.length === 0 && (
          <Card className="p-12 text-center border-border/50 bg-card">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              Digital goods will be available soon. Stay tuned!
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};
