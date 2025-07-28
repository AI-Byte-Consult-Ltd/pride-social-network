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
      title: "Web3 и блокчейн",
      icon: Globe,
      color: "pride-blue",
      questions: [
        {
          question: "Что такое Web3 и как это связано с Pride Social Network?",
          answer: "Web3 — это новое поколение интернета, основанное на блокчейн-технологиях. Pride Social Network использует Web3 для создания децентрализованной социальной сети, где пользователи владеют своими данными и получают справедливое вознаграждение за активность."
        },
        {
          question: "Что такое блокчейн и почему он важен?",
          answer: "Блокчейн — это распределённая база данных, которая обеспечивает прозрачность, безопасность и неизменность записей. В нашей сети он гарантирует честное распределение токенов и защиту от мошенничества."
        },
        {
          question: "Нужно ли знать технические детали для использования платформы?",
          answer: "Нет! Мы создали интуитивно понятный интерфейс. Вам нужно только подключить кошелёк — всё остальное работает как в обычной социальной сети."
        }
      ]
    },
    {
      title: "ERC-20 токены",
      icon: Coins,
      color: "pride-purple",
      questions: [
        {
          question: "Что такое ERC-20 токен PRIDE?",
          answer: "ERC-20 — это стандартный формат токенов на блокчейне Ethereum. PRIDE — наш токен, который вы получаете за активность в сети. Его можно хранить в любом кошельке, поддерживающем ERC-20."
        },
        {
          question: "Как я могу использовать токены PRIDE?",
          answer: "Токены PRIDE можно обменять на другие криптовалюты, использовать для получения премиум-функций в сети, участвовать в голосованиях сообщества или просто держать как инвестицию."
        },
        {
          question: "Ограничена ли эмиссия токенов PRIDE?",
          answer: "Да, максимальное количество токенов PRIDE ограничено 100 миллионами. Это создаёт дефляционную модель и потенциал роста стоимости."
        },
        {
          question: "На каких биржах торгуется PRIDE?",
          answer: "PRIDE доступен на децентрализованных биржах как Uniswap и SushiSwap. Мы также работаем над листингом на централизованных биржах."
        }
      ]
    },
    {
      title: "Безопасность",
      icon: Shield,
      color: "pride-green",
      questions: [
        {
          question: "Насколько безопасны мои средства и данные?",
          answer: "Ваши токены хранятся в вашем собственном кошельке, к которому только у вас есть доступ. Персональные данные шифруются и не передаются третьим лицам."
        },
        {
          question: "Что делать, если я потерял доступ к кошельку?",
          answer: "Сохраните seed-фразу в безопасном месте при создании кошелька. Только с её помощью можно восстановить доступ. Мы не можем помочь восстановить утерянные кошельки."
        },
        {
          question: "Проходили ли смарт-контракты аудит безопасности?",
          answer: "Да, все наши смарт-контракты прошли независимый аудит ведущими компаниями в области блокчейн-безопасности. Результаты аудита публично доступны."
        },
        {
          question: "Как защититься от мошенников?",
          answer: "Никогда не передавайте свою seed-фразу или приватные ключи. Мы никогда не запрашиваем эту информацию. Всегда проверяйте адреса контрактов на официальном сайте."
        }
      ]
    },
    {
      title: "Приватность",
      icon: Lock,
      color: "pride-red",
      questions: [
        {
          question: "Какие данные собирает платформа?",
          answer: "Мы собираем минимум данных: только публичный адрес кошелька и активность в сети. Никаких персональных данных, email или номеров телефонов не требуется."
        },
        {
          question: "Могу ли я оставаться анонимным?",
          answer: "Да! Вы можете использовать платформу полностью анонимно. Никнейм и аватар — это всё, что видят другие пользователи."
        },
        {
          question: "Передаёте ли вы данные третьим лицам?",
          answer: "Нет, мы не продаём и не передаём пользовательские данные третьим лицам. Вся активность хранится в децентрализованном виде."
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Часто задаваемые <span className="bg-gradient-pride bg-clip-text text-transparent">вопросы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Всё, что нужно знать о Web3, токенах ERC-20 и безопасности в Pride Social Network.
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
            <h3 className="text-2xl font-bold mb-4">Не нашли ответ на свой вопрос?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Наше сообщество и команда поддержки всегда готовы помочь. 
              Присоединяйтесь к нашему Discord или отправьте нам сообщение.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-pride-blue/20 text-pride-blue border border-pride-blue/30 hover:bg-pride-blue/30 transition-colors"
              >
                Присоединиться к Discord
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-pride-purple/20 text-pride-purple border border-pride-purple/30 hover:bg-pride-purple/30 transition-colors"
              >
                Связаться с поддержкой
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;