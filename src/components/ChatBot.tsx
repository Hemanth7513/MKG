"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

// ── Types ──────────────────────────────────────────────────────────────────
interface ActionButton {
  label: string;
  href?: string;
  query?: string;
  icon?: string;
}

interface Message {
  from: "bot" | "user";
  text: string;
  actions?: ActionButton[];
}

interface IntentFAQ {
  id: string;
  keywords: string[];
  phrases?: string[];
  answers: {
    en: string;
    hi: string;
    te: string;
  };
  actions?: {
    en: ActionButton[];
    hi: ActionButton[];
    te: ActionButton[];
  };
}

// ── Comprehensive Knowledge Base ───────────────────────────────────────────
const faqs: IntentFAQ[] = [
  {
    id: "owners",
    keywords: ["owner", "owners", "proprietor", "proprietors", "gupta", "kishore", "kln", "krishna", "management", "founder", "head", "who owns", "contact person", "मालिक", "ओनर", "यजमानी", "ఓనర్", "గుప్త", "కిషోర్", "yazamani", "garu"],
    phrases: [
      "who is the owner", "who owns the shop", "contact person", "owner name", "proprietor name",
      "owner evaru", "proprietor evaru", "owner peru", "owners evaru", "gupta garu", "kishore garu",
      "yazamani evaru", "shop owner evaru", "owner details"
    ],
    answers: {
      en: "Mohan Krishna Garments & Sri Lakshmi Ganapathi Enterprises is managed by:\n\n• **K.L.N. Gupta**: +91 94401 75226 / +91 83282 32946\n• **K. Krishna Kishore**: +91 94903 35556 / +91 93479 82187\n\nFeel free to call or WhatsApp them directly for business inquiries!",
      hi: "मोहन कृष्णा गारमेंट्स और श्री लक्ष्मी गणपति एंटरप्राइजेज का प्रबंधन इनके द्वारा किया जाता है:\n\n• **के.एल.एन. गुप्ता**: +91 94401 75226 / +91 83282 32946\n• **के. कृष्णा किशोर**: +91 94903 35556 / +91 93479 82187\n\nव्यावसायिक पूछताछ के लिए बेझिझक उन्हें सीधे कॉल या व्हाट्सएप करें!",
      te: "మోహన్ కృష్ణ గార్మెంట్స్ & శ్రీ లక్ష్మి గణపతి ఎంటర్‌ప్రైజెస్ యజమానుల వివరాలు:\n\n• **కె.ఎల్.ఎన్. గుప్త**: +91 94401 75226 / +91 83282 32946\n• **కె. కృష్ణ కిషోర్**: +91 94903 35556 / +91 93479 82187\n\nవ్యాపార విచారణల కోసం నేరుగా వారి నంబర్లకు కాల్ లేదా వాట్సాప్ చేయవచ్చు!"
    },
    actions: {
      en: [
        { label: "📞 Call K.L.N. Gupta", href: "tel:+919440175226" },
        { label: "📞 Call K. Krishna Kishore", href: "tel:+919347982187" },
        { label: "💬 WhatsApp Us", href: "https://wa.me/919347982187?text=Hello%2C%20I%20have%20a%20wholesale%20enquiry." }
      ],
      hi: [
        { label: "📞 कॉल गुप्ता जी", href: "tel:+919440175226" },
        { label: "📞 कॉल किशोर जी", href: "tel:+919347982187" },
        { label: "💬 व्हाट्सएप करें", href: "https://wa.me/919347982187?text=नमस्ते%2C%20मुझे%20थोक%20ऑर्डर%20की%20जानकारी%20चाहिए।" }
      ],
      te: [
        { label: "📞 గుప్త గారికి కాల్ చేయండి", href: "tel:+919440175226" },
        { label: "📞 కిషోర్ గారికి కాల్ చేయండి", href: "tel:+919347982187" },
        { label: "💬 వాట్సాప్ చేయండి", href: "https://wa.me/919347982187?text=నమస్కారం%2C%20హోల్‌సేల్%20విచారణ%20కోసం." }
      ]
    }
  },
  {
    id: "phone",
    keywords: ["phone", "mobile", "number", "call", "contact number", "cell", "telephone", "ring", "नंबर", "फोन", "कॉल", "నెంబర్", "ఫోన్", "కాల్", "numbers"],
    phrases: [
      "phone number", "mobile number", "contact number", "how to call", "call number",
      "number ivvandi", "phone number enti", "number enti", "call cheyala", "phone number cheppandi",
      "number cheppandi", "phone num"
    ],
    answers: {
      en: "📞 You can reach our store team directly on any of these official numbers:\n\n• **K.L.N. Gupta**: +91 94401 75226 / +91 83282 32946\n• **K. Krishna Kishore**: +91 94903 35556 / +91 93479 82187\n\nStore timings: Mon – Sat, 10:00 AM – 8:00 PM.",
      hi: "📞 आप इन आधिकारिक नंबरों पर हमारी स्टोर टीम से सीधे संपर्क कर सकते हैं:\n\n• **के.एल.एन. गुप्ता**: +91 94401 75226 / +91 83282 32946\n• **के. कृष्णा किशोर**: +91 94903 35556 / +91 93479 82187\n\nसमय: सोमवार - शनिवार, सुबह 10:00 - रात 8:00।",
      te: "📞 మీరు మా షాప్ యజమానులను నేరుగా ఈ ఫోన్ నంబర్లలో సంప్రదించవచ్చు:\n\n• **కె.ఎల్.ఎన్. గుప్త**: +91 94401 75226 / +91 83282 32946\n• **కె. కృష్ణ కిషోర్**: +91 94903 35556 / +91 93479 82187\n\nషాప్ వేళలు: సోమ - శని, ఉదయం 10:00 - రాత్రి 8:00."
    },
    actions: {
      en: [
        { label: "📞 Call +91 93479 82187", href: "tel:+919347982187" },
        { label: "📞 Call +91 94401 75226", href: "tel:+919440175226" }
      ],
      hi: [
        { label: "📞 कॉल +91 93479 82187", href: "tel:+919347982187" },
        { label: "📞 कॉल +91 94401 75226", href: "tel:+919440175226" }
      ],
      te: [
        { label: "📞 కాల్ +91 93479 82187", href: "tel:+919347982187" },
        { label: "📞 కాల్ +91 94401 75226", href: "tel:+919440175226" }
      ]
    }
  },
  {
    id: "location",
    keywords: ["location", "address", "where", "find", "shop", "store", "mall", "floor", "convent", "street", "one town", "vijayawada", "ap", "andhra", "map", "directions", "पता", "कहाँ", "दुकान", "लॉकेशन", "లొకేషన్", "అడ్రస్", "ఎక్కడ", "విజయవాడ", "వన్ టౌన్", "ekkada", "ekada", "ekda"],
    phrases: [
      "where is shop", "where are you located", "store address", "shop address", "how to reach", "google maps",
      "shop ekkada", "address enti", "address cheppandi", "location ekkada", "ekkada undi", "shop ekkada undi",
      "vijayawada ekkada", "one town ekkada", "address ivvandi"
    ],
    answers: {
      en: "📍 **Our Store Address**:\n\n**Mohan Krishna Garments & Sri Lakshmi Ganapathi Enterprises**\n3rd Floor, A Block, Naaganna Trade One Mall,\nConvent Street, One Town,\nVijayawada - 520001 (Andhra Pradesh)\n\nWe are located right in the heart of Vijayawada's wholesale textile hub!",
      hi: "📍 **हमारी दुकान का पता**:\n\n**मोहन कृष्णा गारमेंट्स एवं श्री लक्ष्मी गणपति एंटरप्राइजेज**\nतीसरी मंजिल, ए ब्लॉक, नागन्ना ट्रेड वन मॉल,\nकॉन्वेंट स्ट्रीट, वन टाउन,\nविजयवाड़ा - 520001 (आंध्र प्रदेश)\n\nहम विजयवाड़ा के थोक कपड़ा बाजार के केंद्र में स्थित हैं!",
      te: "📍 **మా షాప్ అడ్రస్ / లొకేషన్**:\n\n**మోహన్ కృష్ణ గార్మెంట్స్ & శ్రీ లక్ష్మి గణపతి ఎంటర్‌ప్రైజెస్**\n3వ అంతస్తు, A బ్లాక్, నాగన్న ట్రేడ్ వన్ మాల్,\nకాన్వెంట్ స్ట్రీట్, వన్ టౌన్,\nవిజయవాడ - 520001 (ఆంధ్రప్రదేశ్)\n\nవిజయవాడ హోల్‌సేల్ మార్కెట్ కాంప్లెక్స్‌లో మా షాప్ ఉంది!"
    },
    actions: {
      en: [
        { label: "🗺️ Open in Google Maps", href: "https://maps.google.com/?q=Naaganna+Trade+One+Mall+Vijayawada" },
        { label: "💬 WhatsApp for Directions", href: "https://wa.me/919347982187?text=Hi%2C%20please%20send%20store%20location%20map." }
      ],
      hi: [
        { label: "🗺️ गूगल मैप्स खोलें", href: "https://maps.google.com/?q=Naaganna+Trade+One+Mall+Vijayawada" },
        { label: "💬 लोकेशन के लिए व्हाट्सएप करें", href: "https://maps.google.com/?q=Naaganna+Trade+One+Mall+Vijayawada" }
      ],
      te: [
        { label: "🗺️ గూగుల్ మ్యాప్స్ ఓపెన్ చేయండి", href: "https://maps.google.com/?q=Naaganna+Trade+One+Mall+Vijayawada" },
        { label: "💬 లొకేషన్ కోసం వాట్సాప్ చేయండి", href: "https://wa.me/919347982187?text=నమస్కారం%2C%20దయచేసి%20లొకేషన్%20మ్యాప్%20పంపండి." }
      ]
    }
  },
  {
    id: "products",
    keywords: ["product", "products", "fabric", "fabrics", "varieties", "variety", "catalogue", "catalog", "collection", "what do you sell", "items", "saree", "sarees", "kurti", "kurtis", "lehanga", "lehenga", "suit", "suits", "dress", "ladies wear", "nightwear", "leggings", "cloth", "garments", "कपड़ा", "कपड़े", "उत्पाद", "वैरायटी", "डिजाइन", "लहंगा", "कुर्ती", "सूट", "కలెక్షన్", "బట్టలు", "కుర్తీలు", "లెహంగా", "చీరలు", "సూట్లు", "సరుకు", "battalu", "ammutaru"],
    phrases: [
      "what products do you sell", "what items do you have", "show collection", "catalogue photos", "do you sell sarees", "do you have kurtis",
      "em em battalu ఉన్నాయి", "em ammutaru", "kurtilu unnaya", "battalu unnaya", "em em items ఉన్నాయి", "stock vachinda",
      "collection enti", "items enti"
    ],
    answers: {
      en: "👗 **Our Exclusive Wholesale Product Line**:\n\n• **3-Piece Designer Sets** (Top, Bottom & Dupatta)\n• **Grand Lehangas & Bridal Fancy Wear**\n• **Heavy Embroidered & Party Suits**\n• **Trending Daily Wear & Office Kurtis**\n• **Leggings, Nightwear & Fancy Fabrics**\n\n✨ *Fresh new designs arrive every 10 days straight from weavers!*",
      hi: "👗 **हमारी विशेष थोक उत्पाद श्रृंखला**:\n\n• **3-पीस डिजाइनर सेट** (टॉप, बॉटम और दुपट्टा)\n• **भव्य लहंगे और फैंसी वियर**\n• **कढ़ाई वाले हैवी पार्टी सूट**\n• **ट्रेंडिंग कुर्तियां और फैंसी कपड़े**\n• **लेगिंग्स और नाइटवियर**\n\n✨ *हर 10 दिन में सीधे बुनकरों से नए डिजाइन आते हैं!*",
      te: "👗 **మా వద్ద లభించే హోల్‌సేల్ కలెక్షన్స్**:\n\n• **3-పీస్ డిజైనర్ సెట్లు** (టాప్, బాటమ్ & దుపట్టా)\n• **గ్రాండ్ లెహంగాలు & బ్రైడల్ ఫ్యాన్సీ వేర్**\n• **హెవీ ఎంబ్రాయిడరీ సూట్లు & పార్టీ వేర్**\n• **ట్రెండింగ్ కుర్తీలు & డైలీ వేర్**\n• **లెగ్గింగ్స్ & నైట్‌వేర్**\n\n✨ *ప్రతి 10 రోజులకు నేరుగా నేత కార్మికుల నుండి కొత్త స్టాక్ వస్తుంది!*"
    },
    actions: {
      en: [
        { label: "🛍️ View Products Page", href: "/products" },
        { label: "💬 Request Catalog on WhatsApp", href: "https://wa.me/919347982187?text=Hi%2C%20please%20send%20latest%20wholesale%20catalog%20photos." }
      ],
      hi: [
        { label: "🛍️ उत्पाद पेज देखें", href: "/products" },
        { label: "💬 व्हाट्सएप पर कैटलॉग मंगाएं", href: "https://wa.me/919347982187?text=नमस्ते%2C%20कृपया%20लेटेस्ट%20कैटलॉग%20फोटो%20भेजें।" }
      ],
      te: [
        { label: "🛍️ ఉత్పత్తుల పేజీ చూడండి", href: "/products" },
        { label: "💬 వాట్సాప్‌లో క్యాటలాగ్ అడగండి", href: "https://wa.me/919347982187?text=నమస్కారం%2C%20దయచేసి%20కొత్త%20క్యాటలాగ్%20ఫోటోలు%20పంపండి." }
      ]
    }
  },
  {
    id: "wholesale",
    keywords: ["wholesale", "bulk", "order", "minimum", "moq", "retailer", "reseller", "dealer", "business", "single", "personal", "individual", "pieces", "thok", "थोक", "होलसेल", "बल्क", "होलसेलर", "హోల్సేల్", "బల్క్", "రిటైలర్", "వ్యాపారం", "isthara", "istara"],
    phrases: [
      "do you sell single piece", "minimum order quantity", "moq for order", "retail or wholesale", "wholesale only",
      "wholesale aa", "retail aa", "single piece isthara", "single piece istara", "single piece isthara leda",
      "bulk order", "moq enti", "kaneesa order", "retailers", "resellers"
    ],
    answers: {
      en: "🤝 **Wholesale & Bulk Supply Policy**:\n\nWe are strictly an **exclusive wholesale dealer** serving retail shop owners, boutique managers, and online resellers.\n\n• **Single Pieces**: Not available for personal use.\n• **Minimum Order (MOQ)**: Varies by product set (usually full set bundles).\n\nConnect with us to get dealer pricing!",
      hi: "🤝 **थोक आपूर्ति नीति**:\n\nहम विशेष रूप से **थोक विक्रेता** हैं जो खुदरा दुकान मालिकों, बुटीक प्रबंधकों और ऑनलाइन पुनर्विक्रेताओं की सेवा करते हैं।\n\n• **एकल टुकड़ा (Single Piece)**: व्यक्तिगत उपयोग के लिए उपलब्ध नहीं है।\n• **न्यूनतम ऑर्डर (MOQ)**: बंडल के अनुसार भिन्न होता है।\n\nडीलर दरों के लिए हमसे संपर्क करें!",
      te: "🤝 **హోల్‌సేల్ అమ్మకాల విధానం**:\n\nమేము కేవలం **హోల్‌సేల్ వ్యాపారులము** (సరుకు హోల్‌సేల్‌గా మాత్రమే ఇస్తాము).\n\n• **సింగిల్ పీస్**: వ్యక్తిగత వాడకం కోసం ఇవ్వబడదు.\n• **కనీస ఆర్డర్ (MOQ)**: సెట్ బండిల్స్ ఆధారంగా ఉంటుంది.\n\nమీ షాప్ / రీసేలింగ్ కోసం హోల్‌సేల్ రేట్లపై మాట్లాడటానికి మమ్మల్ని కలవండి లేదా కాల్ చేయండి!"
    },
    actions: {
      en: [
        { label: "💬 Enquire Wholesale Rates", href: "https://wa.me/919347982187?text=Hi%2C%20I%20am%20a%20retailer%20inquiring%20about%20bulk%20orders." },
        { label: "📞 Talk to Sales Team", href: "tel:+919347982187" }
      ],
      hi: [
        { label: "💬 थोक दरों की जानकारी लें", href: "https://wa.me/919347982187?text=नमस्ते%2C%20मैं%20बल्क%20ऑर्डर%20के%20लिए%20संपर्क%20कर रहा हूं।" },
        { label: "📞 सेल्स टीम को कॉल करें", href: "tel:+919347982187" }
      ],
      te: [
        { label: "💬 హోల్‌సేల్ ధరలు అడగండి", href: "https://wa.me/919347982187?text=నమస్కారం%2C%20నేను%20బల్క్%20ఆర్డర్%20గురించి%20అడగాలనుకుంటున్నాను." },
        { label: "📞 సేల్స్ టీమ్‌కి కాల్ చేయండి", href: "tel:+919347982187" }
      ]
    }
  },
  {
    id: "price",
    keywords: ["price", "prices", "cost", "rate", "rates", "how much", "pricing", "cheap", "discount", "margin", "रेट", "भाव", "कीमत", "पैसा", "entha", "ధర", "ధరలు", "రేటు", "dhara", "costu"],
    phrases: [
      "what is the price", "price list", "wholesale rate", "discount rate", "how much cost",
      "rates entha", "cost entha", "dhara entha", "price list", "rate entha", "discount isthara",
      "entha padutundi", "rates cheppandi", "price entha", "rates ivvandi"
    ],
    answers: {
      en: "💰 **Unbeatable Weaver Wholesale Rates**:\n\nBecause we source directly from weavers without middlemen, we offer the most competitive wholesale rates in Vijayawada market with solid profit margins for retailers.\n\nFor current category price quotes, call us or chat on WhatsApp!",
      hi: "💰 **बुनकर थोक दरें**:\n\nक्योंकि हम बिना बिचौलियों के सीधे बुनकरों से सामान लाते हैं, हम विजयवाड़ा बाजार में सबसे प्रतिस्पर्धी थोक दरें प्रदान करते हैं।\n\nश्रेणीवार मूल्य सूची के लिए कॉल या व्हाट्सएप करें!",
      te: "💰 **చేనేత హోల్‌సేల్ ధరలు**:\n\nమధ్యవర్తులు లేకుండా నేరుగా నేత కార్మికుల నుండి సేకరించడం వలన, విజయవాడ హోల్‌సేల్ మార్కెట్లోనే అత్యంత ఉత్తమమైన ధరలను మరియు మంచి మార్జిన్ ఇస్తున్నాము.\n\nధరల వివరాల కోసం దయచేసి కాల్ చేయండి లేదా వాట్సాప్ చేయండి!"
    },
    actions: {
      en: [
        { label: "💬 Ask Price List on WhatsApp", href: "https://wa.me/919347982187?text=Hi%2C%20please%20share%20wholesale%20price%20range." }
      ],
      hi: [
        { label: "💬 व्हाट्सएप पर रेट लिस्ट पूछें", href: "https://wa.me/919347982187?text=नमस्ते%2C%20कृपया%20थोक%20रेट%20लिस्ट%20शेयर%20करें।" }
      ],
      te: [
        { label: "💬 వాట్సాప్‌లో రేట్ లిస్ట్ అడగండి", href: "https://wa.me/919347982187?text=నమస్కారం%2C%20దయచేసి%20ధరల%20వివరాలు%20పంపండి." }
      ]
    }
  },
  {
    id: "timing",
    keywords: ["timing", "timings", "hours", "open", "close", "time", "when", "sunday", "sundays", "holiday", "समय", "कब खुलता", "कब बंद", "रविवार", "సమయం", "ఎప్పుడు", "వేళలు", "ఆదివారం", "eppudu", "epudu", "terustaru", "moostaru"],
    phrases: [
      "store timings", "shop timing", "opening time", "closing time", "is shop open on sunday",
      "timings enti", "shop eppudu terustaru", "eppudu moostaru", "sunday open aa", "sunday untunda",
      "samayam enti", "epudu ravachhi", "sunday shop untada", "timings cheppandi"
    ],
    answers: {
      en: "🕒 **Store Timings**:\n\n• **Monday to Saturday**: 10:00 AM – 8:00 PM\n• **Sunday**: Closed\n• **Public Holidays**: Closed / Prior Intimation\n\nWe look forward to welcoming you to our shop in Vijayawada!",
      hi: "🕒 **दुकान का समय**:\n\n• **सोमवार से शनिवार**: सुबह 10:00 बजे – रात 8:00 बजे\n• **रविवार**: बंद\n• **सार्वजनिक अवकाश**: बंद\n\nहम विजयवाड़ा में हमारी दुकान पर आपका स्वागत करने के लिए उत्सुक हैं!",
      te: "🕒 **షాప్ వేళలు (Timings)**:\n\n• **సోమవారం నుండి శనివారం**: ఉదయం 10:00 - రాత్రి 8:00\n• **ఆదివారం (Sunday)**: సెలవు (Closed)\n\nదయచేసి పనివేళల్లో మమ్మల్ని సందర్శించండి!"
    }
  },
  {
    id: "delivery",
    keywords: ["delivery", "shipping", "dispatch", "transport", "courier", "parcel", "ap", "telangana", "andhra", "hyderabad", "vizag", "डिलिवरी", "भेजना", "कोरियर", "ట్రాన్స్పోర్ట్", "డెలివరీ", "కొరియర్", "pampistara", "chestara"],
    phrases: [
      "do you deliver", "shipping available", "transport facility", "delivery to other state",
      "transport unda", "delivery chestara", "pampistara", "courier unda", "other state pampistara",
      "districts pampistara", "parcel pampistara"
    ],
    answers: {
      en: "🚚 **All India Wholesale Transport Facility**:\n\nWe regularly dispatch bulk wholesale shipments across Andhra Pradesh, Telangana, and major trade centers all over India via dependable transport & express courier services.",
      hi: "🚚 **अखिल भारतीय थोक परिवहन सुविधा**:\n\nहम विश्वसनीय परिवहन और एक्सप्रेस कूरियर सेवाओं के माध्यम से पूरे आंध्र प्रदेश, तेलंगाना और भारत भर में थोक ऑर्डर भेजते हैं।",
      te: "🚚 **ట్రాన్స్‌పోర్ట్ సదుపాయం**:\n\nఆంధ్రప్రదేశ్, తెలంగాణ మరియు భారతదేశమంతటా నమ్మకమైన ట్రాన్స్‌పోర్ట్ మరియు కొరియర్ సేవల ద్వారా మీ హోల్‌సేల్ సరుకు డెలివరీ పంపుతాము."
    },
    actions: {
      en: [{ label: "💬 Track / Enquire Delivery", href: "https://wa.me/919347982187?text=Hi%2C%20I%20have%20a%20delivery%20transport%20question." }],
      hi: [{ label: "💬 डिलीवरी की जानकारी लें", href: "https://wa.me/919347982187?text=नमस्ते%2C%20डिलीवरी%20की%20जानकारी%20चाहिए।" }],
      te: [{ label: "💬 డెలివరీ వివరాలు అడగండి", href: "https://wa.me/919347982187?text=నమస్కారం%2C%20డెలివరీ%20రవాణా%20గురించి%20అడగాలి." }]
    }
  },
  {
    id: "greetings",
    keywords: ["hello", "hi", "hey", "namaste", "namaskaram", "good morning", "good afternoon", "good evening", "नमस्ते", "हैलो", "హలో", "నమస్కారం", "bagunnara", "andi"],
    phrases: ["good morning", "good evening", "hi there", "namaskaram", "hi andi", "hello andi", "bagunnara"],
    answers: {
      en: "Namaste! 🙏 Warm welcome to **Mohan Krishna Garments & Sri Lakshmi Ganapathi Enterprises**.\n\nHow can I help you today? You can ask about our collection, store location, owner contact numbers, or wholesale rates!",
      hi: "नमस्ते! 🙏 **मोहन कृष्णा गारमेंट्स एवं श्री लक्ष्मी गणपति एंटरप्राइजेज** में आपका हार्दिक स्वागत है।\n\nआज मैं आपकी क्या सहायता कर सकता हूँ?",
      te: "నమస్కారం! 🙏 **మోహన్ కృష్ణ గార్మెంట్స్ & శ్రీ లక్ష్మి గణపతి ఎంటర్‌ప్రైజెస్** కు స్వాగతం.\n\nఈరోజు మీకు ఎలా సహాయపడగలను? మా హోల్‌సేల్ కలెక్షన్, షాప్ అడ్రస్ లేదా నంబర్ల గురించి ఏమైనా అడగవచ్చు!"
    }
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "thank you", "dhanyavad", "shukriya", "धन्यवाद", "शुक्रिया", "ధన్యవాదాలు"],
    answers: {
      en: "You're very welcome! 😊 We are always happy to serve your business. Feel free to call us or visit our store in Vijayawada anytime!",
      hi: "आपका बहुत-बहुत धन्यवाद! 😊 हम हमेशा आपकी व्यावसायिक सहायता के लिए तत्पर हैं।",
      te: "మీకు సహాయం చేయడం మాకు సంతోషం! 😊 ఎప్పుడైనా మమ్మల్ని సంప్రదించండి!"
    }
  }
];

const WELCOMES = {
  en: "Namaste! 🙏 Welcome to Mohan Krishna Garments & Sri Lakshmi Ganapathi Enterprises. I am your AI Assistant.\n\nAsk me anything about our wholesale collection, store location in One Town Vijayawada, owners' numbers, timings, or transport details!",
  hi: "नमस्ते! 🙏 मोहन कृष्णा गारमेंट्स एवं श्री लक्ष्मी गणपति एंटरप्राइजेज में आपका स्वागत है। मैं आपका एआई सहायक हूँ।\n\nमुझसे हमारे थोक संग्रह, विजयवाड़ा दुकान का पता, मालिकों के नंबर या समय के बारे में कुछ भी पूछें!",
  te: "నమస్కారం! 🙏 మోహన్ కృష్ణ గార్మెంట్స్ & శ్రీ లక్ష్మి గణపతి ఎంటర్‌ప్రైజెస్ కు స్వాగతం. నేను మీ AI అసిస్టెంట్‌ని.\n\nమా హోల్‌సేల్ ఉత్పత్తులు, విజయవాడ దుకాణం అడ్రస్, యజమానుల ఫోన్ నంబర్లు లేదా సమయాల గురించి ఏదైనా అడగండి!"
};

const QUICK_REPLIES = {
  en: [
    "Who are the Owners & Phone Numbers?",
    "What products do you sell?",
    "Wholesale MOQ & Policy",
    "Store Location & Address",
    "Store Timings & Sunday Status",
  ],
  hi: [
    "मालिक और फोन नंबर कौन हैं?",
    "आपके पास क्या उत्पाद हैं?",
    "थोक और बल्क नियम",
    "दुकान का पता और लोकेशन",
    "दुकान का समय",
  ],
  te: [
    "యజమానులు & ఫోన్ నంబర్లు",
    "ఏ ఏ ఉత్పత్తులు ఉన్నాయి?",
    "హోల్‌సేల్ విధానం & కనీస ఆర్డర్",
    "దుకాణం అడ్రస్ & లొకేషన్",
    "దుకాణ సమయాలు",
  ]
};

const LABELS = {
  en: { title: "MK Assistant", online: "Online · Vijayawada Wholesale", placeholder: "Type in English, Telugu, Tanglish, Hindi..." },
  hi: { title: "एमके सहायक", online: "ऑनलाइन · विजयवाड़ा थोक बाजार", placeholder: "अंग्रेजी, हिंदी या तेलुगु में पूछें..." },
  te: { title: "MK అసిస్టెంట్", online: "ఆన్‌లైన్ · విజయవాడ హోల్‌సేల్", placeholder: "తెలుగు, ఇంగ్లీష్ లేదా హిందీలో టైప్ చేయండి..." }
};

// ── Language & Scoring Matcher Engine ──────────────────────────────────────
function detectLanguage(input: string, currentWebsiteLang: "en" | "hi" | "te"): "en" | "hi" | "te" {
  if (/[\u0C00-\u0C7F]/.test(input)) return "te";
  if (/[\u0900-\u097F]/.test(input)) return "hi";

  const lower = input.toLowerCase();
  const teluguTranslit = [
    "ekkada", "ekada", "ekda", "enti", "entha", "enta", "eppudu", "epudu", "evaru",
    "cheppandi", "chepandi", "cheppu", "dharalu", "dhara", "kavali", "namaskaram",
    "timings enti", "unnara", "rates entha", "kurtilu", "lehanga", "ledu", "sarees",
    "battalu", "dhanyavadalu", "andi", "vachindi", "kavalenu", "isthara", "istara",
    "unda", "unnaya", "moostaru", "terustaru", "pampistara", "vyaparam", "wholesale",
    "yazamani", "garu", "ravachhu", "ravacha", "undi"
  ];

  if (teluguTranslit.some((w) => lower.includes(w))) return "te";

  const hindiTranslit = [
    "kya", "hai", "kahan", "kaha", "kab", "kitna", "kitne", "baje", "batao", "shukriya", 
    "dhanyavad", "namaste", "bhaiya", "kapda", "kapde", "bataiye", "chahiye", "hoga", "milega", "kise", "kabse"
  ];
  if (hindiTranslit.some((w) => lower.includes(w))) return "hi";

  return currentWebsiteLang;
}

function getBotReply(input: string, replyLang: "en" | "hi" | "te"): { text: string; actions?: ActionButton[] } {
  const lower = input.toLowerCase().trim();

  let bestMatch: IntentFAQ | null = null;
  let maxScore = 0;

  for (const faq of faqs) {
    let score = 0;

    if (faq.phrases) {
      for (const phrase of faq.phrases) {
        if (lower.includes(phrase.toLowerCase())) {
          score += 15;
        }
      }
    }

    for (const kw of faq.keywords) {
      const kwLower = kw.toLowerCase();
      if (lower === kwLower) {
        score += 10;
      } else if (lower.includes(kwLower)) {
        score += kwLower.length > 3 ? 4 : 2;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = faq;
    }
  }

  if (bestMatch && maxScore > 0) {
    const actions = bestMatch.actions ? bestMatch.actions[replyLang] : undefined;
    return { text: bestMatch.answers[replyLang], actions };
  }

  const fallbacks = {
    en: {
      text: "We'd be glad to assist you! For detailed catalogs, custom quotes, or directions to our Vijayawada store, please contact us directly:\n\n• **K.L.N. Gupta**: +91 94401 75226\n• **K. Krishna Kishore**: +91 93479 82187",
      actions: [
        { label: "📞 Call Sales Team", href: "tel:+919347982187" },
        { label: "💬 Chat on WhatsApp", href: "https://wa.me/919347982187?text=Hello%2C%20I%20have%20an%20enquiry." }
      ]
    },
    hi: {
      text: "हम आपकी सहायता करने में प्रसन्न होंगे! विस्तृत कैटलॉग, कस्टम रेट या विजयवाड़ा स्टोर के रास्ते के लिए कृपया हमसे सीधे संपर्क करें:\n\n• **के.एल.एन. गुप्ता**: +91 94401 75226\n• **के. कृष्णा किशोर**: +91 93479 82187",
      actions: [
        { label: "📞 सेल्स टीम को कॉल करें", href: "tel:+919347982187" },
        { label: "💬 व्हाट्सएप पर चैट करें", href: "https://wa.me/919347982187?text=नमस्ते%2C%20मुझे%20जानकारी%20चाहिए।" }
      ]
    },
    te: {
      text: "మీకు సహాయం చేయడానికి మేము సంతోషిస్తాము! క్యాటలాగ్‌లు, హోల్‌సేల్ రేట్లు లేదా విజయవాడ దుకాణం లొకేషన్ వివరాల కోసం దయచేసి మమ్మల్ని నేరుగా సంప్రదించండి:\n\n• **కె.ఎల్.ఎన్. గుప్త**: +91 94401 75226\n• **కె. కృష్ణ కిషోర్**: +91 93479 82187",
      actions: [
        { label: "📞 సేల్స్ టీమ్‌కి కాల్ చేయండి", href: "tel:+919347982187" },
        { label: "💬 వాట్సాప్‌లో మాట్లాడండి", href: "https://wa.me/919347982187?text=నమస్కారం%2C%20వివరాలు%20కావాలి." }
      ]
    }
  };

  return fallbacks[replyLang];
}

function FormattedText({ text }: { text: string }) {
  const parts = text.split("\n");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {parts.map((line, idx) => {
        if (!line.trim()) return <div key={idx} style={{ height: 6 }} />;
        const tokens = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={idx} style={{ margin: 0, padding: 0, lineHeight: 1.55 }}>
            {tokens.map((tok, tIdx) => {
              if (tok.startsWith("**") && tok.endsWith("**")) {
                return <strong key={tIdx} style={{ fontWeight: 700, color: "inherit" }}>{tok.slice(2, -2)}</strong>;
              }
              return tok;
            })}
          </p>
        );
      })}
    </div>
  );
}

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 26, height: 26 }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="currentColor" opacity={0.9} />
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

export default function ChatBot() {
  const { language: currentLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) setInput(transcript);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Chrome, Safari, or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      const localeMap = { en: "en-IN", hi: "hi-IN", te: "te-IN" };
      recognitionRef.current.lang = localeMap[currentLang] || "en-IN";
      recognitionRef.current.start();
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ from: "bot", text: WELCOMES[currentLang] }]);
    }
  }, []);

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
      const reply = getBotReply(trimmed, replyLang);
      setMessages((prev) => [...prev, { from: "bot", text: reply.text, actions: reply.actions }]);
      if (!open) setHasNew(true);
    }, 600 + Math.random() * 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
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
              width: "min(400px, calc(100vw - 32px))",
              height: "min(560px, calc(100vh - 120px))",
              background: "#fff",
              borderRadius: 22,
              boxShadow: "0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(59,26,10,0.1)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 9999,
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #3b1a0a 0%, #5a2d0c 100%)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #C5A028",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}
              >
                <Image src="/mk-avatar.png" alt="MK Assistant" width={44} height={44} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.92rem", letterSpacing: "0.5px" }}>
                  {LABELS[currentLang].title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50", display: "inline-block", boxShadow: "0 0 6px #4caf50" }} />
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.72rem", fontWeight: 500 }}>
                    {LABELS[currentLang].online}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer", color: "#fff", borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              >
                <CloseIcon />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 16px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
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
                    flexDirection: "column",
                    alignItems: msg.from === "user" ? "flex-end" : "flex-start",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      maxWidth: "86%",
                      padding: "12px 16px",
                      borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: msg.from === "user"
                        ? "linear-gradient(135deg, #3b1a0a, #5a2d0c)"
                        : "#fff",
                      color: msg.from === "user" ? "#fff" : "#1a1a1a",
                      fontSize: "0.86rem",
                      boxShadow: msg.from === "user"
                        ? "0 4px 14px rgba(59,26,10,0.25)"
                        : "0 2px 10px rgba(0,0,0,0.06)",
                      fontWeight: 400,
                    }}
                  >
                    <FormattedText text={msg.text} />
                  </div>

                  {msg.actions && msg.actions.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxWidth: "90%", marginTop: 2 }}>
                      {msg.actions.map((act, actIdx) => (
                        <a
                          key={actIdx}
                          href={act.href}
                          target={act.href?.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "6px 12px",
                            borderRadius: 14,
                            background: "linear-gradient(135deg, #3b1a0a, #5a2d0c)",
                            color: "#fff",
                            textDecoration: "none",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            boxShadow: "0 2px 6px rgba(59,26,10,0.2)",
                            transition: "transform 0.15s, opacity 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                          {act.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px", background: "#fff", borderRadius: "18px 18px 18px 4px", width: "fit-content", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
                  >
                    {[0, 1, 2].map((n) => (
                      <motion.span
                        key={n}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: n * 0.15 }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: "#C5A028", display: "block" }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            <div style={{ padding: "8px 14px", display: "flex", gap: 6, overflowX: "auto", background: "#f9f9f7", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
              {QUICK_REPLIES[currentLang].map((qr) => (
                <button
                  key={qr}
                  onClick={() => sendMessage(qr)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 16,
                    border: "1.5px solid rgba(59,26,10,0.25)",
                    background: "#fff",
                    color: "#3b1a0a",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#3b1a0a";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.color = "#3b1a0a";
                  }}
                >
                  {qr}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: 8,
                padding: "12px 14px",
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
                type="button"
                onClick={toggleListening}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  border: "none",
                  background: isListening ? "#f44336" : "rgba(59,26,10,0.06)",
                  color: isListening ? "#fff" : "#3b1a0a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                title="Voice Search"
              >
                {isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    🎤
                  </motion.div>
                ) : (
                  <span>🎙️</span>
                )}
              </button>
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


