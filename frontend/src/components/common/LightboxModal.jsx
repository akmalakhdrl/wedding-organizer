import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';

export default function LightboxModal({ image, isOpen, onClose, onPrev, onNext, total, currentIndex }) {
  if (!isOpen || !image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20 text-white">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-luxury-gold">
            <Sparkles className="w-4 h-4" />
            <span>Portofolio {currentIndex + 1} dari {total}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Prev Button */}
        {onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-luxury-gold hover:text-luxury-dark text-white transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image & Caption Container */}
        <motion.div
          key={image.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center relative z-10"
        >
          <img
            src={image.image}
            alt={image.title}
            className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
          />
          <div className="mt-4 text-center text-white space-y-1 max-w-2xl px-4">
            <h3 className="font-heading text-xl sm:text-2xl font-bold gold-text-shimmer">
              {image.title}
            </h3>
            <p className="text-xs sm:text-sm text-luxury-cream/80 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-luxury-gold inline" />
              <span>{image.location}</span>
            </p>
            <p className="text-xs text-luxury-cream/60 italic font-light pt-1">
              "{image.caption}"
            </p>
          </div>
        </motion.div>

        {/* Next Button */}
        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-luxury-gold hover:text-luxury-dark text-white transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
