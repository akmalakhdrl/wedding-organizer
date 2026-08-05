import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX, Music } from 'lucide-react';
import { heroSlides } from '../../data/weddingData';

export default function HeroSection({ onOpenBooking, scrollToSection }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [isMuted,   setIsMuted]       = useState(false);
  const [userOff,   setUserOff]       = useState(false); // true = user explicitly turned off

  const audioRef        = useRef(null);
  const isHomeVisible   = useRef(true);   // track visibility without re-render
  const audioUnlocked   = useRef(false);  // browser autoplay unlocked?
  const userOffRef      = useRef(false);  // mirror of userOff for use in callbacks

  // Keep ref in sync with state
  useEffect(() => { userOffRef.current = userOff; }, [userOff]);

  // ── Slide auto-advance ────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // ── Helper: safely play ───────────────────────────────────────────────────
  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userOffRef.current) return;
    audio.play()
      .then(() => { setIsPlaying(true); audioUnlocked.current = true; })
      .catch(() => {});
  }, []);

  // ── Helper: safely pause ──────────────────────────────────────────────────
  const doPause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  // ── IntersectionObserver: pause when leaving Home, resume when back ────────
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      isHomeVisible.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        // Resume only if audio was already unlocked and user didn't turn it off
        if (audioUnlocked.current && !userOffRef.current) tryPlay();
      } else {
        doPause();
      }
    }, { threshold: 0.2 });

    const el = document.getElementById('home');
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [tryPlay, doPause]);

  // ── Auto-start on first user interaction (unlock browser autoplay) ─────────
  useEffect(() => {
    const unlock = (e) => {
      // Already unlocked or user turned off → skip
      if (audioUnlocked.current || userOffRef.current) {
        cleanup();
        return;
      }
      // Only auto-start if Home section is visible
      if (!isHomeVisible.current) { cleanup(); return; }

      tryPlay();
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click',      unlock);
      window.removeEventListener('keydown',    unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('scroll',     unlock);
    };

    window.addEventListener('click',      unlock, { once: true });
    window.addEventListener('keydown',    unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('scroll',     unlock, { once: true, passive: true });

    return cleanup;
  }, [tryPlay]);

  // ── User toggle: music button ─────────────────────────────────────────────
  const handleToggleMusic = useCallback(() => {
    const turningOff = !userOff; // we're toggling, so if currently on → turn off
    setUserOff((prev) => !prev);

    if (turningOff) {
      // Turning off → pause permanently until user enables again
      doPause();
      audioUnlocked.current = false; // need re-unlock if turned back on
    } else {
      // Turning on → try to play (this IS a direct user click, so autoplay allowed)
      userOffRef.current = false; // update ref before tryPlay
      if (isHomeVisible.current) tryPlay();
    }
  }, [userOff, tryPlay, doPause]);

  // ── Mute toggle ───────────────────────────────────────────────────────────
  const handleToggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted((prev) => !prev);
  }, [isMuted]);

  const slide = heroSlides[currentSlide];

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-luxury-dark text-white select-none">

      {/* ── Audio ──────────────────────────────────────────── */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3"
      />

      {/* ── Music Control Widget ────────────────────────────── */}
      <div className="absolute top-28 right-6 z-30 flex items-center gap-2 bg-luxury-dark/70 backdrop-blur-md px-3.5 py-2 rounded-full border border-luxury-gold/30 shadow-gold-glow">
        <button
          onClick={handleToggleMusic}
          className="flex items-center gap-2 text-xs text-luxury-cream hover:text-luxury-gold transition-colors focus:outline-none"
          title={userOff ? 'Nyalakan Musik' : 'Matikan Musik'}
        >
          <Music
            className={`w-4 h-4 text-luxury-gold transition-all ${isPlaying ? 'animate-spin' : 'opacity-50'}`}
            style={{ animationDuration: '4s' }}
          />
          <span className="font-medium hidden sm:inline text-[11px] uppercase tracking-wider">
            {isPlaying ? 'Musik Aktif' : userOff ? 'Musik Mati' : 'Memuat...'}
          </span>
        </button>

        {/* Volume — only when music is on */}
        {!userOff && (
          <button
            onClick={handleToggleMute}
            className="p-1 text-luxury-gold hover:text-white transition-colors focus:outline-none border-l border-luxury-gold/20 pl-2"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

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
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-luxury-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-luxury-rosegold/10 rounded-full blur-[120px] pointer-events-none" />

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
