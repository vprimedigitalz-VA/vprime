import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { servicesData } from "../data";

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onSelectService: (serviceSlug: string) => void;
}

export default function Navbar({ currentPage, onPageChange, onSelectService }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Process", id: "process" },
    { name: "Pricing", id: "pricing" },
    { name: "About", id: "about" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" }
  ];

  // Group services by category for the Mega Menu
  const categories = ["Design", "Development", "Marketing", "Strategy"];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsOpen(false);
    setMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMegaServiceClick = (slug: string) => {
    onSelectService(slug);
    setMegaMenuOpen(false);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-xs py-3 border-b border-brand/5" : "bg-white/0 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-2.5 text-left group cursor-pointer"
        >
          <div className="relative w-9 h-9 flex items-center justify-center bg-brand rounded-lg overflow-hidden shadow-xs">
            <span className="font-display font-bold text-white text-xl">V</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900">
              Vprime<span className="text-brand">Digitalz</span>
            </span>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase leading-none">
              Digital Agency
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            if (item.id === "services") {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <button
                    id="nav-btn-services"
                    className={`flex items-center space-x-1 font-sans text-sm font-medium tracking-wide transition-colors py-2 cursor-pointer ${
                      currentPage === "services"
                        ? "text-brand"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>Services</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${megaMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div
                        id="services-megamenu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[680px] z-50"
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-4 gap-6">
                          {categories.map((cat) => (
                            <div key={cat} className="space-y-3">
                              <h4 className="text-[11px] font-mono tracking-widest text-slate-400 uppercase border-b border-slate-50 pb-1.5 font-semibold">
                                {cat}
                              </h4>
                              <ul className="space-y-2">
                                {servicesData
                                  .filter((s) => s.category === cat)
                                  .map((service) => (
                                    <li key={service.id}>
                                      <button
                                        onClick={() => handleMegaServiceClick(service.slug)}
                                        className="text-[13px] font-medium text-slate-600 hover:text-brand text-left block py-0.5 leading-snug transition-colors cursor-pointer w-full"
                                      >
                                        {service.title}
                                      </button>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-sm font-medium tracking-wide transition-colors relative py-2 cursor-pointer ${
                  currentPage === item.id ? "text-brand" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.name}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Call to Action Desktop */}
        <div className="hidden lg:flex items-center">
          <a
            id="nav-cta-calendly"
            href="https://calendly.com/vprimedigitalz/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-brand text-white font-sans text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center space-x-1">
              <span>Book Strategy Call</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <div className="absolute inset-0 bg-brand-dark scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out" />
          </a>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full bg-white z-40 lg:hidden overflow-y-auto pt-24 pb-12 border-b border-slate-100 flex flex-col justify-between"
          >
            <div className="px-6 space-y-6">
              {navItems.map((item) => (
                <div key={item.id} className="border-b border-slate-100 pb-4">
                  <button
                    id={`mobile-nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-2xl font-display font-semibold tracking-tight text-left block w-full cursor-pointer ${
                      currentPage === item.id ? "text-brand" : "text-slate-800"
                    }`}
                  >
                    {item.name}
                  </button>

                  {item.id === "services" && (
                    <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 pl-4">
                      {servicesData.slice(0, 8).map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleMegaServiceClick(service.slug)}
                          className="text-[13px] font-sans text-slate-500 hover:text-brand text-left py-1"
                        >
                          {service.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-6 pt-12 space-y-6">
              <a
                id="mobile-nav-cta-calendly"
                href="https://calendly.com/vprimedigitalz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-brand text-white font-sans text-sm font-semibold uppercase tracking-wider py-4 rounded-xl shadow-xs"
              >
                <span>Free Strategy Call</span>
                <ArrowUpRight size={16} />
              </a>
              <div className="text-center text-xs font-mono text-slate-400">
                INFO@VPRIMEDIGITALZ.COM
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
