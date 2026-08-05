import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Trash2, ArrowRight, Sparkles } from 'lucide-react';

import Preloader from './components/common/Preloader';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import BackToTop from './components/common/BackToTop';
import LightboxModal from './components/common/LightboxModal';
import ServiceDetailModal from './components/common/ServiceDetailModal';
import BookingModal from './components/common/BookingModal';

import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import PackagesSection from './components/sections/PackagesSection';
import BudgetEstimatorSection from './components/sections/BudgetEstimatorSection';
import AvailabilityCalendarSection from './components/sections/AvailabilityCalendarSection';
import ConceptWishlistSection from './components/sections/ConceptWishlistSection';
import GallerySection from './components/sections/GallerySection';
import VideoHighlightSection from './components/sections/VideoHighlightSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import WeddingProcessSection from './components/sections/WeddingProcessSection';

import ContactSection from './components/sections/ContactSection';

export default function App() {
  const [isPreloading, setIsPreloading] = useState(true);
  
  // Booking Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);

  // Service Detail Modal State
  const [serviceModalItem, setServiceModalItem] = useState(null);

  // Lightbox Modal State
  const [lightboxData, setLightboxData] = useState({
    isOpen: false,
    item: null,
    index: 0,
    list: []
  });

  // Wishlist State (persisted in localStorage)
  const [savedWishlist, setSavedWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_wedding_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wedding_wishlist', JSON.stringify(savedWishlist));
    } catch (e) {
      console.error(e);
    }
  }, [savedWishlist]);

  const handleToggleWishlist = (theme) => {
    setSavedWishlist((prev) => {
      const exists = prev.some((item) => item.id === theme.id);
      if (exists) {
        return prev.filter((item) => item.id !== theme.id);
      } else {
        return [...prev, theme];
      }
    });
  };

  const handleOpenBooking = (item = null) => {
    setSelectedBookingItem(item);
    setBookingOpen(true);
  };

  const handleOpenLightbox = (item, index, list) => {
    setLightboxData({
      isOpen: true,
      item,
      index,
      list
    });
  };

  const handlePrevLightbox = () => {
    setLightboxData((prev) => {
      const newIndex = (prev.index - 1 + prev.list.length) % prev.list.length;
      return {
        ...prev,
        index: newIndex,
        item: prev.list[newIndex]
      };
    });
  };

  const handleNextLightbox = () => {
    setLightboxData((prev) => {
      const newIndex = (prev.index + 1) % prev.list.length;
      return {
        ...prev,
        index: newIndex,
        item: prev.list[newIndex]
      };
    });
  };

  const scrollToSection = (id) => {
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
    <div className="min-h-screen bg-luxury-cream text-luxury-dark selection:bg-luxury-gold selection:text-white relative">
      {/* 1. Luxury Preloader */}
      <Preloader onFinish={() => setIsPreloading(false)} />

      {/* 2. Glassmorphism Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        wishlistCount={savedWishlist.length}
        onOpenWishlist={() => setWishlistDrawerOpen(true)}
      />

      {/* 3. Main Web Page Content */}
      <main>
        {/* Section 1: Hero */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          scrollToSection={scrollToSection}
        />

        {/* Section 2: About */}
        <AboutSection />

        {/* Section 3: Services */}
        <ServicesSection
          onSelectService={(service) => setServiceModalItem(service)}
        />

        {/* Section 4: Wedding Packages */}
        <PackagesSection
          onSelectPackage={(pkg) => handleOpenBooking(pkg)}
        />

        {/* Section 5: Budget Estimator Tool */}
        <BudgetEstimatorSection
          onOpenBooking={handleOpenBooking}
        />

        {/* Section 6: Concept Wishlist Builder */}
        <ConceptWishlistSection
          savedWishlist={savedWishlist}
          onToggleWishlist={handleToggleWishlist}
          onOpenBooking={handleOpenBooking}
        />

        {/* Section 8: Gallery Masonry */}
        <GallerySection
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Section 9: Video Highlight */}
        <VideoHighlightSection />

        {/* Section 10: Testimonials Swiper */}
        <TestimonialsSection />

        {/* Section 11: Wedding Process Timeline */}
        <WeddingProcessSection />


        {/* Section 13: Contact & Booking Form */}
        <ContactSection />
      </main>

      {/* 4. Luxury Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 5. Floating Action Widgets */}
      <FloatingWhatsApp />
      <BackToTop />

      {/* 6. Modals */}
      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        image={lightboxData.item}
        currentIndex={lightboxData.index}
        total={lightboxData.list.length}
        onClose={() => setLightboxData((prev) => ({ ...prev, isOpen: false }))}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={!!serviceModalItem}
        service={serviceModalItem}
        onClose={() => setServiceModalItem(null)}
        onBookService={(service) => handleOpenBooking(service)}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedPackage={selectedBookingItem}
      />

      {/* Wishlist Drawer Slide-Over */}
      <AnimatePresence>
        {wishlistDrawerOpen && (
          <div className="fixed inset-0 z-[999] flex justify-end bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-luxury-dark text-luxury-cream h-full shadow-2xl p-6 flex flex-col justify-between border-l border-luxury-gold/30"
            >
              <div className="space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-luxury-gold fill-luxury-gold" />
                    <h3 className="font-heading text-xl font-bold gold-text-shimmer">
                      Wishlist Konsep Impian ({savedWishlist.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setWishlistDrawerOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {savedWishlist.length > 0 ? (
                  <div className="space-y-4">
                    {savedWishlist.map((theme) => (
                      <div
                        key={theme.id}
                        className="p-4 rounded-2xl bg-luxury-dark-soft border border-luxury-gold/20 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={theme.image}
                            alt={theme.title}
                            className="w-14 h-14 rounded-xl object-cover border border-luxury-gold/30"
                          />
                          <div>
                            <h4 className="font-heading text-sm font-semibold text-white">
                              {theme.title}
                            </h4>
                            <div className="flex items-center gap-1 mt-1">
                              {theme.colors?.map((c, idx) => (
                                <span key={idx} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleWishlist(theme)}
                          className="p-2 rounded-full hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Hapus dari wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center space-y-3 text-luxury-cream/60">
                    <Heart className="w-12 h-12 text-luxury-gold/30 mx-auto" />
                    <p className="text-xs">Belum ada konsep tema yang disimpan ke Wishlist.</p>
                  </div>
                )}
              </div>

              {savedWishlist.length > 0 && (
                <div className="pt-4 border-t border-luxury-gold/20">
                  <button
                    onClick={() => {
                      setWishlistDrawerOpen(false);
                      handleOpenBooking({ notes: `Wishlist Konsep Favorit Saya: ${savedWishlist.map(w => w.title).join(', ')}` });
                    }}
                    className="w-full py-3.5 rounded-full bg-gold-gradient text-luxury-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <span>Konsultasikan Wishlist Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
