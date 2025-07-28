import { Heart, Twitter, Github, MessageCircle } from "lucide-react";

const Footer = () => {
  const links = {
    product: [
      { name: "Особенности", href: "#features" },
      { name: "Токен PRIDE", href: "#token" },
      { name: "Дашборд", href: "#dashboard" },
      { name: "Безопасность", href: "#security" }
    ],
    community: [
      { name: "Discord", href: "#discord" },
      { name: "Twitter", href: "#twitter" },
      { name: "GitHub", href: "#github" },
      { name: "Blog", href: "#blog" }
    ],
    resources: [
      { name: "FAQ", href: "#faq" },
      { name: "Документация", href: "#docs" },
      { name: "Поддержка", href: "#support" },
      { name: "API", href: "#api" }
    ],
    legal: [
      { name: "Политика конфиденциальности", href: "#privacy" },
      { name: "Условия использования", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-background to-muted/20 border-t border-muted/40">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-pride bg-clip-text text-transparent mb-2">
                Pride Social Network
              </h3>
              <p className="text-muted-foreground max-w-md">
                Первая Web3 социальная сеть для LGBTQ+ сообщества. 
                Зарабатывайте токены PRIDE за активность и будьте частью инклюзивного будущего.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-3 bg-pride-blue/20 rounded-lg hover:bg-pride-blue/30 transition-colors group"
              >
                <Twitter className="h-5 w-5 text-pride-blue group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-pride-purple/20 rounded-lg hover:bg-pride-purple/30 transition-colors group"
              >
                <Github className="h-5 w-5 text-pride-purple group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-pride-green/20 rounded-lg hover:bg-pride-green/30 transition-colors group"
              >
                <MessageCircle className="h-5 w-5 text-pride-green group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>🏳️‍🌈 Создано с любовью для инклюзивного сообщества</p>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Продукт</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Сообщество</h4>
            <ul className="space-y-3">
              {links.community.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Ресурсы</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-card rounded-lg p-8 mb-12 border border-primary/20">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Оставайтесь в курсе</h3>
            <p className="text-muted-foreground mb-6">
              Подпишитесь на обновления и получайте новости о развитии Pride Social Network
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Ваш email"
                className="flex-1 px-4 py-2 bg-muted/40 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 bg-gradient-pride text-foreground rounded-lg hover:shadow-glow transition-all duration-300">
                Подписаться
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-muted/40">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <span>© 2024 Pride Social Network.</span>
            <Heart className="h-4 w-4 text-pride-red" />
            <span>Создано для инклюзивности.</span>
          </div>
          
          <div className="flex space-x-6">
            {links.legal.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;