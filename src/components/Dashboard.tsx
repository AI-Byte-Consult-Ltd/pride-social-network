import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Wallet, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Coins
} from "lucide-react";

const Dashboard = () => {
  const recentTransactions = [
    {
      type: "earn",
      action: "Лайк поста",
      amount: "+0.1 PRIDE",
      time: "2 мин назад",
      user: "@alex_pride"
    },
    {
      type: "earn",
      action: "Создание поста",
      amount: "+1.0 PRIDE",
      time: "15 мин назад",
      user: "Вы"
    },
    {
      type: "earn",
      action: "Комментарий",
      amount: "+0.5 PRIDE",
      time: "1 час назад",
      user: "Вы"
    },
    {
      type: "spend",
      action: "Донат сообществу",
      amount: "-5.0 PRIDE",
      time: "2 часа назад",
      user: "Вы"
    },
    {
      type: "earn",
      action: "Ежедневный бонус",
      amount: "+2.0 PRIDE",
      time: "1 день назад",
      user: "Система"
    }
  ];

  const stats = [
    {
      title: "Общий баланс",
      value: "127.45 PRIDE",
      change: "+12.5%",
      positive: true,
      icon: Wallet
    },
    {
      title: "Заработано сегодня",
      value: "15.7 PRIDE",
      change: "+8 действий",
      positive: true,
      icon: TrendingUp
    },
    {
      title: "Этот месяц",
      value: "289.2 PRIDE",
      change: "+23.1%",
      positive: true,
      icon: Calendar
    },
    {
      title: "Среднее в день",
      value: "9.6 PRIDE",
      change: "-2.1%",
      positive: false,
      icon: Clock
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ваш <span className="bg-gradient-web3 bg-clip-text text-transparent">дашборд</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Отслеживайте баланс токенов PRIDE, историю транзакций и статистику активности.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-sm">
                    {stat.positive ? (
                      <ArrowUpRight className="h-4 w-4 text-pride-green mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-pride-red mr-1" />
                    )}
                    <span className={stat.positive ? "text-pride-green" : "text-pride-red"}>
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Balance Card */}
          <Card className="lg:col-span-1 bg-gradient-card border-primary/20 shadow-pride">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                Баланс кошелька
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-pride bg-clip-text text-transparent mb-2">
                  127.45
                </div>
                <div className="text-muted-foreground">PRIDE Tokens</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">USD Equivalent</span>
                  <span className="font-medium">$63.72</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">24h Change</span>
                  <span className="text-pride-green">+12.5%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>До следующего уровня</span>
                  <span>73%</span>
                </div>
                <Progress value={73} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  27 PRIDE до Gold статуса
                </div>
              </div>

              <Button variant="pride" className="w-full">
                Вывести средства
              </Button>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="lg:col-span-2 bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle>История транзакций</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        tx.type === 'earn' 
                          ? 'bg-pride-green/20 text-pride-green' 
                          : 'bg-pride-red/20 text-pride-red'
                      }`}>
                        {tx.type === 'earn' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{tx.action}</div>
                        <div className="text-xs text-muted-foreground">
                          {tx.user} • {tx.time}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        tx.type === 'earn' 
                          ? 'bg-pride-green/20 text-pride-green border-pride-green/30' 
                          : 'bg-pride-red/20 text-pride-red border-pride-red/30'
                      }`}
                    >
                      {tx.amount}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-6">
                Посмотреть все транзакции
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Progress */}
        <Card className="mt-8 bg-gradient-card border-primary/20 shadow-glow">
          <CardHeader>
            <CardTitle>Достижения и цели</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Социальная активность</span>
                  <span>8/10 действий</span>
                </div>
                <Progress value={80} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Награда: 5 PRIDE
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ежедневные задания</span>
                  <span>3/5 выполнено</span>
                </div>
                <Progress value={60} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Награда: 10 PRIDE
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Недельная цель</span>
                  <span>67/100 PRIDE</span>
                </div>
                <Progress value={67} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Награда: 25 PRIDE бонус
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;