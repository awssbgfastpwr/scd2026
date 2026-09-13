import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { NeoCard } from './NeoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Organizer } from '../data/siteData';

interface CardFanCarouselProps {
  organizers: Organizer[];
}

export function CardFanCarousel({ organizers }: CardFanCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const next = useCallback(() => {
    if (organizers.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % organizers.length);
  }, [organizers.length]);

  const prev = useCallback(() => {
    if (organizers.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + organizers.length) % organizers.length);
  }, [organizers.length]);

  // Auto-advance
  useEffect(() => {
    if (organizers.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, organizers.length]);

  // Touch swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  if (organizers.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-12 px-6 bg-white border-[3px] border-black shadow-neo">
        <p className="font-heading font-bold text-base uppercase text-gray-600">No organizers to display</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative">
      {/* Desktop Navigation Arrows */}
      <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-40">
        <button 
          onClick={prev}
          className="p-3 bg-secondary border-[3px] border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px]"
          aria-label="Previous organizer"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-40">
        <button 
          onClick={next}
          className="p-3 bg-secondary border-[3px] border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px]"
          aria-label="Next organizer"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>

      <div 
        className="relative w-full h-[320px] flex items-center justify-center"
        style={{ perspective: '1200px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {organizers.map((organizer, index) => {
          const offset = index - currentIndex;
          const normalizedOffset = ((offset + organizers.length + Math.floor(organizers.length / 2)) % organizers.length) - Math.floor(organizers.length / 2);
          
          const isActive = index === currentIndex;
          
          // Fan logic using rotateY and rotateZ
          const xOffset = normalizedOffset * 60;
          const rotateZ = shouldReduceMotion ? 0 : normalizedOffset * 8;
          const rotateY = shouldReduceMotion ? 0 : normalizedOffset * -15; // 3D depth
          const scale = isActive ? 1.15 : 0.9;
          const zIndex = isActive ? 30 : 20 - Math.abs(normalizedOffset);
          const opacity = Math.abs(normalizedOffset) > 2 ? 0 : 1;

          return (
            <motion.div
              key={organizer.id}
              className="absolute w-[180px] md:w-[220px] cursor-pointer"
              initial={false}
              animate={{
                x: xOffset,
                rotateZ,
                rotateY,
                scale,
                zIndex,
                opacity,
              }}
              transition={{ 
                duration: shouldReduceMotion ? 0 : 0.6, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setCurrentIndex(index)}
            >
              <NeoCard className="flex flex-col text-center p-0 overflow-hidden bg-white">
                <div className="w-full h-[120px] md:h-[140px] border-b-[3px] border-black bg-gray-100">
                  <img 
                    src={organizer.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(organizer.name)}&background=random&size=200`} 
                    alt={organizer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(organizer.name)}&background=random&size=200`;
                    }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-heading font-bold text-base uppercase">{organizer.name}</h3>
                  <p className="font-body text-[11px] text-gray-500 uppercase mt-1">{organizer.role}</p>
                  <p className="font-body text-[11px] font-bold text-primary uppercase mt-1">{organizer.organization}</p>
                  {organizer.linkedin && (
                    <a
                      href={organizer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center justify-center w-8 h-8 bg-[#0077b5] border-[2px] border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                      aria-label={`${organizer.name} LinkedIn`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </NeoCard>
            </motion.div>
          );
        })}
      </div>
      
      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 md:gap-3 mt-6 z-40 relative w-full px-4">
        {/* Mobile Prev Arrow */}
        <div className="md:hidden z-40">
          <button 
            onClick={prev}
            className="p-2 bg-secondary border-[3px] border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px]"
            aria-label="Previous organizer"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex gap-3">
          {organizers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-none border-[2px] border-black transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Next Arrow */}
        <div className="md:hidden z-40">
          <button 
            onClick={next}
            className="p-2 bg-secondary border-[3px] border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px]"
            aria-label="Next organizer"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
