import React, { useState } from 'react';
import { Wifi, Wind, Leaf, Waves, Trees, Star, Users, BedDouble } from 'lucide-react';

interface Accommodation {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  capacity: number;
  amenities: string[];
  priceForeign: number;
  priceLocal: number;
  currency: string;
  badge?: string;
  count: number;
}

const accommodations: Accommodation[] = [
  {
    id: 'morning-glory',
    name: 'Morning Glory Clay Cabana',
    category: 'cabana',
    image: '/images/Morning Glory Clay Cabana.jpg',
    description: 'Eco-friendly accommodation handcrafted from natural and locally sourced materials such as clay, coconut timber, bamboo, and thatched palm leaves.',
    capacity: 2,
    amenities: ['Queen-size Bed', 'Mosquito Nets', 'Private Bathroom', 'Nature View', 'Fan'],
    priceForeign: 65,
    priceLocal: 4500,
    currency: 'USD / LKR',
    badge: 'Signature Cabana',
    count: 5,
  },
  {
    id: 'treehouse',
    name: 'Treehouse Suite',
    category: 'treehouse',
    image: '/images/treehouse.png',
    description: 'Experience the magic of sleeping among the tree canopy. Elevated wooden suites with panoramic forest views and total seclusion.',
    capacity: 2,
    amenities: ['Forest Canopy View', 'Private Deck', 'Outdoor Shower', 'WiFi'],
    priceForeign: 120,
    priceLocal: 8500,
    currency: 'USD / LKR',
    badge: 'Most Popular',
    count: 5,
  },
  {
    id: 'lakefront',
    name: 'Lakefront Lodge',
    category: 'lakefront',
    image: '/images/Lakefront Lodge.jpg',
    description: 'Serene lodges positioned directly on our private lake. Wake up to breathtaking water reflections and birdsong at sunrise.',
    capacity: 2,
    amenities: ['Lake View', 'Private Dock', 'Kayak Access', 'WiFi'],
    priceForeign: 95,
    priceLocal: 6800,
    currency: 'USD / LKR',
    badge: 'Lake Views',
    count: 2,
  },
  {
    id: 'eco-cottage-ac',
    name: 'Eco Cottage (Air-Conditioned)',
    category: 'cottages',
    image: '/images/Eco Cottage (Air-Conditioned).jpg',
    description: 'Comfortable eco-cottages with modern amenities, air-conditioning and eco-friendly design blended seamlessly into the natural garden.',
    capacity: 3,
    amenities: ['Air Conditioning', 'Garden View', 'Private Bathroom', 'WiFi'],
    priceForeign: 80,
    priceLocal: 5500,
    currency: 'USD / LKR',
    count: 4,
  },
  {
    id: 'eco-cottage-nonac',
    name: 'Eco Cottage (Non-AC)',
    category: 'cottages',
    image: '/images/Eco Cottage (Non-AC).jpg',
    description: 'Naturally ventilated eco cottages using sustainable materials. Perfect for guests seeking to minimize their environmental footprint.',
    capacity: 3,
    amenities: ['Natural Ventilation', 'Garden View', 'Private Bathroom', 'WiFi'],
    priceForeign: 55,
    priceLocal: 3800,
    currency: 'USD / LKR',
    count: 4,
  },
  {
    id: 'luxury-room-ac',
    name: 'Luxury Double-Storey Room (AC)',
    category: 'luxury',
    image: '/images/Luxury Double-Storey Room (AC).jpg',
    description: 'Premium two-storey rooms with contemporary eco-luxury design, high-end finishes, air-conditioning and sweeping nature views.',
    capacity: 4,
    amenities: ['Air Conditioning', 'Two Storeys', 'Premium Furnishing', 'WiFi'],
    priceForeign: 110,
    priceLocal: 7800,
    currency: 'USD / LKR',
    badge: 'Premium',
    count: 8,
  },
  {
    id: 'standard-room',
    name: 'Standard Room (Non-AC)',
    category: 'luxury',
    image: '/images/Standard Room (Non-AC).jpg',
    description: 'Spacious, well-furnished rooms with natural ventilation and beautiful garden or forest views. Ideal for budget-conscious travelers.',
    capacity: 4,
    amenities: ['Natural Ventilation', 'Nature View', 'En-Suite Bathroom', 'WiFi'],
    priceForeign: 45,
    priceLocal: 3200,
    currency: 'USD / LKR',
    count: 10,
  },
];

const filters = [
  { key: 'all', label: 'All Rooms' },
  { key: 'huts', label: 'Meditation Huts' },
  { key: 'treehouse', label: 'Treehouses' },
  { key: 'lakefront', label: 'Lakefront' },
  { key: 'cottages', label: 'Eco Cottages' },
  { key: 'luxury', label: 'Luxury Rooms' },
];

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi size={13} />,
  'Air Conditioning': <Wind size={13} />,
  'Nature View': <Trees size={13} />,
  'Meditation Space': <Leaf size={13} />,
  'Lake View': <Waves size={13} />,
  'Private Dock': <Waves size={13} />,
  'Kayak Access': <Waves size={13} />,
  'Forest Canopy View': <Trees size={13} />,
  'Premium Furnishing': <Star size={13} />,
};

interface AccommodationGridProps {
  onBookingOpen: () => void;
}

function AccommodationCard({ accom, onBook }: { accom: Accommodation; onBook: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 32px 64px rgba(27, 67, 50, 0.12)' : '0 4px 24px rgba(27, 67, 50, 0.04)',
        transform: hovered ? 'translateY(-12px)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(216, 243, 220, 0.5)',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img
          src={accom.image}
          alt={accom.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.12)' : 'scale(1)',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 50%, rgba(27, 67, 50, 0.7) 100%)',
        }} />
        {accom.badge && (
          <div style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            background: 'rgba(27, 67, 50, 0.85)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(201, 169, 110, 0.8)',
            color: '#C9A96E',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '0.35rem 0.8rem',
            borderRadius: '0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            {accom.badge}
          </div>
        )}
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <Users size={12} color="rgba(255,255,255,0.8)" />
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>Up to {accom.capacity} guests</span>
        </div>
        <div style={{ position: 'absolute', bottom: '0.75rem', right: '1rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.7rem' }}>{accom.count} units</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.15rem',
          fontWeight: 600,
          color: '#1B4332',
          marginBottom: '0.5rem',
          lineHeight: 1.3,
        }}>
          {accom.name}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
          {accom.description}
        </p>

        {/* Amenities */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {accom.amenities.map((a) => (
            <span key={a} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              background: '#D8F3DC', color: '#1B4332',
              fontSize: '0.7rem', fontWeight: 500,
              padding: '0.25rem 0.6rem', borderRadius: '2px',
            }}>
              {amenityIcons[a] || <Leaf size={12} />}
              {a}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingTop: '1rem',
          borderTop: '1px solid #f0ede0',
          marginBottom: '1rem',
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>From</div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#1B4332' }}>
                  ${accom.priceForeign}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginLeft: '3px' }}>Foreign</span>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#2D6A4F' }}>
                  LKR {accom.priceLocal.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#9ca3af', marginLeft: '3px' }}>Local</span>
              </div>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>per night, per room</div>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#C9A96E" stroke="none" />)}
          </div>
        </div>

        <button
          id={`book-${accom.id}`}
          className="btn-primary"
          onClick={onBook}
          style={{ borderRadius: '2px', width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
        >
          <BedDouble size={15} />
          Book Now
        </button>
      </div>
    </div>
  );
}

export default function AccommodationGrid({ onBookingOpen }: AccommodationGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? accommodations
    : accommodations.filter((a) => a.category === activeFilter);

  return (
    <section id="accommodation" style={{ padding: '6rem 2rem', background: '#FAF8F0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Eco-Luxury Stays</span>
          <div className="ornament-divider" style={{ maxWidth: '300px', margin: '1rem auto' }}></div>
          <h2 className="section-title" style={{ color: '#1B4332' }}>
            Accommodation &{' '}
            <span className="gradient-text">Eco-Cottages</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            From traditional meditation huts to luxury treehouses — every stay is designed to deepen your connection with nature.
          </p>

          {/* Pricing note */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#D8F3DC',
            border: '1px solid rgba(45, 106, 79, 0.2)',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            fontSize: '0.8rem',
            color: '#1B4332',
          }}>
            <Leaf size={14} color="#2D6A4F" />
            Separate pricing for Local (LKR) and International (USD) guests
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {filters.map((f) => (
            <button
              key={f.key}
              id={`filter-${f.key}`}
              onClick={() => setActiveFilter(f.key)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '0.6rem 1.25rem',
                border: '1.5px solid',
                borderColor: activeFilter === f.key ? '#2D6A4F' : 'rgba(45, 106, 79, 0.25)',
                borderRadius: '2px',
                background: activeFilter === f.key ? '#2D6A4F' : 'transparent',
                color: activeFilter === f.key ? 'white' : '#2D6A4F',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {filtered.map((accom, i) => (
            <div
              key={accom.id}
              style={{
                opacity: 1,
                animation: `fadeInUp 0.5s ${i * 0.08}s ease both`,
              }}
            >
              <AccommodationCard accom={accom} onBook={onBookingOpen} />
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn-outline" onClick={onBookingOpen} style={{ borderRadius: '2px' }}>
            Inquire About All Accommodations
          </button>
        </div>
      </div>
    </section>
  );
}
