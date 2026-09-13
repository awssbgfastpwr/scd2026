import { useSiteData } from '../context/SiteDataContext';
import { NeoBadge } from '../components/NeoBadge';
import { NeoButton } from '../components/NeoButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { VenueMap } from '../components/VenueMap';
export function Venue() {
  const { siteData } = useSiteData();
  const { event } = siteData;

  return (
    <section id="venue" className="pb-24 px-6 bg-white border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center pt-20">
        
        {/* Left Column: Details */}
        <ScrollReveal>
          <div className="w-full md:w-1/3 flex flex-col items-start">
            <NeoBadge variant="primary" className="mb-6">
              VENUE LOCATION
            </NeoBadge>
            
            <h2 className="font-heading font-black text-5xl md:text-6xl uppercase leading-tight mb-2">
              {event.venueName}.
            </h2>
            <h3 className="font-heading font-bold text-3xl text-textSecondary uppercase mb-6">
              {event.venueCity}, {event.venueProvince}.
            </h3>
            
            <div className="font-body text-lg text-textPrimary mb-8">
              <p>{event.venueAddress}</p>
              <p>{event.venueCity}, {event.venueProvince} {event.venuePostalCode}</p>
              <p>{event.venueCountry}</p>
            </div>
  
            <NeoButton variant="teal" href={`https://maps.google.com/?q=${encodeURIComponent(event.venueName + ' ' + event.venueAddress)}`} target="_blank" rel="noopener noreferrer">
              NAVIGATE VENUE &rarr;
            </NeoButton>
          </div>
        </ScrollReveal>

        {/* Right Column: Map */}
        <div className="w-full md:w-2/3">
          <div className="w-full">
            <VenueMap
              venueName={event.venueName}
              address={`${event.venueAddress}, ${event.venueCity}, ${event.venueProvince} ${event.venuePostalCode}, ${event.venueCountry}`}
              embedUrl={event.venueMapEmbedUrl}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
