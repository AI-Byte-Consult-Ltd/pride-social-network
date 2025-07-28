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
            Токен <span className="bg-gradient-pride bg-clip-text text-transparent">PRIDE</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ERC-20 токен, который вознаграждает пользователей за активность в социальной сети 
            и создает экономику инклюзивности.
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
                <CardTitle className="text-xl">Система наград</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Получайте токены PRIDE за лайки, посты, репосты и активное участие в сообществе. 
                  Чем больше вы взаимодействуете, тем больше зарабатываете.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-pride-blue/20 hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="p-2 bg-pride-blue/20 rounded-lg mr-4">
                  <TrendingUp className="h-6 w-6 text-pride-blue" />
                </div>
                <CardTitle className="text-xl">Растущая стоимость</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ограниченная эмиссия и растущее сообщество создают дефляционную модель, 
                  способствующую росту стоимости токена.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-pride-green/20 hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="p-2 bg-pride-green/20 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-pride-green" />
                </div>
                <CardTitle className="text-xl">Безопасность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Аудированный смарт-контракт на блокчейне Polygon обеспечивает полную 
                  прозрачность и безопасность всех транзакций.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-pride-purple/20 hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="p-2 bg-pride-purple/20 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-pride-purple" />
                </div>
                <CardTitle className="text-xl">Глобальность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Торгуется на децентрализованных биржах, обменивается на популярные криптовалюты, 
                  доступен пользователям по всему миру.
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