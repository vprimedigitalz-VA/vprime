import { useState, useEffect } from "react";
import { X, Loader2, Calendar, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useToast } from "./ToastContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Auto-dismiss loader after a max timeout of 600ms so Calendly renders smoothly immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Calendly event scheduled messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.event === "calendly.event_scheduled") {
        showToast({
          type: "booking",
          title: "Strategy Session Confirmed!",
          message: "Your 30-minute discovery call with Vikram Malhotra is reserved. Calendar invite & Google Meet link sent to your inbox.",
          duration: 6000
        });
        onClose();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [showToast, onClose]);

  const handleSimulateBooking = () => {
    showToast({
      type: "booking",
      title: "Strategy Session Confirmed!",
      message: "Your 30-minute growth discovery call with Vikram Malhotra has been reserved. Calendar invite sent!",
      duration: 6000
    });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop Blur & Fade */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal Content Container */}
      <motion.div
        animate={isOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
        className="relative bg-white w-full max-w-4xl h-[85vh] sm:h-[80vh] rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col z-10"
      >
        {/* Header Area */}
        <div className="px-6 py-4.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 flex items-center justify-center bg-brand rounded-lg shadow-xs shrink-0">
              <span className="font-display font-bold text-white text-base">V</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-none">
                Schedule Free Strategy Session
              </h3>
              <p className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                30-Minute Discovery Call with Vikram
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Close scheduler"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scheduler Body with responsive column details / iframe */}
        <div className="flex-1 relative flex flex-col md:flex-row bg-slate-50 overflow-hidden">
          {/* Sidebar metadata overview - hidden on mobile for cleaner layout */}
          <div className="hidden lg:flex flex-col justify-between w-64 bg-white border-r border-slate-100 p-6 shrink-0 space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-[9px] font-mono tracking-widest text-brand font-bold uppercase block">
                  WHAT TO EXPECT
                </span>
                <h4 className="text-sm font-display font-bold text-slate-900 leading-snug">
                  Your 30-Min Breakthrough
                </h4>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Clock size={14} className="text-brand shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500 leading-normal">
                    <strong>30 Minutes</strong> on Google Meet / Zoom.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Calendar size={14} className="text-brand shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500 leading-normal">
                    No-obligation audit of your current digital metrics.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <ShieldCheck size={14} className="text-brand shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500 leading-normal">
                    A concrete growth sitemap & conversion blueprint.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
              <div className="text-[10px] text-slate-400 leading-relaxed font-mono uppercase">
                CONFIDENTIALITY SECURED. THE TRANSCRIPT WILL BE DELIVERED DIRECTLY TO YOUR REGISTERED INBOX.
              </div>
              <button
                onClick={handleSimulateBooking}
                className="w-full flex items-center justify-center space-x-2 bg-brand/10 hover:bg-brand text-brand hover:text-white border border-brand/30 py-2.5 px-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <CheckCircle2 size={14} />
                <span>Quick Confirm Test</span>
              </button>
            </div>
          </div>

          {/* Calendly iFrame container - Pre-rendered so it appears instantly on click */}
          <div className="flex-1 h-full relative bg-slate-50">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20 space-y-3 pointer-events-none transition-opacity duration-300">
                <Loader2 size={28} className="text-brand animate-spin" />
                <p className="text-xs font-mono tracking-wider text-slate-400 uppercase font-semibold">
                  Connecting Calendly...
                </p>
              </div>
            )}
            <iframe
              src="https://calendly.com/vprimedigitalz/30min?hide_landing_page_details=1&hide_gdpr_banner=1"
              width="100%"
              height="100%"
              frameBorder="0"
              onLoad={() => setIsLoading(false)}
              className="w-full h-full relative z-10"
              title="Calendly Booking Scheduler"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
