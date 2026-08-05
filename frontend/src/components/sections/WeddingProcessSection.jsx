import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MessageSquare, 
  Palette, 
  FileCheck, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Heart, 
  Gift, 
  Smile 
} from 'lucide-react';
import { processSteps } from '../../data/weddingData';

const processIconMap = {
  MessageSquare,
  Palette,
  FileCheck,
  CheckCircle2,
  Calendar,
  Users,
  Heart,
  Gift,
  Smile
};

export default function WeddingProcessSection() {
  return (
    <section id="process" className="py-24 bg-luxury-dark text-luxury-cream relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Sparkles className="w-3.5 h-3.5" /> 9 Tahapan Mudah
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            Alur & Tahapan Kerja <br />
            <span className="gold-text-shimmer italic font-normal">Penyelenggaraan Pernikahan</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
            Perjalanan terstruktur dan transparan dari hari pertama hingga momen terpenting hidup Anda.
          </p>
        </div>

        {/* Timeline Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {processSteps.map((step, idx) => {
            const IconComponent = processIconMap[step.icon] || Sparkles;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative rounded-3xl p-6 bg-luxury-dark-soft/70 border border-luxury-gold/20 hover:border-luxury-gold transition-all duration-300 space-y-4 group shadow-xl flex flex-col justify-between"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-heading text-3xl font-extrabold gold-text-shimmer">
                    {step.step}
                  </span>
                  <div className="p-3 rounded-2xl bg-luxury-dark border border-luxury-gold/30 text-luxury-gold group-hover:scale-110 transition-transform shadow-gold-glow">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-luxury-gold transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-luxury-cream/70 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="h-1 w-full bg-luxury-gold/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-gradient w-0 group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
