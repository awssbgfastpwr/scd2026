import { useState } from 'react';
import { Menu, ExternalLink, Copy, Check, UploadCloud, Loader2 } from 'lucide-react';
import { NeoButton } from '../../components/NeoButton';
import { useSiteData } from '../../context/SiteDataContext';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { commitSiteDataToGitHub } from '../services/github';
import { Toast } from './Toast';

interface AdminTopbarProps {
  onMenuClick: () => void;
  title: string;
}

export function AdminTopbar({ onMenuClick, title }: AdminTopbarProps) {
  const { siteData } = useSiteData();
  const { token, user } = useAdminAuth();
  const [isCopied, setIsCopied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const getExportContent = () => {
    return `import type { SiteData } from './siteData';\n\nexport const defaultSiteData: SiteData = ${JSON.stringify(
      siteData,
      null,
      2
    )};\n`;
  };

  const handleExport = async () => {
    try {
      await navigator.clipboard.writeText(getExportContent());
      setIsCopied(true);
      displayToast('Copied defaultSiteData! Paste into src/data/siteData.ts');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy config to clipboard', err);
    }
  };

  const handlePublishToGitHub = async () => {
    if (!token) {
      displayToast('Please login with a GitHub token to publish directly.');
      return;
    }

    setIsPublishing(true);
    try {
      // Re-construct the clean siteData.ts file with TypeScript types intact
      const content = `export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  sessionTitle: string;
  sessionType: 'panel' | 'workshop' | 'keynote';
  bio: string;
  photoUrl: string;
  socialTwitter?: string;
  socialLinkedin?: string;
  socialGithub?: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface Partner {
  id: string;
  name: string;
  tagline: string;
  websiteUrl: string;
  logoUrl: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface Organizer {
  id: string;
  name: string;
  role: string;
  organization: string;
  photoUrl: string;
  linkedin?: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface SiteData {
  event: {
    title: string;
    location: string;
    tagline: string;
    date: string;
    time: string;
    countdownTarget: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonDisabled: boolean;
    secondaryButtonLink: string;
    venueName: string;
    venueAddress: string;
    venueCity: string;
    venueProvince: string;
    venuePostalCode: string;
    venueCountry: string;
    venueMapEmbedUrl: string;
    venueLatitude: number;
    venueLongitude: number;
  };
  speakers: Speaker[];
  partners: Partner[];
  organizers: Organizer[];
  faqs: FAQ[];
  settings: {
    registrationOpen: boolean;
    maxCapacity: number;
    currentRegistrations: number;
    socialInstagram: string;
    socialTwitter: string;
    socialLinkedin: string;
    socialGithub: string;
    footerCopyright: string;
    footerCredits: string;
    seoTitle: string;
    seoDescription: string;
  };
}

export const defaultSiteData: SiteData = ${JSON.stringify(siteData, null, 2)};
`;

      await commitSiteDataToGitHub(
        token,
        content,
        `chore(cms): update site content by @${user?.login || 'admin'}`
      );

      displayToast('Successfully committed to GitHub! Actions build started.');
    } catch (err: any) {
      displayToast(`Failed to publish: ${err.message}`);
    } finally {
      setIsPublishing(false);
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
        {/* Direct GitHub Commit Button */}
        <button
          onClick={handlePublishToGitHub}
          disabled={isPublishing}
          className="inline-flex items-center gap-2 text-xs py-2 px-3 sm:px-4 bg-primary text-black font-heading font-black uppercase border-[3px] border-black shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
        >
          {isPublishing ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          <span>{isPublishing ? 'Publishing...' : 'Publish to GitHub'}</span>
        </button>

        {/* Copy fallback */}
        <NeoButton 
          onClick={handleExport}
          variant="ghost" 
          className="hidden md:flex items-center gap-2 text-xs py-2 px-3 sm:px-4"
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
          <span>{isCopied ? 'Copied!' : 'Export Config'}</span>
        </NeoButton>

        {/* Preview Link */}
        <NeoButton href={import.meta.env.BASE_URL} variant="secondary" className="hidden sm:flex items-center gap-2 text-xs py-2 px-3 sm:px-4">
          Preview Site <ExternalLink size={16} />
        </NeoButton>
      </div>

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </header>
  );
}
