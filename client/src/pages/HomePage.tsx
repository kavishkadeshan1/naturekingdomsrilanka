import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import QuickInquiry from '../components/QuickInquiry';
import StatsCounter from '../components/StatsCounter';
import AccommodationGrid from '../components/AccommodationGrid';
import WellnessSection from '../components/WellnessSection';
import OrganicFarmSection from '../components/OrganicFarmSection';
import CSRSection from '../components/CSRSection';
import LocationSection from '../components/LocationSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Navbar onBookingOpen={() => setBookingOpen(true)} />
      <main>
        <HeroSlider onBookingOpen={() => setBookingOpen(true)} />
        <QuickInquiry onBookingOpen={() => setBookingOpen(true)} />
        <StatsCounter />
        <AccommodationGrid onBookingOpen={() => setBookingOpen(true)} />
        <WellnessSection />
        <OrganicFarmSection />
        <CSRSection />
        <LocationSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
