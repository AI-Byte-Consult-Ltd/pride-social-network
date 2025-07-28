import Hero from "@/components/Hero";
import TokenInfo from "@/components/TokenInfo";
import WalletConnection from "@/components/WalletConnection";
import RewardSystem from "@/components/RewardSystem";
import Dashboard from "@/components/Dashboard";
import FAQ from "@/components/FAQ";
import JoinForm from "@/components/JoinForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <TokenInfo />
      <WalletConnection />
      <RewardSystem />
      <Dashboard />
      <FAQ />
      <JoinForm />
      <Footer />
    </div>
  );
};

export default Index;
