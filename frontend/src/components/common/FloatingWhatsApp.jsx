import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { brandConfig } from '../../data/weddingData';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSendWA = (e) => {
    e?.preventDefault();
    const finalMsg = userMsg.trim() || brandConfig.whatsappMessage;
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/${brandConfig.whatsappNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* WhatsApp Chat Popup Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-96 rounded-2xl bg-luxury-dark border border-luxury-gold/30 shadow-2xl overflow-hidden glass-panel-dark text-white"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#075E54] to-[#128C7E] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-heading font-bold text-luxury-gold">
                    A
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-luxury-dark" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-white">Aura Wedding Concierge</h4>
                  <p className="text-[11px] text-white/80">Online | Respon &lt; 5 Menit</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 bg-[#0B141A]/90 text-xs">
              <div className="bg-[#202C33] p-3 rounded-2xl rounded-tl-none text-luxury-cream/90 max-w-[85%] space-y-1 shadow">
                <p className="font-semibold text-luxury-gold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Halo Pasangan Bahagia!
                </p>
                <p>Selamat datang di Aura Wedding Organizer. Ada yang bisa kami bantu untuk perencanaan pernikahan impian Anda?</p>
                <span className="text-[9px] text-white/40 block text-right">Sekarang</span>
              </div>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSendWA} className="p-3 bg-[#202C33] flex items-center gap-2">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="flex-1 px-3 py-2 rounded-full bg-[#111B21] border border-white/10 text-white text-xs placeholder-white/40 focus:outline-none focus:border-luxury-gold"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#00A884] text-white hover:bg-[#029071] transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:shadow-gold-glow flex items-center justify-center group"
        aria-label="Live Chat WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </motion.button>
    </div>
  );
}
