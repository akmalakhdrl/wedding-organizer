import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Quote, Heart, MapPin, Calendar } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { testimonialsData } from '../../data/weddingData';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-luxury-cream text-luxury-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/15 text-luxury-gold-dark text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Heart className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold/20" /> Ulasan Klien
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight">
            Kisah Bahagia Bersama <br />
            <span className="gold-text-shimmer italic font-normal">Aura Wedding Organizer</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-dark-muted font-light leading-relaxed">
            Dengar langsung pengakuan tulus dari pasangan pengantin yang telah memercayakan hari paling bersejarah mereka kepada kami.
          </p>
        </div>

        {/* Swiper Carousel Container */}
        <div className="pt-4 pb-12">
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2.5 }
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            pagination={{ clickable: true }}
            className="pb-14 px-4"
          >
            {testimonialsData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="h-full p-8 rounded-3xl bg-white border border-luxury-gold/30 shadow-xl space-y-6 flex flex-col justify-between text-left transition-all duration-300">
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: item.rating }).map((_, rIdx) => (
                          <Star key={rIdx} className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-luxury-gold/30" />
                    </div>

                    {/* Review text */}
                    <p className="text-xs sm:text-sm text-luxury-dark-muted font-light leading-relaxed italic">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Couple Profile */}
                  <div className="pt-4 border-t border-luxury-cream-dark flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.names}
                      className="w-14 h-14 rounded-full object-cover border-2 border-luxury-gold shadow-md shrink-0"
                    />
                    <div>
                      <h4 className="font-heading text-lg font-bold text-luxury-dark">
                        {item.names}
                      </h4>
                      <p className="text-xs text-luxury-gold-dark font-medium">
                        {item.packageUsed}
                      </p>
                      <p className="text-[11px] text-luxury-dark-muted font-light flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-luxury-gold" /> {item.venue}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
