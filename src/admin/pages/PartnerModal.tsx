import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { NeoCard } from '../../components/NeoCard';
import { NeoInput } from '../../components/NeoInput';
import { NeoButton } from '../../components/NeoButton';
import type { Partner } from '../../data/siteData';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partner: Partner) => void;
  partner?: Partner | null;
}

export function PartnerModal({ isOpen, onClose, onSave, partner }: PartnerModalProps) {
  const [formData, setFormData] = useState<Omit<Partner, 'id'>>({
    name: '',
    tagline: '',
    websiteUrl: '',
    logoUrl: '',
    displayOrder: 1,
    isVisible: true
  });

  useEffect(() => {
    if (partner) {
      setFormData(partner);
    } else {
      setFormData({
        name: '',
        tagline: '',
        websiteUrl: '',
        logoUrl: '',
        displayOrder: 1,
        isVisible: true
      });
    }
  }, [partner, isOpen]);

  const [error, setError] = useState('');

  const handleSaveClick = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    setError('');
    const partnerData = {
      ...formData,
      websiteUrl: formData.websiteUrl.trim() || '#',
      logoUrl: formData.logoUrl.trim(),
    };
    if (partner) {
      onSave({ ...partner, ...partnerData });
    } else {
      onSave({ id: `partner-${Date.now()}`, ...partnerData });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
          >
            <NeoCard className="bg-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl font-black uppercase">
                  {partner ? 'Edit Partner' : 'Add Partner'}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 border-[3px] border-transparent hover:border-black transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 bg-gray-200 border-[3px] border-black flex items-center justify-center overflow-hidden">
                    {formData.logoUrl ? (
                      <img src={formData.logoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload size={32} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <NeoInput 
                      label="Logo URL" 
                      value={formData.logoUrl} 
                      onChange={e => setFormData({...formData, logoUrl: e.target.value})} 
                      placeholder="https://... or upload"
                      type="url"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <NeoInput 
                    label="Name" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                  <NeoInput 
                    label="Tagline" 
                    value={formData.tagline} 
                    onChange={e => setFormData({...formData, tagline: e.target.value})} 
                  />
                  <NeoInput 
                    label="Website URL" 
                    value={formData.websiteUrl} 
                    onChange={e => setFormData({...formData, websiteUrl: e.target.value})} 
                    type="url"
                  />
                  <NeoInput 
                    label="Display Order" 
                    value={String(formData.displayOrder)} 
                    onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})} 
                    type="number"
                  />
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <input 
                    type="checkbox" 
                    id="isVisible" 
                    className="w-6 h-6 border-[3px] border-black accent-primary"
                    checked={formData.isVisible}
                    onChange={e => setFormData({...formData, isVisible: e.target.checked})}
                  />
                  <label htmlFor="isVisible" className="font-bold cursor-pointer">
                    Is Visible
                  </label>
                </div>

                {error && (
                  <div className="px-4 py-2 bg-danger text-white border-[3px] border-black font-heading font-bold text-sm uppercase rounded-none">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-4 mt-6">
                  <NeoButton variant="secondary" onClick={onClose}>Cancel</NeoButton>
                  <NeoButton variant="primary" onClick={handleSaveClick}>Save Partner</NeoButton>
                </div>
              </div>
            </NeoCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
