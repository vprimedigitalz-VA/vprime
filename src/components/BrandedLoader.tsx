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

export const PageLoaderOverlay: React.FC<{ message?: string; onComplete?: () => void }> = ({
  message = "Initializing VprimeDigitalz Runtime...",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl text-white"
    >
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl flex flex-col items-center space-y-6 max-w-md w-full mx-4 text-center">
        {/* Animated Brand Mark */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand/20 to-emerald-500/10 border border-brand/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,207,156,0.2)]">
            <span className="font-display font-black text-2xl tracking-tighter text-brand">
              VP
            </span>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-[28px] border-2 border-transparent border-t-brand border-b-brand/40"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-display font-bold text-lg text-white">
            Vprime<span className="text-brand">Digitalz</span>
          </h3>
          <p className="text-xs font-mono text-slate-400 animate-pulse">{message}</p>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-brand rounded-full shadow-[0_0_12px_#06CF9C]"
          />
        </div>

        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
          <Loader2 size={12} className="animate-spin text-brand" />
          <span>POWERING DIGITAL EXCELLENCE</span>
        </div>
      </div>
    </motion.div>
  );
};
