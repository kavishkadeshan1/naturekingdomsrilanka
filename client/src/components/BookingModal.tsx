import { useState } from 'react';
import axios from 'axios';
import { X, CheckCircle, AlertCircle, Loader, Send } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roomTypes = [
  'Traditional Meditation Hut',
  'Treehouse Suite',
  'Lakefront Lodge',
  'Eco Cottage (AC)',
  'Eco Cottage (Non-AC)',
  'Luxury Double-Storey Room (AC)',
  'Standard Room (Non-AC)',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  guestType: 'local' | 'foreign' | '';
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  guestType: '',
  roomType: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
  message: '',
};

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.guestType) e.guestType = 'Please select guest type';
    if (!form.roomType) e.roomType = 'Please select a room type';
    if (!form.checkIn) e.checkIn = 'Check-in date is required';
    if (!form.checkOut) e.checkOut = 'Check-out date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await axios.post(`${API_URL}/api/inquiries`, form);
      setStatus('success');
      setMessage(res.data.message);
      setForm(initialForm);
    } catch (err: unknown) {
      setStatus('error');
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Something went wrong. Please try again or call us directly.');
      } else {
        setMessage('Something went wrong. Please try again or call us directly.');
      }
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setMessage('');
    setErrors({});
    setForm(initialForm);
    onClose();
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.7rem 0.875rem',
    border: `1.5px solid ${hasError ? '#ef4444' : 'rgba(201, 169, 110, 0.3)'}`,
    background: 'rgba(250, 248, 240, 0.9)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    color: '#1a1a1a',
    outline: 'none',
    borderRadius: '2px',
    transition: 'border-color 0.2s ease',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#1B4332',
    display: 'block',
    marginBottom: '0.4rem',
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div style={{
        background: 'white',
        borderRadius: '4px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(27, 67, 50, 0.3)',
        border: '1px solid rgba(201, 169, 110, 0.2)',
        animation: 'scaleIn 0.3s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem 2.5rem 1.5rem',
          borderBottom: '1px solid rgba(216, 243, 220, 0.6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
          color: 'white',
          borderRadius: '4px 4px 0 0',
        }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              Book a Retreat
            </h2>
            <p style={{ fontSize: '0.82rem', opacity: 0.75, fontFamily: 'Inter, sans-serif' }}>
              Nature Kingdom Meditation & Resort — We'll confirm within 24 hours
            </p>
          </div>
          <button
            id="modal-close-btn"
            onClick={handleClose}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '1rem', transition: 'background 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
            <CheckCircle size={64} color="#2D6A4F" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#1B4332', marginBottom: '0.75rem' }}>
              Inquiry Received!
            </h3>
            <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '2rem' }}>{message}</p>
            <button className="btn-primary" onClick={handleClose} style={{ borderRadius: '2px' }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Error state */}
              {status === 'error' && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '4px', padding: '0.875rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <AlertCircle size={18} color="#ef4444" />
                  <span style={{ fontSize: '0.85rem', color: '#dc2626' }}>{message}</span>
                </div>
              )}

              {/* Guest type */}
              <div>
                <label style={labelStyle}>Guest Type *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {(['local', 'foreign'] as const).map((type) => (
                    <label
                      key={type}
                      id={`guest-type-${type}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.875rem 1rem',
                        border: `1.5px solid ${form.guestType === type ? '#2D6A4F' : 'rgba(201, 169, 110, 0.3)'}`,
                        borderRadius: '4px',
                        background: form.guestType === type ? 'rgba(45, 106, 79, 0.06)' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        userSelect: 'none',
                      }}
                    >
                      <input
                        type="radio"
                        name="guestType"
                        value={type}
                        checked={form.guestType === type}
                        onChange={handleChange}
                        style={{ accentColor: '#2D6A4F' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1B4332', textTransform: 'capitalize' }}>{type === 'local' ? '🇱🇰 Local Guest' : '🌍 International Guest'}</div>
                        <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{type === 'local' ? 'Sri Lankan citizen / resident' : 'Foreign national'}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.guestType && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem' }}>{errors.guestType}</p>}
              </div>

              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="modal-grid">
                <div>
                  <label style={labelStyle} htmlFor="m-name">Full Name *</label>
                  <input id="m-name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle(errors.name)}
                    onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(201, 169, 110, 0.3)'; }} />
                  {errors.name && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem' }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={labelStyle} htmlFor="m-email">Email Address *</label>
                  <input id="m-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle(errors.email)}
                    onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(201, 169, 110, 0.3)'; }} />
                  {errors.email && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Phone + Guests */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="modal-grid">
                <div>
                  <label style={labelStyle} htmlFor="m-phone">Phone / WhatsApp</label>
                  <input id="m-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+94 77 xxx xxxx" style={inputStyle()} />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="m-guests">Number of Guests</label>
                  <select id="m-guests" name="guests" value={form.guests} onChange={handleChange} style={{ ...inputStyle(), appearance: 'none' as const }}>
                    {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label style={labelStyle} htmlFor="m-room">Preferred Room / Accommodation *</label>
                <select id="m-room" name="roomType" value={form.roomType} onChange={handleChange} style={{ ...inputStyle(errors.roomType), appearance: 'none' as const }}
                  onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; }}
                  onBlur={(e) => { e.target.style.borderColor = errors.roomType ? '#ef4444' : 'rgba(201, 169, 110, 0.3)'; }}>
                  <option value="">Select accommodation type...</option>
                  {roomTypes.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.roomType && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem' }}>{errors.roomType}</p>}
              </div>

              {/* Dates */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="modal-grid">
                <div>
                  <label style={labelStyle} htmlFor="m-checkin">Check-in Date *</label>
                  <input id="m-checkin" name="checkIn" type="date" min={today} value={form.checkIn} onChange={handleChange} style={inputStyle(errors.checkIn)} />
                  {errors.checkIn && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem' }}>{errors.checkIn}</p>}
                </div>
                <div>
                  <label style={labelStyle} htmlFor="m-checkout">Check-out Date *</label>
                  <input id="m-checkout" name="checkOut" type="date" min={form.checkIn || today} value={form.checkOut} onChange={handleChange} style={inputStyle(errors.checkOut)} />
                  {errors.checkOut && <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem' }}>{errors.checkOut}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle} htmlFor="m-message">Special Requests / Message</label>
                <textarea
                  id="m-message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about any special requirements, dietary needs, wellness goals, or questions..."
                  style={{ ...inputStyle(), resize: 'vertical', minHeight: '90px' }}
                  onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(201, 169, 110, 0.3)'; }}
                />
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '1.25rem 2.5rem', borderTop: '1px solid rgba(216, 243, 220, 0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFDF9', borderRadius: '0 0 4px 4px', flexWrap: 'wrap', gap: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                We'll confirm your inquiry within 24 hours via email or WhatsApp.
              </p>
              <button
                id="submit-inquiry-btn"
                type="submit"
                className="btn-primary"
                disabled={status === 'loading'}
                style={{ borderRadius: '2px', minWidth: '160px', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</> : <><Send size={16} /> Send Inquiry</>}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 600px) { .modal-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
