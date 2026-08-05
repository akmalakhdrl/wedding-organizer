import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';
import { heroSlides } from '../../data/weddingData';

export default function HeroSection({ onOpenBooking, scrollToSection }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-luxury-dark text-white select-none">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layered dark overlay for high readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/90 via-luxury-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Gold Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-luxury-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-luxury-rosegold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 flex flex-col justify-center min-h-screen">
        <div className="max-w-3xl space-y-6">
          
          {/* Top Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/40 bg-luxury-dark/60 backdrop-blur-md shadow-gold-glow"
          >
            <Sparkles className="w-4 h-4 text-luxury-gold animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              The Gold Standard of Luxury Weddings
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.15] tracking-tight"
          >
            {slide.title.split(" ").map((word, idx) => (
              <span key={idx} className={idx % 2 === 1 ? "gold-text-shimmer italic font-normal" : "text-white"}>
                {word}{" "}
              </span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            key={`sub-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-lg text-luxury-cream/90 font-light leading-relaxed max-w-2xl"
          >
            {slide.subtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-4 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 rounded-full bg-gold-gradient text-luxury-dark font-bold text-xs sm:text-sm tracking-wider uppercase shadow-gold-glow hover:shadow-luxury-hover hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <span>{slide.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('packages')}
              className="px-8 py-4 rounded-full border border-luxury-gold/50 bg-luxury-dark/40 hover:bg-luxury-gold/20 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md hover:border-luxury-gold transition-all duration-300"
            >
              {slide.ctaSecondary}
            </button>
          </motion.div>

        </div>
      </div>

      {/* Slide Navigation Dots & Arrows */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="p-2.5 rounded-full border border-white/20 bg-black/40 hover:bg-luxury-gold hover:text-luxury-dark text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-luxury-gold' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="p-2.5 rounded-full border border-white/20 bg-black/40 hover:bg-luxury-gold hover:text-luxury-dark text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
