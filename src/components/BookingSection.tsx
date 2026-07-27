import { useState, useEffect } from "react";
import { Loader2, Calendar, Clock, Star, Users, CheckCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useToast } from "./ToastContext";

export default function BookingSection() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Auto-dismiss loading spinner after 500ms so Calendly renders immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Calendly event scheduled messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.event === "calendly.event_scheduled") {
        showToast({
          type: "booking",
          title: "Strategy Session Confirmed!",
          message: "Your 30-minute discovery call with Vikram Malhotra is reserved. Check your inbox for Google Meet details.",
          duration: 6000
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [showToast]);

  const handleSimulateBooking = () => {
    showToast({
      type: "booking",
      title: "Strategy Session Confirmed!",
      message: "Your 30-minute growth discovery call with Vikram Malhotra has been reserved. Calendar invite sent!",
      duration: 6000
    });
  };

  return (
    <section id="embedded-booking-page" className="py-24 bg-white relative">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06cf9c0c_1px,transparent_1px),linear-gradient(to_bottom,#06cf9c0c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and helpful context */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                <span>DIRECT ACCESS</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                Secure your digital growth blueprint.
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                No complex forms, no back-and-forth emails. Select a 30-minute slot on our live operations calendar to map out your digital scale strategy directly with Vikram.
              </p>
            </div>

            {/* Core Values / Bullet points */}
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <h4 className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">WHAT WE WILL COVER</h4>
              <ul className="space-y-3.5">
                {[
                  "Current website UI/UX layout and conversion roadblocks.",
                  "SEO indexing capabilities & immediate organic reach targets.",
                  "Paid marketing funnel scaling & customer acquisition pathways.",
                  "Precise engineering scope, timeframe targets, and pricing options."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs text-slate-600">
                    <CheckCircle size={14} className="text-brand shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro Clutch / Trustpilot reviews widget */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs italic text-slate-600 leading-normal">
                "Vikram's team didn't just design a website; they structured our entire digital funnel. We scaled from $0 to $1.2M in annual organic pipeline within 9 months."
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/50">
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center font-display text-[10px] font-bold text-slate-700">
                    ML
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-800">Marcus L.</div>
                    <div className="text-[9px] font-mono text-slate-400">FOUNDER, NESTIFY INC</div>
                  </div>
                </div>

                <button
                  onClick={handleSimulateBooking}
                  className="inline-flex items-center space-x-1.5 bg-brand/10 hover:bg-brand text-brand hover:text-white px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all cursor-pointer"
                  title="Simulate booking confirmation toast"
                >
                  <CheckCircle2 size={12} />
                  <span>Test Toast</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Scheduler card container */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-slate-100 rounded-2xl shadow-xl p-3 sm:p-5 h-[650px] relative overflow-hidden flex flex-col"
            >
              <div className="px-3 pb-3 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    VIKRAM'S LIVE AVAILABILITY STATUS: ACTIVE
                  </span>
                </div>
                <div className="flex items-center space-x-3.5 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center space-x-1">
                    <Clock size={11} className="text-brand" />
                    <span>30 MIN</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users size={11} className="text-brand" />
                    <span>GOOGLE MEET</span>
                  </span>
                </div>
              </div>

              {/* Inline Calendly Frame with stateful loader wrapper */}
              <div className="flex-1 relative bg-slate-50 rounded-xl overflow-hidden mt-4">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-20 space-y-3">
                    <Loader2 size={32} className="text-brand animate-spin" />
                    <p className="text-xs font-mono tracking-wider text-slate-400 uppercase font-semibold">
                      Syncing Calendar Slots...
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
                  title="Calendly Booking Page Inline"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
