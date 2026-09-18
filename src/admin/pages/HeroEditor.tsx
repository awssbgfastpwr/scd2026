import { useState, useEffect } from 'react';
import { NeoCard } from '../../components/NeoCard';
import { NeoInput } from '../../components/NeoInput';

import { defaultSiteData } from '../../data/siteData';
import { useSiteData } from '../../context/SiteDataContext';

export function HeroEditor() {
  const { siteData, updateSiteData, isOverride, resetToDefaults } = useSiteData();
  const [heroData, setHeroData] = useState(siteData.event);
  const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    setHeroData(siteData.event);
  }, [siteData.event]);

  const handleSave = () => {
    updateSiteData({ event: heroData } as any);
    setToast({ type: 'success', message: 'Hero section saved!' });
    setTimeout(() => setToast(null), 3000);
  };
  
  const syncCountdownTarget = (dateStr: string, timeStr: string) => {
    try {
      // Parse display date: e.g. "October 7th, 2026" -> remove th/st/nd/rd
      const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/gi, '$1').trim();
      const parsed = new Date(cleaned);
      if (isNaN(parsed.getTime())) return;
  
      // Parse display time: "9AM — 4PM" → extract start hour
      const timeMatch = timeStr.match(/(\d{1,2})\s*(AM|PM)/i);
      let hours = 10; // default fallback
      if (timeMatch) {
        hours = parseInt(timeMatch[1], 10);
        const period = timeMatch[2].toUpperCase();
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
      }
      parsed.setHours(hours, 0, 0, 0);
  
      // Build ISO string with PKT offset (+05:00)
      const pad = (n: number) => String(n).padStart(2, '0');
      const iso = `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}T${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(parsed.getSeconds())}+05:00`;
      
      setHeroData(prev => {
        const updated = { ...prev, countdownTarget: iso };
        updateSiteData({ event: updated } as any);
        return updated;
      });
    } catch {
      // Silent fail — user can manually edit countdown target
    }
  };
  
  const handleDateChange = (value: string) => {
    setHeroData(prev => {
      const updated = { ...prev, date: value };
      updateSiteData({ event: updated } as any);
      return updated;
    });
    // Auto-sync countdown target
    syncCountdownTarget(value, heroData.time);
  };
  
  const handleTimeChange = (value: string) => {
    setHeroData(prev => {
      const updated = { ...prev, time: value };
      updateSiteData({ event: updated } as any);
      return updated;
    });
    // Auto-sync countdown target
    syncCountdownTarget(heroData.date, value);
  };

  const handleUpdate = (field: keyof typeof heroData, value: string | boolean) => {
    setHeroData(prev => {
      const updated = { ...prev, [field]: value };
      updateSiteData({ event: updated } as any);
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-success text-white border-[3px] border-black shadow-neo-sm font-heading text-xs uppercase rounded-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Save Changes
        </button>
        {isOverride && (
          <button
            onClick={() => {
              resetToDefaults();
              setHeroData(defaultSiteData.event);
              setToast({ type: 'info', message: 'Reset to defaults' });
              setTimeout(() => setToast(null), 3000);
            }}
            className="px-4 py-2 bg-danger text-white border-[3px] border-black shadow-neo-sm font-heading text-xs uppercase rounded-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Reset to Defaults
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <NeoCard className="bg-white p-6">
            <h3 className="font-heading text-2xl font-black mb-6 uppercase">Main Content</h3>
            <div className="flex flex-col gap-4">
              <NeoInput 
                label="Event Title" 
                value={heroData.title} 
                onChange={(e) => handleUpdate('title', e.target.value)} 
              />
              <NeoInput 
                label="Location (Header)" 
                value={heroData.location} 
                onChange={(e) => handleUpdate('location', e.target.value)} 
              />
              <div className="flex flex-col gap-2">
                <label className="font-heading font-black text-lg uppercase">Tagline</label>
                <textarea className="rounded-none w-full p-3 border-[3px] border-black shadow-neo-sm font-bold outline-none focus:shadow-neo-hover transition-all min-h-[100px]"
                  value={heroData.tagline}
                  onChange={(e) => handleUpdate('tagline', e.target.value)}
                />
              </div>
            </div>
          </NeoCard>

          <NeoCard className="bg-white p-6">
            <h3 className="font-heading text-2xl font-black mb-6 uppercase">Buttons & Actions</h3>
            <div className="flex flex-col gap-4">
              <NeoInput 
                label="Primary Button Text" 
                value={heroData.primaryButtonText} 
                onChange={(e) => handleUpdate('primaryButtonText', e.target.value)} 
              />
              <NeoInput 
                label="Primary Button Link" 
                value={heroData.primaryButtonLink} 
                onChange={(e) => handleUpdate('primaryButtonLink', e.target.value)} 
              />
              <NeoInput 
                label="Secondary Button Text" 
                value={heroData.secondaryButtonText} 
                onChange={(e) => handleUpdate('secondaryButtonText', e.target.value)} 
              />
              <NeoInput 
                label="Secondary Button Link" 
                value={heroData.secondaryButtonLink} 
                onChange={(e) => handleUpdate('secondaryButtonLink', e.target.value)} 
                placeholder="https://example.com"
              />
              <div className="flex items-center gap-4 mt-2">
                <input 
                  type="checkbox" 
                  id="secondaryDisabled" 
                  className="w-6 h-6 border-[3px] border-black accent-primary"
                  checked={heroData.secondaryButtonDisabled}
                  onChange={(e) => handleUpdate('secondaryButtonDisabled', e.target.checked)}
                />
                <label htmlFor="secondaryDisabled" className="font-bold cursor-pointer">
                  Disable Secondary Button
                </label>
              </div>
            </div>
          </NeoCard>
        </div>

        <div className="flex flex-col gap-8">
          <NeoCard className="bg-white p-6">
            <h3 className="font-heading text-2xl font-black mb-6 uppercase">Timing</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <NeoInput 
                  label="Display Date" 
                  value={heroData.date} 
                  onChange={(e) => handleDateChange(e.target.value)} 
                />
                <NeoInput 
                  label="Display Time" 
                  value={heroData.time} 
                  onChange={(e) => handleTimeChange(e.target.value)} 
                />
              </div>
              <NeoInput 
                label="Countdown Target Date (ISO)" 
                value={heroData.countdownTarget} 
                onChange={(e) => handleUpdate('countdownTarget', e.target.value)} 
                placeholder="2026-09-09T10:00:00+05:00"
              />
              <p className="text-xs text-textSecondary mt-1 font-body">
                Auto-synced from Display Date & Time. Edit manually only if needed.
              </p>
            </div>
          </NeoCard>
        </div>
      </div>
      
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 border-[3px] border-black shadow-neo font-heading font-bold text-sm uppercase rounded-none ${
          toast.type === 'success' ? 'bg-success text-white' : 'bg-primary text-white'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
