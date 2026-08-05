import { useState } from 'react';
import axios from 'axios';
import { Leaf, Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

// Social media SVG icons (not available in this lucide-react version)
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '';
        await axios.post(`${API_URL}/api/inquiries`, {
          name: 'Newsletter Subscriber',
          email,
          guestType: 'foreign',
          roomType: 'Newsletter',
          checkIn: new Date().toISOString().split('T')[0],
          checkOut: new Date().toISOString().split('T')[0],
          message: 'Newsletter subscription request',
        });
      } catch {}
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" style={{ background: 'linear-gradient(180deg, #0f2a1f 0%, #08180f 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative top border */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #C9A96E, #2D6A4F, #C9A96E, transparent)' }} />

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '5rem 2rem 3rem' }}>
        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '4rem' }} className="footer-grid">
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #2D6A4F, #1B4332)', border: '2px solid rgba(201,169,110,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={22} color="#C9A96E" />
              </div>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.1 }}>Nature Kingdom</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(201,169,110,0.8)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Meditation & Resort</div>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '340px' }}>
              Sri Lanka's premier eco-friendly Buddhist meditation and wellness resort, nestled in the heart of Hambegamuwa's pristine tropical wilderness.
            </p>

            {/* Company details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'rgba(201,169,110,0.8)', fontWeight: 600 }}>
                Nature Kingdom Meditation & Resort (Pvt) Ltd.
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>
                Company Reg: <span style={{ color: '#C9A96E' }}>PV 230165</span>
              </div>
            </div>

            {/* Social media */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <FacebookIcon />, label: 'Facebook', href: '#' },
                { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
                { icon: <YoutubeIcon />, label: 'YouTube', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '36px', height: '36px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(201, 169, 110, 0.25)';
                    el.style.borderColor = 'rgba(201, 169, 110, 0.5)';
                    el.style.color = '#C9A96E';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.07)';
                    el.style.borderColor = 'rgba(255,255,255,0.1)';
                    el.style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 600, color: '#D8F3DC', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Home', href: '#home' },
                { label: 'Accommodation', href: '#accommodation' },
                { label: 'Wellness & Meditation', href: '#wellness' },
                { label: 'Organic Farm', href: '#farm' },
                { label: 'Social Mission', href: '#mission' },
                { label: 'Location', href: '#location' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.55)',
                      padding: 0, textAlign: 'left',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 600, color: '#D8F3DC', marginBottom: '1.25rem' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={15} color="#C9A96E" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
                  Arambekema, Hambegamuwa,<br />
                  Thanamalwila, Monaragala<br />
                  Sri Lanka
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={15} color="#C9A96E" style={{ flexShrink: 0 }} />
                <div>
                  <a href="tel:+94112345678" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}>
                    +94 11 234 5678
                  </a>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>Emergency & General</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={15} color="#C9A96E" style={{ flexShrink: 0 }} />
                <a href="mailto:info@naturekingdomsrilanka.com" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', wordBreak: 'break-all', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}>
                  info@naturekingdomsrilanka.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 600, color: '#D8F3DC', marginBottom: '0.5rem' }}>
              Stay Connected
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
              Receive updates on retreats, seasonal programs and special wellness packages.
            </p>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#52B788', fontSize: '0.85rem' }}>
                <CheckCircle size={18} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0 }}>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: '0.7rem 0.875rem',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRight: 'none',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    outline: 'none',
                    borderRadius: '2px 0 0 2px',
                  }}
                />
                <button
                  id="newsletter-submit"
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #C9A96E, #A67C52)',
                    border: 'none',
                    color: 'white',
                    padding: '0.7rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '0 2px 2px 0',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  <Send size={15} />
                </button>
              </form>
            )}

            {/* Director info */}
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.72rem', color: 'rgba(201,169,110,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Director</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: '#D8F3DC' }}>Nature Kingdom Meditation & Resort (Pvt) Ltd.</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>18+ Years Tourism Industry Experience</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} Nature Kingdom Meditation & Resort (Pvt) Ltd. · Reg. PV 230165 · All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cancellation Policy'].map((link) => (
              <a key={link} href="#" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp float */}
      <a
        href="https://wa.me/94112345678?text=Hello%20Nature%20Kingdom!%20I%20would%20like%20to%20inquire%20about%20a%20retreat."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        id="whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
