import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { NeoCard } from '../../components/NeoCard';
import { NeoInput } from '../../components/NeoInput';
import { NeoButton } from '../../components/NeoButton';
import type { Organizer } from '../../data/siteData';

interface OrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizer?: Organizer;
  onSave: (organizer: Organizer) => void;
}

export function OrganizerModal({ isOpen, onClose, organizer, onSave }: OrganizerModalProps) {
  const [formData, setFormData] = useState<Organizer>(organizer || {
    id: '',
    name: '',
    role: '',
    organization: '',
    photoUrl: '',
    linkedin: '',
    displayOrder: 1,
    isVisible: true,
  });

  useEffect(() => {
    setFormData(organizer || {
      id: '',
      name: '',
      role: '',
      organization: '',
      photoUrl: '',
      linkedin: '',
      displayOrder: 1,
      isVisible: true,
    });
  }, [organizer, isOpen]);

  const [error, setError] = useState('');

  const handleSaveClick = () => {
    if (!formData.name.trim() || !formData.role.trim()) {
      setError('Name and Role are required');
      return;
    }
    setError('');
    onSave(formData);
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
                  {organizer ? 'Edit Organizer' : 'Add Organizer'}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 border-[3px] border-transparent hover:border-black transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 bg-gray-200 border-[3px] border-black flex items-center justify-center overflow-hidden flex-shrink-0">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload size={32} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <NeoInput 
                      label="Photo URL" 
                      value={formData.photoUrl} 
                      onChange={e => setFormData({...formData, photoUrl: e.target.value})} 
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <NeoInput 
                    label="Full Name *" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                  <NeoInput 
                    label="Role *" 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value})} 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <NeoInput 
                    label="Organization" 
                    value={formData.organization} 
                    onChange={e => setFormData({...formData, organization: e.target.value})} 
                  />
                  <NeoInput 
                    label="LinkedIn URL" 
                    value={formData.linkedin || ''} 
                    onChange={e => setFormData({...formData, linkedin: e.target.value})} 
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <NeoInput 
                  label="Display Order" 
                  value={String(formData.displayOrder)} 
                  onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})} 
                  type="number"
                />

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
                  <NeoButton variant="primary" onClick={handleSaveClick}>Save Organizer</NeoButton>
                </div>
              </div>
            </NeoCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
