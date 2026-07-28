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

  // Official Social Media Channels Data
  const socialLinks = [
    {
      name: "Instagram",
      handle: "@vprime_digitalz",
      url: "https://www.instagram.com/vprime_digitalz?igsh=MWsyM3pvem45OXdxbA==",
      color: "hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: "X (Twitter)",
      handle: "@vprimedigitalz",
      url: "https://x.com/vprimedigitalz",
      color: "hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "TikTok",
      handle: "@vprimedigitalz",
      url: "https://www.tiktok.com/@vprimedigitalz?_r=1&_t=ZS-97XzcoU9VwX",
      color: "hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.12V9.4a6.27 6.27 0 0 0-1-.08 6.34 6.34 0 1 0 6.34 6.34V9.07a8.16 8.16 0 0 0 4.95 1.66V7.27a4.85 4.85 0 0 1-1-.58z"/>
        </svg>
      )
    },
    {
      name: "Behance",
      handle: "adebayovictor5",
      url: "https://www.behance.net/adebayovictor5",
      color: "hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.813 3-3.035 0-5.238-2.11-5.238-5.213 0-3.13 2.135-5.287 5.097-5.287 3.012 0 4.854 2.108 4.854 5.213 0 .343-.035.753-.062.902h-7.393c.121 1.488 1.154 2.383 2.656 2.383 1.053 0 1.906-.415 2.353-1.002h2.547zm-4.942-5.418c-1.18 0-2.012.713-2.28 1.832h4.524c-.105-1.102-.914-1.832-2.244-1.832zm-12.784-2.582h-6v11h6.219c2.321 0 3.781-1.188 3.781-2.94 0-1.264-.728-2.164-1.802-2.531 1.012-.39 1.583-1.188 1.583-2.313 0-1.832-1.461-3.216-3.781-3.216zm-3.5 2.5h2.5c.983 0 1.6.452 1.6 1.25 0 .828-.617 1.25-1.6 1.25h-2.5v-2.5zm0 4.5h2.719c1.074 0 1.781.477 1.781 1.375 0 .922-.707 1.375-1.781 1.375h-2.719v-2.75z"/>
        </svg>
      )
    },
    {
      name: "Contra",
      handle: "vprimedigitalz",
      url: "https://contra.com/vprimedigitalz?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=vprimedigitalz",
      color: "hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 16a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100 6 3 3 0 000-6z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      handle: "victoradebayo01",
      url: "https://www.linkedin.com/in/victoradebayo01/",
      color: "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
        </svg>
      )
    },
    {
      name: "WhatsApp",
      handle: "Direct DM",
      url: "https://wa.me/message/XE2GLIKLK5LUO1",
      color: "hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.333 5.002L2 22l5.127-1.339c1.464.8 3.12 1.222 4.881 1.222h.004c5.506 0 9.989-4.478 9.99-9.984A9.923 9.923 0 0 0 18.01 4.932 9.922 9.922 0 0 0 12.012 2zm5.836 14.152c-.244.688-1.222 1.32-1.688 1.38-.465.06-1.074.204-3.567-.784-2.983-1.183-4.89-4.218-5.04-4.417-.15-.198-1.206-1.603-1.206-3.058 0-1.455.762-2.17 1.032-2.464.27-.294.588-.368.784-.368.196 0 .392.004.56.01.18.006.42-.068.658.504.24.572.81 1.982.88 2.126.07.144.118.312.024.504-.094.192-.142.312-.284.48-.142.168-.3.376-.428.504-.144.144-.294.3-.126.588.168.288.75 1.238 1.61 2.006 1.106.986 2.038 1.292 2.326 1.436.288.144.456.12.624-.072.168-.192.72-.84.912-1.128.192-.288.384-.24.648-.144.264.096 1.68.792 1.968.936.288.144.48.216.552.336.072.12.072.696-.172 1.384z"/>
        </svg>
      )
    }
  ];

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
          "https://www.instagram.com/vprime_digitalz",
          "https://x.com/vprimedigitalz",
          "https://www.tiktok.com/@vprimedigitalz",
          "https://www.behance.net/adebayovictor5",
          "https://contra.com/vprimedigitalz",
          "https://www.linkedin.com/in/victoradebayo01/",
          "https://wa.me/message/XE2GLIKLK5LUO1"
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
          
          {/* Brand Intro info & Company Story & Mission with Vertical Social Media Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 flex items-center justify-center bg-brand rounded-lg font-display font-extrabold text-slate-950 text-lg">
                V
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                Vprime<span className="text-brand">Digitalz</span>
              </span>
            </div>

            {/* Company Story & Mission Description */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-mono tracking-widest text-brand font-bold uppercase">
                COMPANY STORY & MISSION
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
                Helping businesses grow online through beautiful, award-winning custom web design, high-performance programming, and scientific organic SEO acquisitions.
              </p>
            </div>

            {/* Social Media Buttons Row - Matching exact white pill/circle design from user image */}
            <div className="pt-2 space-y-3">
              <h6 className="text-[10px] font-mono tracking-widest text-white/50 font-bold uppercase">
                OFFICIAL SOCIAL MEDIA PLATFORMS
              </h6>
              <div className="flex flex-wrap items-center gap-3">
                {/* TikTok Pill with 2k+ Badge */}
                <a
                  href="https://www.tiktok.com/@vprimedigitalz?_r=1&_t=ZS-97XzcoU9VwX"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="TikTok (@vprimedigitalz)"
                  className="px-4 py-2.5 rounded-full bg-white text-slate-950 hover:bg-brand hover:text-slate-950 flex items-center space-x-2 font-mono text-xs font-bold shadow-md cursor-pointer transition-all duration-300 hover:scale-105 shrink-0"
                >
                  <svg className="w-4 h-4 fill-current text-slate-950" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.12V9.4a6.27 6.27 0 0 0-1-.08 6.34 6.34 0 1 0 6.34 6.34V9.07a8.16 8.16 0 0 0 4.95 1.66V7.27a4.85 4.85 0 0 1-1-.58z"/>
                  </svg>
                  <span className="text-amber-600 font-extrabold text-xs">2k+</span>
                </a>

                {/* LinkedIn Circle */}
                <a
                  href="https://www.linkedin.com/in/victoradebayo01/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn (victoradebayo01)"
                  className="w-11 h-11 rounded-full bg-white text-slate-950 hover:bg-brand hover:text-slate-950 flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 hover:scale-105 shrink-0"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                  </svg>
                </a>

                {/* Instagram Circle */}
                <a
                  href="https://www.instagram.com/vprime_digitalz?igsh=MWsyM3pvem45OXdxbA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram (@vprime_digitalz)"
                  className="w-11 h-11 rounded-full bg-white text-slate-950 hover:bg-brand hover:text-slate-950 flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 hover:scale-105 shrink-0"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Behance Circle */}
                <a
                  href="https://www.behance.net/adebayovictor5"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Behance (adebayovictor5)"
                  className="w-11 h-11 rounded-full bg-white text-slate-950 hover:bg-brand hover:text-slate-950 flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 hover:scale-105 shrink-0"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.813 3-3.035 0-5.238-2.11-5.238-5.213 0-3.13 2.135-5.287 5.097-5.287 3.012 0 4.854 2.108 4.854 5.213 0 .343-.035.753-.062.902h-7.393c.121 1.488 1.154 2.383 2.656 2.383 1.053 0 1.906-.415 2.353-1.002h2.547zm-4.942-5.418c-1.18 0-2.012.713-2.28 1.832h4.524c-.105-1.102-.914-1.832-2.244-1.832zm-12.784-2.582h-6v11h6.219c2.321 0 3.781-1.188 3.781-2.94 0-1.264-.728-2.164-1.802-2.531 1.012-.39 1.583-1.188 1.583-2.313 0-1.832-1.461-3.216-3.781-3.216zm-3.5 2.5h2.5c.983 0 1.6.452 1.6 1.25 0 .828-.617 1.25-1.6 1.25h-2.5v-2.5zm0 4.5h2.719c1.074 0 1.781.477 1.781 1.375 0 .922-.707 1.375-1.781 1.375h-2.719v-2.75z"/>
                  </svg>
                </a>

                {/* WhatsApp Circle */}
                <a
                  href="https://wa.me/message/XE2GLIKLK5LUO1"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp (Direct DM)"
                  className="w-11 h-11 rounded-full bg-white text-slate-950 hover:bg-brand hover:text-slate-950 flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 hover:scale-105 shrink-0"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.333 5.002L2 22l5.127-1.339c1.464.8 3.12 1.222 4.881 1.222h.004c5.506 0 9.989-4.478 9.99-9.984A9.923 9.923 0 0 0 18.01 4.932 9.922 9.922 0 0 0 12.012 2zm5.836 14.152c-.244.688-1.222 1.32-1.688 1.38-.465.06-1.074.204-3.567-.784-2.983-1.183-4.89-4.218-5.04-4.417-.15-.198-1.206-1.603-1.206-3.058 0-1.455.762-2.17 1.032-2.464.27-.294.588-.368.784-.368.196 0 .392.004.56.01.18.006.42-.068.658.504.24.572.81 1.982.88 2.126.07.144.118.312.024.504-.094.192-.142.312-.284.48-.142.168-.3.376-.428.504-.144.144-.294.3-.126.588.168.288.75 1.238 1.61 2.006 1.106.986 2.038 1.292 2.326 1.436.288.144.456.12.624-.072.168-.192.72-.84.912-1.128.192-.288.384-.24.648-.144.264.096 1.68.792 1.968.936.288.144.48.216.552.336.072.12.072.696-.172 1.384z"/>
                  </svg>
                </a>

                {/* X / Twitter Circle */}
                <a
                  href="https://x.com/vprimedigitalz"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X / Twitter (@vprimedigitalz)"
                  className="w-11 h-11 rounded-full bg-white text-slate-950 hover:bg-brand hover:text-slate-950 flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 hover:scale-105 shrink-0"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 pb-12 border-b border-white/5 text-xs">
          
          {/* Column 1: Agency Pages */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-mono text-[10px] tracking-widest text-brand font-bold uppercase">AGENCY DIRECTORY</h5>
            <ul className="space-y-2.5">
              {[
                { name: "Home Dashboard", id: "home" },
                { name: "Our Capabilities & Services", id: "services" },
                { name: "Case Study Portfolios", id: "portfolio" },
                { name: "Company Story & Mission", id: "about" }
              ].map(lnk => (
                <li key={lnk.id}>
                  <button 
                    onClick={() => onPageChange(lnk.id)}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left font-medium flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors" />
                    <span>{lnk.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Tools & Company */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-mono text-[10px] tracking-widest text-brand font-bold uppercase">PLATFORM & UTILITIES</h5>
            <ul className="space-y-2.5">
              {[
                { name: "Vanalyst SEO Audit Suite", id: "vanalyst", isBooking: false },
                { name: "Transparent Pricing Calculator", id: "pricing", isBooking: false },
                { name: "Insights & Strategy Blog", id: "blog", isBooking: false },
                { name: "Book Free Discovery Session", id: "booking", isBooking: true }
              ].map(lnk => (
                <li key={lnk.id}>
                  <button 
                    onClick={() => lnk.isBooking ? onBookCall() : onPageChange(lnk.id)}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer text-left font-medium flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 group-hover:bg-emerald-400 transition-colors" />
                    <span>{lnk.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Coordinates */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-mono text-[10px] tracking-widest text-brand font-bold uppercase">HEADQUARTERS & CONTACT</h5>
            <ul className="space-y-3 text-slate-300 font-medium">
              <li className="flex items-center space-x-2.5">
                <MapPin size={14} className="text-brand shrink-0" />
                <span>Akure, Nigeria</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={14} className="text-brand shrink-0" />
                <a 
                  href="mailto:vprimedigitalz@gmail.com?subject=Inquiry%20from%20Website" 
                  className="hover:text-white transition-colors underline decoration-brand/40 underline-offset-4"
                >
                  vprimedigitalz@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={14} className="text-brand shrink-0" />
                <div className="flex items-center space-x-2 flex-wrap">
                  <a href="tel:+2349065762816" className="hover:text-white transition-colors font-mono font-semibold">
                    +234 906 576 2816
                  </a>
                  <a 
                    href="https://wa.me/2349065762816" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold hover:bg-emerald-500/20 transition-all hover:scale-105"
                    title="Direct WhatsApp Message"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Segment: Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-white/40 text-[11px] gap-4">
          <div>
            &copy; {currentYear} VprimeDigitalz. All rights reserved. 
            <span className="mx-2">|</span>
            Designed with <Heart size={10} className="inline text-rose-500 fill-rose-500 mx-0.5" /> by Vprime Digitalz.
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onBookCall}
              className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-dark text-slate-950 font-display font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 shadow-sm"
              aria-label="Book Call Calendly"
            >
              <span>Schedule Strategy Call</span>
              <ExternalLink size={11} />
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
