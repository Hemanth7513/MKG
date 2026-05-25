"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "te";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    hero_title: "25 Years of Wholesale Excellence",
    hero_subtitle: "Exclusive Wholesale Dealers for Premium Ladies Wear",
    hero_cta: "View Collections",
    cat_title: "Our Collections",
    cat_3piece: "3 Piece Sets",
    cat_lehangas: "Lehangas",
    cat_nightwear: "Nightwear",
    cat_leggings: "Leggings",
    cat_chunni: "Chunni / Dupatta",
    cat_fancy: "Fancy Wear",
    cat_coord: "Co-ord Sets",
    about_title: "Our Legacy",
    about_intro_title: "Three Decades of Trust",
    about_text: "For over 25 years, Mohan Krishna Garments & Cloth has been a pillar of the wholesale garment industry in Vijayawada. We specialize in providing the highest quality women's wear to retailers across the region.",
    manufacturer_text: "From our humble beginnings at home, we have grown to source directly from manufacturers in Ahmedabad, Surat & Hyderabad, serving hundreds of retailers.",
    contact_title: "Get In Touch",
    contact_address: "3rd Floor, A Block, Naaganna Trade One Mall, One Town, Vijayawada - 520001",
    ai_greeting: "Hello! I am your MK Garments assistant. How can I help you today?",
    wholesale_tag: "Wholesale Only",
    voice_start: "Talk to AI Assistant",
    voice_listening: "Listening...",
    voice_thinking: "Thinking...",
    weekly_update: "New catalogues are updated every week for all collections!",
  },
  hi: {
    hero_title: "25 वर्षों की थोक उत्कृष्टता",
    hero_subtitle: "प्रीमियम लेडीज वियर के लिए विशेष थोक विक्रेता",
    hero_cta: "संग्रह देखें",
    cat_title: "हमारा संग्रह",
    cat_3piece: "3 पीस सेट्स",
    cat_lehangas: "लेहेंगा",
    cat_nightwear: "नाइटवियर",
    cat_leggings: "लेगिंग्स",
    cat_chunni: "चुन्नी / दुपट्टा",
    cat_fancy: "फैंसी वियर",
    cat_coord: "को-ऑर्ड सेट्स",
    about_title: "हमारी विरासत",
    about_intro_title: "विश्वास के तीन दशक",
    about_text: "25 से अधिक वर्षों से, मोहन कृष्णा गारमेंट्स एंड क्लॉथ विजयवाड़ा में थोक परिधान उद्योग का एक स्तंभ रहा है। हम क्षेत्र भर के खुदरा विक्रेताओं को उच्चतम गुणवत्ता वाले महिला परिधान प्रदान करने में विशेषज्ञ हैं।",
    manufacturer_text: "घर से हमारी विनम्र शुरुआत से, हम अहमदाबाद, सूरत और हैदराबाद के निर्माताओं से सीधे सोर्स करने के लिए विकसित हुए हैं, और सैकड़ों खुदरा विक्रेताओं की सेवा कर रहे हैं।",
    contact_title: "संपर्क करें",
    contact_address: "तीसरी मंजिल, ए ब्लॉक, नागण्णा ट्रेड वन मॉल, वन टाउन, विजयवाड़ा - 520001",
    ai_greeting: "नमस्ते! मैं आपका एमके गारमेंट्स सहायक हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
    wholesale_tag: "केवल थोक",
    voice_start: "एआई सहायक से बात करें",
    voice_listening: "सुन रहे हैं...",
    voice_thinking: "सोच रहे हैं...",
    weekly_update: "सभी संग्रहों के लिए हर हफ्ते नए कैटलॉग अपडेट किए जाते हैं!",
  },
  te: {
    hero_title: "25 ఏళ్ల హోల్ సేల్ అత్యున్నత ప్రమాణాలు",
    hero_subtitle: "ప్రీమియం లేడీస్ వేర్ కోసం ప్రత్యేక హోల్ సేల్ డీలర్లు",
    hero_cta: "కలెక్షన్స్ చూడండి",
    cat_title: "మా కలెక్షన్స్",
    cat_3piece: "3 పీస్ సెట్స్",
    cat_lehangas: "లెహంగాలు",
    cat_nightwear: "నైట్ వేర్",
    cat_leggings: "లెగ్గింగ్స్",
    cat_chunni: "చున్నీ / దుపట్టా",
    cat_fancy: "ఫ్యాన్సీ వేర్",
    cat_coord: "కో-ఆర్డ్ సెట్స్",
    about_title: "మా వారసత్వం",
    about_intro_title: "మూడు దశాబ్దాల నమ్మకం",
    about_text: "25 సంవత్సరాలకు పైగా, మోహన్ కృష్ణ గార్మెంట్స్ & క్లాత్ విజయవాడలోని హోల్ సేల్ గార్మెంట్ పరిశ్రమలో ఒక మూలస్తంభంగా ఉంది. మేము ఈ ప్రాంతంలోని రిటైలర్లకు అత్యంత నాణ్యమైన మహిళల దుస్తులను అందించడంలో నైపుణ్యం కలిగి ఉన్నాము.",
    manufacturer_text: "ఇంటి వద్ద మా సాధారణ ప్రారంభం నుండి, మేము అహ్మదాబాద్, సూరత్ మరియు హైదరాబాద్ తయారీదారుల నుండి నేరుగా కొనుగోలు చేసే స్థాయికి ఎదిగాము, వందలాది రిటైలర్లకు సేవలు అందిస్తున్నాము.",
    contact_title: "సంప్రదించండి",
    contact_address: "3వ అంతస్తు, ఎ బ్లాక్, నాగన్న ట్రేడ్ వన్ మాల్, వన్ టౌన్, విజయవాడ - 520001",
    ai_greeting: "నమస్కారం! నేను మీ MK గార్మెంట్స్ అసిస్టెంట్‌ని. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?",
    wholesale_tag: "హోల్ సేల్ మాత్రమే",
    voice_start: "AI అసిస్టెంట్‌తో మాట్లాడండి",
    voice_listening: "వింటున్నాను...",
    voice_thinking: "ఆలోచిస్తున్నాను...",
    weekly_update: "ప్రతి వారం అన్ని కలెక్షన్స్ కోసం కొత్త క్యాటలాగ్‌లు అప్‌డేట్ చేయబడతాయి!",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
