import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const BOOKING_URL = "https://www.booking.com/hotel/lk/nature-kingdom-botanical-garden.html"; // Truncated for cleanliness

// All images to be used in the gallery
const galleryImages = [
  '/images/Cookiing-1-1024x685.jpg',
  '/images/Eco Cottage (Air-Conditioned).jpg',
  '/images/Eco Cottage (Non-AC).jpg',
  '/images/IMG-20260805-WA0006.jpg',
  '/images/IMG-20260805-WA0008.jpg',
  '/images/IMG-20260805-WA0009.jpg',
  '/images/IMG-20260805-WA0012.jpg',
  '/images/IMG-20260805-WA0013.jpg',
  '/images/IMG-20260805-WA0015.jpg',
  '/images/IMG-20260805-WA0016.jpg',
  '/images/IMG-20260805-WA0017.jpg',
  '/images/IMG-20260805-WA0018.jpg',
  '/images/IMG-20260805-WA0019.jpg',
  '/images/IMG-20260805-WA0020.jpg',
  '/images/IMG-20260805-WA0021.jpg',
  '/images/IMG-20260805-WA0022.jpg',
  '/images/IMG-20260805-WA0023.jpg',
  '/images/IMG-20260805-WA0024.jpg',
  '/images/IMG-20260805-WA0025.jpg',
  '/images/IMG-20260805-WA0026.jpg',
  '/images/IMG-20260805-WA0027.jpg',
  '/images/IMG-20260805-WA0028.jpg',
  '/images/IMG-20260805-WA0029.jpg',
  '/images/IMG-20260805-WA0030.jpg',
  '/images/IMG-20260805-WA0031.jpg',
  '/images/IMG-20260805-WA0032.jpg',
  '/images/IMG-20260805-WA0034.jpg',
  '/images/IMG-20260805-WA0035.jpg',
  '/images/IMG-20260805-WA0036.jpg',
  '/images/IMG-20260805-WA0038.jpg',
  '/images/IMG-20260805-WA0039.jpg',
  '/images/IMG-20260805-WA0040.jpg',
  '/images/IMG-20260805-WA0041.jpg',
  '/images/IMG-20260805-WA0042.jpg',
  '/images/Lakefront Lodge.jpg',
  '/images/Luxury Double-Storey Room (AC).jpg',
  '/images/Morning Glory Clay Cabana.jpg',
  '/images/RowingandFishing1.jpg',
  '/images/Standard Room (Non-AC).jpg',
  '/images/agri2.jpg',
  '/images/agriculture.jpg',
  '/images/bicycletour.jpg',
  '/images/birdwatching.jpg',
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
  '/images/hero4.jpg',
  '/images/hero5.jpg',
  '/images/hiking.jpg',
];

export default function GalleryPage() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeImageIndex]);

  const handleNext = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleBookingOpen = () => {
    window.open(BOOKING_URL, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#FAF8F0', minHeight: '100vh' }}>
      <Navbar onBookingOpen={handleBookingOpen} />

      {/* Header Section */}
      <div style={{ 
        padding: '12rem 2rem 5rem', 
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #1B4332, #2D6A4F)',
        color: 'white'
      }}>
        <span style={{ 
          padding: '0.4rem 1rem', 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderRadius: '30px', 
          display: 'inline-block', 
          marginBottom: '1rem', 
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Visual Journey
        </span>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 600, fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>
          Our Gallery
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
          Discover the serene beauty, eco-luxurious accommodations, and unforgettable experiences that await you at Nature Kingdom.
        </p>
      </div>

      {/* Gallery Grid */}
      <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          <style>{`
            .gallery-item {
              position: relative;
              border-radius: 8px;
              overflow: hidden;
              cursor: pointer;
              box-shadow: 0 4px 15px rgba(0,0,0,0.05);
              transition: transform 0.4s ease, box-shadow 0.4s ease;
              aspect-ratio: 1 / 1;
            }
            .gallery-item:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 30px rgba(27, 67, 50, 0.15);
            }
            .gallery-item img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.6s ease;
            }
            .gallery-item:hover img {
              transform: scale(1.08);
            }
            .gallery-overlay {
              position: absolute;
              inset: 0;
              background: rgba(27,67,50,0.4);
              opacity: 0;
              transition: opacity 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .gallery-item:hover .gallery-overlay {
              opacity: 1;
            }
            .zoom-icon {
              transform: scale(0.5);
              transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              background: rgba(255,255,255,0.2);
              padding: 1rem;
              border-radius: 50%;
              backdrop-filter: blur(4px);
            }
            .gallery-item:hover .zoom-icon {
              transform: scale(1);
            }
          `}</style>

          {galleryImages.map((src, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => setActiveImageIndex(index)}
            >
              <img src={src} alt={`Nature Kingdom Gallery ${index + 1}`} loading="lazy" />
              <div className="gallery-overlay">
                <div className="zoom-icon">
                  <ZoomIn color="white" size={28} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Lightbox */}
      {activeImageIndex !== null && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 20, 15, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease',
        }}>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
          
          <button 
            onClick={() => setActiveImageIndex(null)}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              padding: '0.5rem', color: 'white', cursor: 'pointer',
              transition: 'background 0.2s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <X size={28} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            style={{
              position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              padding: '1rem', color: 'white', cursor: 'pointer',
              transition: 'background 0.2s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <ChevronLeft size={36} />
          </button>

          <img 
            src={galleryImages[activeImageIndex]} 
            alt="Expanded view" 
            style={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              animation: 'scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
          />

          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            style={{
              position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              padding: '1rem', color: 'white', cursor: 'pointer',
              transition: 'background 0.2s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <ChevronRight size={36} />
          </button>
          
          <div style={{ position: 'absolute', bottom: '2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
            {activeImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
