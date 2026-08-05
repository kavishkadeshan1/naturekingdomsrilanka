import { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const stats: StatItem[] = [
  { value: 18, suffix: '+', label: 'Years of Tourism Experience', icon: '🌿' },
  { value: 55, suffix: '+', label: 'Rooms, Huts & Treehouses', icon: '🏡' },
  { value: 5, suffix: '', label: 'National Parks Nearby', icon: '🦁' },
  { value: 75, suffix: '+', label: 'Full-Time Staff Members', icon: '👥' },
  { value: 100, suffix: '%', label: 'Toxin-Free Organic Farm', icon: '🌱' },
  { value: 12, suffix: 'km', label: 'From Mattala Airport', icon: '✈️' },
];

function useCounter(target: number, duration = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, animate }: { stat: StatItem; animate: boolean }) {
  const count = useCounter(stat.value, 2000, animate);
  return (
    <div style={{
      textAlign: 'center',
      padding: '2.5rem 1.5rem',
      background: 'white',
      borderRadius: '4px',
      boxShadow: '0 4px 24px rgba(27, 67, 50, 0.07)',
      border: '1px solid rgba(216, 243, 220, 0.8)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'default',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = 'translateY(-6px)';
      el.style.boxShadow = '0 16px 40px rgba(27, 67, 50, 0.14)';
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = 'translateY(0)';
      el.style.boxShadow = '0 4px 24px rgba(27, 67, 50, 0.07)';
    }}
    >
      <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '2.75rem',
        fontWeight: 700,
        color: '#1B4332',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {count}<span style={{ color: '#C9A96E', fontSize: '1.75rem' }}>{stat.suffix}</span>
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8rem',
        color: '#6B7280',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: '5rem 2rem', background: '#F4F1DE' }} ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">Our Story in Numbers</span>
          <div className="ornament-divider" style={{ maxWidth: '300px', margin: '1rem auto' }}></div>
          <h2 className="section-title" style={{ color: '#1B4332', marginTop: '0.5rem' }}>
            A Legacy of <span className="gradient-text">Nature & Wellness</span>
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
        }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`,
              }}
            >
              <StatCard stat={stat} animate={animate} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
