import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Maximize2, MapPin } from 'lucide-react';
import { galleryCategories, galleryItems } from '../../data/weddingData';

export default function GallerySection({ onOpenLightbox }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-luxury-cream text-luxury-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/15 text-luxury-gold-dark text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Camera className="w-3.5 h-3.5 text-luxury-gold" /> Portofolio Visual
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight">
            Galeri Rekam Jejak Pernikahan <br />
            <span className="gold-text-shimmer italic font-normal">Koleksi Momen Spesial</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-dark-muted font-light leading-relaxed">
            Klik foto mana saja untuk menampilkan tampilan penuh sinematik (Lightbox Viewer).
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-luxury-dark text-luxury-gold shadow-md scale-105 border border-luxury-gold'
                  : 'bg-white text-luxury-dark-muted border border-luxury-cream-dark hover:border-luxury-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => onOpenLightbox(item, idx, filteredItems)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-white border border-luxury-cream-dark h-80"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Floating Maximize Icon */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white group-hover:bg-luxury-gold group-hover:text-luxury-dark transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Content at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 transform group-hover:-translate-y-1 transition-transform">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold gold-text-shimmer leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-luxury-cream/80 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-luxury-gold" />
                    <span>{item.location}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
