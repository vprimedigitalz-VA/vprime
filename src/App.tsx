import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import ProcessSection from "./components/ProcessSection";
import PricingSection from "./components/PricingSection";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BookingSection from "./components/BookingSection";
import BookingModal from "./components/BookingModal";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Smooth scroll progress bar at top of screen
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
    setSelectedServiceSlug(null); // Reset service slug when switching pages normally
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentPage("services");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearSelectedService = () => {
    setSelectedServiceSlug(null);
  };

  const handleBookCall = () => {
    setIsBookingModalOpen(true);
  };

  // Render correct active page content
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomeView 
            onPageChange={handlePageChange} 
            onSelectService={handleSelectService} 
            onBookCall={handleBookCall} 
          />
        );
      case "services":
        return (
          <ServicesSection 
            selectedServiceSlug={selectedServiceSlug} 
            onClearSelectedService={handleClearSelectedService}
            onPageChange={handlePageChange}
            onBookCall={handleBookCall}
          />
        );
      case "portfolio":
        return <PortfolioSection onPageChange={handlePageChange} />;
      case "process":
        return <ProcessSection />;
      case "pricing":
        return <PricingSection onBookCall={handleBookCall} />;
      case "about":
        return <AboutSection onBookCall={handleBookCall} />;
      case "blog":
        return <BlogSection onBookCall={handleBookCall} />;
      case "contact":
        return <ContactSection onBookCall={handleBookCall} />;
      case "booking":
        return <BookingSection />;
      default:
        return (
          <HomeView 
            onPageChange={handlePageChange} 
            onSelectService={handleSelectService} 
            onBookCall={handleBookCall} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand selection:text-white flex flex-col justify-between">
      {/* Dynamic Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-brand origin-left z-[100] pointer-events-none shadow-[0_1px_10px_rgba(0,55,253,0.5)]" 
      />

      {/* 1. Header Navigation */}
      <Navbar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        onSelectService={handleSelectService} 
        onBookCall={handleBookCall}
      />

      {/* 2. Main Active Area with transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer Segment */}
      <Footer onPageChange={handlePageChange} onBookCall={handleBookCall} />

      {/* 4. Global Calendly Booking Overlay Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
}
