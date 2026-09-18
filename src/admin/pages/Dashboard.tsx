import { Link } from 'react-router-dom';
import { NeoCard } from '../../components/NeoCard';
import { Users, UserCog, Handshake, MessageCircle } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

export function Dashboard() {
  const { siteData } = useSiteData();

  const stats = [
    { label: 'Speakers', value: siteData.speakers.length, icon: Users, color: 'bg-tertiary', link: '/admin/speakers' },
    { label: 'Organizers', value: siteData.organizers.length, icon: UserCog, color: 'bg-primary', link: '/admin/organizers' },
    { label: 'Partners', value: siteData.partners.length, icon: Handshake, color: 'bg-secondary', link: '/admin/partners' },
    { label: 'FAQ Items', value: siteData.faqs.length, icon: MessageCircle, color: 'bg-warning', link: '/admin/faq' },
  ];

  const quickActions = [
    { label: 'Manage Speakers', link: '/admin/speakers' },
    { label: 'Update Hero', link: '/admin/hero' },
    { label: 'Manage Partners', link: '/admin/partners' },
    { label: 'Site Settings', link: '/admin/settings' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.link} className="block transition-transform hover:-translate-y-1">
            <NeoCard className="bg-white p-6 flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-600">{stat.label}</span>
                <div className={`p-3 border-[3px] border-black ${stat.color} shadow-neo-sm`}>
                  <stat.icon size={24} className="text-black" />
                </div>
              </div>
              <span className="font-heading text-4xl font-black">{stat.value}</span>
            </NeoCard>
          </Link>
        ))}
      </div>

      <section>
        <h3 className="font-heading text-2xl font-black mb-4 uppercase">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              to={action.link}
              className="inline-flex items-center justify-center rounded-none border-[3px] border-black font-heading font-semibold uppercase text-sm tracking-wide px-6 py-3 bg-secondary text-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px]"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
