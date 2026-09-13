import { NeoCard } from '../../components/NeoCard';
import { NeoButton } from '../../components/NeoButton';
import { Users, UserCog, Handshake, MessageCircle } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

export function Dashboard() {
  const { siteData } = useSiteData();

  const stats = [
    { label: 'Speakers', value: siteData.speakers.length, icon: Users, color: 'bg-tertiary' },
    { label: 'Organizers', value: siteData.organizers.length, icon: UserCog, color: 'bg-primary' },
    { label: 'Partners', value: siteData.partners.length, icon: Handshake, color: 'bg-secondary' },
    { label: 'FAQ Items', value: siteData.faqs.length, icon: MessageCircle, color: 'bg-warning' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <NeoCard key={i} className="bg-white p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600">{stat.label}</span>
              <div className={`p-3 border-[3px] border-black ${stat.color} shadow-neo-sm`}>
                <stat.icon size={24} className="text-black" />
              </div>
            </div>
            <span className="font-heading text-4xl font-black">{stat.value}</span>
          </NeoCard>
        ))}
      </div>

      <section>
        <h3 className="font-heading text-2xl font-black mb-4 uppercase">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <NeoButton href="/admin/speakers" variant="secondary">Manage Speakers</NeoButton>
          <NeoButton href="/admin/hero" variant="secondary">Update Hero</NeoButton>
          <NeoButton href="/admin/partners" variant="secondary">Manage Partners</NeoButton>
          <NeoButton href="/admin/settings" variant="secondary">Site Settings</NeoButton>
        </div>
      </section>
    </div>
  );
}
