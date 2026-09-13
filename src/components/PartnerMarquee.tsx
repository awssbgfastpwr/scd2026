import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Partner } from '../data/siteData';

interface PartnerMarqueeProps {
  partners: Partner[];
}

export function PartnerMarquee({ partners }: PartnerMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate for seamless loop
  const duplicated = [...partners, ...partners, ...partners];

  return (
    <div 
      className="relative w-full overflow-hidden py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4 md:gap-6 w-max"
        animate={{ x: isPaused ? undefined : [0, -200 * partners.length] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((partner, index) => {
          return (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 w-[180px] md:w-[220px] bg-white border-[3px] border-black shadow-neo hover:shadow-neo-hover hover:-translate-y-1 transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="w-full h-[100px] md:h-[120px] border-b-[3px] border-black bg-gray-100 flex items-center justify-center overflow-hidden">
                {partner.logoUrl && (
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name}
                    className="w-full h-full object-cover"
                    width={220}
                    height={120}
                    loading="lazy"
                  />
                )}
              </div>
              
              {/* Text */}
              <div className="p-3 text-center">
                <h3 className="font-heading font-bold text-xs text-black uppercase">{partner.name}</h3>
                {partner.tagline && <p className="font-body text-xs text-gray-500 uppercase mt-1">{partner.tagline}</p>}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
