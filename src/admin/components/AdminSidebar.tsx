import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Type, 
  Users, 
  Handshake, 
  HelpCircle, 
  UsersRound,
  MapPin,
  Settings,
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/hero', icon: Type, label: 'Hero Editor' },
  { path: '/admin/speakers', icon: Users, label: 'Speakers' },
  { path: '/admin/partners', icon: Handshake, label: 'Partners' },
  { path: '/admin/faq', icon: HelpCircle, label: 'FAQ' },
  { path: '/admin/organizers', icon: UsersRound, label: 'Organizers' },
  { path: '/admin/venue', icon: MapPin, label: 'Venue' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const location = useLocation();
  const { logout } = useAdminAuth();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed top-0 left-0 bottom-0 w-[260px] bg-footer text-white z-50
        flex flex-col border-r-[3px] border-black transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b-[3px] border-black flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-black">AWS SCD</h1>
            <p className="text-sm font-bold text-gray-400 tracking-widest">CMS</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={`
                  flex items-center gap-3 px-4 py-3 font-bold transition-colors
                  ${isActive 
                    ? 'border-l-[3px] border-black bg-secondary text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10 border-l-[3px] border-transparent'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-black' : ''} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-[3px] border-black">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 w-full font-bold text-red-400 hover:text-white hover:bg-red-500 hover:border-black hover:border-[3px] transition-colors text-left"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
