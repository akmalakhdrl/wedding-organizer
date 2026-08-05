import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, HeartHandshake, Eye, Target, CheckCircle2 } from 'lucide-react';
import { aboutData, statsData } from '../../data/weddingData';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-luxury-cream relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Top Story & Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop"
                alt="Aura Wedding Profile"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-luxury-dark/80 backdrop-blur-md border border-luxury-gold/30 text-white">
                <p className="font-heading text-lg font-semibold gold-text-shimmer">"Perfecting Every Sacred Detail"</p>
                <p className="text-xs text-luxury-cream/80 font-light mt-1">Standar Kemewahan & Keanggunan Pernikahan Indonesia</p>
              </div>
            </div>

            {/* Decorative Floating Badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-white shadow-xl border border-luxury-gold/20">
              <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center text-luxury-dark font-bold text-xl shadow-gold-glow">
                12+
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold uppercase tracking-wider text-luxury-dark">Tahun Pengalaman</span>
                <span className="block text-[11px] text-luxury-gold font-medium">Boutique Luxury WO</span>
              </div>
            </div>
          </motion.div>

          {/* Right Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-luxury-dark"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/15 text-luxury-gold-dark text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
              <Sparkles className="w-3.5 h-3.5" /> Tentang Kresna Management
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight">
              Mewujudkan Impian Terindah <br />
              <span className="gold-text-shimmer italic font-normal">Menjadi Kenyataan Abadi</span>
            </h2>

            <p className="text-sm sm:text-base text-luxury-dark-muted font-light leading-relaxed">
              {aboutData.profile}
            </p>

            <p className="text-xs sm:text-sm text-luxury-dark-muted/90 font-light italic border-l-2 border-luxury-gold pl-4 py-1">
              "{aboutData.story}"
            </p>

            {/* Vision & Mission Tabs/Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white border border-luxury-cream-dark shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-luxury-gold font-semibold text-sm">
                  <Eye className="w-4 h-4" />
                  <span className="font-heading">Visi Kami</span>
                </div>
                <p className="text-xs text-luxury-dark-muted leading-relaxed font-light">
                  {aboutData.vision}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-luxury-cream-dark shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-luxury-gold font-semibold text-sm">
                  <Target className="w-4 h-4" />
                  <span className="font-heading">Misi Utama</span>
                </div>
                <ul className="space-y-1 text-xs text-luxury-dark-muted font-light">
                  {aboutData.mission.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white border border-luxury-gold/20 shadow-sm text-center hover:shadow-luxury-hover hover:border-luxury-gold transition-all group"
            >
              <h3 className="font-heading text-4xl sm:text-5xl font-extrabold gold-text-shimmer mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </h3>
              <p className="font-heading text-sm font-semibold text-luxury-dark uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-xs text-luxury-dark-muted font-light mt-1">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Executive Team Showcase */}
        <div className="pt-10 text-center space-y-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold">Dibalik Kesempurnaan</span>
            <h3 className="font-heading text-2xl sm:text-4xl font-bold text-luxury-dark mt-1">
              Tim Senior Wedding Specialist
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative rounded-3xl overflow-hidden bg-white border border-luxury-cream-dark shadow-md hover:shadow-2xl transition-all duration-300 text-left"
              >
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] uppercase tracking-widest text-luxury-gold font-semibold">
                      {member.experience}
                    </span>
                    <h4 className="font-heading text-xl font-bold gold-text-shimmer">
                      {member.name}
                    </h4>
                    <p className="text-xs text-luxury-cream/80 font-light">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
