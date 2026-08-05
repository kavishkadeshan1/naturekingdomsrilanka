import { useEffect, useRef, useState } from 'react';
import { Brain, Heart, Leaf, Sparkles, ArrowRight } from 'lucide-react';

const programs = [
  {
    icon: <Brain size={28} color="#C9A96E" />,
    title: 'Buddhist Meditation',
    subtitle: 'Guided Mindfulness Programs',
    description: 'Immerse yourself in authentic Buddhist meditation guided by experienced teachers. Programs range from 3-day introductions to intensive 21-day retreats.',
    tags: ['Daily Sessions', '3–21 Day Retreats', 'All Levels'],
  },
  {
    icon: <Sparkles size={28} color="#C9A96E" />,
    title: 'Yoga & Pranayama',
    subtitle: 'Morning & Evening Practice',
    description: 'Sunrise yoga sessions overlooking the lake and jungle canopy. Our certified instructors offer Hatha, Yin, and restorative practices in open-air pavilions.',
    tags: ['Sunrise Sessions', 'Certified Instructors', 'Open-Air Pavilion'],
  },
  {
    icon: <Heart size={28} color="#C9A96E" />,
    title: 'Ayurvedic Treatments',
    subtitle: 'Traditional Sri Lankan Healing',
    description: 'Authentic Ayurveda therapies using herbs grown in our organic garden. Treatments include Panchakarma, Shirodhara, Abhyanga, and herbal consultations.',
    tags: ['Panchakarma', 'Herbal Baths', 'Shirodhara'],
  },
  {
    icon: <Leaf size={28} color="#C9A96E" />,
    title: 'Traditional Medicine',
    subtitle: 'Indigenous Sri Lankan Healing',
    description: 'Centuries-old Sri Lankan medicinal traditions practiced by our resident Ayurveda doctors. Natural remedies, herb gardens, and holistic consultations.',
    tags: ['On-Site Doctor', 'Herb Gardens', 'Holistic Care'],
  },
];

export default function WellnessSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="wellness" style={{ padding: '6rem 2rem', background: 'white' }} ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="wellness-grid">
          {/* Left: image */}
          <div style={{
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
            <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src="/images/IMG-20260805-WA0037.jpg" alt="Ayurveda Wellness Center" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(27, 67, 50, 0.6) 100%)' }} />
            </div>
            {/* Float card */}
            <div style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '-2rem',
              background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
              color: 'white',
              padding: '1.75rem',
              borderRadius: '4px',
              maxWidth: '220px',
              boxShadow: '0 16px 40px rgba(27, 67, 50, 0.35)',
              border: '1px solid rgba(201, 169, 110, 0.3)',
            }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, color: '#C9A96E', lineHeight: 1 }}>4</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem', opacity: 0.85 }}>Wellness Programs</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem' }}>Daily sessions, all levels welcome</div>
            </div>
          </div>

          {/* Right: content */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease',
          }}>
            <span className="section-label">Holistic Healing</span>
            <div className="ornament-divider" style={{ maxWidth: '200px', margin: '1rem 0' }}></div>
            <h2 className="section-title" style={{ color: '#1B4332', marginBottom: '1rem' }}>
              Meditation &{' '}
              <span className="gradient-text">Wellness Center</span>
            </h2>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#6B7280', fontStyle: 'italic', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Our center harmonizes ancient Sri Lankan healing traditions with modern wellness science, creating a sanctuary for physical, mental and spiritual renewal.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {programs.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    padding: '1.75rem',
                    border: '1px solid rgba(216, 243, 220, 0.4)',
                    borderRadius: '8px',
                    background: 'rgba(250, 253, 249, 0.6)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'default',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${0.3 + i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(201, 169, 110, 0.4)';
                    el.style.background = '#ffffff';
                    el.style.boxShadow = '0 12px 32px rgba(27, 67, 50, 0.06)';
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(216, 243, 220, 0.4)';
                    el.style.background = 'rgba(250, 253, 249, 0.6)';
                    el.style.boxShadow = 'none';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ flexShrink: 0, width: '52px', height: '52px', background: 'linear-gradient(135deg, #D8F3DC, #B7E4C7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 600, color: '#1B4332', marginBottom: '0.1rem' }}>{p.title}</div>
                    <div style={{ fontSize: '0.72rem', color: '#C9A96E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{p.subtitle}</div>
                    <p style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '0.6rem' }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2D6A4F', background: '#D8F3DC', padding: '0.2rem 0.5rem', borderRadius: '2px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              style={{ marginTop: '2rem', borderRadius: '2px' }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Inquire About Programs <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .wellness-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
