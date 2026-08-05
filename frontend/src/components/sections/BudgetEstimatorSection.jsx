import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Send, Check, RefreshCw, DollarSign, PieChart, Users, Building, Flower2, Utensils } from 'lucide-react';
import { brandConfig } from '../../data/weddingData';

export default function BudgetEstimatorSection({ onOpenBooking }) {
  const [guests, setGuests] = useState(400);
  const [venueType, setVenueType] = useState('ballroom'); // 'garden', 'ballroom', 'resort', 'glasshouse'
  const [decorTier, setDecorTier] = useState('deluxe'); // 'minimalist', 'deluxe', 'royal'
  const [cateringTier, setCateringTier] = useState('vip'); // 'standard', 'vip', 'luxury'
  const [docTier, setDocTier] = useState('cinematic'); // 'standard', 'cinematic'

  // Dynamic Calculation Logic
  const calculateBudget = () => {
    let baseWO = 15000000;
    if (guests > 600) baseWO = 25000000;

    // Catering estimation per pax
    let cateringRate = 120000; // standard
    if (cateringTier === 'vip') cateringRate = 180000;
    if (cateringTier === 'luxury') cateringRate = 260000;

    const totalCatering = guests * cateringRate;

    // Decor estimation
    let decorCost = 25000000;
    if (decorTier === 'deluxe') decorCost = 45000000;
    if (decorTier === 'royal') decorCost = 85000000;

    // Venue estimation hint
    let venueCost = 20000000;
    if (venueType === 'ballroom') venueCost = 40000000;
    if (venueType === 'resort') venueCost = 65000000;
    if (venueType === 'glasshouse') venueCost = 35000000;

    // Documentation
    let docCost = 12000000;
    if (docTier === 'cinematic') docCost = 22000000;

    // Miscellaneous (MC, Music, Rundown)
    let miscCost = 15000000;

    const totalMin = Math.round((baseWO + totalCatering + decorCost + venueCost + docCost + miscCost) * 0.95);
    const totalMax = Math.round((baseWO + totalCatering + decorCost + venueCost + docCost + miscCost) * 1.15);

    return {
      min: totalMin,
      max: totalMax,
      breakdown: {
        catering: totalCatering,
        decor: decorCost,
        venue: venueCost,
        doc: docCost,
        wo: baseWO,
        misc: miscCost
      }
    };
  };

  const budgetResult = calculateBudget();

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const handleShareToWA = () => {
    const message = `Halo Aura Wedding Organizer, saya mencoba Kalkulator Biaya di website:

*Estimasi Undangan:* ${guests} Pax
*Tipe Venue:* ${venueType.toUpperCase()}
*Tingkat Dekorasi:* ${decorTier.toUpperCase()}
*Katering:* ${cateringTier.toUpperCase()}
*Dokumentasi:* ${docTier.toUpperCase()}

*Estimasi Total Biaya:* ${formatRupiah(budgetResult.min)} - ${formatRupiah(budgetResult.max)}

Mohon rekomendasi paket & konsultasi lebih lanjut.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${brandConfig.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="estimator" className="py-24 bg-luxury-dark text-luxury-cream relative overflow-hidden">
      {/* Background Ambient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-luxury-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <Calculator className="w-3.5 h-3.5" /> Simulation Tool
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight">
            Kalkulator & Estimasi Biaya <br />
            <span className="gold-text-shimmer italic font-normal">Pernikahan Interaktif</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
            Hitung perkiraan alokasi anggaran pernikahan impian Anda secara real-time berdasarkan jumlah tamu & spesifikasi vendor favorit.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-luxury-dark-soft/80 border border-luxury-gold/20 shadow-2xl space-y-8 glass-panel-dark">
            
            {/* 1. Guest Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-luxury-gold flex items-center gap-2">
                  <Users className="w-4 h-4" /> Jumlah Tamu & Catering Pax
                </span>
                <span className="font-mono text-base text-white font-bold gold-text-shimmer">
                  {guests} Pax ({guests / 2} Undangan)
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2 bg-luxury-dark-muted rounded-lg appearance-none cursor-pointer accent-luxury-gold"
              />
              <div className="flex justify-between text-[10px] text-luxury-cream/40 font-mono">
                <span>100 Pax (Intimate)</span>
                <span>500 Pax</span>
                <span>1.000 Pax</span>
                <span>1.500 Pax (Royal)</span>
              </div>
            </div>

            {/* 2. Venue Type */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-luxury-gold flex items-center gap-2">
                <Building className="w-4 h-4" /> Pilih Karakter Venue
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { id: 'ballroom', label: 'Hotel Ballroom' },
                  { id: 'garden', label: 'Outdoor Garden' },
                  { id: 'resort', label: 'Luxury Resort' },
                  { id: 'glasshouse', label: 'Glasshouse' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setVenueType(item.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      venueType === item.id
                        ? 'bg-luxury-gold text-luxury-dark font-bold border-luxury-gold shadow-gold-glow'
                        : 'bg-luxury-dark/60 text-luxury-cream/80 border-white/10 hover:border-luxury-gold/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Decor Tier */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-luxury-gold flex items-center gap-2">
                <Flower2 className="w-4 h-4" /> Tingkat Kemewahan Dekorasi
              </span>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {[
                  { id: 'minimalist', label: 'Minimalist Modern' },
                  { id: 'deluxe', label: 'Deluxe Fresh Floral' },
                  { id: 'royal', label: 'Royal Palace Grand' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDecorTier(item.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      decorTier === item.id
                        ? 'bg-luxury-gold text-luxury-dark font-bold border-luxury-gold shadow-gold-glow'
                        : 'bg-luxury-dark/60 text-luxury-cream/80 border-white/10 hover:border-luxury-gold/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Catering Tier */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-luxury-gold flex items-center gap-2">
                <Utensils className="w-4 h-4" /> Kualitas Hidangan Catering
              </span>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {[
                  { id: 'standard', label: 'Gourmet Selected' },
                  { id: 'vip', label: 'VIP Premium Stall' },
                  { id: 'luxury', label: 'Hotel Star 5 Chef' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCateringTier(item.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      cateringTier === item.id
                        ? 'bg-luxury-gold text-luxury-dark font-bold border-luxury-gold shadow-gold-glow'
                        : 'bg-luxury-dark/60 text-luxury-cream/80 border-white/10 hover:border-luxury-gold/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Result Summary Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-luxury-dark-soft via-luxury-dark to-luxury-dark-soft border-2 border-luxury-gold shadow-2xl space-y-6 text-white relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-luxury-gold">
                Hasil Estimasi Real-Time
              </span>
              <h3 className="font-heading text-xl font-bold">Kisaran Anggaran Pernikahan</h3>
            </div>

            {/* Total Display */}
            <div className="p-6 rounded-2xl bg-luxury-dark/90 border border-luxury-gold/30 text-center space-y-1">
              <span className="text-xs text-luxury-cream/60">Perkiraan Biaya Total (Range):</span>
              <div className="font-heading text-2xl sm:text-3xl font-extrabold gold-text-shimmer">
                {formatRupiah(budgetResult.min)}
              </div>
              <span className="text-xs text-luxury-gold font-medium">s/d {formatRupiah(budgetResult.max)}</span>
            </div>

            {/* Cost Breakdown Progress Bars */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-luxury-gold block">
                Estimasi Alokasi Dana:
              </span>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-luxury-cream/80">
                  <span>Catering & Foods</span>
                  <span className="font-mono text-luxury-gold">{formatRupiah(budgetResult.breakdown.catering)}</span>
                </div>
                <div className="flex justify-between text-luxury-cream/80">
                  <span>Dekorasi & Ambience</span>
                  <span className="font-mono text-luxury-gold">{formatRupiah(budgetResult.breakdown.decor)}</span>
                </div>
                <div className="flex justify-between text-luxury-cream/80">
                  <span>Venue & Hall</span>
                  <span className="font-mono text-luxury-gold">{formatRupiah(budgetResult.breakdown.venue)}</span>
                </div>
                <div className="flex justify-between text-luxury-cream/80">
                  <span>Tim WO, Dok, MC & Music</span>
                  <span className="font-mono text-luxury-gold">{formatRupiah(budgetResult.breakdown.wo + budgetResult.breakdown.doc + budgetResult.breakdown.misc)}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleShareToWA}
                className="w-full py-3.5 rounded-full bg-gold-gradient text-luxury-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Hasil Ke WhatsApp WO</span>
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="w-full py-3 rounded-full border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark font-semibold text-xs uppercase tracking-wider transition-colors text-center"
              >
                Konsultasikan Budget Kustom
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
