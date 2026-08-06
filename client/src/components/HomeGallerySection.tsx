import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';

export default function HomeGallerySection() {
  const navigate = useNavigate();

  // Selected preview images for the home page teaser
  const previewImages = [
    '/images/IMG-20260805-WA0013.jpg',
    '/images/IMG-20260805-WA0012.jpg',
    '/images/IMG-20260805-WA0024.jpg',
    '/images/IMG-20260805-WA0009.jpg',
  ];

  return (
    <section id="gallery-preview" style={{ padding: '6rem 2rem', backgroundColor: '#F9F7F1', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label" style={{ padding: '0.4rem 1rem', backgroundColor: 'white', borderRadius: '30px', display: 'inline-block', marginBottom: '1rem', fontSize: '0.85rem' }}>Visual Journey</span>
          <h2 style={{ color: '#1B4332', fontSize: '2.5rem', fontWeight: 600, fontFamily: 'Playfair Display, serif' }}>
            A Glimpse of <span className="gradient-text">Paradise</span>
          </h2>
          <p style={{ color: '#6B7280', marginTop: '0.8rem', fontSize: '0.95rem', maxWidth: '600px', margin: '0.8rem auto 0' }}>
            Immerse yourself in the breathtaking beauty of Nature Kingdom. From our lush gardens to our eco-luxurious accommodations.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {previewImages.map((src, index) => (
            <div 
              key={index}
              style={{
                position: 'relative',
                height: '300px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                cursor: 'pointer'
              }}
              onClick={() => {
                navigate('/gallery');
                window.scrollTo(0,0);
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.08)';
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <img 
                src={src} 
                alt="Gallery Preview" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              <div 
                className="overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(27, 67, 50, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <ImageIcon color="white" size={32} opacity={0.8} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => {
              navigate('/gallery');
              window.scrollTo(0,0);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              color: '#2D6A4F',
              border: '2px solid #2D6A4F',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2D6A4F';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#2D6A4F';
            }}
          >
            Explore Full Gallery <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
