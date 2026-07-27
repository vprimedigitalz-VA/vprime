import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { servicesData } from "../data";

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onSelectService: (serviceSlug: string) => void;
  onBookCall: () => void;
}

export default function Navbar({ currentPage, onPageChange, onSelectService, onBookCall }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vprime_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("vprime_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Work", id: "portfolio" },
    { name: "Services", id: "services" },
    { name: "Vanalyst SEO", id: "vanalyst" },
    { name: "About", id: "about" }
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
      className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div
          style={{ backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.95)" : "#090a0f" }}
          className={`backdrop-blur-md border rounded-full px-4 py-2.5 md:px-6 md:py-3 flex items-center justify-between transition-all duration-300 ${
            theme === "light"
              ? "border-slate-200/90 shadow-md shadow-slate-200/50"
              : "border-slate-800/80 shadow-lg shadow-black/40"
          } ${
            scrolled
              ? theme === "light"
                ? "shadow-xl border-slate-300"
                : "shadow-2xl shadow-black/80 border-slate-700/90"
              : ""
          }`}
        >
          {/* Logo Brand */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick("home")}
            className="flex items-center space-x-2.5 text-left cursor-pointer group"
          >
            <span
              className={`font-display font-bold text-base md:text-lg tracking-tight transition-colors group-hover:text-brand ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              Vprime<span className="text-brand">Digitalz</span>
            </span>
          </button>

          {/* Desktop Navigation - Clean Simple Text Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-6 lg:space-x-8">
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
                      onClick={() => handleNavClick("services")}
                      className={`flex items-center space-x-1 text-sm font-medium transition-colors cursor-pointer py-1 ${
                        currentPage === "services"
                          ? "text-brand font-semibold"
                          : theme === "light"
                          ? "text-slate-700 hover:text-slate-950"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          megaMenuOpen
                            ? "rotate-180 text-brand"
                            : theme === "light"
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          id="services-megamenu"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[620px] z-50"
                        >
                          <div
                            style={{ backgroundColor: theme === "light" ? "#ffffff" : "#0f121d" }}
                            className={`rounded-2xl border p-6 grid grid-cols-4 gap-5 ${
                              theme === "light"
                                ? "border-slate-200 shadow-xl"
                                : "border-slate-800 shadow-2xl"
                            }`}
                          >
                            {categories.map((cat) => (
                              <div key={cat} className="space-y-2.5">
                                <h4
                                  className={`text-[10px] font-mono tracking-widest uppercase border-b pb-1 font-semibold ${
                                    theme === "light"
                                      ? "text-slate-500 border-slate-200"
                                      : "text-slate-400 border-slate-800/80"
                                  }`}
                                >
                                  {cat}
                                </h4>
                                <ul className="space-y-1.5">
                                  {servicesData
                                    .filter((s) => s.category === cat)
                                    .map((service) => (
                                      <li key={service.id}>
                                        <button
                                          onClick={() => handleMegaServiceClick(service.slug)}
                                          className={`text-xs font-medium text-left block py-0.5 leading-snug transition-colors cursor-pointer w-full ${
                                            theme === "light"
                                              ? "text-slate-700 hover:text-brand"
                                              : "text-slate-300 hover:text-brand"
                                          }`}
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
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                    currentPage === item.id
                      ? "text-brand font-semibold"
                      : theme === "light"
                      ? "text-slate-700 hover:text-slate-950"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle & Call to Action Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center border ${
                theme === "light"
                  ? "bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200"
                  : "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700"
              }`}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon size={16} className="text-indigo-600 transition-transform hover:-rotate-12" />
              ) : (
                <Sun size={16} className="text-amber-400 transition-transform hover:rotate-45" />
              )}
            </button>

            <button
              id="nav-cta-calendly"
              onClick={onBookCall}
              className="rounded-full bg-brand hover:bg-brand-dark text-slate-950 font-semibold text-xs px-5 py-2.5 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a call
            </button>
          </div>

          {/* Mobile Theme Toggle & Hamburger Trigger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors cursor-pointer border ${
                theme === "light"
                  ? "bg-slate-100 border-slate-200 text-indigo-600"
                  : "bg-slate-900 border-slate-800 text-amber-400"
              }`}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                theme === "light"
                  ? "text-slate-800 hover:bg-slate-100"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: theme === "light" ? "#ffffff" : "#0f121d" }}
            className={`mt-3 max-w-5xl mx-auto pointer-events-auto rounded-3xl border p-6 md:hidden overflow-hidden space-y-4 ${
              theme === "light" ? "border-slate-200 shadow-xl" : "border-slate-800 shadow-2xl"
            }`}
          >
            <div className="space-y-3">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`border-b pb-2.5 ${
                    theme === "light" ? "border-slate-200" : "border-slate-800/80"
                  }`}
                >
                  <button
                    id={`mobile-nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-lg font-display font-semibold tracking-tight text-left block w-full cursor-pointer ${
                      currentPage === item.id
                        ? "text-brand"
                        : theme === "light"
                        ? "text-slate-800"
                        : "text-slate-200"
                    }`}
                  >
                    {item.name}
                  </button>

                  {item.id === "services" && (
                    <div className="mt-2 grid grid-cols-2 gap-y-1.5 gap-x-4 pl-3">
                      {servicesData.slice(0, 8).map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleMegaServiceClick(service.slug)}
                          className={`text-xs font-sans text-left py-0.5 ${
                            theme === "light"
                              ? "text-slate-600 hover:text-brand"
                              : "text-slate-400 hover:text-brand"
                          }`}
                        >
                          {service.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Theme Toggle Row */}
            <div
              className={`pt-2 flex items-center justify-between border-t ${
                theme === "light" ? "border-slate-200" : "border-slate-800"
              }`}
            >
              <span
                className={`text-xs font-mono uppercase tracking-wider ${
                  theme === "light" ? "text-slate-600" : "text-slate-400"
                }`}
              >
                Theme: {theme === "light" ? "Light Mode" : "Dark Mode"}
              </span>
              <button
                onClick={toggleTheme}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-all ${
                  theme === "light"
                    ? "bg-slate-100 border-slate-300 text-indigo-600"
                    : "bg-slate-900 border-slate-700 text-amber-400"
                }`}
              >
                {theme === "light" ? (
                  <>
                    <Moon size={14} />
                    <span>Switch Dark</span>
                  </>
                ) : (
                  <>
                    <Sun size={14} />
                    <span>Switch Light</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2">
              <button
                id="mobile-nav-cta-calendly"
                onClick={() => {
                  setIsOpen(false);
                  onBookCall();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-brand text-slate-950 font-bold text-xs py-3.5 rounded-full shadow-xs cursor-pointer hover:bg-brand-dark"
              >
                <span>Book a call</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
