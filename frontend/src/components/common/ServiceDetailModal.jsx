import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, PhoneCall } from 'lucide-react';

export default function ServiceDetailModal({ service, isOpen, onClose, onBookService }) {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl rounded-3xl bg-luxury-dark border border-luxury-gold/30 shadow-2xl overflow-hidden glass-panel-dark text-luxury-cream my-8"
        >
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/50 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-luxury-dark/70 hover:bg-luxury-gold hover:text-luxury-dark text-white transition-all z-20 border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs border border-luxury-gold/40 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Layanan Eksklusif
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white gold-text-shimmer">
                {service.title}
              </h2>
              <p className="text-xs sm:text-sm text-luxury-cream/80 font-light mt-1">
                {service.tagline}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-heading text-lg font-semibold text-luxury-gold mb-2">Deskripsi Layanan</h3>
              <p className="text-xs sm:text-sm text-luxury-cream/80 leading-relaxed font-light">
                {service.fullDesc}
              </p>
            </div>

            {/* Inclusions List */}
            <div>
              <h3 className="font-heading text-lg font-semibold text-luxury-gold mb-3">Fasilitas & Inklusi Layanan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.inclusions?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-luxury-dark-soft/60 p-3 rounded-xl border border-luxury-gold/15">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-luxury-cream/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-luxury-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-luxury-cream/60 block">Ingin berkonsultasi mengenai layanan ini?</span>
                <span className="font-heading text-sm text-luxury-gold font-semibold">Tim Planner Kami Siap Membantu</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBookService(service);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold-gradient text-luxury-dark font-semibold text-xs tracking-wider uppercase shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Konsultasikan Layanan Ini</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
