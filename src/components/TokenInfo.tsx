import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Shield, Globe } from "lucide-react";
import prideCoin from "@/assets/pride-coin.jpg";

const TokenInfo = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-pride bg-clip-text text-transparent">PRIDE</span> Token
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An ERC-20 token that rewards users for social network activity 
            and creates an economy of inclusivity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Token visual */}
          <div className="relative">
            <div className="relative z-10 flex justify-center">
              <div className="relative">
                <img 
                  src={prideCoin} 
                  alt="PRIDE Token" 
                  className="w-80 h-80 rounded-full shadow-glow hover:shadow-pride transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-pride rounded-full opacity-20 animate-pulse" />
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute top-10 left-10 animate-bounce">
              <Badge variant="secondary" className="bg-pride-red/20 text-pride-red border-pride-red/30">
                ERC-20
              </Badge>
            </div>
            <div className="absolute bottom-20 right-10 animate-bounce delay-1000">
              <Badge variant="secondary" className="bg-pride-blue/20 text-pride-blue border-pride-blue/30">
                Polygon
              </Badge>
            </div>
            <div className="absolute top-32 right-0 animate-bounce delay-500">
              <Badge variant="secondary" className="bg-pride-purple/20 text-pride-purple border-pride-purple/30">
                DeFi
              </Badge>
            </div>
          </div>

          {/* Token features */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-pride-red/20 hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="p-2 bg-pride-red/20 rounded-lg mr-4">
                  <Coins className="h-6 w-6 text-pride-red" />
                </div>
                <CardTitle className="text-xl">Reward System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn PRIDE coins for likes, posts, reposts and active community participation. 
                  The more you engage, the more you earn.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-pride-blue/20 hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="p-2 bg-pride-blue/20 rounded-lg mr-4">
                  <TrendingUp className="h-6 w-6 text-pride-blue" />
                </div>
                <CardTitle className="text-xl">Growing Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Limited emission and growing community create a deflationary model, 
                  contributing to token value growth.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-pride-green/20 hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="p-2 bg-pride-green/20 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-pride-green" />
                </div>
                <CardTitle className="text-xl">Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Audited smart contract on Polygon blockchain ensures complete 
                  transparency and security of all transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-pride-purple/20 hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="p-2 bg-pride-purple/20 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-pride-purple" />
                </div>
                <CardTitle className="text-xl">Global Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Traded on decentralized exchanges, exchangeable for popular cryptocurrencies, 
                  accessible to users worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenInfo;