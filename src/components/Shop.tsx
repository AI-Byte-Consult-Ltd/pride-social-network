import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { ShoppingCart, Coins } from "lucide-react";

interface ShopItem {
  id: string;
  name: string;
  description: string | null;
  price_pride: number;
  category: string;
  image_url: string | null;
  is_active: boolean;
}

interface ShopProps {
  onPurchase?: () => void;
  prideBalance: number;
}

export const Shop = ({ onPurchase, prideBalance }: ShopProps) => {
  const { user } = useAuth();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchShopItems();
  }, []);

  const fetchShopItems = async () => {
    const { data, error } = await supabase
      .from("shop_items")
      .select("*")
      .eq("is_active", true)
      .order("price_pride", { ascending: true });

    if (error) {
      console.error("Error fetching shop items:", error);
      return;
    }

    setItems(data || []);
  };

  const handlePurchase = async (item: ShopItem) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to make a purchase",
        variant: "destructive",
      });
      return;
    }

    if (prideBalance < item.price_pride) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough PRIDE tokens for this purchase",
        variant: "destructive",
      });
      return;
    }

    setLoading(item.id);

    // Create purchase record
    const { error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        item_id: item.id,
        price_paid: item.price_pride,
      });

    if (purchaseError) {
      setLoading(null);
      toast({
        title: "Error",
        description: "Failed to process purchase",
        variant: "destructive",
      });
      return;
    }

    // Update user's PRIDE balance
    const { error: balanceError } = await supabase
      .from("profiles")
      .update({ pride_balance: prideBalance - item.price_pride })
      .eq("id", user.id);

    setLoading(null);

    if (balanceError) {
      toast({
        title: "Error",
        description: "Failed to update balance",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Purchase Successful!",
      description: `You've purchased ${item.name}`,
    });

    onPurchase?.();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      sticker: "bg-pride-red/20 text-pride-red",
      avatar: "bg-pride-blue/20 text-pride-blue",
      badge: "bg-pride-purple/20 text-pride-purple",
      theme: "bg-pride-green/20 text-pride-green",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pride Shop</h2>
        <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2">
          <Coins className="h-5 w-5 text-primary" />
          <span className="font-semibold">{prideBalance} PRIDE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="p-6 border-border/50 bg-gradient-card hover:shadow-pride transition-all">
            <div className="flex flex-col h-full">
              <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold flex-1">{item.name}</h3>
                <Badge className={getCategoryColor(item.category)}>
                  {item.category}
                </Badge>
              </div>
              
              {item.description && (
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {item.description}
                </p>
              )}
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-primary" />
                  <span className="font-bold text-lg">{item.price_pride}</span>
                </div>
                <Button
                  onClick={() => handlePurchase(item)}
                  disabled={loading === item.id || prideBalance < item.price_pride}
                  size="sm"
                >
                  {loading === item.id ? "Processing..." : "Buy Now"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card className="p-12 text-center border-border/50 bg-gradient-card">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Items Available</h3>
          <p className="text-muted-foreground">Check back soon for new items!</p>
        </Card>
      )}
    </div>
  );
};