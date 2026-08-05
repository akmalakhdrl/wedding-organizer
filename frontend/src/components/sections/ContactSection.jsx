import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Instagram, MessageCircle, Sparkles } from 'lucide-react';
import { brandConfig } from '../../data/weddingData';

export default function ContactSection() {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(brandConfig.whatsappMessage);
    window.open(`https://wa.me/${brandConfig.whatsappNumber}?text=${msg}`, '_blank');
  };

  const contactCards = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Alamat Galeri',
      value: brandConfig.address,
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'WhatsApp Hotline',
      value: brandConfig.phone,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Jam Operasional',
      value: brandConfig.operatingHours,
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: 'Instagram',
      value: '@kresna_managemnt',
      link: brandConfig.socials.instagram,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-luxury-dark text-luxury-cream relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-luxury-gold/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Phone className="w-3.5 h-3.5" /> Hubungi Kami
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            Mari Mulai Merancang <br />
            <span className="gold-text-shimmer italic font-normal">Pernikahan Impian Anda</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
            Jadwalkan sesi konsultasi tatap muka di galeri kami atau terhubung secara fleksibel via WhatsApp.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={card.link ? () => window.open(card.link, '_blank') : undefined}
              className={`p-6 rounded-3xl bg-luxury-dark-soft border border-luxury-gold/25 shadow-xl space-y-3 hover:border-luxury-gold/60 hover:shadow-gold-glow transition-all duration-300 ${card.link ? 'cursor-pointer' : ''}`}
            >
              <div className="p-3 w-fit rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold">
                {card.icon}
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-luxury-gold font-semibold block mb-1">
                  {card.label}
                </span>
                <p className="text-xs sm:text-sm text-luxury-cream/85 font-light leading-relaxed">
                  {card.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map + CTA Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 rounded-3xl overflow-hidden border border-luxury-gold/20 shadow-2xl h-80 lg:h-96"
          >
            <iframe
              src={brandConfig.googleMapsEmbed}
              title="Kresna Management Location"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>

          {/* WhatsApp CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 p-8 rounded-3xl bg-luxury-dark-soft border border-luxury-gold/30 shadow-2xl flex flex-col justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight">
                Konsultasi Langsung via WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
                Hubungi tim kami sekarang untuk mendapatkan informasi lengkap tentang paket & ketersediaan tanggal.
              </p>
              <ul className="space-y-1.5 text-xs text-luxury-cream/70 font-light">
                {['Respons cepat & ramah', 'Konsultasi 100% gratis', 'Tersedia 7 hari seminggu'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-luxury-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full py-4 rounded-full bg-gold-gradient text-luxury-dark font-bold text-xs sm:text-sm uppercase tracking-wider shadow-gold-glow hover:scale-[1.02] hover:shadow-luxury-hover transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Sekarang</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
