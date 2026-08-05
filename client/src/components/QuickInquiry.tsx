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
      boxShadow: '0 8px 40px rgba(27, 67, 50, 0.12)',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 2rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
          gap: 0,
          alignItems: 'stretch',
        }}>
          {/* Check-in */}
          <div style={{ borderRight: '1px solid #f0ede0', padding: '1.25rem 1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '0.4rem' }}>
              <Calendar size={12} /> Check-in
            </label>
            <input
              id="quick-checkin"
              type="date"
              name="checkIn"
              min={today}
              value={form.checkIn}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#1a1a1a', background: 'transparent', cursor: 'pointer' }}
            />
          </div>

          {/* Check-out */}
          <div style={{ borderRight: '1px solid #f0ede0', padding: '1.25rem 1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '0.4rem' }}>
              <Calendar size={12} /> Check-out
            </label>
            <input
              id="quick-checkout"
              type="date"
              name="checkOut"
              min={form.checkIn || today}
              value={form.checkOut}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#1a1a1a', background: 'transparent', cursor: 'pointer' }}
            />
          </div>

          {/* Guests */}
          <div style={{ borderRight: '1px solid #f0ede0', padding: '1.25rem 1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '0.4rem' }}>
              <Users size={12} /> Guests
            </label>
            <select
              id="quick-guests"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#1a1a1a', background: 'transparent', cursor: 'pointer', appearance: 'none' }}
            >
              {[1,2,3,4,5,6,8,10].map(n => (
                <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Room Type */}
          <div style={{ borderRight: '1px solid #f0ede0', padding: '1.25rem 1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2D6A4F', marginBottom: '0.4rem' }}>
              <Home size={12} /> Room Type
            </label>
            <select
              id="quick-room-type"
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: form.roomType ? '#1a1a1a' : '#9ca3af', background: 'transparent', cursor: 'pointer', appearance: 'none' }}
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
            style={{ borderRadius: 0, padding: '1.25rem 2.5rem', fontSize: '0.8rem', gap: '0.5rem' }}
          >
            <Search size={16} />
            Check Availability
          </button>
        </div>
      </div>
    </section>
  );
}
