import { useState } from 'react';

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

  return (
    <section id="contact" style={{ padding: '6rem 2rem', backgroundColor: '#F9F7F1' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#2D6A4F', fontSize: '2.5rem', fontWeight: 500, fontFamily: 'Playfair Display, serif' }}>
            Contact Form
          </h2>
        </div>

        {status === 'success' && (
          <div style={{ padding: '1rem', backgroundColor: '#D8F3DC', color: '#1B4332', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {status === 'error' && (
          <div style={{ padding: '1rem', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.9rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#2D6A4F'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.9rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#2D6A4F'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <input
              type="tel"
              name="contactNo"
              placeholder="Contact No"
              value={formData.contactNo}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.9rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#2D6A4F'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.9rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#2D6A4F'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.9rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none' }}
            onFocus={(e) => e.target.style.borderColor = '#2D6A4F'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          />

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ width: '100%', padding: '0.9rem', border: '1px solid #E5E7EB', borderRadius: '4px', outline: 'none', resize: 'vertical' }}
            onFocus={(e) => e.target.style.borderColor = '#2D6A4F'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          ></textarea>

          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: status === 'submitting' ? '#6B7280' : '#2C6EAD',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (status !== 'submitting') (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1e548a';
            }}
            onMouseLeave={(e) => {
              if (status !== 'submitting') (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2C6EAD';
            }}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
}
