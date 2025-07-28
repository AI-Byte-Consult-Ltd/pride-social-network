import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Shield, Coins, Globe, Lock } from "lucide-react";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Web3 & Blockchain",
      icon: Globe,
      color: "pride-blue",
      questions: [
        {
          question: "What is Web3 and how does it relate to Pride Social Network?",
          answer: "Web3 is the new generation of the internet, based on blockchain technologies. Pride Social Network uses Web3 to create a decentralized social network where users own their data and receive fair rewards for activity."
        },
        {
          question: "What is blockchain and why is it important?",
          answer: "Blockchain is a distributed database that ensures transparency, security and immutability of records. In our network, it guarantees fair token distribution and protection against fraud."
        },
        {
          question: "Do I need to know technical details to use the platform?",
          answer: "No! We've created an intuitive interface. You only need to connect your wallet — everything else works like a regular social network."
        }
      ]
    },
    {
      title: "ERC-20 Tokens",
      icon: Coins,
      color: "pride-purple",
      questions: [
        {
          question: "What is the ERC-20 PRIDE token?",
          answer: "ERC-20 is a standard token format on the Ethereum blockchain. PRIDE is our token that you receive for network activity. It can be stored in any wallet that supports ERC-20."
        },
        {
          question: "How can I use PRIDE tokens?",
          answer: "PRIDE tokens can be exchanged for other cryptocurrencies, used to access premium network features, participate in community voting, or simply held as an investment."
        },
        {
          question: "Is PRIDE token emission limited?",
          answer: "Yes, the maximum number of PRIDE tokens is limited to 100 million. This creates a deflationary model and potential for value growth."
        },
        {
          question: "On which exchanges is PRIDE traded?",
          answer: "PRIDE is available on decentralized exchanges like Uniswap and SushiSwap. We're also working on listings on centralized exchanges."
        }
      ]
    },
    {
      title: "Security",
      icon: Shield,
      color: "pride-green",
      questions: [
        {
          question: "How secure are my funds and data?",
          answer: "Your tokens are stored in your own wallet, which only you have access to. Personal data is encrypted and not shared with third parties."
        },
        {
          question: "What should I do if I lose access to my wallet?",
          answer: "Save your seed phrase in a secure place when creating your wallet. Only with it can you restore access. We cannot help recover lost wallets."
        },
        {
          question: "Have the smart contracts undergone security audits?",
          answer: "Yes, all our smart contracts have undergone independent audits by leading blockchain security companies. Audit results are publicly available."
        },
        {
          question: "How to protect yourself from scammers?",
          answer: "Never share your seed phrase or private keys. We never ask for this information. Always verify contract addresses on the official website."
        }
      ]
    },
    {
      title: "Privacy",
      icon: Lock,
      color: "pride-red",
      questions: [
        {
          question: "What data does the platform collect?",
          answer: "We collect minimal data: only public wallet address and network activity. No personal data, email or phone numbers are required."
        },
        {
          question: "Can I remain anonymous?",
          answer: "Yes! You can use the platform completely anonymously. Nickname and avatar are all that other users see."
        },
        {
          question: "Do you share data with third parties?",
          answer: "No, we do not sell or share user data with third parties. All activity is stored in a decentralized manner."
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Frequently Asked <span className="bg-gradient-pride bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Web3, ERC-20 tokens and security in Pride Social Network.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={categoryIndex}
                className={`bg-gradient-card border-${category.color}/20 hover:shadow-glow transition-all duration-300`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 bg-${category.color}/20 rounded-lg`}>
                      <IconComponent className={`h-6 w-6 text-${category.color}`} />
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${categoryIndex}-${index}`}
                        className="border-muted/40"
                      >
                        <AccordionTrigger className="text-left text-sm font-medium hover:no-underline hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional help section */}
        <Card className="mt-12 bg-gradient-card border-primary/20 shadow-pride">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Didn't find an answer to your question?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our community and support team are always ready to help. 
              Join our Discord or send us a message.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-pride-blue/20 text-pride-blue border border-pride-blue/30 hover:bg-pride-blue/30 transition-colors"
              >
                Join Discord
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-pride-purple/20 text-pride-purple border border-pride-purple/30 hover:bg-pride-purple/30 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;