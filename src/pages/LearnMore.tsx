import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <section className="py-20 px-6 min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-5xl space-y-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-pride bg-clip-text text-transparent">
          Discover Pride Social Network
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Pride Social Network is an AI + Web3 ecosystem where users earn rewards
          for being active, creative, and authentic. Connect your wallet, post,
          engage, and grow your presence while earning $PRIDE tokens.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <Card className="p-8 bg-gradient-card border-pride-blue/30">
            <h3 className="text-2xl font-semibold mb-2">🏆 Earn Rewards</h3>
            <p className="text-muted-foreground">
              Every like, comment, and post brings you PRIDE tokens. Activity = reward.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-card border-pride-purple/30">
            <h3 className="text-2xl font-semibold mb-2">🔐 Connect Securely</h3>
            <p className="text-muted-foreground">
              Log in via MetaMask or WalletConnect. Own your data, own your identity.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-card border-pride-green/30">
            <h3 className="text-2xl font-semibold mb-2">👤 Anonymous Avatars</h3>
            <p className="text-muted-foreground">
              Prefer privacy? Use an AI-generated anonymous avatar — express yourself safely.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-card border-pride-red/30">
            <h3 className="text-2xl font-semibold mb-2">🎨 Create & Share</h3>
            <p className="text-muted-foreground">
              Post stories, art, NFTs, or videos — build your creative identity.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-card border-pride-orange/30">
            <h3 className="text-2xl font-semibold mb-2">🪙 Buy PRIDE Tokens</h3>
            <p className="text-muted-foreground">
              Get PRIDE via Stripe, PayPal or Coinbase Commerce and support the community.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-card border-pride-yellow/30">
            <h3 className="text-2xl font-semibold mb-2">💫 AI Integration</h3>
            <p className="text-muted-foreground">
              NICS AI powers content moderation, recommendations, and personal assistants.
            </p>
          </Card>
        </div>

        <div className="mt-12">
          <Link to="/">
            <Button variant="pride" size="lg" className="px-10 py-6 text-lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
