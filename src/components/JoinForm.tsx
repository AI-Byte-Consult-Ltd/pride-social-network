import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, Users, Gift, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JoinForm = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !agreed) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля и примите условия",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      toast({
        title: "Добро пожаловать!",
        description: "Вы успешно присоединились к Pride Social Network",
      });
    }, 2000);
  };

  const benefits = [
    {
      icon: Gift,
      title: "Ранний доступ",
      description: "Получите доступ к платформе до официального запуска"
    },
    {
      icon: Sparkles,
      title: "Бонусные токены",
      description: "100 PRIDE токенов в подарок при регистрации"
    },
    {
      icon: Users,
      title: "VIP статус",
      description: "Особый статус в сообществе первых пользователей"
    }
  ];

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-gradient-card border-pride-green/20 shadow-glow">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-pride-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-pride-green" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Добро пожаловать в <span className="bg-gradient-pride bg-clip-text text-transparent">Pride!</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Спасибо за присоединение к Pride Social Network! Мы отправили вам письмо с дальнейшими инструкциями.
                </p>
                <Badge className="bg-pride-purple/20 text-pride-purple border-pride-purple/30 text-lg px-4 py-2">
                  100 PRIDE токенов зарезервированы для вас!
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Присоединяйтесь к <span className="bg-gradient-pride bg-clip-text text-transparent">революции</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Станьте частью первой Web3 социальной сети для LGBTQ+ сообщества. 
            Получите ранний доступ и бонусные токены!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-8">Преимущества раннего доступа</h3>
              
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card 
                    key={index}
                    className="bg-gradient-card border-primary/20 hover:shadow-glow transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <div className="mt-8 p-6 bg-gradient-pride/10 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Уже присоединились:</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-pride bg-clip-text text-transparent">
                  4,327 пользователей
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Присоединяйтесь к растущему сообществу!
                </p>
              </div>
            </div>

            {/* Join Form */}
            <Card className="bg-gradient-card border-primary/20 shadow-pride">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-pride rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-foreground" />
                </div>
                <CardTitle className="text-2xl">Получить ранний доступ</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email адрес</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="bg-muted/40 border-muted"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked as boolean)}
                      className="mt-1"
                    />
                    <div className="text-sm text-muted-foreground">
                      <label htmlFor="terms" className="cursor-pointer">
                        Я согласен получать уведомления о запуске Pride Social Network 
                        и принимаю{" "}
                        <a href="#" className="text-primary hover:underline">
                          пользовательское соглашение
                        </a>{" "}
                        и{" "}
                        <a href="#" className="text-primary hover:underline">
                          политику конфиденциальности
                        </a>
                      </label>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    variant="pride" 
                    size="lg" 
                    className="w-full text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-foreground mr-2" />
                        Присоединяемся...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Присоединиться к Pride
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>
                      Нет спама, только важные обновления о запуске платформы.
                      <br />
                      Отписаться можно в любое время.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;