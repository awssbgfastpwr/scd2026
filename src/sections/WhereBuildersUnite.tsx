import { useSiteData } from '../context/SiteDataContext';
import { NeoCard } from '../components/NeoCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { StaggerContainer } from '../components/StaggerContainer';
import { StaggerItem } from '../components/StaggerItem';

export function WhereBuildersUnite() {
  const { siteData } = useSiteData();
  const { event } = siteData;

  return (
    <section id="about" className="pb-24 px-6 bg-white border-b-[3px] border-black">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20">
          
          {/* Left Column */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col">
              <h2 className="font-heading font-black text-5xl md:text-6xl uppercase leading-tight mb-8">
                WHERE BUILDERS <br/> <span className="text-primary">UNITE.</span>
              </h2>
              <p className="font-body text-lg md:text-xl text-textSecondary leading-relaxed mb-6">
                Join hundreds of students, developers, and cloud enthusiasts at the largest student-run AWS conference in Pakistan. Discover the latest in cloud computing, generative AI, and serverless architectures.
              </p>
              <p className="font-body text-lg md:text-xl text-textSecondary leading-relaxed">
                Whether you are writing your first Lambda function or architecting multi-region applications, this is the place to learn, network, and build the future.
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column */}
          <StaggerContainer className="flex flex-col gap-8 relative">
            
            <StaggerItem>
              <NeoCard bg="bg-secondary" className="relative z-10 rotate-1 hover:rotate-0 transition-transform origin-bottom-left">
                <h3 className="font-heading font-bold text-2xl uppercase mb-4 border-b-[3px] border-black pb-4 inline-block w-full">Schedule</h3>
                <p className="font-mono text-xl font-bold">{event.date}</p>
                <p className="font-mono text-lg text-textSecondary mt-2">{event.time}</p>
              </NeoCard>
            </StaggerItem>
  
            <StaggerItem>
              <NeoCard bg="bg-tertiary" className="relative z-10 -rotate-1 hover:rotate-0 transition-transform origin-top-right">
                <h3 className="font-heading font-bold text-2xl uppercase mb-4 border-b-[3px] border-black pb-4 inline-block w-full">Coordinates</h3>
                <p className="font-mono text-xl font-bold">{event.venueName}</p>
                <p className="font-mono text-lg text-black mt-2">{event.venueAddress}, {event.location}</p>
              </NeoCard>
            </StaggerItem>
  
            {/* Building Placeholder */}
            <StaggerItem>
              <div className="mt-8 relative z-0 w-full flex justify-center">
                <div className="bg-background border-[3px] border-black p-4 w-full max-w-md mx-auto shadow-neo rounded-none">
                  <img 
                    src="/images/hero-building.png" 
                    alt="Building Illustration" 
                    width="600"
                    height="400"
                    className="w-full h-auto object-contain border-[3px] border-black rounded-none"
                  />
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

        </div>
      </ScrollReveal>
    </section>
  );
}
