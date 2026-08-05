import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

interface Slide {
  image: string;
  tagline: string;
  subtitle: string;
  cta: string;
}

const slides: Slide[] = [
  {
    image: '/images/hero1.jpg',
    tagline: 'Embrace Traditional Living',
    subtitle: 'Authentic Eco-Huts in the Heart of Nature',
    cta: 'Explore Accommodations',
  },
  {
    image: '/images/hero2.jpg',
    tagline: 'Welcome to Nature Kingdom',
    subtitle: 'Your Journey to Ultimate Serenity Begins Here',
    cta: 'Discover Our Story',
  },
  {
    image: '/images/hero3.jpg',
    tagline: 'Secluded Eco-Retreats',
    subtitle: 'Disconnect from the World and Find Peace',
    cta: 'View Retreats',
  },
  {
    image: '/images/hero4.jpg',
    tagline: 'Tranquil Lake Reflections',
    subtitle: 'Wake Up to Nature\'s Perfect Mirror',
    cta: 'Book Lakefront',
  },
  {
    image: '/images/hero5.jpg',
    tagline: 'Breathtaking Sunsets',
    subtitle: 'End Your Day in Perfect Harmony',
    cta: 'Experience It',
  },
  {
    image: '/images/hero6.jpg',
    tagline: 'Wildlife at Your Doorstep',
    subtitle: 'Experience Sri Lanka\'s Majestic Beauty',
    cta: 'Learn More',
  },
];

interface HeroSliderProps {
  onBookingOpen: () => void;
}

export default function HeroSlider({ onBookingOpen }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 400);
  }, [transitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section id="home" style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? (transitioning ? 0 : 1) : 0,
            transition: 'opacity 0.8s ease',
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={s.image}
            alt={s.tagline}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(180deg, rgba(15,42,31,0.35) 0%, rgba(15,42,31,0.15) 30%, rgba(15,42,31,0.6) 80%, rgba(15,42,31,0.85) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center', padding: '0 1.5rem',
      }}>
        {/* Center content wrapper */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          width: '100%',
          paddingTop: '2rem',
        }}>
        {/* Label */}
        <div style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.6s 0.3s ease, transform 0.6s 0.3s ease',
        }}>
          <span className="section-label" style={{ color: '#C9A96E', marginBottom: '1rem', display: 'block' }}>
            ✦ Nature Kingdom Meditation & Resort ✦
          </span>
        </div>

        {/* Main tagline */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 600,
          color: 'white',
          lineHeight: 1.15,
          maxWidth: '900px',
          marginBottom: '1.25rem',
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(25px)' : 'translateY(0)',
          transition: 'opacity 0.7s 0.4s ease, transform 0.7s 0.4s ease',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          {slide.tagline}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
          color: 'rgba(216, 243, 220, 0.9)',
          fontStyle: 'italic',
          marginBottom: '2.5rem',
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.7s 0.5s ease, transform 0.7s 0.5s ease',
        }}>
          {slide.subtitle}
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.7s 0.6s ease',
        }}>
          <button className="btn-primary" onClick={onBookingOpen} style={{ borderRadius: '2px' }}>
            {slide.cta}
          </button>
          <button
            className="btn-outline"
            onClick={() => {
              const el = document.querySelector('#accommodation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ borderRadius: '2px', borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
              (e.currentTarget as HTMLElement).style.borderColor = 'white';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)';
            }}
          >
            View Accommodation
          </button>
        </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingBottom: '5.5rem',
          width: '100%',
        }}>
          {[
            { value: '55+', label: 'Rooms & Huts' },
            { value: '5', label: 'National Parks' },
            { value: '18+', label: 'Years Experience' },
            { value: '75+', label: 'Staff Members' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700, color: '#C9A96E' }}>{stat.value}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        id="hero-prev"
        aria-label="Previous slide"
        style={{
          position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 4, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'white', width: '48px', height: '48px', borderRadius: '50%',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.6)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        id="hero-next"
        aria-label="Next slide"
        style={{
          position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 4, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'white', width: '48px', height: '48px', borderRadius: '50%',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.6)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.6rem', zIndex: 4,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              color: i === current ? '#C9A96E' : 'rgba(255,255,255,0.4)',
              transition: 'color 0.3s',
            }}
          >
            <Circle size={i === current ? 10 : 7} fill={i === current ? '#C9A96E' : 'rgba(255,255,255,0.4)'} stroke="none" />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
      }}>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.8))',
          animation: 'float 2s ease-in-out infinite',
        }} />
        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
      </div>
    </section>
  );
}
