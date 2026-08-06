import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import QuickInquiry from '../components/QuickInquiry';
import StatsCounter from '../components/StatsCounter';
import AboutSection from '../components/AboutSection';
import AccommodationGrid from '../components/AccommodationGrid';
import ActivitiesSection from '../components/ActivitiesSection';
import HomeGallerySection from '../components/HomeGallerySection';
import LocationSection from '../components/LocationSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { ArrowUp, BedDouble, Leaf } from 'lucide-react';

const BOOKING_URL = "https://www.booking.com/hotel/lk/nature-kingdom-botanical-garden.html?aid=356980&label=gog235jc-10CAsohQFCH25hdHVyZS1raW5nZG9tLWJvdGFuaWNhbC1nYXJkZW5IM1gDaIUBiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAK89tLTBsACAdICJDUzZDMxZTIyLTM4YTctNGFiNC04OTFhLWJjZDZjNjRlZjcwZNgCAeACAQ&sid=7059c8c392832e8635858dfdc8ce5f7a&dest_id=-2218951&dest_type=city&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1786035012&srpvid=5908765ed7430449&type=total&ucfs=1&";

export default function HomePage() {
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

  const handleBookingOpen = () => {
    window.open(BOOKING_URL, '_blank');
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

      <Navbar onBookingOpen={handleBookingOpen} />

      <main>
        <HeroSlider onBookingOpen={handleBookingOpen} />
        <QuickInquiry onBookingOpen={handleBookingOpen} />
        <StatsCounter />
        <AboutSection />
        <AccommodationGrid onBookingOpen={handleBookingOpen} />
        <ActivitiesSection />
        <HomeGallerySection />
        <LocationSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />

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
            onClick={handleBookingOpen}
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
