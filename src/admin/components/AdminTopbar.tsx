import { useState } from 'react';
import { Menu, ExternalLink, Copy, Check } from 'lucide-react';
import { NeoButton } from '../../components/NeoButton';
import { useSiteData } from '../../context/SiteDataContext';
import { Toast } from './Toast';

interface AdminTopbarProps {
  onMenuClick: () => void;
  title: string;
}

export function AdminTopbar({ onMenuClick, title }: AdminTopbarProps) {
  const { siteData } = useSiteData();
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleExport = async () => {
    const fileContent = `export const defaultSiteData: SiteData = ${JSON.stringify(siteData, null, 2)};\n`;
    try {
      await navigator.clipboard.writeText(fileContent);
      setIsCopied(true);
      setShowToast(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy config to clipboard', err);
    }
  };

  return (
    <header className="h-16 bg-white border-b-[3px] border-black shadow-[0px_4px_0px_0px_#000] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          aria-label="Toggle sidebar menu"
          className="lg:hidden p-2 hover:bg-secondary border-[3px] border-transparent hover:border-black transition-colors"
        >
          <Menu size={24} />
        </button>
        <h2 className="font-heading text-xl md:text-2xl font-black uppercase">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <NeoButton 
          onClick={handleExport}
          variant="primary" 
          className="flex items-center gap-2 text-xs py-2 px-3 sm:px-4"
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
          <span>{isCopied ? 'Copied!' : 'Export Config'}</span>
        </NeoButton>
        <NeoButton href="/" variant="secondary" className="hidden sm:flex items-center gap-2 text-xs py-2 px-3 sm:px-4">
          Preview Site <ExternalLink size={16} />
        </NeoButton>
      </div>

      <Toast 
        message="Copied defaultSiteData! Paste into src/data/siteData.ts" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </header>
  );
}
