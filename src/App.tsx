import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);

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

  // Render correct active page content
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeView onPageChange={handlePageChange} onSelectService={handleSelectService} />;
      case "services":
        return (
          <ServicesSection 
            selectedServiceSlug={selectedServiceSlug} 
            onClearSelectedService={handleClearSelectedService}
            onPageChange={handlePageChange}
          />
        );
      case "portfolio":
        return <PortfolioSection onPageChange={handlePageChange} />;
      case "process":
        return <ProcessSection />;
      case "pricing":
        return <PricingSection />;
      case "about":
        return <AboutSection />;
      case "blog":
        return <BlogSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeView onPageChange={handlePageChange} onSelectService={handleSelectService} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand selection:text-white flex flex-col justify-between">
      {/* 1. Header Navigation */}
      <Navbar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        onSelectService={handleSelectService} 
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
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}
