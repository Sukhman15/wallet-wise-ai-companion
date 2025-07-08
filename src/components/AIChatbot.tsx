
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
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
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
      hi: [
        "इस महीने मैंने किराने का सामान पर कितना खर्च किया?",
        "मैं अपनी हाल की खरीदारी के साथ क्या बना सकता हूं?",
        "मैं कॉफी पर पैसे कैसे बचा सकता हूं?",
        "मुझे अपनी परिवहन लागत दिखाएं",
        "मेरी सबसे बड़ी खर्च श्रेणियां क्या हैं?"
      ],
      te: [
        "ఈ నెలలో నేను కిరాణా సామాను మీద ఎంత ఖర్చు చేశాను?",
        "నా ఇటీవలి కొనుగోళ్లతో నేను ఏమి వండగలను?",
        "కాఫీ మీద నేను ఎలా డబ్బు ఆదా చేయగలను?",
        "నా రవాణా ఖర్చులను చూపించు",
        "నా అతిపెద్దవార్చన శ్రేణులు ఏమిటి?"
      ],
      ta: [
        "இந்த மாதம் நான் மளிகைப் பொருட்களுக்கு எவ்வளவு செலவு செய்தேன்?",
        "என் சமீபத்திய வாங்கல்களுடன் நான் என்ன சமைக்க முடியும்?",
        "காபியில் நான் எப்படி பணம் சேமிக்க முடியும்?",
        "என் போக்குவரத்து செலவுகளைக் காட்டு",
        "என் மிகப்பெரிய செலவு வகைகள் என்ன?"
      ],
      bn: [
        "এই মাসে আমি মুদিখানার জন্য কত খরচ করেছি?",
        "আমার সাম্প্রতিক কেনাকাটা দিয়ে আমি কী রান্না করতে পারি?",
        "কফিতে আমি কীভাবে টাকা বাঁচাতে পারি?",
        "আমার পরিবহন খরচ দেখান",
        "আমার সবচেয়ে বড় খরচের বিভাগগুলি কী?"
      ],
      mr: [
        "या महिन्यात मी किराणा मालावर किती खर्च केला?",
        "माझ्या अलीकडच्या खरेदीसह मी काय शिजवू शकतो?",
        "कॉफीवर मी पैसे कसे वाचवू शकतो?",
        "माझे वाहतूक खर्च दाखवा",
        "माझे सर्वात मोठे खर्चाचे वर्ग कोणते आहेत?"
      ],
      gu: [
        "આ મહિને મેં કિરાણાના સામાન પર કેટલો ખર્ચ કર્યો?",
        "મારી તાજેતરની ખરીદીઓ સાથે હું શું રાંધી શકું?",
        "કોફી પર હું કેવી રીતે પૈસા બચાવી શકું?",
        "મારા પરિવહન ખર્ચ બતાવો",
        "મારી સૌથી મોટી ખર્ચ કેટેગરીઓ કઈ છે?"
      ],
      kn: [
        "ಈ ತಿಂಗಳು ನಾನು ದಿನಸಿ ಸಾಮಾನುಗಳಿಗೆ ಎಷ್ಟು ಖರ್ಚು ಮಾಡಿದೆ?",
        "ನನ್ನ ಇತ್ತೀಚಿನ ಖರೀದಿಗಳೊಂದಿಗೆ ನಾನು ಏನು ಬೇಯಿಸಬಹುದು?",
        "ಕಾಫಿಯಲ್ಲಿ ನಾನು ಹೇಗೆ ಹಣ ಉಳಿಸಬಹುದು?",
        "ನನ್ನ ಸಾರಿಗೆ ವೆಚ್ಚಗಳನ್ನು ತೋರಿಸಿ",
        "ನನ್ನ ದೊಡ್ಡ ವೆಚ್ಚದ ವರ್ಗಗಳು ಯಾವುವು?"
      ],
      ml: [
        "ഈ മാസം ഞാൻ പലവ്യഞ്ജനങ്ങൾക്ക് എത്ര ചിലവാക്കി?",
        "എന്റെ സമീപകാല വാങ്ങലുകൾ കൊണ്ട് എനിക്ക് എന്ത് പാചകം ചെയ്യാം?",
        "കോഫിയിൽ എനിക്ക് എങ്ങനെ പണം ലാഭിക്കാം?",
        "എന്റെ ഗതാഗത ചിലവുകൾ കാണിക്കൂ",
        "എന്റെ ഏറ്റവും വലിയ ചിലവ് വിഭാഗങ്ങൾ എന്തൊക്കെയാണ്?"
      ],
      pa: [
        "ਇਸ ਮਹੀਨੇ ਮੈਂ ਕਿਰਿਆਨੇ ਦੇ ਸਾਮਾਨ 'ਤੇ ਕਿੰਨਾ ਖਰਚ ਕੀਤਾ?",
        "ਮੈਂ ਆਪਣੀਆਂ ਹਾਲੀਆ ਖਰੀਦਦਾਰੀਆਂ ਨਾਲ ਕੀ ਪਕਾ ਸਕਦਾ ਹਾਂ?",
        "ਮੈਂ ਕਾਫੀ 'ਤੇ ਪੈਸੇ ਕਿਵੇਂ ਬਚਾ ਸਕਦਾ ਹਾਂ?",
        "ਮੈਨੂੰ ਆਪਣੇ ਆਵਾਜਾਈ ਦੇ ਖਰਚੇ ਦਿਖਾਓ",
        "ਮੇਰੀਆਂ ਸਭ ਤੋਂ ਵੱਡੀਆਂ ਖਰਚਾ ਸ਼੍ਰੇਣੀਆਂ ਕੀ ਹਨ?"
      ],
      ur: [
        "اس مہینے میں نے کریانے کے سامان پر کتنا خرچ کیا؟",
        "اپنی حالیہ خریداریوں سے میں کیا پکا سکتا ہوں؟",
        "کافی پر میں کیسے پیسے بچا سکتا ہوں؟",
        "مجھے اپنے نقل و حمل کے اخراجات دکھائیں",
        "میری سب سے بڑی خرچ کی اقسام کیا ہیں؟"
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
      hi: "नमस्ते! मैं आपका AI खर्च सहायक हूं। मुझसे अपने खर्च, रसीदों या बचत के अवसरों के बारे में किसी भी भाषा में पूछें!",
      te: "హలో! నేను మీ AI వ్యయ సహాయకుడిని. మీ ఖర్చులు, రసీదులు లేదా పొదుపు అవకాశాల గురించి ఏ భాషలోనైనా నన్ను అడగండి!",
      ta: "வணக்கம்! நான் உங்கள் AI செலவு உதவியாளர். உங்கள் செலவுகள், ரசீதுகள் அல்லது சேமிப்பு வாய்ப்புகள் பற்றி எந்த மொழியிலும் என்னிடம் கேளுங்கள்!",
      bn: "হ্যালো! আমি আপনার AI খরচের সহায়ক। আপনার খরচ, রসিদ বা সঞ্চয়ের সুযোগ সম্পর্কে যেকোনো ভাষায় আমাকে জিজ্ঞাসা করুন!",
      mr: "नमस्कार! मी तुमचा AI खर्च सहाय्यक आहे. तुमच्या खर्च, पावत्या किंवा बचतीच्या संधींबद्दल कोणत्याही भाषेत मला विचारा!",
      gu: "નમસ્તે! હું તમારો AI ખર્ચ સહાયક છું. તમારા ખર્ચ, રસીદો અથવા બચતની તકો વિશે કોઈપણ ભાષામાં મને પૂછો!",
      kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ವೆಚ್ಚ ಸಹಾಯಕ. ನಿಮ್ಮ ವೆಚ್ಚಗಳು, ರಸೀದಿಗಳು ಅಥವಾ ಉಳಿತಾಯ ಅವಕಾಶಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ನನ್ನನ್ನು ಕೇಳಿ!",
      ml: "ഹലോ! ഞാൻ നിങ്ങളുടെ AI ചെലവ് സഹായകനാണ്. നിങ്ങളുടെ ചെലവുകൾ, രസീതുകൾ അല്ലെങ്കിൽ സമ്പാദ്യ അവസരങ്ങൾ കുറിച്ച് ഏത് ഭാഷയിലും എന്നോട് ചോദിക്കുക!",
      pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖਰਚਾ ਸਹਾਇਕ ਹਾਂ। ਤੁਹਾਡੇ ਖਰਚੇ, ਰਸੀਦਾਂ ਜਾਂ ਬਚਤ ਦੇ ਮੌਕਿਆਂ ਬਾਰੇ ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਮੈਨੂੰ ਪੁੱਛੋ!",
      ur: "ہیلو! میں آپ کا AI خرچ معاون ہوں۔ اپنے اخراجات، رسیدوں یا بچت کے مواقع کے بارے میں کسی بھی زبان میں مجھ سے پوچھیں!",
      es: "¡Hola! Soy tu asistente de gastos con IA. ¡Pregúntame sobre tus gastos, recibos u oportunidades de ahorro en cualquier idioma!",
      fr: "Bonjour! Je suis votre assistant de dépenses IA. Demandez-moi vos dépenses, reçus ou opportunités d'économies dans n'importe quelle langue!",
      de: "Hallo! Ich bin Ihr KI-Ausgabenassistent. Fragen Sie mich nach Ihren Ausgaben, Belegen oder Sparmöglichkeiten in jeder Sprache!",
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
    
    if (lowerQuestion.includes('groceries') || lowerQuestion.includes('किराने') || lowerQuestion.includes('కిరాణా') || lowerQuestion.includes('மளிகை') || lowerQuestion.includes('মুদি') || lowerQuestion.includes('किराणा') || lowerQuestion.includes('કિરાણા') || lowerQuestion.includes('ದಿನಸಿ') || lowerQuestion.includes('പലവ്യഞ്ജന') || lowerQuestion.includes('ਕਿਰਿਆਨੇ') || lowerQuestion.includes('کریانے')) {
      const responses = {
        en: "Based on your receipts, you spent ₹28,745 on groceries this month. This is 12% higher than last month. I noticed you bought organic items frequently - consider shopping during sale days to save up to 20%.",
        hi: "आपकी रसीदों के आधार पर, आपने इस महीने किराने का सामान पर ₹28,745 खर्च किए। यह पिछले महीने से 12% अधिक है।",
        te: "మీ రసీదుల ఆధారంగా, మీరు ఈ నెలలో కిరాణా సామాను మీద ₹28,745 ఖర్చు చేశారు। ఇది గత నెల కంటే 12% ఎక్కువ।",
        ta: "உங்கள் ரசீதுகளின் அடிப்படையில், இந்த மாதம் நீங்கள் மளிகைப் பொருட்களுக்கு ₹28,745 செலவு செய்துள்ளீர்கள். இது கடந்த மாதத்தை விட 12% அதிகம்।",
        bn: "আপনার রসিদের ভিত্তিতে, আপনি এই মাসে মুদিখানার জন্য ₹28,745 খরচ করেছেন। এটি গত মাসের চেয়ে 12% বেশি।",
        mr: "तुमच्या रसीदांच्या आधारे, तुम्ही या महिन्यात किराणामालावर ₹28,745 खर्च केला आहे. हे गेल्या महिन्यापेक्षा 12% जास्त आहे.",
        gu: "તમારી રસીદોના આધારે, તમે આ મહિને કિરાણાના સામાન પર ₹28,745 ખર્ચ કર્યો છે. આ ગયા મહિના કરતાં 12% વધારે છે.",
        kn: "ನಿಮ್ಮ ರಸೀದಿಗಳ ಆಧಾರದ ಮೇಲೆ, ಈ ತಿಂಗಳು ನೀವು ದಿನಸಿ ಸಾಮಾನುಗಳಿಗೆ ₹28,745 ಖರ್ಚು ಮಾಡಿದ್ದೀರಿ. ಇದು ಕಳೆದ ತಿಂಗಳಿಗಿಂತ 12% ಹೆಚ್ಚು.",
        ml: "നിങ്ങളുടെ രസീതുകളുടെ അടിസ്ഥാനത്തിൽ, ഈ മാസം നിങ്ങൾ പലവ്യഞ്ജനങ്ങൾക്കായി ₹28,745 ചിലവാക്കി. ഇത് കഴിഞ്ഞ മാസത്തേക്കാൾ 12% കൂടുതലാണ്.",
        pa: "ਤੁਹਾਡੀਆਂ ਰਸੀਦਾਂ ਦੇ ਆਧਾਰ ਤੇ, ਤੁਸੀਂ ਇਸ ਮਹੀਨੇ ਕਿਰਿਆਨੇ ਦੇ ਸਾਮਾਨ 'ਤੇ ₹28,745 ਖਰਚ ਕੀਤੇ ਹਨ। ਇਹ ਪਿਛਲੇ ਮਹੀਨੇ ਨਾਲੋਂ 12% ਵੱਧ ਹੈ।",
        ur: "آپ کی رسیدوں کی بنیاد پر، آپ نے اس مہینے کریانے کے سامان پر ₹28,745 خرچ کیے ہیں۔ یہ پچھلے مہینے سے 12% زیادہ ہے۔"
      };
      response = responses[selectedLanguage] || responses.en;
    } else if (lowerQuestion.includes('coffee') || lowerQuestion.includes('कॉफी') || lowerQuestion.includes('કોફી') || lowerQuestion.includes('কফি') || lowerQuestion.includes('കോഫി') || lowerQuestion.includes('কাহি') || lowerQuestion.includes('કોફી')) {
      const responses = {
        en: "You've spent ₹4,700 on coffee this month. Try brewing at home to save ₹3,500/month! I can create a savings goal pass for your wallet.",
        hi: "आपने इस महीने कॉफी पर ₹4,700 खर्च किए हैं। घर पर बनाने की कोशिश करें और ₹3,500/महीना बचाएं!",
        te: "మీరు ఈ నెలలో కాఫీ మీద ₹4,700 ఖర్చు చేశారు। ఇంట్లో తయారు చేసి నెలకు ₹3,500 ఆదా చేయండి!",
        ta: "இந்த மாதம் நீங்கள் காபிக்கு ₹4,700 செலவு செய்துள்ளீர்கள். வீட்டில் தயாரித்து மாதம் ₹3,500 சேமிக்கலாம்!",
        bn: "আপনি এই মাসে কফিতে ₹4,700 খরচ করেছেন। বাড়িতে তৈরি করে মাসে ₹3,500 সাশ্রয় করুন!",
        mr: "तुम्ही या महिन्यात कॉफीवर ₹4,700 खर्च केला आहे. घरी बनवून दरमहा ₹3,500 वाचवा!",
        gu: "તમે આ મહિને કોફી પર ₹4,700 ખર્ચ કર્યો છે. ઘરે બનાવીને મહિને ₹3,500 બચાવો!",
        kn: "ಈ ತಿಂಗಳು ನೀವು ಕಾಫಿಗೆ ₹4,700 ಖರ್ಚು ಮಾಡಿದ್ದೀರಿ. ಮನೆಯಲ್ಲಿ ತಯಾರಿಸಿ ತಿಂಗಳಿಗೆ ₹3,500 ಉಳಿಸಿ!",
        ml: "ഈ മാസം നിങ്ങൾ കോഫിക്ക് ₹4,700 ചിലവാക്കി. വീട്ടിൽ ഉണ്ടാക്കി മാസത്തിൽ ₹3,500 ലാഭിക്കാം!",
        pa: "ਤੁਸੀਂ ਇਸ ਮਹੀਨੇ ਕਾਫੀ ਤੇ ₹4,700 ਖਰਚ ਕੀਤੇ ਹਨ। ਘਰ ਵਿੱਚ ਬਣਾ ਕੇ ਮਹੀਨੇ ₹3,500 ਬਚਾਓ!",
        ur: "آپ نے اس مہینے کافی پر ₹4,700 خرچ کیے ہیں۔ گھر میں بنا کر ماہانہ ₹3,500 بچائیں!"
      };
      response = responses[selectedLanguage] || responses.en;
    } else {
      const responses = {
        en: "I've analyzed your spending data. Based on your recent receipts and patterns, I can help you with budgeting, finding savings opportunities, or creating shopping lists. What specific aspect would you like to explore?",
        hi: "मैंने आपके खर्च के डेटा का विश्लेषण किया है। आपकी हाल की रसीदों और पैटर्न के आधार पर, मैं बजटिंग में आपकी मदद कर सकता हूं।",
        te: "నేను మీ వ్యయ డేటాను విశ్లేషించాను. మీ ఇటీవలి రసీదులు మరియు నమూనాల ఆధారంగా, నేను బడ్జెటింగ్‌లో మీకు సహాయం చేయగలను.",
        ta: "நான் உங்கள் செலவு தரவை பகுப்பாய்வு செய்துள்ளேன். உங்கள் சமீபத்திய ரசீதுகள் மற்றும் வடிவங்களின் அடிப்படையில், பட்ஜெட்டில் உங்களுக்கு உதவ முடியும்.",
        bn: "আমি আপনার খরচের ডেটা বিশ্লেষণ করেছি। আপনার সাম্প্রতিক রসিদ এবং প্যাটার্নের ভিত্তিতে, আমি বাজেটিংয়ে আপনাকে সাহায্য করতে পারি।",
        mr: "मी तुमच्या खर्चाच्या डेटाचे विश्लेषण केले आहे. तुमच्या अलीकडच्या पावत्या आणि नमुन्यांच्या आधारे, मी बजेटिंगमध्ये मदत करू शकतो.",
        gu: "મેં તમારા ખર્ચના ડેટાનું વિશ્લેષણ કર્યું છે. તમારી તાજેતરની રસીદો અને પેટર્નના આધારે, હું બજેટિંગમાં મદદ કરી શકું છું.",
        kn: "ನಾನು ನಿಮ್ಮ ವೆಚ್ಚದ ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸಿದ್ದೇನೆ. ನಿಮ್ಮ ಇತ್ತೀಚಿನ ರಸೀದಿಗಳು ಮತ್ತು ಮಾದರಿಗಳ ಆಧಾರದ ಮೇಲೆ, ನಾನು ಬಜೆಟಿಂಗ್‌ನಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು.",
        ml: "ഞാൻ നിങ്ങളുടെ ചെലവ് ഡാറ്റ വിശകലനം ചെയ്തിട്ടുണ്ട്. നിങ്ങളുടെ സമീപകാല രസീതുകളുടെയും പാറ്റേണുകളുടെയും അടിസ്ഥാനത്തിൽ, എനിക്ക് ബഡ്ജറ്റിംഗിൽ സഹായിക്കാനാകും.",
        pa: "ਮੈਂ ਤੁਹਾਡੇ ਖਰਚੇ ਦੇ ਡਾਟਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਹੈ। ਤੁਹਾਡੀਆਂ ਹਾਲੀਆ ਰਸੀਦਾਂ ਅਤੇ ਨਮੂਨਿਆਂ ਦੇ ਆਧਾਰ ਤੇ, ਮੈਂ ਬਜਟਿੰਗ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।",
        ur: "میں نے آپ کے خرچ کے ڈیٹا کا تجزیہ کیا ہے۔ آپ کی حالیہ رسیدوں اور پیٹرن کی بنیاد پر، میں بجٹنگ میں مدد کر سکتا ہوں۔"
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
            Language / भाषा / ভাষা / ભાષા / ಭಾಷೆ / തकावळ / ਭਾਸ਼ਾ / زبان
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
