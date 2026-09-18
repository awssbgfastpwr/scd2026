import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NeoButton } from './NeoButton';
import { useSiteData } from '../context/SiteDataContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { siteData } = useSiteData();
  const { settings, event } = siteData;

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Partners', href: '#partners' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Organizers', href: '#team' },
    { name: 'Venue', href: '#venue' },
    { name: 'FAQ', href: '#faq' },
  ];

  // Close mobile menu after a tick so the scroll anchor fires first
  const closeMobileMenu = () => setTimeout(() => setIsOpen(false), 100);

  return (
    <nav className="sticky top-0 z-50 bg-secondary border-b-[3px] border-black shadow-[0px_4px_0px_0px_#000] rounded-none w-full">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/aws-logo-navbar.png`} 
            alt="AWS Student Builder Group FAST PWR" 
            className="h-14 w-auto"
          />
        </div>

        {/* Right: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-heading font-semibold uppercase text-[14px] text-textPrimary hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          {settings.registrationOpen ? (
            <NeoButton variant="primary" href={event.secondaryButtonLink}>
              Register Now
            </NeoButton>
          ) : (
            <NeoButton variant="secondary" disabled>
              Registration Closed
            </NeoButton>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 rounded-none border-[3px] border-black shadow-neo-sm bg-white"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-secondary flex flex-col p-6 rounded-none">
          <div className="flex justify-end">
            <button 
              className="p-2 rounded-none border-[3px] border-black shadow-neo-sm bg-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={closeMobileMenu}
                className="font-heading font-bold uppercase text-3xl text-textPrimary hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            {settings.registrationOpen ? (
              <NeoButton variant="primary" href={event.secondaryButtonLink} onClick={closeMobileMenu} className="mt-4">
                Register Now
              </NeoButton>
            ) : (
              <NeoButton variant="secondary" disabled className="mt-4">
                Registration Closed
              </NeoButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
