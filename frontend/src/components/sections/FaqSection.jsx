import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, Sparkles } from 'lucide-react';
import { faqData } from '../../data/weddingData';

export default function FaqSection() {
  const [openId, setOpenId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-luxury-cream text-luxury-dark relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/15 text-luxury-gold-dark text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <HelpCircle className="w-3.5 h-3.5 text-luxury-gold" /> Pertanyaan Umum
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight">
            Pertanyaan Yang Sering Diajukan <br />
            <span className="gold-text-shimmer italic font-normal">(FAQ & Informasi)</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-dark-muted font-light leading-relaxed">
            Temukan jawaban langsung mengenai alur kerja, sistem pembayaran, dan layanan Aura Wedding Organizer.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan... (cth: budget, pembayaran, WO vs Planner)"
            className="w-full px-5 py-3.5 pl-12 rounded-full bg-white border border-luxury-gold/30 text-xs sm:text-sm text-luxury-dark placeholder-luxury-dark-muted/50 focus:outline-none focus:border-luxury-gold shadow-md"
          />
          <Search className="w-5 h-5 text-luxury-gold absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white border border-luxury-gold/20 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading text-sm sm:text-base font-bold text-luxury-dark hover:text-luxury-gold-dark transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-luxury-gold transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-luxury-dark-muted font-light leading-relaxed border-t border-luxury-cream-dark">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-xs text-luxury-dark-muted">
              Tidak ada pertanyaan yang sesuai dengan kata kunci "{searchQuery}".
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
