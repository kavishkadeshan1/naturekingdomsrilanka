import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import QuickInquiry from '../components/QuickInquiry';
import StatsCounter from '../components/StatsCounter';
import AboutSection from '../components/AboutSection';
import AccommodationGrid from '../components/AccommodationGrid';
import ActivitiesSection from '../components/ActivitiesSection';
import CSRSection from '../components/CSRSection';
import LocationSection from '../components/LocationSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { ArrowUp, BedDouble, Leaf } from 'lucide-react';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      
      // Show back-to-top after scrolling 400px
      setShowBackToTop(scrollTop > 400);

      // Show floating book bar after scrolling past hero (approx 80vh)
      const heroThreshold = window.innerHeight * 0.85;
      setShowFloatingBar(scrollTop > heroThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-label="Page scroll progress"
      />

      <Navbar onBookingOpen={() => setBookingOpen(true)} />

      <main>
        <HeroSlider onBookingOpen={() => setBookingOpen(true)} />
        <QuickInquiry onBookingOpen={() => setBookingOpen(true)} />
        <StatsCounter />
        <AboutSection />
        <AccommodationGrid onBookingOpen={() => setBookingOpen(true)} />
        <ActivitiesSection />
        <CSRSection />
        <LocationSection />
        <TestimonialsSection />
      </main>

      <Footer />

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Floating Book Bar — Mobile only */}
      {isMobile && (
        <div className={`floating-book-bar ${showFloatingBar ? 'visible' : ''}`}>
          <div className="floating-book-bar-text">
            <span className="floating-book-bar-title">
              <Leaf size={13} style={{ display: 'inline', marginRight: '5px', color: '#C9A96E' }} />
              Nature Kingdom
            </span>
            <span className="floating-book-bar-sub">Eco-retreat · Hambegamuwa, Sri Lanka</span>
          </div>
          <button
            className="btn-primary"
            onClick={() => setBookingOpen(true)}
            id="floating-book-btn"
            style={{ borderRadius: '2px', padding: '0.65rem 1.25rem', fontSize: '0.75rem', gap: '0.4rem', flexShrink: 0 }}
          >
            <BedDouble size={14} />
            Book Now
          </button>
        </div>
      )}
    </>
  );
}
