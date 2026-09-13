import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('hero')) return 'Hero Editor';
    if (path.includes('speakers')) return 'Speakers Manager';
    if (path.includes('partners')) return 'Partners Manager';
    if (path.includes('faq')) return 'FAQ Manager';
    if (path.includes('organizers')) return 'Organizers Manager';
    if (path.includes('venue')) return 'Venue Editor';
    if (path.includes('settings')) return 'Settings';
    return 'CMS Admin';
  };

  return (
    <div className="min-h-screen bg-background font-body text-textPrimary flex">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen overflow-hidden">
        <AdminTopbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          title={getPageTitle()} 
        />
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-background pb-32">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
