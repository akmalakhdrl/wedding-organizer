import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Crown, 
  ClipboardCheck, 
  HeartHandshake, 
  PartyPopper, 
  Flower2, 
  Utensils, 
  Camera, 
  Mic, 
  Music, 
  ArrowRight 
} from 'lucide-react';
import { servicesData } from '../../data/weddingData';

const iconMap = {
  Crown,
  ClipboardCheck,
  HeartHandshake,
  Sparkles,
  PartyPopper,
  Flower2,
  Utensils,
  Camera,
  Mic,
  Music
};

export default function ServicesSection({ onSelectService }) {
  return (
    <section id="services" className="py-24 bg-luxury-dark text-luxury-cream relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-luxury-rosegold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Sparkles className="w-3.5 h-3.5" /> Layanan Profesional
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            Spektrum Layanan Pernikahan <br />
            <span className="gold-text-shimmer italic font-normal">Mewah & Komprehensif</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
            Dari perencanaan konsep hingga eksekusi panggung utama, kami menghadirkan standar kualitas tertinggi untuk setiap aspek perayaan Anda.
          </p>
        </div>

        {/* Services Grid (10 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Sparkles;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-3xl bg-luxury-dark-soft/70 border border-luxury-gold/20 overflow-hidden hover:border-luxury-gold transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                {/* Image & Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark-soft via-luxury-dark-soft/40 to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-4 left-4 p-3 rounded-2xl bg-luxury-dark/80 backdrop-blur-md border border-luxury-gold/40 text-luxury-gold shadow-gold-glow">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                      {service.tagline}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white group-hover:text-luxury-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-luxury-cream/70 font-light leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onSelectService(service)}
                    className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-luxury-gold hover:text-white group/btn transition-colors w-full"
                  >
                    <span>Lihat Detail & Inklusi</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
