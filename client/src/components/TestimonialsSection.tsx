import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    country: '🇬🇧 United Kingdom',
    initials: 'SM',
    rating: 5,
    title: 'Transformative Meditation Experience',
    review: 'The 7-day Buddhist meditation retreat completely changed my perspective on life. The guides were deeply knowledgeable, the organic food was exquisite, and waking up to the sound of the jungle was indescribable. Nature Kingdom is unlike any resort I have visited.',
    stay: 'Treehouse Suite · 7-night Meditation Retreat',
  },
  {
    name: 'Dr. Ravi Prasad',
    country: '🇮🇳 India',
    initials: 'RP',
    rating: 5,
    title: 'Best Ayurveda Experience Outside Kerala',
    review: 'As an Ayurveda practitioner myself, I was skeptical. But the treatments here are genuinely authentic — the herbs are grown on-site, and the doctors truly understand classical texts. The Panchakarma program was exceptional. The lakefront lodge was heavenly.',
    stay: 'Lakefront Lodge · 10-night Ayurveda Program',
  },
  {
    name: 'Emma & Johan Larsson',
    country: '🇸🇪 Sweden',
    initials: 'EL',
    rating: 5,
    title: 'Our Most Memorable Holiday Ever',
    review: "We visited for our anniversary and stayed in the treehouse suite. Watching elephants from our private deck, eating from the garden, morning yoga sessions — we have never felt more at peace. The staff felt like family. We're already planning to return!",
    stay: 'Treehouse Suite · 5-night Wellness Package',
  },
  {
    name: 'Priya Wickramasinghe',
    country: '🇱🇰 Sri Lanka',
    initials: 'PW',
    rating: 5,
    title: 'A Treasure in Our Own Country',
    review: 'As a Sri Lankan, I am so proud that such a world-class eco retreat exists in our country. The meditation programs are deeply grounded in Buddhist tradition, the food is incredible, and the commitment to community and environment is genuine. Highly recommend.',
    stay: 'Eco Cottage · 3-night Yoga Retreat',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const changeTo = useCallback((index: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 350);
  }, [fading]);

  const next = useCallback(() => changeTo((current + 1) % testimonials.length), [current, changeTo]);
  const prev = useCallback(() => changeTo((current - 1 + testimonials.length) % testimonials.length), [current, changeTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 7500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const t = testimonials[current];

  return (
    <section style={{
      padding: '7rem 2rem',
      background: 'linear-gradient(150deg, #0f2a1f 0%, #1B4332 50%, #0f2a1f 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '450px', height: '450px', borderRadius: '50%', background: 'rgba(201, 169, 110, 0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(45, 106, 79, 0.18)', pointerEvents: 'none' }} />
      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, #C9A96E 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label" style={{ color: '#C9A96E' }}>Guest Stories</span>
          <div className="ornament-divider" style={{ maxWidth: '300px', margin: '1rem auto' }} />
          <h2 className="section-title" style={{ color: 'white' }}>
            What Our Guests <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div style={{
          background: 'linear-gradient(170deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.25)',
          borderRadius: '12px',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)',
          position: 'relative',
          textAlign: 'center',
          // Cross-fade animation
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(10px) scale(0.99)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>
          {/* Large decorative quote */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.025, pointerEvents: 'none' }}>
            <Quote size={220} color="#C9A96E" />
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '1.75rem', position: 'relative', zIndex: 2 }}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={18} fill="#C9A96E" stroke="none" />
            ))}
          </div>

          {/* Review title */}
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.3rem, 3vw, 1.85rem)',
            fontWeight: 400,
            color: '#ffffff',
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
            position: 'relative', zIndex: 2,
          }}>
            "{t.title}"
          </h3>

          {/* Review text */}
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            color: 'rgba(255, 255, 255, 0.82)',
            fontStyle: 'italic',
            lineHeight: 1.85,
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            position: 'relative', zIndex: 2,
          }}>
            "{t.review}"
          </p>

          {/* Reviewer info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '52px', height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C9A96E 0%, #A67C52 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.25rem',
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(201, 169, 110, 0.35)',
              marginBottom: '0.4rem',
              border: '2px solid rgba(255,255,255,0.15)',
            }}>
              {t.initials}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'white', fontSize: '1rem', letterSpacing: '0.02em' }}>{t.name}</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em' }}>{t.country}</div>
            <div style={{
              marginTop: '0.75rem',
              padding: '0.4rem 1.25rem',
              background: 'rgba(201, 169, 110, 0.12)',
              border: '1px solid rgba(201, 169, 110, 0.25)',
              borderRadius: '30px',
              fontSize: '0.72rem',
              color: 'rgba(201, 169, 110, 0.9)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {t.stay}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2.25rem' }}>
          <button
            id="testimonial-prev"
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'white', width: '44px', height: '44px',
              borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(201, 169, 110, 0.25)';
              el.style.borderColor = 'rgba(201, 169, 110, 0.5)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(255,255,255,0.07)';
              el.style.borderColor = 'rgba(255,255,255,0.14)';
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => changeTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === current ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? '#C9A96E' : 'rgba(255,255,255,0.28)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            id="testimonial-next"
            onClick={next}
            aria-label="Next testimonial"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'white', width: '44px', height: '44px',
              borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(201, 169, 110, 0.25)';
              el.style.borderColor = 'rgba(201, 169, 110, 0.5)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(255,255,255,0.07)';
              el.style.borderColor = 'rgba(255,255,255,0.14)';
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Testimonial count indicator */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
            {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
