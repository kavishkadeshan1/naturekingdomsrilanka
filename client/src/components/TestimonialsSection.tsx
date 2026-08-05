import { useState, useEffect, useCallback } from 'react';
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
    review: 'We visited for our anniversary and stayed in the treehouse suite. Watching elephants from our private deck, eating from the garden, morning yoga sessions — we have never felt more at peace. The staff felt like family. We\'re already planning to return!',
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

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const t = testimonials[current];

  return (
    <section style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #1B4332 0%, #0f2a1f 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(201, 169, 110, 0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(45, 106, 79, 0.2)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label" style={{ color: '#C9A96E' }}>Guest Stories</span>
          <div className="ornament-divider" style={{ maxWidth: '300px', margin: '1rem auto' }}></div>
          <h2 className="section-title" style={{ color: 'white' }}>
            What Our Guests <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          borderRadius: '12px',
          padding: '4rem 3.5rem',
          position: 'relative',
          textAlign: 'center',
        }}>
          {/* Quote icon */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, pointerEvents: 'none' }}>
            <Quote size={240} color="#C9A96E" />
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={16} fill="#C9A96E" stroke="none" />
            ))}
          </div>

          {/* Review title */}
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.8rem',
            fontWeight: 400,
            color: '#ffffff',
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
            position: 'relative', zIndex: 2
          }}>
            "{t.title}"
          </h3>

          {/* Review text */}
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.85)',
            fontStyle: 'italic',
            lineHeight: 1.8,
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            position: 'relative', zIndex: 2
          }}>
            "{t.review}"
          </p>

          {/* Reviewer info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ 
              width: '48px', height: '48px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #C9A96E 0%, #A67C52 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 600,
              boxShadow: '0 4px 12px rgba(201, 169, 110, 0.3)',
              marginBottom: '0.5rem'
            }}>
              {t.initials}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, color: 'white', fontSize: '1.05rem', letterSpacing: '0.02em' }}>{t.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.country}</div>
            <div style={{
              marginTop: '1rem',
              background: 'transparent',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '1rem',
              fontSize: '0.75rem',
              color: 'rgba(201, 169, 110, 0.9)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {t.stay}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          <button
            id="testimonial-prev"
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              width: '44px', height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(201, 169, 110, 0.3)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
          >
            <ChevronLeft size={18} />
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === current ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? '#C9A96E' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
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
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              width: '44px', height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(201, 169, 110, 0.3)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
