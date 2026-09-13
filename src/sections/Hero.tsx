import { useSiteData } from '../context/SiteDataContext';
import { NeoButton } from '../components/NeoButton';
import { NeoCard } from '../components/NeoCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { useCountdown } from '../hooks/useCountdown';
import { SkiperCrowd } from '../components/SkiperCrowd';

export function Hero() {
  const { siteData } = useSiteData();
  const { event } = siteData;
  const timeLeft = useCountdown(event.countdownTarget);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pb-24 px-6 overflow-hidden bg-background">
      {/* Background Canvas — hidden on mobile */}
      <div className="absolute inset-0 z-0 hidden md:block pt-0">
        <SkiperCrowd className="w-full h-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-20">
        
        {/* Logo Cluster */}
        <ScrollReveal>
          <div className="mb-10 flex flex-col items-center select-none">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex flex-col items-center">
                <span className="font-body font-bold text-4xl tracking-tighter text-black lowercase leading-none">aws</span>
                <svg width="40" height="15" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                  <path d="M4.58333 3.33334C4.58333 3.33334 16.25 15.8333 33.75 12.5C41.875 10.9524 45.4167 3.33334 45.4167 3.33334" stroke="#FF9900" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M38.75 4.16666L46.25 2.5L46.6667 9.58333" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-5xl text-[#FF9900] uppercase tracking-wide">Student</span>
            </div>
            <h1 className="font-heading font-black text-6xl md:text-8xl text-black uppercase tracking-tight mb-4 leading-none">
              Community Day
            </h1>
            <div className="flex items-center gap-4 text-[#FF9900] font-heading font-bold text-2xl tracking-widest">
              <span>&mdash;&mdash;</span>
              <span className="uppercase">{event.location}</span>
              <span>&mdash;&mdash;</span>
            </div>

            {/* Date & Time */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-4">
              <span className="font-heading font-bold text-lg md:text-xl text-black uppercase">{event.date}</span>
              <span className="hidden sm:block text-black font-bold">|</span>
              <span className="font-mono font-bold text-lg md:text-xl text-primary">{event.time}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Tagline Card */}
        <ScrollReveal delay={0.1}>
          <NeoCard className="mb-12 max-w-2xl bg-white mx-auto">
            <p className="font-body text-xl md:text-2xl text-textPrimary font-medium">
              {event.tagline}
            </p>
          </NeoCard>
        </ScrollReveal>

        {/* Buttons */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-6 mb-20 w-full sm:w-auto">
            <NeoButton variant="primary" href={event.primaryButtonLink} className="w-full sm:w-auto">
              {event.primaryButtonText}
            </NeoButton>
            <NeoButton variant="secondary" href={event.secondaryButtonLink} disabled={event.secondaryButtonDisabled} className="w-full sm:w-auto">
              {event.secondaryButtonText}
            </NeoButton>
          </div>
        </ScrollReveal>

        {/* Countdown */}
        <ScrollReveal delay={0.3}>
          <div className="w-full max-w-3xl">
            <p className="font-heading font-bold text-sm uppercase tracking-widest text-center mb-4">
              Event Begins In
            </p>
            <div className="bg-secondary border-[3px] border-black shadow-neo p-3 md:p-8 rounded-none grid grid-cols-4 gap-2 md:gap-8">
              <CountdownBox value={formatNumber(timeLeft.days)} label="Days" />
              <CountdownBox value={formatNumber(timeLeft.hours)} label="Hours" />
              <CountdownBox value={formatNumber(timeLeft.minutes)} label="Minutes" />
              <CountdownBox value={formatNumber(timeLeft.seconds)} label="Seconds" />
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

function CountdownBox({ value, label }: { value: string, label: string }) {
  return (
    <div className="flex flex-col items-center w-full">
      <NeoCard className="p-2 md:p-6 w-full flex items-center justify-center mb-2 md:mb-3">
        <span className="font-mono font-bold text-2xl md:text-5xl text-black">{value}</span>
      </NeoCard>
      <span className="font-heading font-bold text-[10px] md:text-sm uppercase tracking-wider text-black">{label}</span>
    </div>
  );
}
