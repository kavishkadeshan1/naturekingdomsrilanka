import { useState } from 'react';
import { Calendar, Users, Home, Search } from 'lucide-react';

interface QuickInquiryProps {
  onBookingOpen: () => void;
}

const roomTypes = [
  'Meditation Hut',
  'Treehouse Suite',
  'Lakefront Lodge',
  'Eco Cottage (AC)',
  'Eco Cottage (Non-AC)',
  'Luxury Double Room (AC)',
  'Standard Room (Non-AC)',
];

export default function QuickInquiry({ onBookingOpen }: QuickInquiryProps) {
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section style={{
      background: 'white',
      boxShadow: '0 8px 40px rgba(27, 67, 50, 0.1)',
      position: 'relative',
      zIndex: 10,
      borderBottom: '3px solid',
      borderImage: 'linear-gradient(90deg, #1B4332, #C9A96E, #2D6A4F) 1',
    }}>
      {/* Mobile label */}
      <div className="quick-inquiry-label" style={{
        display: 'none',
        padding: '0.75rem 1.5rem 0',
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#2D6A4F',
        fontFamily: 'Inter, sans-serif',
      }}>
        Check Availability
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="quick-inquiry-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 0.8fr 1fr auto',
          gap: 0,
          alignItems: 'stretch',
        }}>
          {/* Check-in */}
          <div className="qi-field" style={{ borderRight: '1px solid #f0ede0', padding: '1.25rem 1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '0.4rem' }}>
              <Calendar size={11} /> Check-in
            </label>
            <input
              id="quick-checkin"
              type="date"
              name="checkIn"
              min={today}
              value={form.checkIn}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a', background: 'transparent', cursor: 'pointer' }}
            />
          </div>

          {/* Check-out */}
          <div className="qi-field" style={{ borderRight: '1px solid #f0ede0', padding: '1.25rem 1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '0.4rem' }}>
              <Calendar size={11} /> Check-out
            </label>
            <input
              id="quick-checkout"
              type="date"
              name="checkOut"
              min={form.checkIn || today}
              value={form.checkOut}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a', background: 'transparent', cursor: 'pointer' }}
            />
          </div>

          {/* Guests */}
          <div className="qi-field" style={{ borderRight: '1px solid #f0ede0', padding: '1.25rem 1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '0.4rem' }}>
              <Users size={11} /> Guests
            </label>
            <select
              id="quick-guests"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: '#1a1a1a', background: 'transparent', cursor: 'pointer', appearance: 'none' }}
            >
              {[1,2,3,4,5,6,8,10].map(n => (
                <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Room Type */}
          <div className="qi-field" style={{ borderRight: '1px solid #f0ede0', padding: '1.25rem 1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '0.4rem' }}>
              <Home size={11} /> Room Type
            </label>
            <select
              id="quick-room-type"
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500, color: form.roomType ? '#1a1a1a' : '#9ca3af', background: 'transparent', cursor: 'pointer', appearance: 'none' }}
            >
              <option value="">Any Type</option>
              {roomTypes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Search Button */}
          <button
            id="quick-search-btn"
            className="btn-primary"
            onClick={onBookingOpen}
            style={{ borderRadius: 0, padding: '0 2rem', fontSize: '0.78rem', gap: '0.5rem', whiteSpace: 'nowrap' }}
          >
            <Search size={15} />
            Check Availability
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .quick-inquiry-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .qi-field {
            border-right: none !important;
            border-bottom: 1px solid #f0ede0;
          }
          .quick-inquiry-grid > button {
            grid-column: 1 / -1;
            justify-content: center;
            padding: 1rem !important;
            border-radius: 0 !important;
          }
          .quick-inquiry-label {
            display: block !important;
          }
        }
        @media (max-width: 520px) {
          .quick-inquiry-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
