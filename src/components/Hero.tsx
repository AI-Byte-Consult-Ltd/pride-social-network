import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Heart, Users, Coins, Sparkles } from "lucide-react";
import prideHeroBg from "@/assets/pride-hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Winter/Christmas Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${prideHeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-900/90 to-emerald-950/50" />
      </div>

      {/* Snowflakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/60 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${8 + Math.random() * 16}px`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Festive floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 bg-red-500/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-amber-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-32 w-20 h-20 bg-red-400/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Christmas decorations */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-4xl">
        <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎄</span>
        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎅</span>
        <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>⭐</span>
        <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🎄</span>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          {/* Holiday banner */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 via-emerald-600/20 to-red-600/20 border border-red-500/30 rounded-full px-6 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-amber-200 font-medium">Happy Holidays & New Year 2025! 🎉</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold">
              <span className="bg-gradient-to-r from-red-400 via-emerald-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
                Pride
              </span>
              <br />
              <span className="text-white drop-shadow-lg">Social Network</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto">
              ✨ The first Web3 social network where inclusivity meets innovation. 
              Earn PRIDE coins for activity and be part of the revolution! 🎁
            </p>
          </div>

          {/* Stats cards with festive styling */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-red-950/60 to-red-900/40 border-red-500/30 p-6 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all duration-300 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-2">
                <Heart className="w-8 h-8 text-red-400" />
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-red-200/70">Likes</div>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-950/60 to-blue-900/40 border-blue-400/30 p-6 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-2">
                <Users className="w-8 h-8 text-blue-400" />
                <div className="text-2xl font-bold text-white">5K+</div>
                <div className="text-sm text-blue-200/70">Users</div>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-emerald-950/60 to-emerald-900/40 border-emerald-500/30 p-6 hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] transition-all duration-300 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-2">
                <Coins className="w-8 h-8 text-emerald-400" />
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-sm text-emerald-200/70">PRIDE tokens</div>
              </div>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-950/60 to-amber-900/40 border-amber-500/30 p-6 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-2">
                <Wallet className="w-8 h-8 text-amber-400" />
                <div className="text-2xl font-bold text-white">Web3</div>
                <div className="text-sm text-amber-200/70">Wallets</div>
              </div>
            </Card>
          </div>

          {/* CTA buttons with festive styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white shadow-lg shadow-red-500/25 border-0"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet 🎁
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Learn More ⭐
            </Button>
          </div>

          {/* New Year countdown hint */}
          <div className="pt-8">
            <p className="text-blue-200/60 text-sm">
              🎊 Celebrate with us — special rewards for early adopters! 🎊
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
