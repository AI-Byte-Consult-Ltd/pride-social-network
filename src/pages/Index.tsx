import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import TokenInfo from "@/components/TokenInfo";
import BuyPrideCoins from "@/components/BuyPrideCoins";
import WalletConnection from "@/components/WalletConnection";
import RewardSystem from "@/components/RewardSystem";
import Dashboard from "@/components/Dashboard";
import FAQ from "@/components/FAQ";
import JoinForm from "@/components/JoinForm";
import Footer from "@/components/Footer";
import { ShopPreview } from "@/components/ShopPreview";

const Index = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Auth Navigation */}
      <div className="fixed top-4 right-4 z-50">
        {user ? (
          <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border rounded-lg p-2">
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-1" />
                Profile
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button variant="default" size="sm">
              <LogIn className="h-4 w-4 mr-1" />
              Sign In
            </Button>
          </Link>
        )}
      </div>

      <Hero />
      <TokenInfo />
      <BuyPrideCoins />
      <WalletConnection />
      <RewardSystem />
      <Dashboard />
      <ShopPreview />
      <FAQ />
      <JoinForm />
      <Footer />
    </div>
  );
};

export default Index;
