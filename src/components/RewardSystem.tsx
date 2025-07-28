import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, MessageCircle, Repeat2, Share, Gift, Trophy } from "lucide-react";
import web3Network from "@/assets/web3-network.jpg";

const RewardSystem = () => {
  const rewards = [
    {
      icon: Heart,
      action: "Лайк поста",
      amount: "0.1 PRIDE",
      color: "pride-red",
      description: "За каждый лайк контента других пользователей"
    },
    {
      icon: MessageCircle,
      action: "Комментарий",
      amount: "0.5 PRIDE",
      color: "pride-blue",
      description: "За содержательные комментарии"
    },
    {
      icon: Repeat2,
      action: "Репост",
      amount: "0.3 PRIDE",
      color: "pride-green",
      description: "За распространение качественного контента"
    },
    {
      icon: Share,
      action: "Создание поста",
      amount: "1.0 PRIDE",
      color: "pride-purple",
      description: "За оригинальный контент и посты"
    },
    {
      icon: Gift,
      action: "Ежедневный бонус",
      amount: "2.0 PRIDE",
      color: "pride-orange",
      description: "За ежедневную активность в сети"
    },
    {
      icon: Trophy,
      action: "Достижения",
      amount: "до 50 PRIDE",
      color: "pride-yellow",
      description: "За особые достижения и вехи"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${web3Network})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Система <span className="bg-gradient-pride bg-clip-text text-transparent">наград</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Зарабатывайте токены PRIDE за активное участие в сообществе. 
            Каждое действие в сети приносит вам вознаграждение.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-gradient-card border-primary/20 shadow-glow">
            <CardHeader>
              <CardTitle className="text-center">Ваш прогресс сегодня</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Заработано сегодня</span>
                <Badge variant="secondary" className="bg-pride-purple/20 text-pride-purple border-pride-purple/30">
                  15.7 PRIDE
                </Badge>
              </div>
              <Progress value={65} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Цель: 25 PRIDE</span>
                <span>65% выполнено</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward, index) => {
            const IconComponent = reward.icon;
            return (
              <Card 
                key={index}
                className={`bg-gradient-card border-${reward.color}/20 hover:shadow-glow transition-all duration-300 group`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 bg-${reward.color}/20 rounded-lg group-hover:shadow-glow transition-all duration-300`}>
                      <IconComponent className={`h-6 w-6 text-${reward.color}`} />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`bg-${reward.color}/20 text-${reward.color} border-${reward.color}/30`}
                    >
                      {reward.amount}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{reward.action}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {reward.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bonus multipliers */}
        <div className="mt-16">
          <Card className="bg-gradient-card border-primary/20 shadow-pride">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Бонусные множители</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold bg-gradient-pride bg-clip-text text-transparent mb-2">
                    x2
                  </div>
                  <h4 className="font-semibold mb-2">Выходные</h4>
                  <p className="text-sm text-muted-foreground">
                    Удвоенные награды в выходные дни
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-web3 bg-clip-text text-transparent mb-2">
                    x3
                  </div>
                  <h4 className="font-semibold mb-2">Особые события</h4>
                  <p className="text-sm text-muted-foreground">
                    Тройные награды во время праздников Pride
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-pride bg-clip-text text-transparent mb-2">
                    x5
                  </div>
                  <h4 className="font-semibold mb-2">Первые пользователи</h4>
                  <p className="text-sm text-muted-foreground">
                    Первые 1000 пользователей получают x5 множитель
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RewardSystem;