import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, PhoneCall, Sparkles, Calendar, Calculator } from 'lucide-react';
import { brandConfig } from '../../data/weddingData';

export default function Navbar({ onOpenBooking, wishlistCount, onOpenWishlist }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Layanan' },
    { id: 'packages', label: 'Paket' },
    { id: 'estimator', label: 'Kalkulator' },
    { id: 'calendar', label: 'Kalender' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'process', label: 'Alur' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section detection
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-luxury-dark/90 backdrop-blur-md py-3 border-b border-luxury-gold/20 shadow-luxury text-white'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full border border-luxury-gold/60 flex items-center justify-center bg-luxury-dark/40 group-hover:scale-105 transition-transform duration-300 shadow-gold-glow">
              <span className="font-heading font-bold text-lg text-luxury-gold">A</span>
            </div>
            <div>
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider gold-text-shimmer block leading-tight">
                AURA
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-light text-luxury-cream/80 block">
                Wedding Organizer
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-xs xl:text-sm font-medium tracking-wide transition-colors relative py-1 focus:outline-none ${
                    isActive ? 'text-luxury-gold font-semibold' : 'text-luxury-cream/80 hover:text-luxury-gold'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Wishlist Icon Button */}
            <button
              onClick={onOpenWishlist}
              title="Lihat Wishlist Konsep"
              className="relative p-2.5 rounded-full border border-luxury-gold/30 hover:border-luxury-gold bg-luxury-dark/40 hover:bg-luxury-gold/20 text-luxury-gold transition-all duration-300"
            >
              <Heart className="w-4 h-4 fill-luxury-gold/20" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-luxury-rosegold text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Konsultasi Gratis CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-full bg-gold-gradient text-luxury-dark font-medium text-xs tracking-wider uppercase shadow-gold-glow hover:shadow-luxury-hover hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-luxury-dark fill-luxury-dark" />
              <span>Konsultasi Gratis</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full border border-luxury-gold/30 text-luxury-gold"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-luxury-rosegold text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-luxury-dark/95 backdrop-blur-xl border-b border-luxury-gold/20 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left py-2.5 text-sm font-medium border-b border-white/5 transition-colors flex items-center justify-between ${
                    activeSection === link.id ? 'text-luxury-gold font-bold pl-2' : 'text-luxury-cream/80'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <Sparkles className="w-4 h-4 text-luxury-gold" />}
                </button>
              ))}

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 rounded-full bg-gold-gradient text-luxury-dark font-semibold text-xs tracking-wider uppercase text-center shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Konsultasi Gratis Sekarang</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
