import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Crown, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { weddingPackages } from '../../data/weddingData';

export default function PackagesSection({ onSelectPackage }) {
  return (
    <section id="packages" className="py-24 bg-luxury-cream text-luxury-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/15 text-luxury-gold-dark text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Crown className="w-3.5 h-3.5 text-luxury-gold" /> Transparan & Berkelas
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight">
            Paket Pernikahan Impian <br />
            <span className="gold-text-shimmer italic font-normal">Investasi Keindahan Abadi</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-dark-muted font-light leading-relaxed">
            Pilih paket yang paling sesuai dengan skala perayaan Anda. Seluruh harga mencakup jaminan kualitas tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {weddingPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-luxury-dark text-white border-2 border-luxury-gold shadow-2xl scale-105 z-20'
                  : 'bg-white text-luxury-dark border border-luxury-cream-dark shadow-lg hover:shadow-2xl hover:border-luxury-gold'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-luxury-dark text-[11px] font-bold uppercase tracking-widest shadow-gold-glow flex items-center gap-1">
                  <Star className="w-3 h-3 fill-luxury-dark" /> Most Popular Choice
                </div>
              )}

              <div className="space-y-6">
                {/* Package Header */}
                <div>
                  <span className={`text-[10px] uppercase tracking-widest font-semibold block mb-1 ${pkg.popular ? 'text-luxury-gold' : 'text-luxury-gold-dark'}`}>
                    {pkg.badge}
                  </span>
                  <h3 className="font-heading text-2xl font-bold mb-1">
                    {pkg.name}
                  </h3>
                  <p className={`text-xs font-light ${pkg.popular ? 'text-luxury-cream/70' : 'text-luxury-dark-muted'}`}>
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-luxury-gold/20">
                  <div className="font-heading text-2xl sm:text-3xl font-extrabold gold-text-shimmer">
                    {pkg.price}
                  </div>
                  <span className={`text-[11px] block mt-1 ${pkg.popular ? 'text-luxury-cream/70' : 'text-luxury-dark-muted'}`}>
                    Cap. {pkg.capacity}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <span className={`text-xs font-semibold uppercase tracking-wider block ${pkg.popular ? 'text-luxury-gold' : 'text-luxury-dark'}`}>
                    Fasilitas Utama Paket:
                  </span>
                  <ul className="space-y-2.5 text-xs font-light">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                        <span className={pkg.popular ? 'text-luxury-cream/90' : 'text-luxury-dark-muted'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                    pkg.popular
                      ? 'bg-gold-gradient text-luxury-dark shadow-gold-glow hover:scale-105'
                      : 'bg-luxury-dark text-luxury-cream hover:bg-luxury-gold hover:text-luxury-dark'
                  }`}
                >
                  <span>Booking Paket Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security guarantee note */}
        <div className="p-6 rounded-2xl bg-white border border-luxury-gold/30 shadow-sm max-w-2xl mx-auto flex items-center justify-center gap-3 text-xs text-luxury-dark-muted text-center">
          <ShieldCheck className="w-5 h-5 text-luxury-gold shrink-0" />
          <span>Setiap booking dilindungi Surat Kontrak Kerjasama Resmi ber-materai dengan garansi 100% transparansi vendor.</span>
        </div>

      </div>
    </section>
  );
}
