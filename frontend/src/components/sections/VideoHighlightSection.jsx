import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, X, Film, MapPin, Clock } from 'lucide-react';
import { videoHighlightData } from '../../data/weddingData';

export default function VideoHighlightSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-luxury-dark text-luxury-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Film className="w-3.5 h-3.5" /> Cinematic Film Showcase
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            Sensasi Sinematik Pernikahan <br />
            <span className="gold-text-shimmer italic font-normal">Karya Visual Abadi</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
            Rasakan kehangatan, gelak tawa, dan tangis haru kebahagiaan dalam cuplikan video pernikahan eksklusif racikan tim videografer sinema kami.
          </p>
        </div>

        {/* Video Banner Container */}
        <div className="relative rounded-3xl overflow-hidden border border-luxury-gold/30 shadow-2xl group max-w-5xl mx-auto">
          <img
            src={videoHighlightData.thumbnail}
            alt={videoHighlightData.title}
            className="w-full h-[400px] sm:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 text-center px-4">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-gradient text-luxury-dark shadow-gold-glow flex items-center justify-center pl-1 group/btn hover:shadow-luxury-hover transition-all"
              aria-label="Play Cinematic Video"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-luxury-dark" />
            </motion.button>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold block">
                {videoHighlightData.subtitle}
              </span>
              <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white gold-text-shimmer">
                {videoHighlightData.title}
              </h3>
              <div className="flex items-center justify-center gap-4 text-xs text-luxury-cream/80 pt-2 font-light">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-luxury-gold" /> {videoHighlightData.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-luxury-gold" /> {videoHighlightData.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-luxury-gold hover:text-luxury-dark transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <iframe
                src={videoHighlightData.videoEmbedUrl}
                title={videoHighlightData.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
