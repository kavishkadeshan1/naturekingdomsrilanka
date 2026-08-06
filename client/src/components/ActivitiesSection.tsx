import { useEffect, useRef, useState } from 'react';
import { Clock4, Waves, ChefHat, Sprout, MapPin, Gift, Bike, Bird } from 'lucide-react';

const activities = [
  {
    title: 'Hiking & Walking Safari',
    duration: '3 hours',
    icon: <MapPin size={22} />,
    description: 'Explore the unspoiled beauty of the surrounding wilderness. Encounter native flora and fauna in their natural habitat.',
    image: '/images/hiking.jpg',
    color: '#2D6A4F',
  },
  {
    title: 'Rowing & Fishing',
    duration: '7:00 AM – 10:00 AM',
    icon: <Waves size={22} />,
    description: 'Experience tranquility on the water. Paddle across the calm lake and enjoy traditional fishing with local guidance.',
    image: '/images/RowingandFishing1.jpg',
    color: '#1B4332',
  },
  {
    title: 'Cooking Class',
    duration: '11:00 AM – 1:00 PM',
    icon: <ChefHat size={22} />,
    description: 'Learn the secrets of authentic Sri Lankan cuisine using fresh, locally sourced ingredients from our very own organic farm.',
    image: '/images/Cookiing-1-1024x685.jpg',
    color: '#2D6A4F',
  },
  {
    title: 'Agricultural Experience',
    duration: 'Morning & Evening',
    icon: <Sprout size={22} />,
    description: 'Get hands-on experience in traditional Sri Lankan farming practices. Connect with the earth and learn sustainable agriculture.',
    image: '/images/agriculture.jpg',
    color: '#1B4332',
  },
  {
    title: 'Bicycle Tour',
    duration: 'Flexible',
    icon: <Bike size={22} />,
    description: 'Ride through scenic village trails, paddy fields, and lush greenery. A perfect way to explore the local countryside at your own pace.',
    image: '/images/bicycletour.jpg',
    color: '#2D6A4F',
  },
  {
    title: 'Bird Watching',
    duration: 'Early Morning',
    icon: <Bird size={22} />,
    description: 'Discover the rich avian life of Sri Lanka. Spot endemic and migratory birds in their natural habitats with our expert guides.',
    image: '/images/birdwatching.jpg',
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
    <section id="activities" style={{ padding: '8rem 2rem', backgroundColor: '#F9F7F1', position: 'relative', overflow: 'hidden' }} ref={ref}>
      {/* Decorative background elements */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(216,243,220,0.4) 0%, transparent 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)', zIndex: 0 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '5rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <span className="section-label" style={{ padding: '0.5rem 1.2rem', backgroundColor: 'white', borderRadius: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'inline-block', marginBottom: '1.5rem' }}>Guest Experiences</span>
          <h2 className="section-title" style={{ color: '#1B4332', fontSize: '3.5rem', marginBottom: '1.5rem' }}>
            Immersive <span className="gradient-text">Experiences</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', color: '#555', lineHeight: '1.7' }}>
            All our activities are carefully curated to connect you deeply with nature and Sri Lankan culture.
          </p>

          {/* Free badge banner */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            marginTop: '2rem',
            padding: '0.8rem 2rem',
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
            borderRadius: '40px',
            boxShadow: '0 10px 30px rgba(27, 67, 50, 0.25)',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            <Gift size={18} color="#C9A96E" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'white' }}>
              All Activities Included Free for Guests
            </span>
            <Gift size={18} color="#C9A96E" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {activities.map((activity, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(255,255,255,0.8)',
                cursor: 'pointer',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${0.1 + index * 0.1}s`,
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-15px)';
                el.style.boxShadow = '0 20px 50px rgba(27, 67, 50, 0.15)';
                const img = el.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.04)';
                const img = el.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Image Section */}
              <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={activity.image}
                  alt={activity.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.8s ease',
                    display: 'block',
                  }}
                />
                {/* Subtle gradient overlay to ensure badge visibility */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
                }} />
                
                {/* Duration badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  color: '#1B4332',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  borderRadius: '30px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}>
                  <Clock4 size={14} color="#C9A96E" />
                  {activity.duration}
                </div>
                
                {/* Free badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#C9A96E',
                  color: 'white',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 12px rgba(201, 169, 110, 0.4)',
                }}>
                  Free
                </div>
              </div>

              {/* Content Section */}
              <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '-25px',
                  right: '20px',
                  width: '50px',
                  height: '50px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  color: activity.color,
                }}>
                  {activity.icon}
                </div>

                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#1B4332',
                  marginBottom: '1rem',
                  lineHeight: 1.3,
                  paddingRight: '40px', // Prevent text from overlapping the floating icon
                }}>
                  {activity.title}
                </h3>
                
                <div style={{ width: '40px', height: '2px', background: '#C9A96E', marginBottom: '1rem' }} />

                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#555', 
                  lineHeight: 1.7,
                  flexGrow: 1 
                }}>
                  {activity.description}
                </p>
                
                <div style={{ 
                  marginTop: '1.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: activity.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'gap 0.3s ease',
                }}
                className="explore-more-btn"
                >
                  Discover More <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Global styles for the hover effect on the text */}
      <style>{`
        .explore-more-btn:hover { gap: 0.8rem !important; }
      `}</style>
    </section>
  );
}
