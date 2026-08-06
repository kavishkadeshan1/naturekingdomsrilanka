import { useState } from 'react';

const COUNTRIES = [
  "Australia", "Austria", "Belgium", "Brazil", "Canada", "China", "Denmark", "Finland", 
  "France", "Germany", "India", "Indonesia", "Ireland", "Italy", "Japan", "Malaysia", 
  "Maldives", "Netherlands", "New Zealand", "Norway", "Philippines", "Russia", 
  "Singapore", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", 
  "Switzerland", "Thailand", "United Arab Emirates", "United Kingdom", "United States", 
  "Vietnam"
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNo: '',
    country: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          contactNo: '',
          country: '',
          email: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please check your connection.');
    }
  };

  const inputStyle = {
    width: '100%', 
    padding: '1rem', 
    border: '1px solid #D8F3DC', 
    borderRadius: '8px', 
    outline: 'none',
    backgroundColor: '#FAFAFA',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
  };

  return (
    <section id="contact" style={{ padding: '6rem 2rem', backgroundColor: '#F9F7F1', position: 'relative' }}>
      {/* Decorative background element */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to bottom, #FAF8F0, transparent)' }} />
      
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '3.5rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(27, 67, 50, 0.08)', position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label" style={{ padding: '0.4rem 1rem', backgroundColor: '#F9F7F1', borderRadius: '30px', display: 'inline-block', marginBottom: '1rem', fontSize: '0.85rem' }}>Get in Touch</span>
          <h2 style={{ color: '#1B4332', fontSize: '2.5rem', fontWeight: 600, fontFamily: 'Playfair Display, serif' }}>
            Contact <span className="gradient-text">Form</span>
          </h2>
          <p style={{ color: '#6B7280', marginTop: '0.8rem', fontSize: '0.95rem' }}>We'd love to hear from you. Please fill out the form below.</p>
        </div>

        {status === 'success' && (
          <div style={{ padding: '1.25rem', backgroundColor: '#D8F3DC', color: '#1B4332', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center', fontWeight: 500 }}>
            ✨ Thank you! Your message has been sent successfully. We will get back to you soon.
          </div>
        )}

        {status === 'error' && (
          <div style={{ padding: '1.25rem', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center', fontWeight: 500 }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(45, 106, 79, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#D8F3DC'; e.target.style.backgroundColor = '#FAFAFA'; e.target.style.boxShadow = 'none'; }}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(45, 106, 79, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#D8F3DC'; e.target.style.backgroundColor = '#FAFAFA'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <input
              type="tel"
              name="contactNo"
              placeholder="Contact No"
              value={formData.contactNo}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(45, 106, 79, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#D8F3DC'; e.target.style.backgroundColor = '#FAFAFA'; e.target.style.boxShadow = 'none'; }}
            />
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                list="countries"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(45, 106, 79, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#D8F3DC'; e.target.style.backgroundColor = '#FAFAFA'; e.target.style.boxShadow = 'none'; }}
              />
              <datalist id="countries">
                {COUNTRIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(45, 106, 79, 0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#D8F3DC'; e.target.style.backgroundColor = '#FAFAFA'; e.target.style.boxShadow = 'none'; }}
          />

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={(e) => { e.target.style.borderColor = '#2D6A4F'; e.target.style.backgroundColor = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(45, 106, 79, 0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#D8F3DC'; e.target.style.backgroundColor = '#FAFAFA'; e.target.style.boxShadow = 'none'; }}
          ></textarea>

          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              width: '100%',
              padding: '1.2rem',
              background: status === 'submitting' ? '#6B7280' : 'linear-gradient(135deg, #1B4332, #2D6A4F)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              marginTop: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: status === 'submitting' ? 'none' : '0 10px 20px rgba(27, 67, 50, 0.2)',
              transform: 'translateY(0)',
            }}
            onMouseEnter={(e) => {
              if (status !== 'submitting') {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(27, 67, 50, 0.25)';
              }
            }}
            onMouseLeave={(e) => {
              if (status !== 'submitting') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(27, 67, 50, 0.2)';
              }
            }}
          >
            {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
