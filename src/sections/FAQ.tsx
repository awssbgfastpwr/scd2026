import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { NeoBadge } from '../components/NeoBadge';
import { NeoCard } from '../components/NeoCard';
import { cn } from '../lib/utils';

export function FAQ() {
  const { siteData } = useSiteData();
  const faqs = siteData.faqs.filter(f => f.isPublished);
  const visibleFaqs = faqs.filter(f => f.isPublished).sort((a, b) => a.displayOrder - b.displayOrder);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="pb-24 px-6 bg-secondary border-b-[3px] border-black">
      <div className="max-w-4xl mx-auto flex flex-col items-center pt-20">
        
        <NeoBadge variant="primary" className="mb-6">
          GOT QUESTIONS?
        </NeoBadge>
        
        <h2 className="font-heading font-black text-4xl md:text-5xl uppercase leading-tight mb-12 text-center">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="w-full flex flex-col gap-4">
          {visibleFaqs.map((faq, index) => (
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onToggle }: { faq: any, isOpen: boolean, onToggle: () => void }) {
  return (
    <NeoCard className="p-0 overflow-hidden cursor-pointer" onClick={onToggle}>
      <div className="p-6 flex items-center justify-between gap-4 select-none">
        <h3 className="font-heading font-semibold text-base md:text-lg">
          {faq.question}
        </h3>
        <ChevronDown className={cn("w-6 h-6 flex-shrink-0 transition-transform duration-300", isOpen && "rotate-180")} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="p-4 font-bold text-gray-700">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </NeoCard>
  );
}
