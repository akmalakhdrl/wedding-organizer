import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Check, Bookmark, Share2, Trash2, ArrowRight } from 'lucide-react';
import { conceptWishlists } from '../../data/weddingData';

export default function ConceptWishlistSection({ savedWishlist, onToggleWishlist, onOpenBooking }) {
  const [selectedTheme, setSelectedTheme] = useState(conceptWishlists[0]);

  const isSaved = savedWishlist.some(item => item.id === selectedTheme.id);

  return (
    <section id="wishlist" className="py-24 bg-luxury-dark text-luxury-cream relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-rosegold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Heart className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold/30" /> Moodboard Builder
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            Wishlist Konsep Pernikahan <br />
            <span className="gold-text-shimmer italic font-normal">Pilih Tema & Moodboard Impian</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
            Eksplorasi gaya estetika visual pernikahan yang paling mencerminkan kepribadian Anda. Simpan tema favorit ke Wishlist Anda.
          </p>
        </div>

        {/* Wishlist Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Theme Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold block mb-2">
              Pilih Tema Pernikahan:
            </span>

            {conceptWishlists.map((theme) => {
              const active = selectedTheme.id === theme.id;
              const saved = savedWishlist.some(item => item.id === theme.id);

              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group ${
                    active
                      ? 'bg-luxury-dark-soft border-luxury-gold shadow-gold-glow text-white'
                      : 'bg-luxury-dark-soft/40 border-white/10 hover:border-luxury-gold/40 text-luxury-cream/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Palette Dots */}
                    <div className="flex items-center -space-x-1.5 shrink-0">
                      {theme.colors.map((c, idx) => (
                        <span key={idx} className="w-4 h-4 rounded-full border border-black/40 shadow-sm" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div>
                      <h4 className={`font-heading text-sm font-semibold ${active ? 'text-luxury-gold' : 'text-white'}`}>
                        {theme.title}
                      </h4>
                    </div>
                  </div>

                  {saved && (
                    <Heart className="w-4 h-4 text-luxury-rosegold fill-luxury-rosegold shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Active Preview Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden bg-luxury-dark-soft border border-luxury-gold/30 shadow-2xl glass-panel-dark text-white space-y-6">
            {/* Main Visual Image */}
            <div className="relative h-72 sm:h-96 overflow-hidden">
              <img
                src={selectedTheme.image}
                alt={selectedTheme.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark-soft via-transparent to-transparent" />
              
              {/* Color Palette Pill */}
              <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-luxury-dark/80 backdrop-blur-md border border-white/20 flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-luxury-gold">Palette:</span>
                <div className="flex items-center gap-1.5">
                  {selectedTheme.colors.map((c, idx) => (
                    <span key={idx} className="w-5 h-5 rounded-full border border-white/40 shadow-md" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Description & Action */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold gold-text-shimmer mb-2">
                  {selectedTheme.title}
                </h3>
                <p className="text-xs sm:text-sm text-luxury-cream/80 font-light leading-relaxed">
                  {selectedTheme.description}
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => onToggleWishlist(selectedTheme)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isSaved
                      ? 'bg-luxury-rosegold text-white shadow-lg'
                      : 'border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  <span>{isSaved ? 'Tersimpan Di Wishlist' : 'Simpan Ke Wishlist Saya'}</span>
                </button>

                <button
                  onClick={() => onOpenBooking({ notes: `Saya berminat dengan konsep tema: ${selectedTheme.title}` })}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gold-gradient text-luxury-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Konsultasikan Konsep Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
