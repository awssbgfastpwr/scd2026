import { useState } from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { NeoButton } from '../../components/NeoButton';
import { NeoCard } from '../../components/NeoCard';
import { SpeakerModal } from '../components/SpeakerModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useSiteData } from '../../context/SiteDataContext';
import type { Speaker } from '../../data/siteData';

export function SpeakersManager() {
  const { siteData, updateSiteData, isOverride, resetToDefaults } = useSiteData();
  const speakers = siteData.speakers;
  const [activeType, setActiveType] = useState<'all' | 'panel' | 'workshop' | 'keynote'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredSpeakers = [...(activeType === 'all'
    ? speakers
    : speakers.filter(s => s.sessionType === activeType))
  ].sort((a, b) => a.displayOrder - b.displayOrder);
  const [toast, setToast] = useState<{ type: string; message: string } | null>(null);
  const showToast = (type: string, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (speakerData: Speaker) => {
    if (editingSpeaker) {
      updateSiteData({ speakers: speakers.map(s => s.id === speakerData.id ? speakerData : s) } as any);
      showToast('success', 'Speaker updated!');
    } else {
      updateSiteData({ speakers: [...speakers, { ...speakerData, id: crypto.randomUUID() }] } as any);
      showToast('success', 'Speaker added!');
    }
    setIsModalOpen(false);
    setEditingSpeaker(null);
  };

  const handleDelete = () => {
    if (deletingId) {
      updateSiteData({ speakers: speakers.filter(s => s.id !== deletingId) } as any);
      showToast('success', 'Speaker deleted!');
    }
    setIsConfirmOpen(false);
    setDeletingId(null);
  };



  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-heading text-2xl font-black uppercase">
          Speakers ({speakers.length})
        </h3>
        <NeoButton 
          variant="primary" 
          onClick={() => { setEditingSpeaker(null); setIsModalOpen(true); }}
        >
          + ADD SPEAKER
        </NeoButton>
      </div>

      <div className="flex justify-end gap-4 mb-2">
        {isOverride && (
          <button
            onClick={() => {
              resetToDefaults();
              showToast('info', 'Reset to defaults');
            }}
            className="px-4 py-2 bg-danger text-white border-[3px] border-black shadow-neo-sm font-heading text-xs uppercase rounded-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Reset to Defaults
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'panel', 'workshop', 'keynote'] as const).map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 border-[3px] border-black font-heading font-bold text-sm uppercase transition-all ${
              activeType === type
                ? 'bg-primary text-white shadow-neo-sm'
                : 'bg-white text-black shadow-neo hover:bg-gray-100'
            }`}
          >
            {type === 'all' ? 'All Speakers' : type === 'panel' ? 'Panelists' : type === 'workshop' ? 'Workshops' : 'Keynotes'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map(speaker => (
          <NeoCard key={speaker.id} className="bg-white p-0 overflow-hidden flex flex-col">
            <div className="relative h-48 bg-gray-200 border-b-[3px] border-black">
              {speaker.photoUrl ? (
                <img src={speaker.photoUrl} alt={speaker.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-gray-400">No Image</div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 border-[2px] border-black font-heading text-xs uppercase font-bold ${
                  speaker.sessionType === 'panel' ? 'bg-secondary' : speaker.sessionType === 'workshop' ? 'bg-primary' : 'bg-tertiary'
                } text-white`}>
                  {speaker.sessionType}
                </span>
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-heading text-xl font-black uppercase line-clamp-1">{speaker.name}</h4>
                  <p className="font-bold text-gray-600 text-sm line-clamp-1">{speaker.role} @ {speaker.company}</p>
                </div>
              </div>
              <p className="font-bold text-sm mt-2 line-clamp-2">{speaker.sessionTitle}</p>
            </div>

            <div className="p-4 border-t-[3px] border-black bg-gray-50 flex justify-end gap-2">
              <button 
                className="p-2 hover:bg-gray-200 border-[3px] border-transparent hover:border-black transition-colors"
                onClick={() => {
                  updateSiteData({ speakers: speakers.map(s => s.id === speaker.id ? { ...s, isVisible: !s.isVisible } : s) } as any);
                  showToast('info', speaker.isVisible ? 'Speaker hidden' : 'Speaker visible');
                }}
                title="Toggle Visibility"
              >
                {speaker.isVisible ? <Eye size={20} /> : <EyeOff size={20} className="text-gray-400" />}
              </button>
              <button 
                className="p-2 hover:bg-teal-100 border-[3px] border-transparent hover:border-black transition-colors text-tertiary"
                onClick={() => { setEditingSpeaker(speaker); setIsModalOpen(true); }}
                title="Edit"
              >
                <Pencil size={20} />
              </button>
              <button 
                className="p-2 hover:bg-red-100 border-[3px] border-transparent hover:border-black transition-colors text-red-500"
                onClick={() => { setDeletingId(speaker.id); setIsConfirmOpen(true); }}
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </NeoCard>
        ))}
      </div>

      <SpeakerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        speaker={editingSpeaker || undefined}
        onSave={handleSave}
        defaultSessionType={activeType === 'all' ? 'workshop' : activeType}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Speaker"
        message="Are you sure you want to delete this speaker? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />

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
