import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { NeoCard } from '../../components/NeoCard';
import { NeoInput } from '../../components/NeoInput';
import { NeoButton } from '../../components/NeoButton';
import type { Speaker } from '../../data/siteData';

interface SpeakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  speaker?: Speaker;
  onSave: (speaker: Speaker) => void;
  defaultSessionType?: 'panel' | 'workshop' | 'keynote';
}

export function SpeakerModal({ isOpen, onClose, speaker, onSave, defaultSessionType }: SpeakerModalProps) {
  const [formData, setFormData] = useState<Speaker>(speaker || {
    id: '',
    name: '',
    role: '',
    company: '',
    sessionTitle: '',
    sessionType: defaultSessionType || 'workshop',
    bio: '',
    photoUrl: '',
    socialTwitter: '',
    socialLinkedin: '',
    socialGithub: '',
    isVisible: true,
    displayOrder: 1,
  });

  useEffect(() => {
    setFormData(speaker || {
      id: '',
      name: '',
      role: '',
      company: '',
      sessionTitle: '',
      sessionType: defaultSessionType || 'workshop',
      bio: '',
      photoUrl: '',
      socialTwitter: '',
      socialLinkedin: '',
      socialGithub: '',
      displayOrder: 1,
      isVisible: true,
    });
  }, [speaker, isOpen, defaultSessionType]);

  const [error, setError] = useState('');

  const handleSaveClick = () => {
    if (!formData.name.trim() || !formData.sessionTitle.trim()) {
      setError('Name and Session Title are required');
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
                  {speaker ? 'Edit Speaker' : 'Add Speaker'}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 border-[3px] border-transparent hover:border-black transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 bg-gray-200 border-[3px] border-black flex items-center justify-center overflow-hidden">
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
                    label="Full Name" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                  <NeoInput 
                    label="Company" 
                    value={formData.company} 
                    onChange={e => setFormData({...formData, company: e.target.value})} 
                  />
                  <NeoInput 
                    label="Job Title" 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value})} 
                  />
                  <div className="flex flex-col gap-2">
                    <label className="block font-heading font-bold text-sm uppercase mb-2">Session Type</label>
                    <select
                      value={formData.sessionType}
                      onChange={(e) => setFormData({...formData, sessionType: e.target.value as 'panel' | 'workshop' | 'keynote'})}
                      className="w-full px-4 py-3 border-[3px] border-black bg-white font-body text-sm shadow-neo-sm rounded-none focus:outline-none focus:shadow-neo"
                    >
                      <option value="workshop">Workshop</option>
                      <option value="panel">Panel</option>
                      <option value="keynote">Keynote</option>
                    </select>
                  </div>
                </div>
                
                <NeoInput 
                  label="Session Title" 
                  value={formData.sessionTitle} 
                  onChange={e => setFormData({...formData, sessionTitle: e.target.value})} 
                />



                <NeoInput 
                  label="LinkedIn URL" 
                  value={formData.socialLinkedin || ''} 
                  onChange={e => setFormData({...formData, socialLinkedin: e.target.value})} 
                  placeholder="https://linkedin.com/in/..."
                />

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
                  <NeoButton variant="primary" onClick={handleSaveClick}>Save Speaker</NeoButton>
                </div>
              </div>
            </NeoCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
