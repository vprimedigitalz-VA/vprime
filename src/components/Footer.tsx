import { useState, useEffect, FormEvent } from "react";
import { ArrowUp, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart, Linkedin, Twitter, Instagram } from "lucide-react";

interface FooterProps {
  onPageChange: (pageId: string) => void;
  onBookCall: () => void;
}

export default function Footer({ onPageChange, onBookCall }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  // Appends JSON-LD Structured Schema dynamic meta-tag upon load
  useEffect(() => {
    const existingSchema = document.getElementById("vprime-jsonld-schema");
    if (!existingSchema) {
      const script = document.createElement("script");
      script.id = "vprime-jsonld-schema";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "VprimeDigitalz",
        "image": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80",
        "@id": "https://vprimedigitalz.com",
        "url": "https://vprimedigitalz.com",
        "telephone": "+1-415-340-2498",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "320 Sansome St",
          "addressLocality": "San Francisco",
          "addressRegion": "CA",
          "postalCode": "94104",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 37.7937,
          "longitude": -122.4014
        },
        "sameAs": [
          "https://twitter.com/vprimedigitalz",
          "https://linkedin.com/company/vprimedigitalz",
          "https://instagram.com/vprimedigitalz"
        ]
      });
      document.head.appendChild(script);
    }
  }, []);

  return (
    <footer id="main-footer" className="bg-slate-950 text-white border-t border-white/5 pt-20 pb-12 relative overflow-hidden">
      
      {/* Decorative Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_50%_50%_at_50%_100%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Top Segment: Brand logo & Newsletter Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/5 items-center">
          
          {/* Brand Intro info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 flex items-center justify-center bg-brand rounded-lg font-display font-extrabold text-white text-lg">
                V
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                Vprime<span className="text-brand">Digitalz</span>
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Helping businesses grow online through beautiful, award-winning custom web design, high-performance programming, and scientific organic SEO acquisitions.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-white/5 border border-white/5 p-6 rounded-2xl space-y-4 max-w-xl lg:ml-auto w-full">
            <div className="space-y-1">
              <h4 className="text-xs font-display font-bold text-white tracking-tight uppercase">SUBSCRIBE TO DIGITAL WEEKLY</h4>
              <p className="text-[11px] text-white/60">Receive sitemaps, conversion reviews, and core technical SEO playbooks.</p>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 text-xs text-white px-4 py-3 rounded-lg flex-1 focus:outline-hidden focus:border-brand"
                />
                <button
                  type="submit"
                  className="bg-brand hover:bg-brand-dark text-white font-sans text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            ) : (
              <div className="text-[11px] text-brand bg-brand/5 border border-brand/10 p-3 rounded-lg font-semibold flex items-center space-x-2">
                <ShieldCheck size={14} />
                <span>Playbook Subscribed! Enjoy Vprime Insights.</span>
              </div>
            )}
          </div>

        </div>

        {/* Directory columns Segment */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 pb-12 border-b border-white/5 text-xs">
          
          {/* Column 1: Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] tracking-widest text-white/40 uppercase font-semibold">AGENCY PAGES</h5>
            <ul className="space-y-2.5">
              {[
                { name: "Home Dashboard", id: "home" },
                { name: "Our Capabilities", id: "services" },
                { name: "Case Study Portfolios", id: "portfolio" },
                { name: "Interactive Process", id: "process" }
              ].map(lnk => (
                <li key={lnk.id}>
                  <button 
                    onClick={() => onPageChange(lnk.id)}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left font-medium"
                  >
                    {lnk.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Secondary Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] tracking-widest text-white/40 uppercase font-semibold">COMPANY</h5>
            <ul className="space-y-2.5">
              {[
                { name: "Transparent Pricing", id: "pricing" },
                { name: "Company Story & Mission", id: "about" },
                { name: "Insights Playbook Blog", id: "blog" },
                { name: "Connect & Consult", id: "contact" }
              ].map(lnk => (
                <li key={lnk.id}>
                  <button 
                    onClick={() => onPageChange(lnk.id)}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer text-left font-medium"
                  >
                    {lnk.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact coordinates */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] tracking-widest text-white/40 uppercase font-semibold">COORDINATES</h5>
            <ul className="space-y-2.5 text-white/60">
              <li className="flex items-center space-x-2">
                <MapPin size={12} className="text-brand shrink-0" />
                <span>320 Sansome St, San Francisco, CA</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={12} className="text-brand shrink-0" />
                <span>vprimedigitalz@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={12} className="text-brand shrink-0" />
                <span>+1 (415) 340-2498</span>
              </li>
            </ul>
          </div>

          {/* Column 4: SEO Metadata verification visualization */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] tracking-widest text-white/40 uppercase font-semibold">SEO AUDIT INDICES</h5>
            <div className="bg-white/5 border border-white/5 rounded-xl p-4.5 space-y-2 text-[10px]">
              <div className="flex justify-between items-center text-white/40">
                <span>OG:TITLE:</span>
                <span className="text-white font-semibold">VprimeDigitalz Agency</span>
              </div>
              <div className="flex justify-between items-center text-white/40">
                <span>TWITTER:CARD:</span>
                <span className="text-white font-semibold">summary_large_image</span>
              </div>
              <div className="flex justify-between items-center text-white/40">
                <span>SCHEMA.ORG:</span>
                <span className="text-emerald-400 font-bold">JSON-LD LOADED</span>
              </div>
              <div className="flex justify-between items-center text-white/40">
                <span>ACCESSIBILITY:</span>
                <span className="text-emerald-400 font-bold">WCAG 2.1 COHERENT</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright & Social links */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-white/40 text-[11px] gap-6">
          <div>
            &copy; {currentYear} VprimeDigitalz. All rights reserved. 
            <span className="mx-2">|</span>
            Designed with <Heart size={10} className="inline text-rose-500 fill-rose-500 mx-0.5" /> by our boutique studio.
          </div>

          {/* Social icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn Profile"><Linkedin size={14} /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter Feed"><Twitter size={14} /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram Feed"><Instagram size={14} /></a>
            <button onClick={onBookCall} className="hover:text-white transition-colors flex items-center space-x-0.5 cursor-pointer" aria-label="Calendly Slot">
              <span>Calendly</span>
              <ExternalLink size={10} />
            </button>
          </div>
        </div>

      </div>

      {/* Floating Scroll-to-top widget button */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          id="scroll-to-top-btn"
          className="fixed bottom-6 right-6 z-40 bg-brand hover:bg-brand-dark text-white p-3 rounded-full shadow-lg shadow-brand/15 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-0.5"
          aria-label="Scroll to top of the page"
        >
          <ArrowUp size={16} />
        </button>
      )}

    </footer>
  );
}
