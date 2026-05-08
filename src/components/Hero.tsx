"use client";

import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)',
      padding: '0 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Mandala Background */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        border: '1px solid rgba(212, 175, 55, 0.1)',
        borderRadius: '50%',
        zIndex: 0,
        opacity: 0.5,
        pointerEvents: 'none'
      }}></div>

      <div className="fade-in" style={{ position: 'relative', zIndex: 1 }}>
        <span style={{ 
          color: 'var(--gold)', 
          textTransform: 'uppercase', 
          letterSpacing: '4px', 
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '20px',
          display: 'block'
        }}>
          Established 1999 • 25+ Years of Legacy
        </span>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
          lineHeight: 1.1, 
          marginBottom: '30px',
          maxWidth: '900px'
        }}>
          {t('hero_title')}
        </h1>

        <p style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
          color: '#aaa', 
          maxWidth: '600px', 
          margin: '0 auto 40px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {t('hero_subtitle')}
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#collections" className="gold-button">
            {t('hero_cta')}
          </a>
          <button style={{
            background: 'transparent',
            color: 'var(--gold)',
            padding: '12px 24px',
            borderRadius: '4px',
            border: '1px solid var(--gold)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🎤</span>
            Talk to AI Assistant
          </button>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite'
      }}>
        <span style={{ color: 'var(--gold)', fontSize: '1.5rem' }}>↓</span>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);}
          40% {transform: translateX(-50%) translateY(-10px);}
          60% {transform: translateX(-50%) translateY(-5px);}
        }
      `}</style>
    </section>
  );
}
