import { useEffect, useRef, useState } from 'react';
import { Leaf, Sun, Bird, Award } from 'lucide-react';

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Leaf size={20} />,
      title: 'Eco-Friendly Philosophy',
      desc: 'Built with natural clay, bamboo, and thatched palm leaves.',
    },
    {
      icon: <Sun size={20} />,
      title: 'Breathtaking Surroundings',
      desc: 'Wake up to the sounds of wildlife and breathtaking sunsets over the lake.',
    },
    {
      icon: <Bird size={20} />,
      title: 'Wildlife Conservation',
      desc: 'Active buffer zone protection for endemic flora, fauna, and elephant corridors.',
    },
  ];

  return (
    <section id="about" style={{ padding: '7rem 2rem', backgroundColor: '#F9F6F0' }} ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center' }}>
        
        {/* Text Content */}
        <div style={{
          flex: '1 1 420px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-35px)',
          transition: 'opacity 0.85s ease, transform 0.85s ease',
        }}>
          {/* Section label */}
          <span className="section-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Our Story
          </span>
          <div className="ornament-divider" style={{ maxWidth: '220px', margin: '0 0 1.5rem' }} />

          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#1A3622',
            marginBottom: '1.75rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            Welcome to <span style={{
              background: 'linear-gradient(135deg, #C9A96E, #A67C52)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Nature Kingdom</span>
          </h2>
          
          <p style={{ fontSize: '1rem', color: '#4A5D4E', marginBottom: '1.5rem', lineHeight: 1.85 }}>
            Nestled in the pristine buffer zone of the famous <strong>Udawalawe National Park</strong> in Hambegamuwa, Nature Kingdom is more than just a destination — it is an immersion into the wild soul of Sri Lanka. 
          </p>
          <p style={{ fontSize: '1rem', color: '#4A5D4E', marginBottom: '2.75rem', lineHeight: 1.85 }}>
            Spanning over <strong>100 acres of untamed wilderness</strong>, we offer a perfect harmony between conservation and natural beauty. Our eco-retreat is designed for nature lovers, wanderers, and those seeking absolute tranquility away from the modern world.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  padding: '1.1rem 1.25rem',
                  background: 'white',
                  border: '1px solid rgba(216, 243, 220, 0.7)',
                  borderRadius: '6px',
                  boxShadow: '0 2px 12px rgba(27, 67, 50, 0.04)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${0.2 + i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(201, 169, 110, 0.4)';
                  el.style.boxShadow = '0 8px 24px rgba(27, 67, 50, 0.08)';
                  el.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(216, 243, 220, 0.7)';
                  el.style.boxShadow = '0 2px 12px rgba(27, 67, 50, 0.04)';
                  el.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  backgroundColor: '#D8F3DC',
                  padding: '0.65rem',
                  borderRadius: '50%',
                  color: '#1A3622',
                  flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: '#1A3622', marginBottom: '0.2rem', fontSize: '0.95rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#4A5D4E', lineHeight: 1.55 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Award badge */}
          <div style={{
            marginTop: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
            color: 'white',
            padding: '0.75rem 1.25rem',
            borderRadius: '4px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s 0.5s ease',
          }}>
            <Award size={18} color="#C9A96E" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(201, 169, 110, 0.85)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Trusted</div>
              <div style={{ fontSize: '0.85rem', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>18+ Years Tourism Experience</div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div style={{
          flex: '1 1 400px',
          display: 'flex',
          gap: '1.25rem',
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(35px)',
          transition: 'opacity 0.85s 0.15s ease, transform 0.85s 0.15s ease',
        }}>
          <img 
            src="/images/IMG-20260805-WA0013.jpg" 
            alt="Nature Kingdom Environment"
            style={{
              width: '48%',
              height: '420px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginTop: '3.5rem',
              boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03) rotate(-0.5deg)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1) rotate(0deg)'; }}
          />
          <img 
            src="/images/IMG-20260805-WA0019.jpg" 
            alt="Nature Kingdom Cabana"
            style={{
              width: '48%',
              height: '420px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03) rotate(0.5deg)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1) rotate(0deg)'; }}
          />

          {/* Floating accent */}
          <div style={{
            position: 'absolute',
            bottom: '-1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #C9A96E, #A67C52)',
            color: 'white',
            padding: '0.6rem 1.5rem',
            borderRadius: '30px',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(201, 169, 110, 0.4)',
            fontFamily: 'Inter, sans-serif',
          }}>
            ✦ 100+ Acres of Wilderness ✦
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div { gap: 3rem !important; }
          #about > div > div:last-child { flex: 1 1 100% !important; }
          #about > div > div:last-child img { height: 260px !important; }
        }
      `}</style>
    </section>
  );
}
