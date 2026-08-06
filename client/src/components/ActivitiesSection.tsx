import { useEffect, useRef, useState } from 'react';
import { Clock4, Waves, ChefHat, Sprout, MapPin, Gift } from 'lucide-react';

const activities = [
  {
    title: 'Hiking & Walking Safari',
    duration: '3 hours',
    icon: <MapPin size={22} />,
    description: 'Explore the unspoiled beauty of the surrounding wilderness. Encounter native flora and fauna in their natural habitat.',
    image: '/images/IMG-20260805-WA0011.jpg',
    color: '#2D6A4F',
  },
  {
    title: 'Rowing & Fishing',
    duration: '7:00 AM – 10:00 AM',
    icon: <Waves size={22} />,
    description: 'Experience tranquility on the water. Paddle across the calm lake and enjoy traditional fishing with local guidance.',
    image: '/images/IMG-20260805-WA0013.jpg',
    color: '#1B4332',
  },
  {
    title: 'Cooking Class',
    duration: '11:00 AM – 1:00 PM',
    icon: <ChefHat size={22} />,
    description: 'Learn the secrets of authentic Sri Lankan cuisine using fresh, locally sourced ingredients from our very own organic farm.',
    image: '/images/IMG-20260805-WA0023.jpg',
    color: '#2D6A4F',
  },
  {
    title: 'Agricultural Experience',
    duration: 'Morning & Evening',
    icon: <Sprout size={22} />,
    description: 'Get hands-on experience in traditional Sri Lankan farming practices. Connect with the earth and learn sustainable agriculture.',
    image: '/images/IMG-20260805-WA0026.jpg',
    color: '#1B4332',
  },
];

export default function ActivitiesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="activities" style={{ padding: '7rem 2rem', backgroundColor: '#FAF8F0' }} ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <span className="section-label">Guest Experiences</span>
          <div className="ornament-divider" style={{ maxWidth: '280px', margin: '1rem auto' }} />
          <h2 className="section-title" style={{ color: '#1B4332' }}>
            Immersive <span className="gradient-text">Experiences</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '0.75rem', maxWidth: '600px', margin: '0.75rem auto 0' }}>
            All our activities are carefully curated to connect you deeply with nature and Sri Lankan culture.
          </p>

          {/* Free badge banner */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginTop: '1.25rem',
            padding: '0.6rem 1.5rem',
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
            borderRadius: '30px',
            boxShadow: '0 8px 24px rgba(27, 67, 50, 0.2)',
          }}>
            <Gift size={15} color="#C9A96E" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white' }}>
              All Activities Included Free for Guests
            </span>
            <Gift size={15} color="#C9A96E" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.75rem' }}>
          {activities.map((activity, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(27, 67, 50, 0.06)',
                border: '1px solid rgba(216, 243, 220, 0.5)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                willChange: 'transform',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: `${0.1 + index * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-12px)';
                el.style.boxShadow = '0 32px 60px rgba(27, 67, 50, 0.12)';
                el.style.borderColor = 'rgba(201, 169, 110, 0.3)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 24px rgba(27, 67, 50, 0.06)';
                el.style.borderColor = 'rgba(216, 243, 220, 0.5)';
              }}
            >
              {/* Image */}
              <div style={{ height: '210px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={activity.image}
                  alt={activity.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.7s ease',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(27, 67, 50, 0.75) 100%)',
                }} />
                {/* Duration badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.85rem',
                  left: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(15, 42, 31, 0.85)',
                  backdropFilter: 'blur(6px)',
                  color: '#C9A96E',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  borderRadius: '2px',
                  border: '1px solid rgba(201, 169, 110, 0.3)',
                }}>
                  <Clock4 size={11} color="#C9A96E" />
                  {activity.duration}
                </div>
                {/* Free badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.85rem',
                  right: '0.85rem',
                }}>
                  <span className="free-badge">Free</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '42px', height: '42px',
                    background: 'linear-gradient(135deg, #D8F3DC, #B7E4C7)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#1B4332',
                    flexShrink: 0,
                  }}>
                    {activity.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#1B4332',
                    lineHeight: 1.3,
                  }}>
                    {activity.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.65 }}>
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
