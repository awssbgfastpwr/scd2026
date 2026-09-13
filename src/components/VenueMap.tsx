import { NeoCard } from './NeoCard';

interface VenueMapProps {
  venueName: string;
  address: string;
  embedUrl?: string;
}

export function VenueMap({ venueName, address, embedUrl }: VenueMapProps) {
  if (!address && !venueName && !embedUrl) return null;

  const query = encodeURIComponent(`${venueName} ${address}`);
  const isDefaultEmbed = embedUrl?.includes('ui-avatars.com');

  const finalUrl = (embedUrl && !isDefaultEmbed)
    ? embedUrl
    : `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <NeoCard className="w-full h-[400px] md:h-[500px] p-0 !overflow-hidden">
      <iframe
        src={finalUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${venueName}`}
      />
    </NeoCard>
  );
}
