import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX, Music } from 'lucide-react';
import { heroSlides } from '../../data/weddingData';

export default function HeroSection({ isPreloading, onOpenBooking, scrollToSection }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Slide auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Audio Play / Pause Helper
  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    
    // Play immediately. If blocked by browser policy, it will throw NotAllowedError.
    audio.play().catch((err) => {
      console.warn("Autoplay prevented by browser policy:", err);
    });
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  }, []);

  // Play when Home is visible (and preloader finished), Pause when scrolled away
  useEffect(() => {
    // Wait until preloader finishes before trying to play
    if (isPreloading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playAudio();
        } else {
          pauseAudio();
        }
      },
      { threshold: 0.15 }
    );

    const homeEl = document.getElementById('home');
    if (homeEl) observer.observe(homeEl);

    return () => {
      if (homeEl) observer.unobserve(homeEl);
    };
  }, [isPreloading, playAudio, pauseAudio]);

  // Toggle Mute/Unmute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
    
    // If it was paused (e.g., blocked by autoplay policy), try to play it when user interacts
    if (audio.paused) {
      audio.play().catch(e => console.error(e));
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-luxury-dark text-white select-none">
      
      {/* ── Background Audio ───────────────────────────── */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3"
      />

      {/* ── Single Music Control Button (Mute/Unmute) ── */}
      <button
        onClick={toggleMute}
        className="absolute top-28 right-6 z-30 flex items-center gap-2 bg-luxury-dark/80 backdrop-blur-md px-4 py-2 rounded-full border border-luxury-gold/30 shadow-gold-glow hover:border-luxury-gold hover:scale-105 transition-all duration-300 focus:outline-none"
        title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
      >
        {!isMuted ? (
          <Volume2 className="w-4 h-4 text-luxury-gold animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-luxury-gold/60" />
        )}
        <span className="font-medium hidden sm:inline text-[11px] uppercase tracking-wider text-luxury-cream">
          {!isMuted ? 'Suara Aktif' : 'Suara Mati'}
        </span>
      </button>

      {/* ── Background Slideshow ───────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/90 via-luxury-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Glows */}
      <div className="hidden md:block absolute top-1/4 left-10 w-72 h-72 bg-luxury-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-luxury-rosegold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Hero Content ───────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 flex flex-col justify-center min-h-screen">
        <div className="max-w-3xl space-y-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/40 bg-luxury-dark/60 backdrop-blur-md shadow-gold-glow"
          >
            <Sparkles className="w-4 h-4 text-luxury-gold animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
              The Gold Standard of Luxury Weddings
            </span>
          </motion.div>

          <motion.h1
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.15] tracking-tight"
          >
            {slide.title.split(' ').map((word, idx) => (
              <span key={idx} className={idx % 2 === 1 ? 'gold-text-shimmer italic font-normal' : 'text-white'}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p
            key={`sub-${slide.id}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-lg text-luxury-cream/90 font-light leading-relaxed max-w-2xl"
          >
            {slide.subtitle}
          </motion.p>

        </div>
      </div>

      {/* ── Slide Navigation ───────────────────────────────── */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button
          onClick={() => setCurrentSlide((p) => (p === 0 ? heroSlides.length - 1 : p - 1))}
          className="p-2.5 rounded-full border border-white/20 bg-black/40 hover:bg-luxury-gold hover:text-luxury-dark text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-luxury-gold' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((p) => (p + 1) % heroSlides.length)}
          className="p-2.5 rounded-full border border-white/20 bg-black/40 hover:bg-luxury-gold hover:text-luxury-dark text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
}
