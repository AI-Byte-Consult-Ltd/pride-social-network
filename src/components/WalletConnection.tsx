import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle, AlertCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setWalletAddress("0x742d35Cc6634C0532925a3b8D6aE9d8fe3E");
      setIsConnecting(false);
      toast({
        title: "Wallet Connected!",
        description: "MetaMask successfully connected to Pride Social Network",
      });
    }, 2000);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    toast({
      title: "Wallet Disconnected",
      description: "MetaMask disconnected from Pride Social Network",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-web3 bg-clip-text text-transparent">Wallet</span> Connection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect your Web3 wallet to receive PRIDE tokens and participate in the network economy.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-card border-primary/20 shadow-pride">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-web3 rounded-full flex items-center justify-center mb-4">
                <Wallet className="w-8 h-8 text-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {isConnected ? "Wallet Connected" : "Connect Wallet"}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {!isConnected ? (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">
                      To start using Pride Social Network, connect your MetaMask wallet
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="secondary" className="bg-pride-orange/20 text-pride-orange border-pride-orange/30">
                        MetaMask
                      </Badge>
                      <Badge variant="secondary" className="bg-pride-blue/20 text-pride-blue border-pride-blue/30">
                        WalletConnect
                      </Badge>
                      <Badge variant="secondary" className="bg-pride-purple/20 text-pride-purple border-pride-purple/30">
                        Coinbase Wallet
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    variant="pride" 
                    size="lg" 
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full text-lg py-6"
                  >
                      {isConnecting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-foreground mr-2" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="mr-2 h-5 w-5" />
                          Connect MetaMask
                        </>
                      )}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>Don't have a wallet? <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Install MetaMask</a></p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-pride-green/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-pride-green" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Wallet successfully connected to Pride Social Network
                    </p>
                  </div>

                  <Card className="bg-muted/40 border-muted">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Wallet Address</p>
                          <p className="font-mono text-sm">{walletAddress}...</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={copyAddress}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-4">
                    <Button variant="web3" className="flex-1">
                      Open Dashboard
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              )}

              <div className="bg-muted/40 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-pride-yellow mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Security</p>
                    <p>
                      We never ask for seed phrases or private keys. 
                      Keep them safe and never share them with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WalletConnection;