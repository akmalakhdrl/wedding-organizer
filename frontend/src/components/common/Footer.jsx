import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Mail, Phone, Clock, Instagram, Youtube, Send, Heart } from 'lucide-react';
import { brandConfig } from '../../data/weddingData';

export default function Footer({ onOpenBooking }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-luxury-dark text-luxury-cream border-t border-luxury-gold/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-luxury-gold flex items-center justify-center bg-luxury-dark-soft shadow-gold-glow">
                <span className="font-heading font-bold text-lg text-luxury-gold">A</span>
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-wider gold-text-shimmer block">
                  AURA
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-luxury-cream/70 block">
                  Wedding Organizer
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
              Penyelenggara pernikahan mewah & eksklusif terdepan di Indonesia. Menghadirkan keindahan sejati, estetika abadi, dan ketenangan pikiran penuh di hari bahagia Anda.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={brandConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-luxury-gold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Navigasi Utama
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-luxury-cream/80">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-luxury-gold transition-colors">
                  Profil & Visi Misi
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-luxury-gold transition-colors">
                  Layanan Organizer
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('packages')} className="hover:text-luxury-gold transition-colors">
                  Paket Pernikahan
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('estimator')} className="hover:text-luxury-gold transition-colors">
                  Kalkulator Biaya
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('calendar')} className="hover:text-luxury-gold transition-colors">
                  Cek Ketersediaan Tanggal
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-luxury-gold transition-colors">
                  Galeri Portofolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-luxury-gold transition-colors">
                  Pertanyaan Umum (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-luxury-gold mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Kontak & Lokasi
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-luxury-cream/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>{brandConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>{brandConfig.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>{brandConfig.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>{brandConfig.operatingHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-luxury-gold mb-4">
              Jurnal Pernikahan
            </h3>
            <p className="text-xs text-luxury-cream/70 leading-relaxed mb-4">
              Dapatkan inspirasi tren pernikahan mewah, tips alokasi budget, & promo eksklusif setiap bulannya.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda..."
                  required
                  className="w-full px-4 py-2.5 rounded-full bg-luxury-dark-soft border border-luxury-gold/30 text-white text-xs placeholder-luxury-cream/40 focus:outline-none focus:border-luxury-gold transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-gold-gradient text-luxury-dark font-medium text-xs flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-400 font-medium flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Berhasil terdaftar! Terima kasih.
                </motion.p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-luxury-cream/60 gap-4">
          <p>© 2026 {brandConfig.name}. All Rights Reserved. Designed with Excellence.</p>
          <div className="flex items-center gap-1 text-luxury-gold/80">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-luxury-gold text-luxury-gold" />
            <span>for your special day</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
