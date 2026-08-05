import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Sparkles, CheckCircle2, AlertCircle, XCircle, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

export default function AvailabilityCalendarSection({ onOpenBooking }) {
  const [selectedMonth, setSelectedMonth] = useState(7); // August (0-indexed 7)
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState(15);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Mock availability status generator based on date
  const getDateStatus = (day) => {
    if (day === 8 || day === 14 || day === 22 || day === 29) return 'booked';
    if (day === 7 || day === 21 || day === 28) return 'limited';
    return 'available';
  };

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const dateFormatted = `${selectedDate} ${months[selectedMonth]} ${selectedYear}`;
  const currentStatus = getDateStatus(selectedDate);

  return (
    <section id="calendar" className="py-24 bg-luxury-cream text-luxury-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-gold/15 text-luxury-gold-dark text-xs font-semibold uppercase tracking-wider border border-luxury-gold/30">
            <CalendarIcon className="w-3.5 h-3.5 text-luxury-gold" /> Real-time Schedule
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight">
            Cek Ketersediaan Tanggal <br />
            <span className="gold-text-shimmer italic font-normal">Jadwal Pernikahan Anda</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-dark-muted font-light leading-relaxed">
            Aura WO membatasi maksimal 2 pernikahan per hari demi menjaga eksklusivitas & kualitas layanan. Periksa tanggal impian Anda di bawah ini.
          </p>
        </div>

        {/* Calendar Card Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-luxury-gold/20 shadow-2xl p-6 sm:p-10 space-y-8">
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between border-b border-luxury-cream-dark pb-6">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-luxury-gold" />
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-luxury-dark">
                {months[selectedMonth]} {selectedYear}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2.5 rounded-full border border-luxury-cream-dark hover:border-luxury-gold hover:bg-luxury-cream text-luxury-dark transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2.5 rounded-full border border-luxury-cream-dark hover:border-luxury-gold hover:bg-luxury-cream text-luxury-dark transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-luxury-dark-muted pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow" />
              <span className="font-medium">Tersedia (Available)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow" />
              <span className="font-medium">Slot Terbatas (1 Slot Left)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow" />
              <span className="font-medium">Penuh (Fully Booked)</span>
            </div>
          </div>

          {/* Days Grid Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-luxury-gold uppercase tracking-wider">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
              <div key={day} className="py-2">{day}</div>
            ))}
          </div>

          {/* Date Grid */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center text-xs sm:text-sm">
            {/* Empty slots for month start padding */}
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`empty-${idx}`} className="p-3 text-transparent">.</div>
            ))}

            {/* Days of Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const status = getDateStatus(dayNum);
              const isSelected = selectedDate === dayNum;

              let statusBg = "bg-emerald-50 text-emerald-800 border-emerald-200 hover:border-emerald-500";
              if (status === 'limited') statusBg = "bg-amber-50 text-amber-800 border-amber-200 hover:border-amber-500";
              if (status === 'booked') statusBg = "bg-rose-50 text-rose-400 border-rose-100 opacity-60 cursor-not-allowed";

              if (isSelected) {
                statusBg = "bg-luxury-dark text-white border-luxury-gold shadow-gold-glow scale-105 font-bold z-10";
              }

              return (
                <motion.button
                  key={dayNum}
                  whileTap={status !== 'booked' ? { scale: 0.95 } : {}}
                  disabled={status === 'booked'}
                  onClick={() => setSelectedDate(dayNum)}
                  className={`p-3 rounded-2xl border transition-all duration-200 relative flex flex-col items-center justify-between h-14 sm:h-16 ${statusBg}`}
                >
                  <span className="text-sm sm:text-base font-semibold">{dayNum}</span>
                  
                  {/* Indicator Dot */}
                  {!isSelected && (
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      status === 'available' ? 'bg-emerald-500' : status === 'limited' ? 'bg-amber-500' : 'bg-rose-400'
                    }`} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Selected Date Details Box */}
          <div className="p-6 rounded-2xl bg-luxury-cream border border-luxury-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-luxury-dark-muted font-light block">Tanggal Terpilih:</span>
              <h4 className="font-heading text-xl font-bold text-luxury-dark">
                {dateFormatted}
              </h4>
              <p className="text-xs font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
                {currentStatus === 'available' && (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Slot Tersedia Penuh
                  </span>
                )}
                {currentStatus === 'limited' && (
                  <span className="text-amber-700 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-amber-600" /> Sisa 1 Slot Terakhir
                  </span>
                )}
                {currentStatus === 'booked' && (
                  <span className="text-rose-600 flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-500" /> Maaf, Jadwal Sudah Penuh
                  </span>
                )}
              </p>
            </div>

            {currentStatus !== 'booked' && (
              <button
                onClick={() => onOpenBooking({ weddingDate: `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}` })}
                className="px-6 py-3 rounded-full bg-gold-gradient text-luxury-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
              >
                <Lock className="w-4 h-4" />
                <span>Kunci Tanggal Ini Sekarang</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
