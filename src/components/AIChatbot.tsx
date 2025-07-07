
import { useState } from 'react';
import { Send, MessageCircle, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI spending assistant. Ask me about your expenses, receipts, or savings opportunities in any language!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  ];

  const getQuickQuestionsByLanguage = (langCode: string) => {
    const questions = {
      en: [
        "How much did I spend on groceries this month?",
        "What can I cook with my recent purchases?",
        "How can I save money on coffee?",
        "Show me my transportation costs",
        "What are my biggest spending categories?"
      ],
      es: [
        "¿Cuánto gasté en comestibles este mes?",
        "¿Qué puedo cocinar con mis compras recientes?",
        "¿Cómo puedo ahorrar dinero en café?",
        "Muéstrame mis gastos de transporte",
        "¿Cuáles son mis categorías de gasto más grandes?"
      ],
      fr: [
        "Combien ai-je dépensé en épicerie ce mois-ci?",
        "Que puis-je cuisiner avec mes achats récents?",
        "Comment puis-je économiser de l'argent sur le café?",
        "Montrez-moi mes coûts de transport",
        "Quelles sont mes plus grandes catégories de dépenses?"
      ],
      de: [
        "Wie viel habe ich diesen Monat für Lebensmittel ausgegeben?",
        "Was kann ich mit meinen letzten Einkäufen kochen?",
        "Wie kann ich beim Kaffee sparen?",
        "Zeigen Sie mir meine Transportkosten",
        "Was sind meine größten Ausgabenkategorien?"
      ],
      hi: [
        "इस महीने मैंने किराने का सामान पर कितना खर्च किया?",
        "मैं अपनी हाल की खरीदारी के साथ क्या बना सकता हूं?",
        "मैं कॉफी पर पैसे कैसे बचा सकता हूं?",
        "मुझे अपनी परिवहन लागत दिखाएं",
        "मेरी सबसे बड़ी खर्च श्रेणियां क्या हैं?"
      ],
      zh: [
        "这个月我在杂货上花了多少钱？",
        "我可以用最近的购买做什么菜？",
        "我怎样在咖啡上省钱？",
        "显示我的交通费用",
        "我最大的支出类别是什么？"
      ],
      ar: [
        "كم أنفقت على البقالة هذا الشهر؟",
        "ماذا يمكنني أن أطبخ بمشترياتي الأخيرة؟",
        "كيف يمكنني توفير المال على القهوة؟",
        "أرني تكاليف النقل الخاصة بي",
        "ما هي أكبر فئات الإنفاق لدي؟"
      ]
    };
    return questions[langCode] || questions.en;
  };

  const getWelcomeMessage = (langCode: string) => {
    const welcomes = {
      en: "Hello! I'm your AI spending assistant. Ask me about your expenses, receipts, or savings opportunities in any language!",
      es: "¡Hola! Soy tu asistente de gastos con IA. ¡Pregúntame sobre tus gastos, recibos u oportunidades de ahorro en cualquier idioma!",
      fr: "Bonjour! Je suis votre assistant de dépenses IA. Demandez-moi vos dépenses, reçus ou opportunités d'économies dans n'importe quelle langue!",
      de: "Hallo! Ich bin Ihr KI-Ausgabenassistent. Fragen Sie mich nach Ihren Ausgaben, Belegen oder Sparmöglichkeiten in jeder Sprache!",
      hi: "नमस्ते! मैं आपका AI खर्च सहायक हूं। मुझसे अपने खर्च, रसीदों या बचत के अवसरों के बारे में किसी भी भाषा में पूछें!",
      zh: "你好！我是你的AI支出助手。用任何语言问我关于你的支出、收据或储蓄机会！",
      ar: "مرحبا! أنا مساعد الإنفاق الذكي الخاص بك. اسألني عن نفقاتك أو إيصالاتك أو فرص التوفير بأي لغة!"
    };
    return welcomes[langCode] || welcomes.en;
  };

  const simulateAIResponse = async (question: string) => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock responses based on question content and language
    let response = "";
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('groceries') || lowerQuestion.includes('comestibles') || lowerQuestion.includes('épicerie') || lowerQuestion.includes('lebensmittel') || lowerQuestion.includes('किराने') || lowerQuestion.includes('杂货') || lowerQuestion.includes('بقالة')) {
      const responses = {
        en: "Based on your receipts, you spent ₹28,745 on groceries this month. This is 12% higher than last month. I noticed you bought organic items frequently - consider shopping during sale days to save up to 20%.",
        es: "Según tus recibos, gastaste ₹28,745 en comestibles este mes. Esto es 12% más alto que el mes pasado. Noté que compraste artículos orgánicos frecuentemente.",
        fr: "Selon vos reçus, vous avez dépensé ₹28,745 en épicerie ce mois-ci. C'est 12% de plus que le mois dernier.",
        de: "Basierend auf Ihren Belegen haben Sie diesen Monat ₹28,745 für Lebensmittel ausgegeben. Das ist 12% höher als letzten Monat.",
        hi: "आपकी रसीदों के आधार पर, आपने इस महीने किराने का सामान पर ₹28,745 खर्च किए। यह पिछले महीने से 12% अधिक है।",
        zh: "根据您的收据，本月您在杂货上花费了₹28,745。这比上个月高12%。",
        ar: "بناءً على إيصالاتك، أنفقت ₹28,745 على البقالة هذا الشهر. هذا أعلى بنسبة 12% من الشهر الماضي।"
      };
      response = responses[selectedLanguage] || responses.en;
    } else if (lowerQuestion.includes('coffee') || lowerQuestion.includes('café') || lowerQuestion.includes('kaffee') || lowerQuestion.includes('कॉफी') || lowerQuestion.includes('咖啡') || lowerQuestion.includes('قهوة')) {
      const responses = {
        en: "You've spent ₹4,700 on coffee this month. Try brewing at home to save ₹3,500/month! I can create a savings goal pass for your wallet.",
        es: "Has gastado ₹4,700 en café este mes. ¡Intenta prepararlo en casa para ahorrar ₹3,500/mes!",
        fr: "Vous avez dépensé ₹4,700 en café ce mois-ci. Essayez de le préparer à la maison pour économiser ₹3,500/mois!",
        de: "Sie haben diesen Monat ₹4,700 für Kaffee ausgegeben. Versuchen Sie, zu Hause zu brauen, um ₹3,500/Monat zu sparen!",
        hi: "आपने इस महीने कॉफी पर ₹4,700 खर्च किए हैं। घर पर बनाने की कोशिश करें और ₹3,500/महीना बचाएं!",
        zh: "本月您在咖啡上花费了₹4,700。尝试在家冲泡以节省₹3,500/月！",
        ar: "لقد أنفقت ₹4,700 على القهوة هذا الشهر. جرب التحضير في المنزل لتوفير ₹3,500/شهر!"
      };
      response = responses[selectedLanguage] || responses.en;
    } else {
      const responses = {
        en: "I've analyzed your spending data. Based on your recent receipts and patterns, I can help you with budgeting, finding savings opportunities, or creating shopping lists. What specific aspect would you like to explore?",
        es: "He analizado tus datos de gasto. Basándome en tus recibos y patrones recientes, puedo ayudarte con presupuestos, encontrar oportunidades de ahorro o crear listas de compras.",
        fr: "J'ai analysé vos données de dépenses. Basé sur vos reçus et modèles récents, je peux vous aider avec la budgétisation, trouver des opportunités d'économies.",
        de: "Ich habe Ihre Ausgabendaten analysiert. Basierend auf Ihren letzten Belegen und Mustern kann ich Ihnen bei der Budgetierung helfen.",
        hi: "मैंने आपके खर्च के डेटा का विश्लेषण किया है। आपकी हाल की रसीदों और पैटर्न के आधार पर, मैं बजटिंग में आपकी मदद कर सकता हूं।",
        zh: "我已经分析了您的支出数据。根据您最近的收据和模式，我可以帮助您进行预算编制。",
        ar: "لقد حللت بيانات إنفاقك. بناءً على إيصالاتك وأنماطك الأخيرة، يمكنني مساعدتك في وضع الميزانية."
      };
      response = responses[selectedLanguage] || responses.en;
    }

    setMessages(prev => [...prev, {
      type: 'bot',
      content: response,
      timestamp: new Date()
    }]);
    
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const question = inputValue;
    setInputValue('');

    await simulateAIResponse(question);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    // Update welcome message
    setMessages([{
      type: 'bot',
      content: getWelcomeMessage(langCode),
      timestamp: new Date()
    }]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Assistant</h1>
        <p className="text-gray-600">Ask questions about your spending and get insights</p>
      </div>

      {/* Language Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            Language / اللغة / 语言 / भाषा
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => handleLanguageChange(lang.code)}
                className={selectedLanguage === lang.code ? "bg-blue-600" : ""}
              >
                <span className="mr-1">{lang.flag}</span>
                {lang.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-80">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
                        <span className="text-sm text-gray-600">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about your spending..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Questions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Try asking...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {getQuickQuestionsByLanguage(selectedLanguage).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left justify-start h-auto p-3 text-wrap"
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
