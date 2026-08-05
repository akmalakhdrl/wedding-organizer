import React from 'react';
import { Sparkles, MapPin, Phone, Clock, Instagram, Heart } from 'lucide-react';
import { brandConfig } from '../../data/weddingData';

export default function Footer({ onOpenBooking }) {

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Wayang Icon */}
              <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 shadow-gold-glow border border-luxury-gold/40">
                <img
                  src="/logo-icon.png"
                  alt="Kresna Management Icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-none">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-wider gold-text-shimmer block leading-tight">
                  KRESNA
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-luxury-cream/70 block mt-0.5">
                  Management
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
              Penyelenggara pernikahan mewah &amp; eksklusif terdepan di Indonesia. Menghadirkan keindahan sejati, estetika abadi, dan ketenangan pikiran penuh di hari bahagia Anda.
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
                  Profil &amp; Visi Misi
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
                <button onClick={() => scrollToSection('gallery')} className="hover:text-luxury-gold transition-colors">
                  Galeri Portofolio
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-luxury-gold mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Kontak &amp; Lokasi
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
                <Clock className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>{brandConfig.operatingHours}</span>
              </li>
            </ul>
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
