"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  from: "bot" | "user";
  text: string;
}

// ── FAQ Knowledge Base ─────────────────────────────────────────────────────
const faqs: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["product", "products", "fabric", "fabrics", "varieties", "variety", "catalogue", "collection", "what do you sell", "items"],
    answer: "Thank you for your interest! We offer a beautiful range of 3-Piece Sets, Lehangas, Fancy Wear, Embroidered Suits, Kurtis & more — with fresh arrivals every week. We'd love to show you around!",
  },
  {
    keywords: ["price", "prices", "cost", "rate", "rates", "how much", "pricing"],
    answer: "We're proud to offer highly competitive wholesale rates, sourced directly from weavers with no middlemen. For specific pricing, we warmly invite you to visit us or reach out — we'll be happy to assist.",
  },
  {
    keywords: ["wholesale", "bulk", "order", "minimum", "retailer", "reseller", "dealer"],
    answer: "We exclusively serve wholesale buyers and are always glad to welcome new retail partners. MOQ varies by category — please visit us or use our Contact page and we'll take care of the rest.",
  },
  {
    keywords: ["location", "address", "where", "find you", "visit", "shop", "store", "one town"],
    answer: "We'd be delighted to have you visit us! You can find us at Naganna Trade One Mall, 3rd Floor, One Town, Vijayawada. We look forward to welcoming you.",
  },
  {
    keywords: ["timing", "timings", "hours", "open", "close", "time", "when"],
    answer: "Our store is open Monday to Saturday, 9:00 AM – 7:00 PM. We're closed on Sundays and public holidays. We look forward to seeing you!",
  },
  {
    keywords: ["contact", "reach"],
    answer: "We'd love to hear from you! You can call or WhatsApp us at +91 93479 82187, visit us at Naganna Trade One Mall, 3rd Floor, One Town, Vijayawada, or reach out via our Contact page.",
  },
  {
    keywords: ["call", "phone", "telephone", "ring", "number"],
    answer: "Please feel free to give us a call at +91 93479 82187. We're available Monday to Saturday, 9:00 AM – 7:00 PM and will be happy to assist you.",
  },
  {
    keywords: ["whatsapp", "whats app", "chat", "message", "text"],
    answer: "You're welcome to WhatsApp us at +91 93479 82187 anytime. We'll get back to you as soon as possible — usually very quickly!",
  },
  {
    keywords: ["since", "years", "experience", "history", "established", "old", "legacy", "1994", "1999"],
    answer: "Mohan Krishna Garments has been a trusted name in Vijayawada's wholesale market for generations. We take great pride in the relationships and trust we have built over the years.",
  },
  {
    keywords: ["delivery", "shipping", "dispatch", "transport", "courier"],
    answer: "We dispatch bulk orders across Andhra Pradesh and beyond. Please get in touch with us and we'll be happy to arrange delivery for your order.",
  },
  {
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good afternoon", "good evening"],
    answer: "Namaste! A very warm welcome to Mohan Krishna Garments. How may I assist you today?",
  },
  {
    keywords: ["thank", "thanks", "thank you", "dhanyavad", "shukriya"],
    answer: "It's our pleasure! We're always here to help. Please don't hesitate to reach out if you need anything else.",
  },
];

const WELCOME =
  "Namaste! Welcome to Mohan Krishna Garments. I'm here to help you with any questions about our products, wholesale orders, store location, or timings. How may I assist you?";

const QUICK_REPLIES = [
  "What products do you have?",
  "Wholesale & bulk orders",
  "Store location",
  "Store timings",
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of faqs) {
    if (faq.keywords.some((kw) => lower.includes(kw))) {
      return faq.answer;
    }
  }
  return "We'd love to help with that! Please visit us at One Town, Vijayawada or contact us directly so we can assist you better.";
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
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      setMessages((prev) => [...prev, { from: "bot", text: getBotReply(trimmed) }]);
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
                  MK Assistant
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4caf50", display: "inline-block" }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", letterSpacing: "0.5px" }}>Online</span>
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
                {QUICK_REPLIES.map((qr) => (
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
                placeholder="Ask something…"
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
