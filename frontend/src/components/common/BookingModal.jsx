import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, CheckCircle, Calendar, User, Phone, MapPin, Users, Heart } from 'lucide-react';
import { brandConfig, weddingPackages } from '../../data/weddingData';

export default function BookingModal({ isOpen, onClose, selectedPackage }) {
  const [formData, setFormData] = useState({
    coupleName: '',
    email: '',
    phone: '',
    weddingDate: '',
    guestCount: '300-500 Undangan',
    city: 'Jakarta / Jabodetabek',
    packageChoice: 'Gold Royalty Package',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        packageChoice: selectedPackage.name || selectedPackage.title || 'Gold Royalty Package'
      }));
    }
  }, [selectedPackage]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Call REST API Backend
    try {
      await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn('API backend not reached, proceeding to WhatsApp directly.', err);
    }

    const waText = `Halo Aura Wedding Organizer! Saya ingin mengajukan booking/konsultasi pernikahan:

*Nama Pasangan:* ${formData.coupleName}
*Email:* ${formData.email}
*No. WhatsApp:* ${formData.phone}
*Rencana Tanggal:* ${formData.weddingDate || 'Belum pasti'}
*Perkiraan Undangan:* ${formData.guestCount}
*Lokasi Pernikahan:* ${formData.city}
*Pilihan Paket:* ${formData.packageChoice}
*Catatan Impian:* ${formData.notes || '-'}

Mohon informasi ketersediaan jadwal & sesi konsultasi. Terima kasih!`;

    setTimeout(() => {
      const encoded = encodeURIComponent(waText);
      window.open(`https://wa.me/${brandConfig.whatsappNumber}?text=${encoded}`, '_blank');
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-luxury-dark border border-luxury-gold/30 shadow-2xl overflow-hidden glass-panel-dark text-luxury-cream my-8"
        >
          {/* Top Bar */}
          <div className="p-6 bg-gradient-to-r from-luxury-dark-soft via-luxury-dark to-luxury-dark-soft border-b border-luxury-gold/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-luxury-gold/50 bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white gold-text-shimmer">
                  Form Konsultasi & Booking VIP
                </h3>
                <p className="text-xs text-luxury-cream/70">Wujudkan Pernikahan Mewah Tanpa Stres</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-luxury-cream/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama Pasangan */}
                <div>
                  <label className="block text-xs text-luxury-gold font-medium mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Nama Pasangan Pengantin *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kevin & Natasha"
                    value={formData.coupleName}
                    onChange={(e) => setFormData({ ...formData, coupleName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark-soft border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                {/* No WhatsApp */}
                <div>
                  <label className="block text-xs text-luxury-gold font-medium mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark-soft border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs text-luxury-gold font-medium mb-1 flex items-center gap-1.5">
                    <MailIcon className="w-3.5 h-3.5" /> Alamat Email
                  </label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark-soft border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                {/* Tanggal Pernikahan */}
                <div>
                  <label className="block text-xs text-luxury-gold font-medium mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Rencana Tanggal Pernikahan
                  </label>
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark-soft border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Estimasi Pax Undangan */}
                <div>
                  <label className="block text-xs text-luxury-gold font-medium mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Perkiraan Jumlah Undangan
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark-soft border border-luxury-gold/20 text-xs sm:text-sm text-white focus:outline-none focus:border-luxury-gold"
                  >
                    <option value="Under 200 Undangan (Intimate)">Under 200 Undangan (Intimate)</option>
                    <option value="200 - 500 Undangan">200 - 500 Undangan</option>
                    <option value="500 - 1.000 Undangan">500 - 1.000 Undangan</option>
                    <option value="> 1.000 Undangan (Royal Wedding)">&gt; 1.000 Undangan (Royal Wedding)</option>
                  </select>
                </div>

                {/* Lokasi Pernikahan */}
                <div>
                  <label className="block text-xs text-luxury-gold font-medium mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Kota / Lokasi Acara
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jakarta Ballroom / Bali Outdoor"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark-soft border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              {/* Pilihan Paket */}
              <div>
                <label className="block text-xs text-luxury-gold font-medium mb-1 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> Pilihan Paket Layanan
                </label>
                <select
                  value={formData.packageChoice}
                  onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark-soft border border-luxury-gold/20 text-xs sm:text-sm text-white focus:outline-none focus:border-luxury-gold"
                >
                  {weddingPackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} ({pkg.price})
                    </option>
                  ))}
                  <option value="Full Wedding Organizer Custom">Full Wedding Organizer Custom</option>
                  <option value="Wedding Planner Only">Wedding Planner Only</option>
                </select>
              </div>

              {/* Catatan Tambahan */}
              <div>
                <label className="block text-xs text-luxury-gold font-medium mb-1">
                  Konsep Impian / Catatan Khusus Pasangan
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan tema favorit, warna impian, atau pertanyaan spesifik yang ingin didiskusikan..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-dark-soft border border-luxury-gold/20 text-xs sm:text-sm text-white placeholder-luxury-cream/30 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gold-gradient text-luxury-dark font-bold text-xs sm:text-sm tracking-wider uppercase shadow-gold-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim & Terhubung ke WhatsApp Official</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto text-green-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white gold-text-shimmer">
                Permintaan Berhasil Terkirim!
              </h3>
              <p className="text-xs sm:text-sm text-luxury-cream/80 max-w-md mx-auto leading-relaxed">
                Terima kasih <span className="text-luxury-gold font-semibold">{formData.coupleName}</span>. Aplikasi WhatsApp Anda sedang dibuka untuk menghubungkan Anda secara langsung dengan Senior Wedding Planner Aura WO.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-full border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Tutup Jendela
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function MailIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
