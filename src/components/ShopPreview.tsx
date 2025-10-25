import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Coins, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ShopItem {
  id: string;
  name: string;
  price_pride: number;
  category: string;
}

export const ShopPreview = () => {
  const [items, setItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    fetchPreviewItems();
  }, []);

  const fetchPreviewItems = async () => {
    const { data } = await supabase
      .from("shop_items")
      .select("id, name, price_pride, category")
      .eq("is_active", true)
      .limit(3);

    if (data) {
      setItems(data);
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-pride bg-clip-text text-transparent">
            Pride Shop
          </h2>
          <p className="text-xl text-muted-foreground">
            Exclusive digital goods powered by PRIDE tokens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {items.map((item) => (
            <Card key={item.id} className="p-6 border-border/50 bg-gradient-card hover:shadow-pride transition-all">
              <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <div className="flex items-center gap-1 text-primary font-bold">
                <Coins className="h-4 w-4" />
                <span>{item.price_pride} PRIDE</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/profile">
            <Button size="lg" className="group">
              Visit Shop
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};