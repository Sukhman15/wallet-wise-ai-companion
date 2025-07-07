
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

  const quickQuestions = [
    "How much did I spend on groceries this month?",
    "What can I cook with my recent purchases?",
    "How can I save money on coffee?",
    "Show me my transportation costs",
    "What are my biggest spending categories?"
  ];

  const simulateAIResponse = async (question: string) => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock responses based on question content
    let response = "";
    if (question.toLowerCase().includes('groceries')) {
      response = "Based on your receipts, you spent $287.45 on groceries this month. This is 12% higher than last month. I noticed you bought organic items frequently - consider shopping at Whole Foods during their sale days to save up to 20%.";
    } else if (question.toLowerCase().includes('cook')) {
      response = "From your recent Whole Foods receipt, you can make: Chicken Stir-fry (you have chicken breast, rice), Banana Smoothie (bananas, milk), or Pasta with Sauce (you bought pasta sauce). You might need to buy some vegetables for the stir-fry.";
    } else if (question.toLowerCase().includes('coffee')) {
      response = "You've spent $47 on coffee this month at Starbucks. Try brewing at home to save $35/month! I can create a Google Wallet pass with your savings goal.";
    } else if (question.toLowerCase().includes('transportation')) {
      response = "Your transportation costs this month: Gas $45.20. This is within your normal range. Consider using public transport for short trips to save money.";
    } else if (question.toLowerCase().includes('categories')) {
      response = "Your top spending categories: 1. Groceries (68% - $287) 2. Coffee & Dining (15% - $63) 3. Transportation (12% - $50) 4. Personal Care (5% - $21)";
    } else {
      response = "I've analyzed your spending data. Based on your recent receipts and patterns, I can help you with budgeting, finding savings opportunities, or creating shopping lists. What specific aspect would you like to explore?";
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
            Language / اللغة / 语言
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang.code)}
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
              {quickQuestions.map((question, index) => (
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
