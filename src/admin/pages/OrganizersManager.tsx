import { useState } from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { NeoButton } from '../../components/NeoButton';
import { NeoCard } from '../../components/NeoCard';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { OrganizerModal } from '../components/OrganizerModal';
import { useSiteData } from '../../context/SiteDataContext';
import type { Organizer } from '../../data/siteData';

export function OrganizersManager() {
  const { siteData, updateSiteData, isOverride, resetToDefaults } = useSiteData();
  const organizers = siteData.organizers;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrganizer, setEditingOrganizer] = useState<Organizer | null>(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [toast, setToast] = useState<{ type: string; message: string } | null>(null);
  const showToast = (type: string, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (organizerData: Organizer) => {
    if (editingOrganizer) {
      updateSiteData({ organizers: organizers.map(o => o.id === organizerData.id ? organizerData : o) } as any);
      showToast('success', 'Organizer updated!');
    } else {
      updateSiteData({ organizers: [...organizers, { ...organizerData, id: crypto.randomUUID() }] } as any);
      showToast('success', 'Organizer added!');
    }
    setIsModalOpen(false);
    setEditingOrganizer(null);
  };

  const handleDelete = () => {
    if (deletingId) {
      updateSiteData({ organizers: organizers.filter(o => o.id !== deletingId) } as any);
      showToast('success', 'Organizer deleted!');
    }
    setIsConfirmOpen(false);
    setDeletingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-heading text-2xl font-black uppercase">
          Organizers ({organizers.length})
        </h3>
        <NeoButton 
          variant="primary"
          onClick={() => { setEditingOrganizer(null); setIsModalOpen(true); }}
        >
          + ADD ORGANIZER
        </NeoButton>
      </div>
      
      <div className="flex justify-end gap-4 mb-2">
        {isOverride && (
          <button
            onClick={() => {
              resetToDefaults();
              showToast('info', 'Organizers reset to defaults');
            }}
            className="px-4 py-2 bg-danger text-white border-[3px] border-black shadow-neo-sm font-heading text-xs uppercase rounded-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Reset to Defaults
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:overflow-visible">
        {organizers.map(organizer => (
          <NeoCard key={organizer.id} className="bg-white p-6 flex flex-col items-center text-center min-w-[240px] md:min-w-0">
            <div className="w-32 h-32 rounded-full overflow-hidden border-[3px] border-black bg-gray-100 mb-4 shadow-neo-sm flex-shrink-0">
              {organizer.photoUrl ? (
                <img src={organizer.photoUrl} alt={organizer.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-gray-400">No Image</div>
              )}
            </div>
            
            <h4 className="font-heading text-xl font-black uppercase line-clamp-1">{organizer.name}</h4>
            <p className="font-bold text-gray-500 uppercase text-xs tracking-widest mt-1">{organizer.role}</p>
            <p className="font-bold text-sm mt-2">{organizer.organization}</p>
            
            <div className="flex gap-2 mt-6 w-full justify-center">
              <button 
                className="p-2 hover:bg-gray-200 border-[3px] border-transparent hover:border-black transition-colors"
                onClick={() => {
                  updateSiteData({ organizers: organizers.map(o => o.id === organizer.id ? { ...o, isVisible: !o.isVisible } : o) } as any);
                  showToast('info', organizer.isVisible ? 'Organizer hidden' : 'Organizer visible');
                }}
                title="Toggle Visibility"
              >
                {organizer.isVisible ? <Eye size={20} /> : <EyeOff size={20} className="text-gray-400" />}
              </button>
              <button 
                className="p-2 hover:bg-teal-100 border-[3px] border-transparent hover:border-black transition-colors text-tertiary"
                onClick={() => { setEditingOrganizer(organizer); setIsModalOpen(true); }}
                title="Edit"
              >
                <Pencil size={20} />
              </button>
              <button 
                className="p-2 hover:bg-red-100 border-[3px] border-transparent hover:border-black transition-colors text-red-500"
                onClick={() => { setDeletingId(organizer.id); setIsConfirmOpen(true); }}
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </NeoCard>
        ))}
      </div>
      
      <OrganizerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        organizer={editingOrganizer || undefined}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Organizer"
        message="Are you sure you want to delete this organizer?"
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
