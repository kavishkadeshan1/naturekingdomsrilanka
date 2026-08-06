import { useEffect, useRef, useState } from 'react';
import { Clock8, Layers3, Leaf, TrendingUp, Users2 } from 'lucide-react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  accent: string;
}

const stats: StatItem[] = [
  {
    value: 18, suffix: '+', label: 'Years of Tourism Experience',
    icon: <Clock8 size={24} />, accent: '#2D6A4F',
  },
  {
    value: 55, suffix: '+', label: 'Rooms, Huts & Treehouses',
    icon: <Layers3 size={24} />, accent: '#C9A96E',
  },
  {
    value: 5, suffix: '', label: 'National Parks Nearby',
    icon: <Leaf size={24} />, accent: '#1B4332',
  },
  {
    value: 75, suffix: '+', label: 'Full-Time Staff Members',
    icon: <Users2 size={24} />, accent: '#2D6A4F',
  },
  {
    value: 100, suffix: '%', label: 'Toxin-Free Organic Farm',
    icon: <TrendingUp size={24} />, accent: '#C9A96E',
  },
  {
    value: 12, suffix: 'km', label: 'From Mattala Airport',
    icon: <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>✈</span>, accent: '#1B4332',
  },
];

function useCounter(target: number, duration = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, animate, index }: { stat: StatItem; animate: boolean; index: number }) {
  const count = useCounter(stat.value, 2000, animate);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2.25rem 1.25rem',
        background: 'white',
        borderRadius: '4px',
        boxShadow: hovered
          ? '0 20px 48px rgba(27, 67, 50, 0.14)'
          : '0 4px 24px rgba(27, 67, 50, 0.06)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(201, 169, 110, 0.35)' : 'rgba(216, 243, 220, 0.7)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        willChange: 'transform',
        position: 'relative',
        overflow: 'hidden',
        opacity: animate ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }} />

      {/* Icon */}
      <div style={{
        width: '52px', height: '52px',
        borderRadius: '50%',
        background: hovered
          ? `linear-gradient(135deg, ${stat.accent}22, ${stat.accent}11)`
          : 'linear-gradient(135deg, #D8F3DC, #B7E4C7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1rem',
        color: stat.accent,
        transition: 'all 0.35s ease',
      }}>
        {stat.icon}
      </div>

      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
        fontWeight: 700,
        color: '#1B4332',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {count}<span style={{ color: '#C9A96E', fontSize: '1.6rem' }}>{stat.suffix}</span>
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.75rem',
        color: '#6B7280',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontWeight: 500,
        lineHeight: 1.4,
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
    <section style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(180deg, #F4F1DE 0%, #EBE8D4 100%)',
      position: 'relative',
      overflow: 'hidden',
    }} ref={ref}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'rgba(45, 106, 79, 0.05)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-40px',
        width: '240px', height: '240px', borderRadius: '50%',
        background: 'rgba(201, 169, 110, 0.06)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3.5rem',
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <span className="section-label">Our Story in Numbers</span>
          <div className="ornament-divider" style={{ maxWidth: '300px', margin: '1rem auto' }} />
          <h2 className="section-title" style={{ color: '#1B4332' }}>
            A Legacy of <span className="gradient-text">Nature &amp; Wellness</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
          gap: '1.5rem',
        }}>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} animate={animate} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
