import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NeoButton } from './NeoButton';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Partners', href: '#partners' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Organizers', href: '#team' },
    { name: 'Venue', href: '#venue' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleAdminClick = () => {
    window.location.href = '/admin/login';
  };

  return (
    <nav className="sticky top-0 z-50 bg-secondary border-b-[3px] border-black shadow-[0px_4px_0px_0px_#000] rounded-none w-full">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img 
            src="/images/aws-logo-navbar.png" 
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
          <NeoButton variant="primary" href="#home">Register Now</NeoButton>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 rounded-none border-[3px] border-black shadow-neo-sm bg-white"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Hidden Admin Button */}
        <button 
          onClick={handleAdminClick} 
          className="absolute top-2 right-2 w-1 h-1 opacity-0 cursor-default"
          aria-label="Admin Login"
        />
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
                onClick={() => setIsOpen(false)}
                className="font-heading font-bold uppercase text-3xl text-textPrimary hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <NeoButton variant="primary" href="#home" onClick={() => setIsOpen(false)} className="mt-4">
              Register Now
            </NeoButton>
          </div>
        </div>
      )}
    </nav>
  );
}
