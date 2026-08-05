import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      setScrollPercent(Math.round(scrolled));
      if (winScroll > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-luxury-dark/90 text-luxury-gold border border-luxury-gold/40 shadow-luxury backdrop-blur-md flex items-center justify-center group"
          aria-label="Back to Top"
        >
          {/* Circular Progress Ring */}
          <svg className="w-12 h-12 absolute inset-0 -rotate-90 pointer-events-none">
            <circle
              cx="24"
              cy="24"
              r="21"
              className="stroke-luxury-gold/20 fill-none stroke-[2]"
            />
            <circle
              cx="24"
              cy="24"
              r="21"
              className="stroke-luxury-gold fill-none stroke-[2] transition-all duration-150"
              strokeDasharray="132"
              strokeDashoffset={132 - (132 * scrollPercent) / 100}
            />
          </svg>
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
