import { useSiteData } from '../context/SiteDataContext';
import type { Speaker } from '../data/siteData';
import { NeoBadge } from '../components/NeoBadge';
import { ScrollReveal } from '../components/ScrollReveal';
import { StaggerContainer } from '../components/StaggerContainer';
import { StaggerItem } from '../components/StaggerItem';

export function Speakers() {
  const { siteData } = useSiteData();
  const speakers = siteData.speakers;

  const panelSpeakers = speakers.filter(s => s.sessionType === 'panel' && s.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);
  const workshopSpeakers = speakers.filter(s => s.sessionType === 'workshop' && s.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);
  const keynoteSpeakers = speakers.filter(s => s.sessionType === 'keynote' && s.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="speakers" className="pb-24 px-6 bg-tertiary border-b-[3px] border-black relative">
      <div id="agenda" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto pt-20">
        <div className="text-center mb-16">
          <ScrollReveal>
            <NeoBadge variant="primary" className="mb-6">
              SESSIONS & SPEAKERS
            </NeoBadge>
            <h2 className="font-heading font-black text-4xl md:text-6xl uppercase leading-tight mb-4">
              Featured Speakers
            </h2>
            <p className="font-body text-lg text-textSecondary max-w-2xl mx-auto">
              Learn from industry leaders, AWS Community Builders, and cloud innovators.
            </p>
          </ScrollReveal>
        </div>
        {/* Panelists */}
        {panelSpeakers.length > 0 && (
          <div className="mb-12">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4 border-b-[3px] border-black pb-2">
                <div className="w-8 h-8 bg-secondary border-[2px] border-black shadow-neo-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="square" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path strokeLinecap="square" d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path strokeLinecap="square" d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-2xl uppercase">Panelists</h3>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {panelSpeakers.map(speaker => (
                <StaggerItem key={speaker.id}>
                  <SpeakerCard speaker={speaker} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Workshop Speakers */}
        {workshopSpeakers.length > 0 && (
          <div className="mb-12">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4 border-b-[3px] border-black pb-2">
                <div className="w-8 h-8 bg-primary border-[2px] border-black shadow-neo-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="square" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-2xl uppercase">Workshop Speakers</h3>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {workshopSpeakers.map(speaker => (
                <StaggerItem key={speaker.id}>
                  <SpeakerCard speaker={speaker} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Keynote Speakers */}
        {keynoteSpeakers.length > 0 && (
          <div className="mb-12">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4 border-b-[3px] border-black pb-2">
                <div className="w-8 h-8 bg-tertiary border-[2px] border-black shadow-neo-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-2xl uppercase">Keynote Speakers</h3>
              </div>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {keynoteSpeakers.map(speaker => (
                <StaggerItem key={speaker.id}>
                  <SpeakerCard speaker={speaker} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>
    </section>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="group w-full relative bg-white border-[3px] border-black shadow-neo rounded-none overflow-hidden hover:-translate-y-1 hover:shadow-neo-hover transition-transform flex flex-col h-full">
      {speaker.socialLinkedin && (
        <a
          href={speaker.socialLinkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-[#0077b5] border-[2px] border-black shadow-neo-sm flex items-center justify-center hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
          aria-label={`${speaker.name} LinkedIn`}
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      )}
      <div className="relative w-full h-[180px] md:h-[200px] border-b-[3px] border-black bg-gray-100 overflow-hidden">
        <img 
          src={speaker.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random&size=400`} 
          alt={speaker.name} 
          width="400"
          height="400"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random&size=400`;
          }}
        />
      </div>
      <div className="p-3 flex-grow flex flex-col justify-between rounded-none">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="font-heading font-bold text-base uppercase leading-tight mb-1 line-clamp-1" title={speaker.name}>{speaker.name}</h3>
            <p className="font-body text-xs uppercase line-clamp-2 font-bold text-gray-700" title={`${speaker.role} ${speaker.company !== 'TBD' ? `• ${speaker.company}` : ''}`}>
              {speaker.role} {speaker.company !== 'TBD' && `• ${speaker.company}`}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t-[2px] border-black">
            <span className="inline-block bg-black text-white text-[9px] font-bold px-1.5 py-0.5 uppercase mb-1">Session</span>
            <p className="font-body text-[11px] font-medium leading-tight line-clamp-2 text-black">{speaker.sessionTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
