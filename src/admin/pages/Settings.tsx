import { useState, useEffect } from 'react';
import { NeoCard } from '../../components/NeoCard';
import { defaultSiteData } from '../../data/siteData';
import { NeoInput } from '../../components/NeoInput';
import { NeoButton } from '../../components/NeoButton';
import { useSiteData } from '../../context/SiteDataContext';

export function Settings() {
  const { siteData, updateSiteData, isOverride, resetToDefaults } = useSiteData();
  const [settingsData, setSettingsData] = useState(siteData.settings);
  const [toast, setToast] = useState<{ type: string; message: string } | null>(null);
  
  useEffect(() => {
    setSettingsData(siteData.settings);
  }, [siteData.settings]);

  const showToast = (type: string, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    updateSiteData({ settings: settingsData });
    showToast('success', 'Settings saved!');
  };

  const handleReset = () => {
    resetToDefaults();
    setSettingsData(defaultSiteData.settings);
    showToast('info', 'Reset to defaults');
  };

  const handleUpdate = (field: keyof typeof settingsData, value: string | number | boolean) => {
    setSettingsData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  return (
    <div className="flex flex-col gap-8">
      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <NeoButton variant="primary" onClick={handleSave}>
          Save Changes
        </NeoButton>
        {isOverride && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-danger text-white border-[3px] border-black shadow-neo-sm font-heading text-xs uppercase rounded-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Reset to Defaults
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="flex flex-col gap-8">


          <NeoCard className="bg-white p-6">
            <h3 className="font-heading text-2xl font-black mb-6 uppercase">Social Links</h3>
            <div className="flex flex-col gap-4">
              <NeoInput 
                label="Meetup" 
                value={settingsData.socialTwitter} 
                onChange={(e) => handleUpdate('socialTwitter', e.target.value)} 
              />
              <NeoInput 
                label="LinkedIn" 
                value={settingsData.socialLinkedin} 
                onChange={(e) => handleUpdate('socialLinkedin', e.target.value)} 
              />
              <NeoInput 
                label="Instagram" 
                value={settingsData.socialInstagram} 
                onChange={(e) => handleUpdate('socialInstagram', e.target.value)} 
              />
              <NeoInput 
                label="GitHub" 
                value={settingsData.socialGithub} 
                onChange={(e) => handleUpdate('socialGithub', e.target.value)} 
              />
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
