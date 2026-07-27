import React from "react";
import { motion } from "motion/react";
import { Sparkles, Loader2 } from "lucide-react";

interface BrandedSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  showLogo?: boolean;
  className?: string;
}

export const BrandedSpinner: React.FC<BrandedSpinnerProps> = ({
  size = "md",
  label,
  showLogo = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const ringSizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-28 h-28",
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Aura Ring */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute rounded-full bg-brand/30 blur-md ${ringSizes[size]}`}
        />

        {/* Counter-rotating Outer Border */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className={`absolute rounded-full border-2 border-dashed border-brand/40 ${ringSizes[size]}`}
        />

        {/* Primary Glowing Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className={`rounded-full border-2 border-transparent border-t-brand border-r-brand ${sizeClasses[size]}`}
        />

        {/* Center Logo Mark or Icon */}
        {showLogo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-extrabold text-brand text-xs tracking-tighter">
              VP
            </span>
          </div>
        )}
      </div>

      {/* Label or micro-status text */}
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-xs font-mono text-slate-400 dark:text-slate-400"
        >
          <Sparkles size={12} className="text-brand animate-spin" />
          <span>{label}</span>
        </motion.div>
      )}
    </div>
  );
};

/* ================= SKELETON SCREEN COMPONENTS ================= */

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900/60 dark:bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 animate-pulse relative overflow-hidden"
        >
          {/* Shimmer overlay effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Top Banner Skeleton */}
          <div className="h-44 bg-slate-800/80 rounded-2xl w-full" />

          {/* Badge Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="h-5 w-20 bg-slate-800 rounded-full" />
            <div className="h-5 w-16 bg-slate-800 rounded-full" />
          </div>

          {/* Title Skeleton */}
          <div className="h-6 bg-slate-800/90 rounded-lg w-3/4" />

          {/* Body Lines Skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-3.5 bg-slate-800/60 rounded w-full" />
            <div className="h-3.5 bg-slate-800/60 rounded w-5/6" />
            <div className="h-3.5 bg-slate-800/60 rounded w-2/3" />
          </div>

          {/* Footer Actions Skeleton */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800/60">
            <div className="h-4 w-24 bg-slate-800 rounded" />
            <div className="h-8 w-28 bg-brand/20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 space-y-8 animate-pulse relative overflow-hidden">
      {/* Shimmer line */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="flex justify-center">
        <div className="h-8 w-48 bg-brand/10 border border-brand/20 rounded-full" />
      </div>

      <div className="space-y-4 text-center">
        <div className="h-12 bg-slate-800/90 rounded-2xl w-3/4 mx-auto" />
        <div className="h-12 bg-slate-800/70 rounded-2xl w-1/2 mx-auto" />
      </div>

      <div className="space-y-3 max-w-2xl mx-auto">
        <div className="h-4 bg-slate-800/50 rounded w-full" />
        <div className="h-4 bg-slate-800/50 rounded w-5/6 mx-auto" />
      </div>

      <div className="flex justify-center items-center space-x-4 pt-4">
        <div className="h-12 w-40 bg-brand/30 rounded-full" />
        <div className="h-12 w-36 bg-slate-800 rounded-full" />
      </div>
    </div>
  );
};

export const MetricsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/40 border border-slate-800 rounded-3xl animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 space-y-2 border-r border-slate-800/50 last:border-0">
          <div className="h-8 w-20 bg-brand/20 rounded-lg" />
          <div className="h-3 w-28 bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  );
};

/* ================= FULL PAGE INITIALIZING OVERLAY ================= */

export const PageLoaderOverlay: React.FC<{ message?: string; durationMs?: number }> = ({
  durationMs = 3500,
}) => {
  const [progress, setProgress] = React.useState(0);
  const [stepIndex, setStepIndex] = React.useState(0);

  const steps = [
    "Initializing VprimeDigitalz Core Engine...",
    "Configuring Vanalyst SEO & Asset Pipeline...",
    "Loading Component System & Interactive UI...",
    "Finalizing High-Speed Responsive Layouts...",
    "System Ready. Launching Experience..."
  ];

  React.useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgress(pct);

      if (pct < 25) setStepIndex(0);
      else if (pct < 50) setStepIndex(1);
      else if (pct < 75) setStepIndex(2);
      else if (pct < 95) setStepIndex(3);
      else setStepIndex(4);

      if (elapsed >= durationMs) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [durationMs]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/20 via-slate-950 to-slate-950 text-white select-none px-4"
    >
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-brand/30 shadow-[0_0_50px_rgba(6,207,156,0.15)] flex flex-col items-center space-y-7 max-w-lg w-full text-center relative overflow-hidden backdrop-blur-2xl">
        {/* Top Glowing Ambient Light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand/30 blur-3xl rounded-full pointer-events-none" />

        {/* Animated Brand Mark */}
        <div className="relative">
          {/* Outer Pulsing Aura */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-4 rounded-3xl bg-brand/20 blur-xl pointer-events-none"
          />

          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-950 border border-brand/40 flex items-center justify-center shadow-[0_0_35px_rgba(6,207,156,0.25)] relative z-10">
            <span className="font-display font-black text-3xl sm:text-4xl tracking-tighter text-brand">
              VP
            </span>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2.5 rounded-[32px] border-2 border-transparent border-t-brand border-r-brand/50"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-5 rounded-[38px] border border-dashed border-brand/30"
          />
        </div>

        {/* Brand Name & Dynamic Loading Step */}
        <div className="space-y-2 relative z-10">
          <h3 className="font-display font-black text-2xl tracking-tight text-white">
            Vprime<span className="text-brand">Digitalz</span>
          </h3>
          <p className="text-xs font-mono text-brand font-semibold min-h-[20px] transition-all">
            {steps[stepIndex]}
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2 relative z-10">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
            <span>PRELOADING ASSETS</span>
            <span className="text-brand font-extrabold">{progress}%</span>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 relative">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-brand rounded-full shadow-[0_0_16px_#06CF9C] relative"
            >
              {/* Shimmer light over progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
            </motion.div>
          </div>
        </div>

        {/* Footer Technical Badges */}
        <div className="flex items-center justify-center space-x-3 text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80 w-full">
          <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">REACT 18</span>
          <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50 text-brand">VANALYST SEO</span>
          <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">CORE WEB VITALS 100%</span>
        </div>
      </div>
    </motion.div>
  );
};
