import { useEffect, useRef, useState } from 'react';
import { Users, GraduationCap, Home, TreePine, Heart, ArrowRight, Leaf } from 'lucide-react';


const impacts = [
  {
    icon: <Users size={30} color="#C9A96E" />,
    title: '75+ Direct Jobs',
    description: 'Full-time employment for local community members including therapists, guides, farmers, chefs and hospitality staff, with training and career development.',
    highlight: '75+',
    highlightLabel: 'Staff Members',
    accentColor: '#C9A96E',
  },
  {
    icon: <GraduationCap size={30} color="#C9A96E" />,
    title: 'Education Support',
    description: 'A portion of profits funds scholarships and educational resources for underprivileged children in surrounding rural villages of Thanamalwila.',
    highlight: '∞',
    highlightLabel: 'Children Supported',
    accentColor: '#C9A96E',
  },
  {
    icon: <Home size={30} color="#C9A96E" />,
    title: 'Housing Initiative',
    description: 'Supporting disadvantaged families in the region through housing assistance programs, building stronger community foundations.',
    highlight: '🏠',
    highlightLabel: 'Homes Supported',
    accentColor: '#C9A96E',
  },
  {
    icon: <TreePine size={30} color="#C9A96E" />,
    title: 'Biodiversity Conservation',
    description: 'Active protection and cultivation of rare endemic plant species, forest conservation, and wildlife corridor preservation across our land.',
    highlight: '500+',
    highlightLabel: 'Trees Protected',
    accentColor: '#52B788',
  },
];

export default function CSRSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="mission" style={{ padding: '7rem 2rem', background: 'linear-gradient(180deg, #F4F1DE 0%, #EBE8D4 100%)', position: 'relative', overflow: 'hidden' }} ref={ref}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'rgba(45, 106, 79, 0.06)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }} className="csr-header-grid">
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
            <span className="section-label">Social Responsibility</span>
            <div className="ornament-divider" style={{ maxWidth: '200px', margin: '1rem 0' }} />
            <h2 className="section-title" style={{ color: '#1B4332', marginBottom: '1.25rem' }}>
              Our Mission Beyond<br />
              <span className="gradient-text">Tourism</span>
            </h2>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#6B7280', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              At Nature Kingdom, we believe that true luxury includes responsibility. A significant portion of our profits is donated to community welfare, education, and environmental conservation.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.75 }}>
              We are committed to improving the livelihoods of rural families, protecting the forests that inspire us, and creating a lasting positive impact on the communities of Thanamalwila and Hambegamuwa.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <div style={{ background: '#1B4332', color: 'white', padding: '1rem 1.5rem', borderRadius: '4px' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#C9A96E', fontWeight: 700 }}>PV 230165</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>Company Registration</div>
              </div>
              <div style={{ background: 'white', border: '1px solid rgba(45, 106, 79, 0.2)', padding: '1rem 1.5rem', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart size={20} color="#C9A96E" fill="#C9A96E" />
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1B4332', fontWeight: 700 }}>Social</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#6B7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>Impact First</div>
              </div>
            </div>
          </div>

          {/* Quote block */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
              borderRadius: '4px',
              padding: '3rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(27, 67, 50, 0.2)',
            }}>
              <div style={{ fontSize: '6rem', color: 'rgba(201, 169, 110, 0.2)', fontFamily: 'Georgia, serif', lineHeight: 1, position: 'absolute', top: '0.5rem', left: '1.5rem' }}>"</div>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.25rem',
                color: '#D8F3DC',
                fontStyle: 'italic',
                lineHeight: 1.75,
                position: 'relative',
                zIndex: 1,
              }}>
                We don't just offer a place to stay — we offer a place to belong. Every visitor to Nature Kingdom becomes part of our commitment to heal the land, uplift communities, and honour the wisdom of our ancestors.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(201, 169, 110, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(201,169,110,0.3)' }}>
                  <Leaf size={20} color="#C9A96E" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', color: '#C9A96E', fontWeight: 600 }}>Director, Nature Kingdom</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Nature Kingdom Meditation &amp; Resort (Pvt) Ltd.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))', gap: '1.5rem' }}>
          {impacts.map((impact, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: '4px',
                padding: '2rem',
                border: '1px solid',
                borderColor: 'rgba(216, 243, 220, 0.6)',
                boxShadow: '0 4px 16px rgba(27, 67, 50, 0.05)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s ${0.3 + i * 0.1}s ease`,
                cursor: 'default',
                willChange: 'transform',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-8px)';
                el.style.boxShadow = '0 24px 48px rgba(27, 67, 50, 0.12)';
                el.style.borderColor = 'rgba(201, 169, 110, 0.4)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 16px rgba(27, 67, 50, 0.05)';
                el.style.borderColor = 'rgba(216, 243, 220, 0.6)';
              }}
            >
              {/* Top gradient accent on hover handled via CSS */}
              <div style={{ width: '58px', height: '58px', background: 'linear-gradient(135deg, #D8F3DC, #B7E4C7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                {impact.icon}
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 600, color: '#1B4332', marginBottom: '0.75rem' }}>{impact.title}</h3>
              <p style={{ fontSize: '0.84rem', color: '#6B7280', lineHeight: 1.65 }}>{impact.description}</p>
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(216, 243, 220, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#C9A96E' }}>{impact.highlight}</div>
                  <div style={{ fontSize: '0.62rem', color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{impact.highlightLabel}</div>
                </div>
                <div style={{
                  width: '36px', height: '36px',
                  background: 'linear-gradient(135deg, #D8F3DC, #B7E4C7)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={16} color="#2D6A4F" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .csr-header-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
