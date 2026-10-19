import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import ProcessSection from "./components/ProcessSection";
import PricingSection from "./components/PricingSection";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import BookingSection from "./components/BookingSection";
import BookingModal from "./components/BookingModal";
import VanalystSection from "./components/VanalystSection";
import VhelpChatbot from "./components/VhelpChatbot";
import { PageLoaderOverlay } from "./components/BrandedLoader";
import { ToastProvider } from "./components/ToastContext";

function parsePathname(): { page: string; serviceSlug: string | null; articleSlug: string | null } {
  if (typeof window === "undefined") {
    return { page: "home", serviceSlug: null, articleSlug: null };
  }
  const path = window.location.pathname.replace(/\/$/, "");
  if (!path || path === "") {
    return { page: "home", serviceSlug: null, articleSlug: null };
  }
  if (path === "/blog") {
    return { page: "blog", serviceSlug: null, articleSlug: null };
  }
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    return { page: "blog", serviceSlug: null, articleSlug: slug };
  }
  if (path === "/services") {
    return { page: "services", serviceSlug: null, articleSlug: null };
  }
  if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "");
    return { page: "services", serviceSlug: slug, articleSlug: null };
  }
  if (path === "/portfolio" || path === "/work") {
    return { page: "portfolio", serviceSlug: null, articleSlug: null };
  }
  if (path === "/about") {
    return { page: "about", serviceSlug: null, articleSlug: null };
  }
  if (path === "/pricing") {
    return { page: "pricing", serviceSlug: null, articleSlug: null };
  }
  if (path === "/vanalyst") {
    return { page: "vanalyst", serviceSlug: null, articleSlug: null };
  }
  if (path === "/booking") {
    return { page: "booking", serviceSlug: null, articleSlug: null };
  }
  return { page: "home", serviceSlug: null, articleSlug: null };
}

export default function App() {
  const initialRoute = parsePathname();
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(initialRoute.serviceSlug);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initialRoute.articleSlug);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Listen to browser forward/backward navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = parsePathname();
      setCurrentPage(route.page);
      setSelectedServiceSlug(route.serviceSlug);
      setSelectedArticleSlug(route.articleSlug);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Smooth scroll progress bar at top of screen
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  const handlePageChange = (pageId: string, subSlug?: string) => {
    setSelectedServiceSlug(null);
    setSelectedArticleSlug(null);

    if (pageId === "process") {
      setCurrentPage("services");
      window.history.pushState(null, "", "/services");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pageId === "home") {
      setCurrentPage("home");
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pageId === "blog") {
      setCurrentPage("blog");
      if (subSlug) {
        setSelectedArticleSlug(subSlug);
        window.history.pushState(null, "", `/blog/${subSlug}`);
      } else {
        window.history.pushState(null, "", "/blog");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pageId === "services") {
      setCurrentPage("services");
      if (subSlug) {
        setSelectedServiceSlug(subSlug);
        window.history.pushState(null, "", `/services/${subSlug}`);
      } else {
        window.history.pushState(null, "", "/services");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pageId === "portfolio") {
      setCurrentPage("portfolio");
      window.history.pushState(null, "", "/portfolio");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pageId === "pricing") {
      setCurrentPage("pricing");
      window.history.pushState(null, "", "/pricing");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pageId === "about") {
      setCurrentPage("about");
      window.history.pushState(null, "", "/about");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pageId === "vanalyst") {
      setCurrentPage("vanalyst");
      window.history.pushState(null, "", "/vanalyst");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pageId === "booking") {
      setCurrentPage("booking");
      window.history.pushState(null, "", "/booking");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentPage(pageId);
    window.history.pushState(null, "", `/${pageId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentPage("services");
    window.history.pushState(null, "", `/services/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearSelectedService = () => {
    setSelectedServiceSlug(null);
    window.history.pushState(null, "", "/services");
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
        return (
          <BlogSection 
            onBookCall={handleBookCall} 
            onPageChange={handlePageChange}
            initialPostSlug={selectedArticleSlug}
          />
        );
      case "vanalyst":
        return <VanalystSection onBookCall={handleBookCall} />;
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
    <ToastProvider>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-brand selection:text-white flex flex-col justify-between">
        {/* App Initialization Branded Overlay Loader */}
        <AnimatePresence>
          {isInitialLoading && <PageLoaderOverlay durationMs={1600} />}
        </AnimatePresence>

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

        {/* 2. Main Active Area with motion page transitions */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + (selectedServiceSlug ? `-${selectedServiceSlug}` : "")}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 3. Footer Segment */}
        <Footer onPageChange={handlePageChange} onBookCall={handleBookCall} />

        {/* 4. Global Calendly Booking Overlay Modal */}
        <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

        {/* 5. Floating Vhelp AI Chatbot */}
        <VhelpChatbot />
      </div>
    </ToastProvider>
  );
}
