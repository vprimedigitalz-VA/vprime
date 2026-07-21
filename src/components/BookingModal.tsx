import { useState } from "react";
import { X, Loader2, Calendar, ShieldCheck, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Blur & Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
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

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-[10px] text-slate-400 leading-relaxed font-mono">
                  CONFIDENTIALITY SECURED. THE TRANSCRIPT WILL BE DELIVERED DIRECTLY TO YOUR REGISTERED INBOX.
                </div>
              </div>

              {/* Calendly iFrame container */}
              <div className="flex-1 h-full relative bg-slate-50">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20 space-y-3">
                    <Loader2 size={32} className="text-brand animate-spin" />
                    <p className="text-xs font-mono tracking-wider text-slate-400 uppercase font-semibold">
                      Powering Up Calendar...
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
      )}
    </AnimatePresence>
  );
}
