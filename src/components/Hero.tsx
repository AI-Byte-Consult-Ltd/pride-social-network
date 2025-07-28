import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Heart, Users, Coins } from "lucide-react";
import prideHeroBg from "@/assets/pride-hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${prideHeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pride-red/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-pride-blue/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-pride-purple/20 rounded-full blur-xl animate-pulse delay-2000" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold">
              <span className="bg-gradient-pride bg-clip-text text-transparent">
                Pride
              </span>
              <br />
              <span className="text-foreground">Social Network</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              The first Web3 social network where inclusivity meets innovation. 
              Earn PRIDE tokens for activity and be part of the revolution.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-pride-red/20 p-6 hover:shadow-glow transition-all duration-300">
              <div className="flex flex-col items-center space-y-2">
                <Heart className="w-8 h-8 text-pride-red" />
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </div>
            </Card>
            
            <Card className="bg-gradient-card border-pride-blue/20 p-6 hover:shadow-glow transition-all duration-300">
              <div className="flex flex-col items-center space-y-2">
                <Users className="w-8 h-8 text-pride-blue" />
                <div className="text-2xl font-bold text-foreground">5K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
            </Card>
            
            <Card className="bg-gradient-card border-pride-purple/20 p-6 hover:shadow-glow transition-all duration-300">
              <div className="flex flex-col items-center space-y-2">
                <Coins className="w-8 h-8 text-pride-purple" />
                <div className="text-2xl font-bold text-foreground">1M+</div>
                <div className="text-sm text-muted-foreground">PRIDE tokens</div>
              </div>
            </Card>
            
            <Card className="bg-gradient-card border-pride-green/20 p-6 hover:shadow-glow transition-all duration-300">
              <div className="flex flex-col items-center space-y-2">
                <Wallet className="w-8 h-8 text-pride-green" />
                <div className="text-2xl font-bold text-foreground">Web3</div>
                <div className="text-sm text-muted-foreground">Wallets</div>
              </div>
            </Card>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="pride" size="lg" className="text-lg px-8 py-6">
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
            <Button variant="wallet" size="lg" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;