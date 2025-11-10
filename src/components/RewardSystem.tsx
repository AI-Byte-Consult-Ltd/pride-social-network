import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, MessageCircle, Repeat2, Share, Gift, Trophy } from "lucide-react";
import web3Network from "@/assets/web3-network.jpg";

export const rewardList = [
  {
    icon: Heart,
    action: "Like Post",
    amount: "0.1 PRIDE",
    color: "pride-red",
    description: "For each like of other users' content"
  },
    {
      icon: MessageCircle,
      action: "Comment",
      amount: "0.5 PRIDE",
      color: "pride-blue",
      description: "For meaningful comments"
    },
    {
      icon: Repeat2,
      action: "Repost",
      amount: "0.3 PRIDE",
      color: "pride-green",
      description: "For sharing quality content"
    },
    {
      icon: Share,
      action: "Create Post",
      amount: "1.0 PRIDE",
      color: "pride-purple",
      description: "For original content and posts"
    },
    {
      icon: Gift,
      action: "Daily Bonus",
      amount: "2.0 PRIDE",
      color: "pride-orange",
      description: "For daily network activity"
    },
    {
      icon: Trophy,
      action: "Achievements",
      amount: "up to 50 PRIDE",
      color: "pride-yellow",
      description: "For special achievements and milestones"
    }
];

const RewardSystem = () => {
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
            <span className="bg-gradient-pride bg-clip-text text-transparent">Reward</span> System
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Earn PRIDE tokens for active community participation. 
            Every action in the network brings you rewards.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-gradient-card border-primary/20 shadow-glow">
            <CardHeader>
              <CardTitle className="text-center">Your Progress Today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Earned Today</span>
                <Badge variant="secondary" className="bg-pride-purple/20 text-pride-purple border-pride-purple/30">
                  15.7 PRIDE
                </Badge>
              </div>
              <Progress value={65} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Goal: 25 PRIDE</span>
                <span>65% complete</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewardList.map((reward, index) => {
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
              <CardTitle className="text-center text-2xl">Bonus Multipliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold bg-gradient-pride bg-clip-text text-transparent mb-2">
                    x2
                  </div>
                  <h4 className="font-semibold mb-2">Weekends</h4>
                  <p className="text-sm text-muted-foreground">
                    Double rewards on weekends
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-web3 bg-clip-text text-transparent mb-2">
                    x3
                  </div>
                  <h4 className="font-semibold mb-2">Special Events</h4>
                  <p className="text-sm text-muted-foreground">
                    Triple rewards during Pride celebrations
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-pride bg-clip-text text-transparent mb-2">
                    x5
                  </div>
                  <h4 className="font-semibold mb-2">Early Users</h4>
                  <p className="text-sm text-muted-foreground">
                    First 1000 users get x5 multiplier
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