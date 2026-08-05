import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            if (onFinish) onFinish();
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1817] text-white px-4 select-none overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10"
          >
            {/* Luxury Monogram Crest */}
            <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center rounded-full border border-luxury-gold/40 bg-luxury-dark-soft/50 shadow-gold-glow p-2 overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 rounded-full border border-dashed border-luxury-gold/30 pointer-events-none"
              />
              <img
                src="/logo.png"
                alt="Kresna Management Logo"
                className="w-full h-full object-cover rounded-full relative z-10"
              />
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-luxury-gold animate-pulse z-20" />
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-wider text-luxury-cream mb-2">
              KRESNA <span className="text-luxury-gold font-light">MANAGEMENT</span>
            </h1>
            <p className="text-xs sm:text-sm text-luxury-cream/70 font-light tracking-[0.25em] uppercase mb-8">
              Wedding Organizer & Event Specialist
            </p>

            {/* Progress Bar Container */}
            <div className="w-64 sm:w-80 h-1.5 bg-luxury-dark-muted/80 rounded-full mx-auto overflow-hidden p-0.5 border border-luxury-gold/20 relative">
              <motion.div
                className="h-full bg-gold-gradient rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Percentage Indicator */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-luxury-gold/80 font-mono">
              <Heart className="w-3.5 h-3.5 fill-luxury-gold animate-ping" />
              <span>{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
