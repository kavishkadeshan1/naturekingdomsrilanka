import { MapPin, Plane, TreePine, Car } from 'lucide-react';

const nearbyAttractions = [
  { icon: '✈️', name: 'Mattala International Airport', distance: '~12 km', desc: 'International gateway for direct arrivals' },
  { icon: '🦁', name: 'Yala National Park', distance: '~45 km', desc: 'Largest wildlife park in Sri Lanka, home to leopards' },
  { icon: '🐘', name: 'Udawalawe National Park', distance: '~30 km', desc: 'Famous for elephant herds and open savanna safaris' },
  { icon: '🦩', name: 'Bundala National Park', distance: '~35 km', desc: 'Ramsar wetland, flamingos & migratory birds' },
  { icon: '🦒', name: 'Ridiyagama Safari Park', distance: '~18 km', desc: 'Open safari with African and Asian wildlife' },
  { icon: '🚢', name: 'Hambantota Port', distance: '~25 km', desc: 'Deep-water port and city center' },
  { icon: '⛰️', name: 'Ella & Haputale', distance: '~65 km', desc: 'Scenic hill country, tea estates & waterfalls' },
  { icon: '🏛️', name: 'Kataragama Temple', distance: '~40 km', desc: 'Sacred multi-faith pilgrimage site' },
];

const directions = [
  { icon: <Plane size={18} color="#C9A96E" />, method: 'By Air', detail: 'Fly to Mattala Rajapaksa International Airport (HRI), just 12 km away.' },
  { icon: <Car size={18} color="#C9A96E" />, method: 'By Road from Colombo', detail: 'Approximately 3.5–4 hours via Expressway + Southern Highway A2.' },
  { icon: <TreePine size={18} color="#C9A96E" />, method: 'Address', detail: 'Arambekema, Hambegamuwa, Thanamalwila, Monaragala District, Sri Lanka.' },
];

export default function LocationSection() {
  return (
    <section id="location" style={{ padding: '6rem 2rem', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">Find Us</span>
          <div className="ornament-divider" style={{ maxWidth: '300px', margin: '1rem auto' }}></div>
          <h2 className="section-title" style={{ color: '#1B4332' }}>
            Strategic <span className="gradient-text">Location</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '0.75rem' }}>
            Nestled in Hambegamuwa, Thanamalwila — the gateway to Sri Lanka's great wilderness
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="location-grid">
          {/* Map */}
          <div>
            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '2px solid rgba(216, 243, 220, 0.8)', boxShadow: '0 8px 32px rgba(27, 67, 50, 0.12)' }}>
              <iframe
                title="Nature Kingdom Location Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=81.0,6.0,81.5,6.5&layer=mapnik&marker=6.25,81.25"
                style={{ width: '100%', height: '400px', border: 'none', display: 'block' }}
                loading="lazy"
              />
            </div>
            {/* Directions */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {directions.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: '#FAFDF9', border: '1px solid rgba(216, 243, 220, 0.6)', borderRadius: '4px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(201, 169, 110, 0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {d.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#1B4332', marginBottom: '0.2rem' }}>{d.method}</div>
                    <div style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.5 }}>{d.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attractions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <MapPin size={18} color="#2D6A4F" />
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', color: '#1B4332', fontWeight: 600 }}>Nearby Attractions</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {nearbyAttractions.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    border: '1px solid rgba(216, 243, 220, 0.7)',
                    borderRadius: '4px',
                    background: 'white',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(201, 169, 110, 0.5)';
                    el.style.background = '#FDF9F2';
                    el.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(216, 243, 220, 0.7)';
                    el.style.background = 'white';
                    el.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#1B4332' }}>{a.name}</div>
                    <div style={{ fontSize: '0.775rem', color: '#6B7280', marginTop: '0.15rem' }}>{a.desc}</div>
                  </div>
                  <div style={{
                    background: '#D8F3DC',
                    color: '#1B4332',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '20px',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}>
                    {a.distance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .location-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
