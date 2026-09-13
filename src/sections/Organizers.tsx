import { useSiteData } from '../context/SiteDataContext';
import { NeoBadge } from '../components/NeoBadge';
import { CardFanCarousel } from '../components/CardFanCarousel';
import { ScrollReveal } from '../components/ScrollReveal';

export function Organizers() {
  const { siteData } = useSiteData();
  const { organizers } = siteData;

  const visibleOrganizers = organizers.filter(o => o.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="team" className="pb-24 px-6 bg-background border-b-[3px] border-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center pt-20">
        
        <ScrollReveal>
          <NeoBadge variant="primary" className="mb-6">
            ORGANIZERS
          </NeoBadge>
          
          <h2 className="font-heading font-black text-5xl md:text-6xl uppercase leading-tight mb-4">
            Meet The Team
          </h2>
          <p className="font-body text-lg text-textSecondary mb-16 max-w-2xl mx-auto">
            Meet the dedicated team working behind the scenes to make AWS Student Community Day Peshawar a reality.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="w-full">
          <CardFanCarousel organizers={visibleOrganizers} />
        </ScrollReveal>

      </div>
    </section>
  );
}
