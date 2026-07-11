"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  from: "bot" | "user";
  text: string;
}

interface TranslatedFAQ {
  keywords: string[];
  answers: {
    en: string;
    hi: string;
    te: string;
  };
}

// ── FAQ Knowledge Base ─────────────────────────────────────────────────────
const faqs: TranslatedFAQ[] = [
  {
    keywords: ["product", "products", "fabric", "fabrics", "varieties", "variety", "catalogue", "collection", "what do you sell", "items", "कपड़ा", "कपड़े", "उत्पाद", "वैरायटी", "डिजाइन", "కలెక్షన్", "బట్టలు", "కుర్తీలు", "లెహంగా", "చీరలు", "సరుకు"],
    answers: {
      en: "Thank you for your interest! We offer a beautiful range of 3-Piece Sets, Lehangas, Fancy Wear, Embroidered Suits, Kurtis & more — with fresh arrivals every week. We'd love to show you around!",
      hi: "रुचि दिखाने के लिए धन्यवाद! हम 3-पीस सेट, लहंगे, फैंसी वियर, कढ़ाई वाले सूट, कुर्तियां और बहुत कुछ की एक सुंदर श्रृंखला प्रदान करते हैं - हर हफ्ते नए आगमन के साथ। हम आपको दिखाना पसंद करेंगे!",
      te: "మా ఉత్పత్తులపై ఆసక్తి చూపినందుకు ధన్యవాదాలు! మేము 3-పీస్ సెట్లు, లెహంగాలు, ఫ్యాన్సీ వేర్, ఎంబ్రాయిడరీ సూట్లు, కుర్తీలు మరియు మరెన్నో అందమైన శ్రేణిని అందిస్తున్నాము - ప్రతి వారం కొత్త కలెక్షన్స్ వస్తాయి. మీకు చూపించడానికి మేము సంతోషిస్తాము!"
    }
  },
  {
    keywords: ["price", "prices", "cost", "rate", "rates", "how much", "pricing", "रेट", "भाव", "कीमत", "पैसा", "entha", "ధర", "ధరలు", "రేటు"],
    answers: {
      en: "We're proud to offer highly competitive wholesale rates, sourced directly from weavers with no middlemen. For specific pricing, we warmly invite you to visit us or reach out — we'll be happy to assist.",
      hi: "हम बिना किसी बिचौलियों के सीधे बुनकरों से ली गई अत्यधिक प्रतिस्पर्धी थोक दरें प्रदान करने में गर्व महसूस करते हैं। विशिष्ट मूल्य निर्धारण के लिए, हम आपको हमारे पास आने या संपर्क करने के लिए हार्दिक रूप से आमंत्रित करते हैं - हमें सहायता करने में खुशी होगी।",
      te: "మధ్యవర్తులు లేకుండా నేరుగా చేనేత కార్మికుల నుండి సేకరించిన అత్యంత పోటీ హోల్‌సేల్ ధరలను అందించడం మాకు గర్వకారణం. నిర్దిష్ట ధరల కోసం, దయచేసి మమ్మల్ని సందర్శించండి లేదా సంప్రదించండి - మేము మీకు సహాయం చేయడానికి సంతోషిస్తాము."
    }
  },
  {
    keywords: ["wholesale", "bulk", "order", "minimum", "retailer", "reseller", "dealer", "थोक", "होलसेल", "బల్క్", "హోల్సేల్", "రిటైలర్"],
    answers: {
      en: "We exclusively serve wholesale buyers and are always glad to welcome new retail partners. MOQ varies by category — please visit us or use our Contact page and we'll take care of the rest.",
      hi: "हम विशेष रूप से थोक खरीदारों की सेवा करते हैं और नए खुदरा भागीदारों का स्वागत करने में हमेशा प्रसन्न होते हैं। न्यूनतम ऑर्डर मात्रा (MOQ) श्रेणी के अनुसार भिन्न होती है - कृपया हमसे मिलें या हमारे संपर्क पृष्ठ का उपयोग करें और हम बाकी का ध्यान रखेंगे।",
      te: "మేము ప్రత్యేకంగా హోల్‌సేల్ కొనుగోలుదారులకు సేవలను అందిస్తాము మరియు కొత్త రిటైల్ భాగస్వాములను స్వాగతించడానికి ఎల్లప్పుడూ సంతోషిస్తాము. ప్రతి కేటగిరీకి కనీస ఆర్డర్ పరిమాణం (MOQ) మారుతుంది - దయచేసి మా దుకాణాన్ని సందర్శించండి లేదా మా కాంటాక్ట్ పేజీని ఉపయోగించండి, మిగిలినది మేము చూసుకుంటాము."
    }
  },
  {
    keywords: ["location", "address", "where", "find you", "visit", "shop", "store", "one town", "पता", "कहाँ है", "दुकान", "లొకేషన్", "అడ్రస్", "ఎక్కడ", "వన్ టౌన్"],
    answers: {
      en: "We'd be delighted to have you visit us! You can find us at Naganna Trade One Mall, 3rd Floor, One Town, Vijayawada. We look forward to welcoming you.",
      hi: "हमें खुशी होगी अगर आप हमसे मिलने आएं! आप हमें नागन्ना ट्रेड वन मॉल, तीसरी मंजिल, वन टाउन, विजयवाड़ा में पा सकते हैं। हम आपका स्वागत करने के लिए उत्सुक हैं।",
      te: "మీరు మమ్మల్ని సందర్శిస్తే మేము చాలా సంతోషిస్తాము! విజయవాడలోని వన్ టౌన్, నాగన్న ట్రేడ్ వన్ మాల్, 3వ అంతస్తులో మా దుకాణం ఉంది. మిమ్మల్ని స్వాగతించడానికి మేము ఎదురుచూస్తున్నాము."
    }
  },
  {
    keywords: ["timing", "timings", "hours", "open", "close", "time", "when", "समय", "कब खुलता", "कब बंद", "సమయం", "ఎప్పుడు", "వేళలు"],
    answers: {
      en: "Our store is open Monday to Saturday, 10:00 AM – 8:00 PM. We're closed on Sundays and public holidays. We look forward to seeing you!",
      hi: "हमारी दुकान सोमवार से शनिवार, सुबह 10:00 बजे से रात 8:00 बजे तक खुली रहती है। हम रविवार और सार्वजनिक छुट्टियों पर बंद रहते हैं। हम आपसे मिलने की उम्मीद करते हैं!",
      te: "మా స్టోర్ సోమవారం నుండి శనివారం వరకు, ఉదయం 10:00 నుండి రాత్రి 8:00 వరకు తెరిచి ఉంటుంది. ఆదివారాలు మరియు ప్రభుత్వ సెలవు దినాలలో మూసివేయబడుతుంది. మిమ్మల్ని కలవడానికి మేము ఎదురుచూస్తున్నాము!"
    }
  },
  {
    keywords: ["contact", "reach", "संपर्क", "సంప్రదించండి", "మమ్మల్ని సంప్రదించండి"],
    answers: {
      en: "We'd love to hear from you! You can call or WhatsApp us at +91 93479 82187, visit us at Naganna Trade One Mall, 3rd Floor, One Town, Vijayawada, or reach out via our Contact page.",
      hi: "हम आपसे सुनना पसंद करेंगे! आप हमें +91 93479 82187 पर कॉल या व्हाट्सएप कर सकते हैं, नागन्ना ट्रेड वन मॉल, तीसरी मंजिल, वन टाउन, विजयवाड़ा में हमसे मिल सकते हैं, या हमारे संपर्क पृष्ठ के माध्यम से संपर्क कर सकते हैं।",
      te: "మమ్మల్ని సంప్రదించడానికి దయచేసి +91 93479 82187 కి కాల్ లేదా వాట్సాప్ చేయండి, నాగన్న ట్రేడ్ వన్ మాల్, 3వ అంతస్తు, వన్ టౌన్, విజయవాడలో మా దుకాణాన్ని సందర్శించండి లేదా మా కాంటాక్ట్ పేజీ ద్వారా సంప్రదించండి."
    }
  },
  {
    keywords: ["call", "phone", "telephone", "ring", "number", "फोन", "नंबर", "కాల్", "ఫోన్", "నెంబర్"],
    answers: {
      en: "Please feel free to give us a call at +91 93479 82187. We're available Monday to Saturday, 10:00 AM – 8:00 PM and will be happy to assist you.",
      hi: "कृपया बेझिझक हमें +91 93479 82187 पर कॉल करें। हम सोमवार से शनिवार, सुबह 10:00 बजे से रात 8:00 बजे तक उपलब्ध हैं और आपकी सहायता करने में प्रसन्न होंगे।",
      te: "దయచేసి +91 93479 82187 కి కాల్ చేయడానికి సంకోచించకండి. మేము సోమవారం నుండి శనివారం వరకు, ఉదయం 10:00 నుండి రాత్రి 8:00 వరకు అందుబాటులో ఉంటాము మరియు మీకు సహాయం చేయడానికి సంతోషిస్తాము."
    }
  },
  {
    keywords: ["whatsapp", "whats app", "chat", "message", "text", "व्हाट्सएप", "व्हाट्स एप", "వాట్సాప్", "మెసేజ్"],
    answers: {
      en: "You're welcome to WhatsApp us at +91 93479 82187 anytime. We'll get back to you as soon as possible — usually very quickly!",
      hi: "आप किसी भी समय हमें +91 93479 82187 पर व्हाट्सएप कर सकते हैं। हम जल्द से जल्द आपसे संपर्क करेंगे - आमतौर पर बहुत तेज़ी से!",
      te: "మీరు ఎప్పుడైనా +91 93479 82187 కి వాట్సాప్ చేయవచ్చు. మేము వీలైనంత త్వరగా మీకు సమాధానం ఇస్తాము - సాధారణంగా చాలా వేగంగా!"
    }
  },
  {
    keywords: ["since", "years", "experience", "history", "established", "old", "legacy", "1994", "1999", "साल", "इतिहास", "ఎప్పటి నుండి", "అనుభవం"],
    answers: {
      en: "Mohan Krishna Garments has been a trusted name in Vijayawada's wholesale market for generations. We take great pride in the relationships and trust we have built over the years.",
      hi: "मोहन कृष्णा गारमेंट्स पीढ़ियों से विजयवाड़ा के थोक बाजार में एक विश्वसनीय नाम रहा है। हमें पिछले कुछ वर्षों में बनाए गए संबंधों और विश्वास पर बहुत गर्व है।",
      te: "మోహన్ కృష్ణ గార్మెంట్స్ విజయవాడ హోల్‌సేల్ మార్కెట్‌లో తరతరాలుగా నమ్మకమైన పేరుగా నిలిచింది. ఇన్నేళ్లుగా మేము నిర్మించుకున్న సంబంధాలు మరియు నమ్మకానికి మేము ఎంతో గర్విస్తున్నాము."
    }
  },
  {
    keywords: ["delivery", "shipping", "dispatch", "transport", "courier", "डिलिवरी", "भेजना", "ట్రాన్స్పోర్ట్", "డెలివరీ"],
    answers: {
      en: "We dispatch bulk orders across Andhra Pradesh and beyond. Please get in touch with us and we'll be happy to arrange delivery for your order.",
      hi: "हम आंध्र प्रदेश और उससे आगे थोक ऑर्डर भेजते हैं। कृपया हमसे संपर्क करें और हमें आपके ऑर्डर के लिए डिलीवरी की व्यवस्था करने में खुशी होगी।",
      te: "మేము ఆంధ్రప్రదేశ్ మరియు ఇతర ప్రాంతాలకు బల్క్ ఆర్డర్‌లను పంపుతాము. దయచేసి మమ్మల్ని సంప్రదించండి, మేము మీ ఆర్డర్ డెలివరీని ఏర్పాటు చేయడానికి సంతోషిస్తాము."
    }
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good afternoon", "good evening", "नमस्ते", "हैलो", "హలో", "నమస్కారం"],
    answers: {
      en: "Namaste! A very warm welcome to Mohan Krishna Garments. How may I assist you today?",
      hi: "नमस्ते! मोहन कृष्णा गारमेंट्स में आपका हार्दिक स्वागत है। आज मैं आपकी क्या सहायता कर सकता हूँ?",
      te: "నమస్కారం! మోహన్ కృష్ణ గార్మెంట్స్ కి స్వాగతం. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?"
    }
  },
  {
    keywords: ["thank", "thanks", "thank you", "dhanyavad", "shukriya", "धन्यवाद", "शुक्रिया", "ధన్యవాదాలు"],
    answers: {
      en: "It's our pleasure! We're always here to help. Please don't hesitate to reach out if you need anything else.",
      hi: "यह हमारा सौभाग्य है! हम हमेशा आपकी मदद के लिए यहाँ हैं। कुछ और चाहिए तो अवश्य पूछें।",
      te: "మీకు సహాయం చేయడం మాకు సంతోషం! ఏదైనా సహాయం కావాలంటే దయచేసి అడగడానికి సంకోచించకండి."
    }
  }
];

const WELCOMES = {
  en: "Namaste! Welcome to Mohan Krishna Garments. I'm here to help you with any questions about our products, wholesale orders, store location, or timings. How may I assist you?",
  hi: "नमस्ते! मोहन कृष्णा गारमेंट्स में आपका स्वागत है। मैं यहाँ हमारे उत्पादों, थोक ऑर्डर, दुकान के पते या समय के बारे में किसी भी प्रश्न में आपकी सहायता करने के लिए हूँ। मैं आपकी क्या मदद कर सकता हूँ?",
  te: "నమస్కారం! మోహన్ కృష్ణ గార్మెంట్స్ కి స్వాగతం. మా ఉత్పత్తులు, హోల్‌సేల్ ఆర్డర్‌లు, దుకాణం చిరునామా లేదా వేళల గురించి మీకు ఏవైనా సందేహాలు ఉంటే సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. నేను మీకు ఎలా సహాయపడగలను?"
};

const QUICK_REPLIES = {
  en: [
    "What products do you have?",
    "Wholesale & bulk orders",
    "Store location",
    "Store timings",
  ],
  hi: [
    "आपके पास क्या उत्पाद हैं?",
    "थोक और बल्क ऑर्डर",
    "दुकान का पता",
    "दुकान का समय",
  ],
  te: [
    "మీ వద్ద ఏ ఉత్పత్తులు ఉన్నాయి?",
    "హోల్‌సేల్ & బల్క్ ఆర్డర్‌లు",
    "దుకాణం చిరునామా",
    "దుకాణ సమయాలు",
  ]
};

const LABELS = {
  en: { title: "MK Assistant", online: "Online", placeholder: "Ask something..." },
  hi: { title: "एमके सहायक", online: "ऑनलाइन", placeholder: "कुछ पूछें..." },
  te: { title: "MK అసిస్టెంట్", online: "ఆన్‌లైన్", placeholder: "ఏదైనా అడగండి..." }
};

// ── Language Detection & Response Logic ────────────────────────────────────
function detectLanguage(input: string, currentWebsiteLang: "en" | "hi" | "te"): "en" | "hi" | "te" {
  const lower = input.toLowerCase();
  
  if (/[\u0C00-\u0C7F]/.test(input)) {
    return "te";
  }
  if (/[\u0900-\u097F]/.test(input)) {
    return "hi";
  }
  
  const teluguTranslit = [
    "ekkada", "ekada", "ekda", "enti", "entha", "enta", "eppudu", "epudu", "dharalu", "dhara", 
    "kavali", "namaskaram", "cheppandi", "chepandi", "timings enti", "unnara", "rates entha", 
    "kurtilu", "lehanga", "ledu", "sarees", "battalu", "dhanyavadalu", "andi", "vachindi", "kavalenu"
  ];
  if (teluguTranslit.some(word => lower.includes(word))) {
    return "te";
  }
  
  const hindiTranslit = [
    "kya", "hai", "kahan", "kaha", "kab", "kitna", "kitne", "baje", "batao", "shukriya", 
    "dhanyavad", "namaste", "bhaiya", "kapda", "kapde", "bataiye", "chahiye", "hoga", "milega", "kise", "kabse"
  ];
  if (hindiTranslit.some(word => lower.includes(word))) {
    return "hi";
  }
  
  return currentWebsiteLang;
}

function getBotReply(input: string, replyLang: "en" | "hi" | "te"): string {
  const lower = input.toLowerCase();
  for (const faq of faqs) {
    if (faq.keywords.some((kw) => lower.includes(kw))) {
      return faq.answers[replyLang];
    }
  }
  
  const fallbacks = {
    en: "We'd love to help with that! Please visit us at One Town, Vijayawada or contact us directly so we can assist you better.",
    hi: "हमें इस बारे में आपकी सहायता करने में खुशी होगी! कृपया हमसे सीधे संपर्क करें या वन टाउन, विजयवाड़ा में हमारी दुकान पर आएं ताकि हम आपकी बेहतर मदद कर सकें।",
    te: "దీనికి సంబంధించి మీకు సహాయం చేయడానికి మేము సంతోషిస్తాము! మీకు మరింత మెరుగైన సహాయం అందించడానికి దయచేసి విజయవాడలోని వన్ టౌన్ వద్ద ఉన్న మా దుకాణాన్ని సందర్శించండి లేదా మమ్మల్ని నేరుగా సంప్రదించండి।"
  };
  
  return fallbacks[replyLang];
}

// ── Chat Bubble Icon ───────────────────────────────────────────────────────
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 26, height: 26 }}>
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      fill="currentColor"
      opacity={0.9}
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 20, height: 20 }}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Main Component ─────────────────────────────────────────────────────────
export default function ChatBot() {
  const { language: currentLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message based on active language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ from: "bot", text: WELCOMES[currentLang] }]);
    }
  }, []);

  // Update welcome message dynamically if user switches website language before typing
  useEffect(() => {
    if (messages.length === 1 && messages[0].from === "bot") {
      setMessages([{ from: "bot", text: WELCOMES[currentLang] }]);
    }
  }, [currentLang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const replyLang = detectLanguage(trimmed, currentLang);
      setMessages((prev) => [...prev, { from: "bot", text: getBotReply(trimmed, replyLang) }]);
      if (!open) setHasNew(true);
    }, 900 + Math.random() * 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: 96,
              right: 24,
              width: "min(380px, calc(100vw - 32px))",
              height: "min(540px, calc(100vh - 120px))",
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(59,26,10,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 9999,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #3b1a0a 0%, #5a2d0c 100%)",
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #C5A028",
                  flexShrink: 0,
                }}
              >
                <Image src="/mk-avatar.png" alt="MK Assistant" width={42} height={42} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.88rem", letterSpacing: "1px" }}>
                  {LABELS[currentLang].title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4caf50", display: "inline-block" }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                    {LABELS[currentLang].online}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", color: "#fff", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 16px 8px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: "#f9f9f7",
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "10px 14px",
                      borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.from === "user"
                        ? "linear-gradient(135deg, #3b1a0a, #5a2d0c)"
                        : "#fff",
                      color: msg.from === "user" ? "#fff" : "#1a1a1a",
                      fontSize: "0.85rem",
                      lineHeight: 1.55,
                      boxShadow: msg.from === "user"
                        ? "0 2px 12px rgba(59,26,10,0.25)"
                        : "0 2px 8px rgba(0,0,0,0.06)",
                      fontWeight: 400,
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px", background: "#fff", borderRadius: "16px 16px 16px 4px", width: "fit-content", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                  >
                    {[0, 1, 2].map((n) => (
                      <motion.span
                        key={n}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: n * 0.15 }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: "#C5A028", display: "block" }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div style={{ padding: "8px 16px", display: "flex", gap: 8, flexWrap: "wrap", background: "#f9f9f7", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                {QUICK_REPLIES[currentLang].map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 20,
                      border: "1.5px solid rgba(59,26,10,0.25)",
                      background: "transparent",
                      color: "#3b1a0a",
                      fontSize: "0.73rem",
                      fontWeight: 700,
                      letterSpacing: "0.3px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#3b1a0a";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#3b1a0a";
                    }}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: 10,
                padding: "12px 16px",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                background: "#fff",
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={LABELS[currentLang].placeholder}
                style={{
                  flex: 1,
                  border: "1.5px solid rgba(59,26,10,0.2)",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: "0.85rem",
                  outline: "none",
                  fontFamily: "inherit",
                  background: "#f9f9f7",
                  color: "#1a1a1a",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#3b1a0a")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(59,26,10,0.2)")}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  border: "none",
                  background: input.trim() ? "linear-gradient(135deg, #3b1a0a, #5a2d0c)" : "rgba(0,0,0,0.08)",
                  color: input.trim() ? "#fff" : "rgba(0,0,0,0.3)",
                  cursor: input.trim() ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                <SendIcon />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Bubble ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="gold-shimmer"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4a0e1e 0%, #6b1a2e 100%)",
          border: "2.5px solid #C5A028",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(59,26,10,0.35), 0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 9999,
          outline: "none",
        }}
        aria-label="Open chat"
        id="mk-chatbot-bubble"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <CloseIcon />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <ChatIcon />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        <AnimatePresence>
          {hasNew && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#C5A028",
                border: "2px solid #fff",
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
