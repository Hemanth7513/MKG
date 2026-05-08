"use client";

import { useLanguage } from "./LanguageContext";

const categories = [
  { id: '3piece', key: 'cat_3piece', icon: '👗' },
  { id: 'lehangas', key: 'cat_lehangas', icon: '💃' },
  { id: 'nighty', key: 'cat_nighty', icon: '🌙' },
  { id: 'leggings', key: 'cat_leggings', icon: '👖' },
  { id: 'chunni', key: 'cat_chunni', icon: '🧣' },
  { id: 'fancy', key: 'cat_fancy', icon: '✨' },
];

export default function Collections() {
  const { t } = useLanguage();

  return (
    <section id="collections" className="section-container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>{t('cat_title')}</h2>
        <div style={{ width: '80px', height: '3px', background: 'var(--gold)', margin: '0 auto' }}></div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {categories.map((cat) => (
          <div key={cat.id} style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            padding: '40px',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.transform = 'translateY(-10px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{cat.icon}</div>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '15px' }}>{t(cat.key)}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>{t('wholesale_tag')}</p>
            
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '40px',
              height: '40px',
              background: 'var(--gold)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              opacity: 0.5
            }}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
