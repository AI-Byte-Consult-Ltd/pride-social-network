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
        title: "Error",
        description: "Please fill in all fields and accept the terms",
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
        title: "Welcome!",
        description: "You have successfully joined Pride Social Network",
      });
    }, 2000);
  };

  const benefits = [
    {
      icon: Gift,
      title: "Early Access",
      description: "Get access to the platform before the official launch"
    },
    {
      icon: Sparkles,
      title: "Bonus Tokens",
      description: "100 PRIDE tokens as a gift upon registration"
    },
    {
      icon: Users,
      title: "VIP Status",
      description: "Special status in the early adopters community"
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
                  Welcome to <span className="bg-gradient-pride bg-clip-text text-transparent">Pride!</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for joining Pride Social Network! We have sent you an email with further instructions.
                </p>
                <Badge className="bg-pride-purple/20 text-pride-purple border-pride-purple/30 text-lg px-4 py-2">
                  100 PRIDE tokens reserved for you!
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
            Join the <span className="bg-gradient-pride bg-clip-text text-transparent">Revolution</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Become part of the first Web3 social network for the LGBTQ+ community. 
            Get early access and bonus tokens!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-8">Early Access Benefits</h3>
              
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
                  <span className="font-semibold">Already joined:</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-pride bg-clip-text text-transparent">
                  4,327 users
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Join the growing community!
                </p>
              </div>
            </div>

            {/* Join Form */}
            <Card className="bg-gradient-card border-primary/20 shadow-pride">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-pride rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-foreground" />
                </div>
                <CardTitle className="text-2xl">Get Early Access</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
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
                        I agree to receive notifications about Pride Social Network launch 
                        and accept the{" "}
                        <a href="#" className="text-primary hover:underline">
                          terms of service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">
                          privacy policy
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
                        Joining...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Join Pride
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>
                      No spam, only important updates about platform launch.
                      <br />
                      You can unsubscribe at any time.
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