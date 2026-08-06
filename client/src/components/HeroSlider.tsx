import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

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
    subtitle: "Wake Up to Nature's Perfect Mirror",
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
    subtitle: "Experience Sri Lanka's Majestic Beauty",
    cta: 'Learn More',
  },
];

interface HeroSliderProps {
  onBookingOpen: () => void;
}

export default function HeroSlider({ onBookingOpen }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(true);
  const autoPlayDuration = 7000;

  const goTo = useCallback((index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setContentVisible(false);

    // Wait for content to fade out, then switch
    setTimeout(() => {
      setPrevSlide(current);
      setCurrent(index);

      // Wait for image crossfade, then show new content
      setTimeout(() => {
        setContentVisible(true);
        setIsAnimating(false);
        setPrevSlide(null);
      }, 800);
    }, 400);
  }, [isAnimating, current]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(next, autoPlayDuration);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  const slide = slides[current];

  return (
    <>
      <style>{`
        @keyframes heroKenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        @keyframes heroContentFadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroLabelSlideIn {
          0% { opacity: 0; transform: translateY(15px); letter-spacing: 0.15em; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 0.25em; }
        }
        @keyframes heroLineExpand {
          0% { width: 0; opacity: 0; }
          100% { width: 60px; opacity: 1; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        @keyframes heroProgress {
          from { height: 0%; }
          to { height: 100%; }
        }
        @keyframes heroSubtitleFade {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroCTAFade {
          0% { opacity: 0; transform: translateY(16px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hero-nav-btn {
          position: absolute;
          z-index: 10;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-nav-btn:hover {
          background: rgba(201,169,110,0.35);
          border-color: rgba(201,169,110,0.6);
          color: white;
          transform: scale(1.1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .hero-nav-btn:active {
          transform: scale(0.95);
        }
        .hero-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2.25rem;
          background: linear-gradient(135deg, #C9A96E 0%, #A67C52 100%);
          color: white;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .hero-cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.5s ease;
        }
        .hero-cta-primary:hover::before {
          left: 100%;
        }
        .hero-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(201, 169, 110, 0.4), 0 8px 16px rgba(0,0,0,0.15);
          letter-spacing: 0.15em;
        }
        .hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.25rem;
          background: transparent;
          color: rgba(255,255,255,0.9);
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(4px);
        }
        .hero-cta-secondary:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.6);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        }
        .hero-indicator-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .hero-indicator-btn:hover {
          transform: scale(1.3);
        }
        @media (max-width: 768px) {
          .hero-nav-btn {
            width: 40px;
            height: 40px;
          }
          .hero-cta-primary,
          .hero-cta-secondary {
            padding: 0.85rem 1.5rem;
            font-size: 0.72rem;
          }
          .hero-side-indicators {
            display: none !important;
          }
          .hero-bottom-dots {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .hero-bottom-dots {
            display: none !important;
          }
        }
      `}</style>

      <section
        id="home"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: '650px',
          overflow: 'hidden',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background images with crossfade + Ken Burns */}
        {slides.map((s, i) => {
          const isActive = i === current;
          const isPrev = i === prevSlide;
          const isVisible = isActive || isPrev;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : isPrev ? 0 : 0,
                transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
                willChange: 'opacity',
              }}
            >
              <img
                src={s.image}
                alt={s.tagline}
                loading={i <= 1 ? 'eager' : 'lazy'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  animation: isVisible ? `heroKenBurns ${autoPlayDuration + 2000}ms ease-out forwards` : 'none',
                  willChange: isVisible ? 'transform' : 'auto',
                }}
              />
            </div>
          );
        })}

        {/* Cinematic gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background: `
            linear-gradient(180deg,
              rgba(10,30,20,0.55) 0%,
              rgba(10,30,20,0.15) 30%,
              rgba(10,30,20,0.08) 50%,
              rgba(10,30,20,0.35) 70%,
              rgba(10,30,20,0.85) 100%
            )
          `,
          pointerEvents: 'none',
        }} />

        {/* Subtle vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,30,20,0.45) 100%)',
          pointerEvents: 'none',
        }} />

        {/* ═══ Main Content ═══ */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 2rem',
          paddingTop: '5rem',
        }}>

          {/* Section label */}
          <div style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span style={{
                display: 'inline-block',
                width: contentVisible ? '32px' : '0px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #C9A96E)',
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }} />
              Nature Kingdom
              <span style={{
                display: 'inline-block',
                width: contentVisible ? '32px' : '0px',
                height: '1px',
                background: 'linear-gradient(90deg, #C9A96E, transparent)',
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }} />
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            maxWidth: '850px',
            margin: '1.25rem 0',
            textShadow: '0 4px 40px rgba(0,0,0,0.3)',
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}>
            {slide.tagline}
          </h1>

          {/* Decorative line */}
          <div style={{
            width: contentVisible ? '60px' : '0px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
            margin: '0.5rem 0 1.25rem',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.35s',
            borderRadius: '1px',
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.05rem, 2.5vw, 1.5rem)',
            color: 'rgba(216, 243, 220, 0.9)',
            fontStyle: 'italic',
            fontWeight: 400,
            maxWidth: '600px',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
          }}>
            {slide.subtitle}
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.55s',
          }}>
            <button
              className="hero-cta-primary"
              onClick={onBookingOpen}
            >
              {slide.cta}
            </button>
            <button
              className="hero-cta-secondary"
              onClick={() => {
                const el = document.querySelector('#accommodation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Accommodation
            </button>
          </div>
        </div>

        {/* ═══ Navigation Arrows ═══ */}
        <button
          onClick={prev}
          id="hero-prev"
          aria-label="Previous slide"
          className="hero-nav-btn"
          style={{ left: 'clamp(1.25rem, 3vw, 2.5rem)', bottom: 'clamp(2rem, 5vh, 3rem)', top: 'auto', transform: 'none' }}
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={next}
          id="hero-next"
          aria-label="Next slide"
          className="hero-nav-btn"
          style={{ left: 'calc(clamp(1.25rem, 3vw, 2.5rem) + 64px)', bottom: 'clamp(2rem, 5vh, 3rem)', top: 'auto', transform: 'none' }}
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>

        {/* ═══ Side Slide Indicators (Desktop) ═══ */}
        <div
          className="hero-side-indicators"
          style={{
            position: 'absolute',
            right: 'clamp(1.5rem, 3vw, 2.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {/* Slide number */}
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}>
            {String(current + 1).padStart(2, '0')}
          </span>

          {/* Vertical indicators */}
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="hero-indicator-btn"
            >
              <div style={{
                width: '2px',
                height: i === current ? '28px' : '14px',
                borderRadius: '2px',
                background: i === current
                  ? 'linear-gradient(180deg, #C9A96E, rgba(201,169,110,0.4))'
                  : 'rgba(255,255,255,0.25)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Progress fill for active */}
                {i === current && (
                  <div
                    ref={i === current ? progressRef : null}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      background: '#C9A96E',
                      borderRadius: '2px',
                      animation: `heroProgress ${autoPlayDuration}ms linear forwards`,
                    }}
                  />
                )}
              </div>
            </button>
          ))}

          {/* Total */}
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
            marginTop: '0.5rem',
          }}>
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* ═══ Bottom Dot Indicators (Mobile) ═══ */}
        <div
          className="hero-bottom-dots"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <div style={{
                width: i === current ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === current ? '#C9A96E' : 'rgba(255,255,255,0.35)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            </button>
          ))}
        </div>

        {/* ═══ Scroll Indicator ═══ */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 4vh, 2.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          cursor: 'pointer',
          opacity: 0.7,
          transition: 'opacity 0.3s ease',
        }}
          onClick={() => {
            const nextSection = document.querySelector('#home + section, #home ~ section');
            if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
            else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>
            Scroll
          </span>
          <ChevronDown
            size={16}
            color="rgba(201,169,110,0.7)"
            style={{
              animation: 'scrollBounce 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>
    </>
  );
}
