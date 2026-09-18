import { useSiteData } from '../context/SiteDataContext';
import { ScrollReveal } from '../components/ScrollReveal';

export function Partners() {
  const { siteData } = useSiteData();
  const partners = siteData.partners
    .filter(p => p.isVisible)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  
  // Triple duplicate for seamless infinite loop
  const duplicated = [...partners, ...partners, ...partners];

  return (
    <section id="partners" className="bg-cream border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 pb-20 pt-20">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-accent border-[3px] border-black font-heading text-xs font-bold uppercase tracking-wider mb-4">
              Collaboration
            </span>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight">
              Community &amp; Partners
            </h2>
          </div>
        </ScrollReveal>

        {/* Marquee Container — intentionally outside ScrollReveal so animation isn't gated */}
        <div className="relative w-full overflow-hidden py-6 marquee-pause">
          <div className="flex gap-4 md:gap-6 w-max animate-marquee">
              {duplicated.map((partner, index) => {
                const hasValidUrl = partner.websiteUrl && partner.websiteUrl !== '#';
                const cardClasses = "flex-shrink-0 w-[180px] md:w-[200px] block bg-white border-[3px] border-black shadow-neo hover:shadow-neo-hover hover:-translate-y-1 transition-all cursor-pointer text-inherit";
                
                const innerContent = (
                  <>
                    {/* Logo/Image */}
                    <div className="w-full h-[100px] md:h-[120px] border-b-[3px] border-black bg-gray-100 flex items-center justify-center overflow-hidden">
                      {partner.logoUrl ? (
                        <img 
                          src={partner.logoUrl} 
                          alt={partner.name}
                          className="w-full h-full object-cover"
                          width={200}
                          height={120}
                          loading="lazy"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center text-3xl font-heading font-black text-black"
                          style={{ backgroundColor: '#FFD700' }}
                        >
                          {partner.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    {/* Text */}
                    <div className="p-3 text-center">
                      <h3 className="font-heading font-bold text-xs uppercase">{partner.name}</h3>
                      {partner.tagline && (
                        <p className="font-body text-[10px] text-gray-500 uppercase mt-1">{partner.tagline}</p>
                      )}
                    </div>
                  </>
                );

                if (hasValidUrl) {
                  return (
                    <a
                      key={`${partner.id}-${index}`}
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClasses}
                    >
                      {innerContent}
                    </a>
                  );
                }

                return (
                  <div
                    key={`${partner.id}-${index}`}
                    className={cardClasses}
                  >
                    {innerContent}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
