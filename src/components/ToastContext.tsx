import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Sparkles, Calendar, X, Info, AlertCircle, ShieldCheck } from "lucide-react";

export type ToastType = "success" | "audit" | "booking" | "info" | "error";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 4500;
    
    setToasts((prev) => [...prev.slice(-3), { ...toast, id, duration }]); // Keep max 4 toasts

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Floating Toast Container */}
      <div
        id="toast-notifications-container"
        className="fixed bottom-6 right-6 z-[9999] flex flex-col space-y-3 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastCard: React.FC<{ toast: ToastItem; onClose: () => void }> = ({ toast, onClose }) => {
  const getToastIcon = () => {
    switch (toast.type) {
      case "booking":
        return <Calendar size={18} className="text-emerald-400" />;
      case "audit":
        return <Sparkles size={18} className="text-brand" />;
      case "success":
        return <CheckCircle2 size={18} className="text-emerald-400" />;
      case "error":
        return <AlertCircle size={18} className="text-rose-400" />;
      default:
        return <Info size={18} className="text-sky-400" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case "booking":
        return "border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.2)]";
      case "audit":
        return "border-brand/50 shadow-[0_10px_30px_rgba(6,207,156,0.2)]";
      case "error":
        return "border-rose-500/40 shadow-[0_10px_30px_rgba(244,63,94,0.2)]";
      default:
        return "border-slate-700 shadow-xl";
    }
  };

  const getBadgeText = () => {
    switch (toast.type) {
      case "booking":
        return "CONFIRMED";
      case "audit":
        return "AUDIT COMPLETE";
      case "error":
        return "NOTICE";
      default:
        return "SUCCESS";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`pointer-events-auto bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl border ${getBorderColor()} p-4 sm:p-4.5 flex items-start space-x-3.5 relative overflow-hidden group`}
    >
      {/* Icon Container */}
      <div className="p-2 bg-slate-800/80 border border-slate-700/80 rounded-xl shrink-0 mt-0.5">
        {getToastIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-6 space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-[9px] font-mono font-bold tracking-widest text-brand uppercase bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-md">
            {getBadgeText()}
          </span>
        </div>
        <h4 className="font-display font-bold text-xs sm:text-sm text-white tracking-tight leading-snug">
          {toast.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-normal">
          {toast.message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>

      {/* Animated Bottom Timer Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: (toast.duration ?? 4500) / 1000, ease: "linear" }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand via-emerald-400 to-brand"
      />
    </motion.div>
  );
};
