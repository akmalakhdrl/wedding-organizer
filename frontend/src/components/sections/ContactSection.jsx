import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Send, Sparkles, CheckCircle } from 'lucide-react';
import { brandConfig } from '../../data/weddingData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const waText = `Halo Aura Wedding Organizer!

*Nama:* ${formData.name}
*No. WhatsApp:* ${formData.phone}
*Email:* ${formData.email}
*Rencana Tanggal:* ${formData.date || '-'}
*Pesan/Pertanyaan:* ${formData.message}

Mohon dapat dihubungi untuk konsultasi pernikahan. Terima kasih!`;

    setTimeout(() => {
      const encoded = encodeURIComponent(waText);
      window.open(`https://wa.me/${brandConfig.whatsappNumber}?text=${encoded}`, '_blank');
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-luxury-dark text-luxury-cream relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Phone className="w-3.5 h-3.5" /> Hubungi Kami
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            Mari Mulai Merancang <br />
            <span className="gold-text-shimmer italic font-normal">Pernikahan Impian Anda</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
            Jadwalkan sesi konsultasi tatap muka (coffee meeting) di galeri kami atau terhubung secara fleksibel via virtual call.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Contact Info & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-luxury-dark-soft border border-luxury-gold/30 shadow-2xl glass-panel-dark space-y-6">
              <h3 className="font-heading text-xl font-bold text-white gold-text-shimmer">
                Galeri & Kantor Pusat
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-luxury-gold font-semibold block">Alamat Galeri:</span>
                    <p className="text-luxury-cream/80 font-light mt-0.5">{brandConfig.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-luxury-gold font-semibold block">WhatsApp Hotline:</span>
                    <p className="text-luxury-cream/80 font-light mt-0.5">{brandConfig.phone}</p>
                  </div>
                </div>


                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-luxury-gold font-semibold block">Jam Operasional:</span>
                    <p className="text-luxury-cream/80 font-light mt-0.5">{brandConfig.operatingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Card */}
            <div className="rounded-3xl overflow-hidden border border-luxury-gold/20 shadow-xl h-64">
              <iframe
                src={brandConfig.googleMapsEmbed}
                title="Aura Wedding Location"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Direct Consultation Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-luxury-dark-soft border border-luxury-gold/30 shadow-2xl glass-panel-dark">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              Kirim Pesan Konsultasi
            </h3>
            <p className="text-xs text-luxury-cream/70 font-light mb-6">
              Isi data di bawah ini untuk terhubung langsung dengan Tim Senior Wedding Planner kami.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-luxury-gold mb-1">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-luxury-dark border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-luxury-gold mb-1">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-luxury-dark border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-luxury-gold mb-1">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-luxury-dark border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-luxury-gold mb-1">
                      Perkiraan Tanggal Pernikahan
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-luxury-dark border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-luxury-gold mb-1">
                    Pesan / Pertanyaan Spesifik *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ceritakan gambaran singkat pernikahan yang Anda inginkan..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-luxury-dark border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gold-gradient text-luxury-dark font-bold text-xs sm:text-sm uppercase tracking-wider shadow-gold-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Ke WhatsApp Planner</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                <h4 className="font-heading text-xl font-bold text-white">Terima Kasih, Pesan Anda Terikirim!</h4>
                <p className="text-xs text-luxury-cream/70 max-w-sm mx-auto">
                  Aplikasi WhatsApp Anda sedang dibuka secara otomatis.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
