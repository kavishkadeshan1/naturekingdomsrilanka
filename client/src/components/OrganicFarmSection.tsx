import { Leaf, Droplets, Sun, Utensils, Fish, FlowerIcon } from 'lucide-react';

const farmFeatures = [
  { icon: <Leaf size={24} color="#C9A96E" />, title: '100% Toxin-Free', desc: 'Zero pesticides or chemicals. All produce grown using traditional organic methods passed down through generations.' },
  { icon: <Sun size={24} color="#C9A96E" />, title: 'Spice Gardens', desc: 'Cinnamon, pepper, cardamom, turmeric and rare medicinal herbs cultivated on-site and used daily in our kitchen.' },
  { icon: <Droplets size={24} color="#C9A96E" />, title: 'Lake Ecosystem', desc: 'Our natural lake supports a thriving fish-friendly ecosystem, providing fresh water and supporting local biodiversity.' },
  { icon: <FlowerIcon size={24} color="#C9A96E" />, title: 'Rare Plant Conservation', desc: 'We cultivate and protect rare endemic plant species as part of our commitment to biodiversity and conservation.' },
  { icon: <Fish size={24} color="#C9A96E" />, title: 'Freshwater Harvest', desc: 'Sustainably harvested lake fish featured in our farm-to-table menu — a uniquely Sri Lankan dining experience.' },
  { icon: <Utensils size={24} color="#C9A96E" />, title: 'Farm-to-Table Dining', desc: 'Our chef\'s menu changes daily with whatever is freshest from the garden. Guests can join live harvest experiences.' },
];

const produce = ['🌾 Rice', '🥥 Coconut', '🌶 Pepper', '🍋 Citrus Fruits', '🌿 Cinnamon', '🧄 Herbs', '🥦 Vegetables', '🍓 Seasonal Fruits'];

export default function OrganicFarmSection() {
  return (
    <section id="farm" style={{
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Parallax hero banner */}
      <div style={{
        position: 'relative',
        height: '480px',
        overflow: 'hidden',
      }}>
        <img
          src="/images/IMG-20260805-WA0040.jpg"
          alt="Organic Farm at Nature Kingdom"
          style={{ width: '100%', height: '130%', objectFit: 'cover', objectPosition: 'center', transform: 'translateY(-15%)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(15,42,31,0.3) 0%, rgba(15,42,31,0.7) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '2rem',
        }}>
          <span className="section-label" style={{ color: '#C9A96E' }}>Sustainable Agriculture</span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 600,
            color: 'white',
            marginTop: '1rem',
            marginBottom: '1rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}>
            Organic Farm-to-Table
          </h2>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.3rem',
            color: 'rgba(216, 243, 220, 0.9)',
            fontStyle: 'italic',
            maxWidth: '600px',
          }}>
            Every meal begins in our garden and ends on your table — pure, honest, and grown with love for the earth.
          </p>

          {/* Produce tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            {produce.map(p => (
              <span key={p} style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '0.8rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '20px',
              }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div style={{ padding: '5rem 2rem', background: '#1B4332' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {farmFeatures.map((feature, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.06)';
                  el.style.borderColor = 'rgba(201, 169, 110, 0.4)';
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.03)';
                  el.style.borderColor = 'rgba(255,255,255,0.05)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div style={{ width: '48px', height: '48px', background: 'rgba(201, 169, 110, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 600, color: '#D8F3DC', marginBottom: '0.4rem' }}>{feature.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(216, 243, 220, 0.65)', lineHeight: 1.65 }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Solar + water stat bar */}
          <div style={{
            marginTop: '3.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {[
              { icon: '☀️', label: 'Solar Powered', val: '100%' },
              { icon: '💧', label: 'Water Recycled', val: '85%' },
              { icon: '♻️', label: 'Waste Composted', val: '90%' },
              { icon: '🌳', label: 'Trees Protected', val: '500+' },
            ].map((item) => (
              <div key={item.label} style={{ padding: '2rem 1.5rem', textAlign: 'center', background: 'rgba(27, 67, 50, 0.8)' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: '#C9A96E' }}>{item.val}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(216, 243, 220, 0.65)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
