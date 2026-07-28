import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sun, 
  Moon,
  Layout, 
  Layers, 
  Code, 
  ShoppingBag, 
  Zap, 
  Smartphone, 
  Search, 
  TrendingUp, 
  Users, 
  Compass, 
  Globe, 
  ShieldCheck, 
  Target,
  ArrowRight,
  Terminal,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { servicesData } from "../data";

// Service Icon & Color badge helper for Developer Mega Menu
const getServiceBadge = (iconName: string) => {
  switch (iconName) {
    case "Layout": 
      return { icon: <Layout size={14} />, bg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
    case "Layers": 
      return { icon: <Layers size={14} />, bg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" };
    case "Code": 
      return { icon: <Code size={14} />, bg: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" };
    case "ShoppingBag": 
      return { icon: <ShoppingBag size={14} />, bg: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
    case "Zap": 
      return { icon: <Zap size={14} />, bg: "bg-rose-500/10 text-rose-500 border-rose-500/20" };
    case "Smartphone": 
      return { icon: <Smartphone size={14} />, bg: "bg-purple-500/10 text-purple-500 border-purple-500/20" };
    case "Search": 
      return { icon: <Search size={14} />, bg: "bg-sky-500/10 text-sky-500 border-sky-500/20" };
    case "TrendingUp": 
      return { icon: <TrendingUp size={14} />, bg: "bg-teal-500/10 text-teal-500 border-teal-500/20" };
    case "Users": 
      return { icon: <Users size={14} />, bg: "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20" };
    case "Compass": 
      return { icon: <Compass size={14} />, bg: "bg-violet-500/10 text-violet-500 border-violet-500/20" };
    case "Globe": 
      return { icon: <Globe size={14} />, bg: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
    case "ShieldCheck": 
      return { icon: <ShieldCheck size={14} />, bg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
    case "Target": 
      return { icon: <Target size={14} />, bg: "bg-orange-500/10 text-orange-500 border-orange-500/20" };
    default: 
      return { icon: <Sparkles size={14} />, bg: "bg-brand/10 text-brand border-brand/20" };
  }
};

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
  const [hoveredServiceSlug, setHoveredServiceSlug] = useState<string>("web-design");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vprime_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  const activeHoveredService = servicesData.find((s) => s.slug === hoveredServiceSlug) || servicesData[0];

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

                    {/* Developer Suite Mega Menu */}
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          id="services-megamenu"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[920px] z-50"
                        >
                          <div
                            style={{ backgroundColor: theme === "light" ? "#ffffff" : "#0f121d" }}
                            className={`rounded-2xl border p-6 space-y-5 ${
                              theme === "light"
                                ? "border-slate-200/90 shadow-2xl shadow-slate-900/10"
                                : "border-slate-800 shadow-2xl shadow-black/80"
                            }`}
                          >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/80">
                              <div className="flex items-center space-x-2 text-brand">
                                <Terminal size={14} />
                                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">VPRIME DEVELOPER CAPABILITIES</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 font-semibold">13 Production Modules</span>
                            </div>

                            <div className="grid grid-cols-12 gap-6">
                              {/* Left 3 columns: Service Categories */}
                              <div className="col-span-8 grid grid-cols-3 gap-4">
                                {categories.map((cat) => (
                                  <div key={cat} className="space-y-2.5">
                                    <h4
                                      className={`text-[10px] font-mono tracking-widest uppercase border-b pb-1.5 font-bold ${
                                        theme === "light"
                                          ? "text-slate-500 border-slate-200"
                                          : "text-slate-400 border-slate-800/80"
                                      }`}
                                    >
                                      {cat}
                                    </h4>
                                    <ul className="space-y-1">
                                      {servicesData
                                        .filter((s) => s.category === cat)
                                        .map((service) => {
                                          const badge = getServiceBadge(service.icon);
                                          const isHovered = hoveredServiceSlug === service.slug;
                                          return (
                                            <li key={service.id}>
                                              <button
                                                onClick={() => handleMegaServiceClick(service.slug)}
                                                onMouseEnter={() => setHoveredServiceSlug(service.slug)}
                                                className={`group w-full flex items-center space-x-2 p-1.5 rounded-xl text-left transition-all cursor-pointer ${
                                                  isHovered
                                                    ? theme === "light"
                                                      ? "bg-emerald-50/80 border border-emerald-200/80"
                                                      : "bg-slate-800/90 border border-slate-700/80"
                                                    : theme === "light"
                                                    ? "hover:bg-slate-100/80 border border-transparent hover:border-slate-200/80"
                                                    : "hover:bg-slate-800/50 border border-transparent hover:border-slate-800/60"
                                                }`}
                                              >
                                                {/* Colorful Icon Badge */}
                                                <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center border transition-transform group-hover:scale-110 ${badge.bg}`}>
                                                  {badge.icon}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                  <div className={`text-xs font-bold truncate transition-colors ${
                                                    isHovered
                                                      ? "text-brand"
                                                      : theme === "light"
                                                      ? "text-slate-900 group-hover:text-brand"
                                                      : "text-slate-200 group-hover:text-brand"
                                                  }`}>
                                                    {service.title}
                                                  </div>
                                                </div>
                                              </button>
                                            </li>
                                          );
                                        })}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              {/* Right column: Dynamic Service Image & Info Hover Preview */}
                              <div className="col-span-4 pl-2 border-l border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between">
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={activeHoveredService.id}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-3 h-full flex flex-col justify-between"
                                  >
                                    <div className="space-y-2.5">
                                      {/* Image Display */}
                                      <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200/40 dark:border-slate-800 shadow-md">
                                        {activeHoveredService.image ? (
                                          <img
                                            src={activeHoveredService.image}
                                            alt={activeHoveredService.title}
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                          />
                                        ) : (
                                          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                            <Sparkles size={28} className="text-brand/60" />
                                          </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                        <span className="absolute bottom-2 left-2.5 bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20 font-mono text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                          {activeHoveredService.category}
                                        </span>
                                      </div>

                                      {/* Info Text */}
                                      <div className="space-y-1">
                                        <h5 className={`text-xs font-display font-bold leading-tight ${
                                          theme === "light" ? "text-slate-900" : "text-white"
                                        }`}>
                                          {activeHoveredService.title}
                                        </h5>
                                        <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                                          theme === "light" ? "text-slate-600" : "text-slate-400"
                                        }`}>
                                          {activeHoveredService.description}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Action Link Button */}
                                    <button
                                      onClick={() => handleMegaServiceClick(activeHoveredService.slug)}
                                      className="w-full py-2 px-3 rounded-xl bg-brand text-slate-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-brand-dark transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                                    >
                                      <span>Explore {activeHoveredService.title.split(" ")[0]}</span>
                                      <ArrowRight size={12} />
                                    </button>
                                  </motion.div>
                                </AnimatePresence>
                              </div>
                            </div>

                            {/* Bottom CTA bar */}
                            <div className={`pt-3 border-t flex items-center justify-between text-xs rounded-xl px-4 py-2.5 ${
                              theme === "light"
                                ? "bg-slate-50 border-slate-200/60 text-slate-700"
                                : "bg-slate-900/80 border-slate-800 text-slate-300"
                            }`}>
                              <span className="font-medium text-[11px]">Need custom WebGL physics or enterprise design tokens?</span>
                              <button
                                onClick={onBookCall}
                                className="font-mono text-[10px] font-bold text-brand uppercase tracking-wider flex items-center space-x-1 hover:underline cursor-pointer"
                              >
                                <span>Book Technical Consultation</span>
                                <ArrowRight size={12} />
                              </button>
                            </div>
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
