import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Gift, Activity, User } from "lucide-react";
import { rewardList } from "@/components/RewardSystem";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [connected, setConnected] = useState(false);

  // ✅ Connect wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask or another Web3 wallet.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      setConnected(true);
    } catch (error) {
      console.error("Wallet connection error:", error);
      setConnected(false);
    }
  };

  // ✅ Calculate total reward (mock balance based on RewardSystem)
  useEffect(() => {
    const total = rewardList.reduce((sum, r) => {
      const numeric = parseFloat(r.amount.toString());
      return sum + (isNaN(numeric) ? 0 : numeric);
    }, 0);
    setBalance(total * 100); // mock multiplier to simulate activity
  }, []);

  // ✅ UI
  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-5xl space-y-10">
        <h1 className="text-5xl font-bold text-center bg-gradient-pride bg-clip-text text-transparent">
          Your Dashboard
        </h1>

        {/* Connect wallet section */}
        {!connected ? (
          <div className="text-center mt-10">
            <p className="text-muted-foreground mb-6 text-lg">
              Connect your wallet to access your profile and rewards.
            </p>
            <Button
              onClick={connectWallet}
              variant="pride"
              size="lg"
              className="text-lg px-10 py-6"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          </div>
        ) : (
          <>
            {/* Wallet Info */}
            <Card className="p-6 shadow-lg bg-card/70 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                    <User className="h-6 w-6 text-primary" /> Profile
                  </h2>
                  <div className="font-mono text-sm truncate mb-1">
                    {walletAddress}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Connected via MetaMask
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-lg text-muted-foreground">
                    Balance:
                  </div>
                  <div className="text-3xl font-bold text-pride-green">
                    {balance.toFixed(2)} PRIDE
                  </div>
                </div>
              </div>
            </Card>

            {/* Rewards Overview */}
            <Card className="p-6 bg-card/70 backdrop-blur-md">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                <Gift className="h-6 w-6 text-secondary" /> Available Rewards
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewardList.map((reward, index) => {
                  const IconComponent = reward.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center bg-muted/20 rounded-xl p-4 hover:bg-muted/30 transition-all"
                    >
                      <IconComponent className={`h-8 w-8 mb-2 text-${reward.color}`} />
                      <div className="font-bold text-foreground mb-1">
                        {reward.action}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {reward.amount}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Activity History */}
            <Card className="p-6 bg-card/70 backdrop-blur-md">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                <Activity className="h-6 w-6 text-accent" /> Recent Activity
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-md flex justify-between">
                  <span>Liked 5 posts</span>
                  <span className="text-pride-red font-semibold">+0.5 PRIDE</span>
                </div>
                <div className="p-3 bg-muted/30 rounded-md flex justify-between">
                  <span>Created new post</span>
                  <span className="text-pride-purple font-semibold">+1.0 PRIDE</span>
                </div>
                <div className="p-3 bg-muted/30 rounded-md flex justify-between">
                  <span>Daily login bonus</span>
                  <span className="text-pride-orange font-semibold">+2.0 PRIDE</span>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;