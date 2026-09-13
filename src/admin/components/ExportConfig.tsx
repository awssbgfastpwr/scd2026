import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { NeoButton } from '../../components/NeoButton';
import { Toast } from './Toast';
import type { SiteData } from '../../data/siteData';

interface ExportConfigProps {
  data: SiteData;
  lastSaved?: string;
  onDiscard?: () => void;
}

export function ExportConfig({ data, lastSaved = 'Never', onDiscard }: ExportConfigProps) {
  const [showToast, setShowToast] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleExport = async () => {
    const fileContent = `export const defaultSiteData: SiteData = ${JSON.stringify(data, null, 2)};\n`;
    
    try {
      await navigator.clipboard.writeText(fileContent);
      setIsCopied(true);
      setShowToast(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
      alert('Failed to copy to clipboard. Check console for details.');
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white border-t-[3px] border-black shadow-[0px_-6px_0px_0px_#000] rounded-none p-4 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-bold text-gray-500">Last saved: {lastSaved}</p>
          
          <div className="flex gap-4 w-full sm:w-auto">
            {onDiscard && (
              <NeoButton onClick={onDiscard} variant="secondary" className="flex-1 sm:flex-none">
                Discard
              </NeoButton>
            )}
            <NeoButton 
              onClick={handleExport} 
              variant="primary" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2"
            >
              {isCopied ? <Check size={20} /> : <Copy size={20} />}
              {isCopied ? 'Copied!' : 'Export Config'}
            </NeoButton>
          </div>
        </div>
      </div>
      
      <Toast 
        message="Copied to clipboard! Paste into src/data/siteData.ts" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  );
}
