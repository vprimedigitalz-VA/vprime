import { useState } from "react";
import { CheckCircle, Clock, Calendar, ArrowRight, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { timelineSteps } from "../data";

export default function ProcessSection() {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  const activeStep = timelineSteps[selectedStepIndex];

  return (
    <section id="process-section" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-radial-at-b from-slate-50 via-white to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand/5 border border-brand/10 text-brand font-mono text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            <span>THE VPRIME BLUEPRINT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none">
            A surgical, 9-step delivery pipeline.
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            We don't guess. We follow a highly structured engineering checklist to ensure your brand stands as an unshakeable digital authority.
          </p>
        </div>

        {/* Process Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-start">
          
          {/* Step Selector Timeline Rail (Left side / vertical) */}
          <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-none">
            {timelineSteps.map((step, idx) => (
              <button
                key={step.step}
                id={`process-step-btn-${step.step}`}
                onClick={() => setSelectedStepIndex(idx)}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedStepIndex === idx
                    ? "bg-brand border-brand text-white shadow-lg shadow-brand/15 translate-x-1"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`font-display font-extrabold text-lg ${
                    selectedStepIndex === idx ? "text-white/60" : "text-brand/20"
                  }`}>
                    {step.step}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-display font-bold text-xs tracking-tight uppercase">
                      {step.title}
                    </h4>
                    <span className={`text-[10px] font-mono block ${
                      selectedStepIndex === idx ? "text-white/80" : "text-slate-400"
                    }`}>
                      {step.duration}
                    </span>
                  </div>
                </div>
                
                <CheckCircle size={16} className={selectedStepIndex === idx ? "text-white" : "text-slate-300"} />
              </button>
            ))}
          </div>

          {/* Active Step Details Panel (Right side) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-10 min-h-[460px] flex flex-col justify-between shadow-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Stage Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-6">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-semibold tracking-widest text-brand uppercase block">
                      STAGE {activeStep.step} OUT OF 09
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-950">
                      {activeStep.title}
                    </h3>
                  </div>
                  <div className="bg-brand/5 border border-brand/10 text-brand px-3 py-1.5 rounded-lg flex items-center space-x-1 text-xs font-mono font-semibold uppercase leading-none">
                    <Clock size={12} />
                    <span>{activeStep.duration}</span>
                  </div>
                </div>

                {/* Short desc */}
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Checklist Bullet Grid */}
                <div className="space-y-3.5">
                  <h4 className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">STAGE ACTIONS & DELIVERABLES</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeStep.details.map((item, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-slate-100/50">
                        <CheckCircle size={15} className="text-brand shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-700 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Next Step trigger */}
            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-slate-400">
                WANT TO DEVIATE? WE CAN ADAPT CHECKS TO MATCH SPRINT REQUIREMENTS.
              </span>
              
              <button
                onClick={() => setSelectedStepIndex((selectedStepIndex + 1) % timelineSteps.length)}
                className="group inline-flex items-center space-x-2 text-xs font-bold text-brand uppercase tracking-wider cursor-pointer"
              >
                <span>NEXT STAGE</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

        {/* Global Pipeline CTA */}
        <div className="bg-brand text-white rounded-3xl p-8 md:p-12 text-center space-y-6 max-w-5xl mx-auto relative overflow-hidden shadow-xl mt-12">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
            Curious how this applies to your unique project?
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-xs leading-relaxed">
            Let's sketch a personalized development flow. Book a strategy meeting and receive a custom sitemap and timeline draft for your app within 24 hours.
          </p>
          <div className="flex justify-center">
            <a
              href="https://calendly.com/vprimedigitalz/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-brand hover:bg-slate-50 font-sans text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-xl shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Map My Timeline</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
