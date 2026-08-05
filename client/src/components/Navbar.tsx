import { useState, useEffect } from 'react';
import { Menu, X, Leaf, Phone } from 'lucide-react';

interface NavbarProps {
  onBookingOpen: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Accommodation', href: '#accommodation' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Organic Farm', href: '#farm' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onBookingOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

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
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.2)' : 'none',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #2D6A4F, #1B4332)',
              border: '2px solid rgba(201,169,110,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
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
                letterSpacing: '-0.01em'
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
                Meditation & Resort
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }}
              className="hidden-mobile">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: activeLink === link.href ? '#C9A96E' : 'rgba(255,255,255,0.85)',
                    padding: '0.5rem 0.75rem',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A96E'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = activeLink === link.href ? '#C9A96E' : 'rgba(255,255,255,0.85)'; }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hidden-mobile">
            <a href="tel:+94112345678" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.8rem' }}>
              <Phone size={14} />
              <span>+94 11 234 5678</span>
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
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '0.25rem', display: 'none' }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{
            background: 'rgba(15, 42, 31, 0.98)',
            borderTop: '1px solid rgba(201,169,110,0.2)',
            padding: '1.5rem 2rem 2rem',
            animation: 'fadeIn 0.2s ease',
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif', fontSize: '1rem',
                      color: 'rgba(255,255,255,0.85)', padding: '0.75rem 0',
                      width: '100%', textAlign: 'left',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="btn-primary"
              onClick={onBookingOpen}
              style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center', borderRadius: '2px' }}
            >
              Book a Retreat
            </button>
          </div>
        )}
      </nav>

      {/* Responsive styles injected inline */}
      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
