import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Leaf, Phone } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onBookingOpen: () => void;
}

const navLinks = [
  { label: 'Home', href: '/#home', id: '#home' },
  { label: 'Accommodation', href: '/#accommodation', id: '#accommodation' },
  { label: 'Our Mission', href: '/#mission', id: '#mission' },
  { label: 'Gallery', href: '/gallery', id: '/gallery' },
  { label: 'Location', href: '/#location', id: '#location' },
  { label: 'Contact', href: '/#contact', id: '#contact' },
];

export default function Navbar({ onBookingOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active link based on current route
  useEffect(() => {
    if (location.pathname === '/gallery') {
      setActiveLink('/gallery');
    } else {
      // If we're on home, hash dictates active link
      if (location.hash) {
        setActiveLink(location.hash);
      } else {
        setActiveLink('#home');
      }
    }
  }, [location]);

  // IntersectionObserver for active link detection (only on home page)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sectionIds = navLinks.filter(l => l.id.startsWith('#')).map(l => l.id.replace('#', ''));
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(s => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, [location.pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('nav')) setMobileOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string, id: string) => {
    setActiveLink(id);
    setMobileOpen(false);
    
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '#');
      if (location.pathname !== '/') {
        // Navigate to home page with hash
        navigate(href);
      } else {
        // Already on home, just scroll
        const el = document.querySelector(targetId);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    } else {
      // Direct navigation (e.g., /gallery)
      navigate(href);
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'all 0.4s ease',
          background: scrolled
            ? 'rgba(15, 42, 31, 0.97)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.2)' : 'none',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/#home', '#home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #2D6A4F, #1B4332)',
              border: '2px solid rgba(201,169,110,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'box-shadow 0.3s ease',
            }}>
              <Leaf size={18} color="#C9A96E" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}>
                Nature Kingdom
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                color: 'rgba(201,169,110,0.9)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}>
                Meditation &amp; Resort
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}
              className="hidden-mobile">
            {navLinks.map((link) => {
              const isActive = activeLink === link.id;
              return (
                <li key={link.href} style={{ position: 'relative' }}>
                  <button
                    onClick={() => handleNavClick(link.href, link.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: isActive ? '#C9A96E' : 'rgba(255,255,255,0.85)',
                      padding: '0.5rem 0.75rem',
                      transition: 'color 0.2s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A96E'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = isActive ? '#C9A96E' : 'rgba(255,255,255,0.85)'; }}
                  >
                    {link.label}
                  </button>
                  {/* Active underline indicator */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: `translateX(-50%) scaleX(${isActive ? 1 : 0})`,
                    width: 'calc(100% - 1.5rem)',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformOrigin: 'center',
                  }} />
                </li>
              );
            })}
          </ul>

          {/* CTA + Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hidden-mobile">
            <a href="tel:+94701530350" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
            >
              <Phone size={14} />
              <span>+94 70 153 0350</span>
            </a>
            <button
              id="nav-book-btn"
              className="btn-primary"
              onClick={onBookingOpen}
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.75rem', borderRadius: '2px' }}
            >
              Book a Retreat
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: mobileOpen ? 'rgba(201,169,110,0.15)' : 'none',
              border: '1px solid',
              borderColor: mobileOpen ? 'rgba(201,169,110,0.4)' : 'transparent',
              borderRadius: '6px',
              cursor: 'pointer', color: 'white', padding: '0.4rem', display: 'none',
              transition: 'all 0.2s ease',
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={{
          background: 'rgba(11, 32, 22, 0.99)',
          borderTop: '1px solid rgba(201,169,110,0.15)',
          overflow: 'hidden',
          maxHeight: mobileOpen ? '600px' : '0px',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{ padding: '1rem 2rem 2rem' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
              {navLinks.map((link) => {
                const isActive = activeLink === link.id;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href, link.id)}
                      style={{
                        background: isActive ? 'rgba(201, 169, 110, 0.08)' : 'none',
                        border: 'none',
                        borderLeft: isActive ? '2px solid #C9A96E' : '2px solid transparent',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#C9A96E' : 'rgba(255,255,255,0.8)',
                        padding: '0.8rem 1rem',
                        width: '100%',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        borderRadius: '0 4px 4px 0',
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="tel:+94701530350" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem', padding: '0.5rem 0' }}>
                <Phone size={14} color="#C9A96E" />
                +94 70 153 0350
              </a>
              <button
                className="btn-primary"
                onClick={onBookingOpen}
                style={{ borderRadius: '2px', justifyContent: 'center' }}
              >
                Book a Retreat
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
