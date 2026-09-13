import { useState } from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { NeoButton } from '../../components/NeoButton';
import { NeoCard } from '../../components/NeoCard';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { defaultSiteData } from '../../data/siteData';
import type { Partner } from '../../data/siteData';
import { useSiteData } from '../../context/SiteDataContext';
import { PartnerModal } from './PartnerModal';

export function PartnersManager() {
  const { siteData, updateSiteData } = useSiteData();
  const partners = [...siteData.partners].sort((a, b) => a.displayOrder - b.displayOrder);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const updatePartners = (newPartners: Partner[]) => {
    updateSiteData({ ...siteData, partners: newPartners });
  };

  const handleDelete = () => {
    if (deletingId) {
      updatePartners(partners.filter(p => p.id !== deletingId));
    }
    setIsConfirmOpen(false);
    setDeletingId(null);
  };

  const handleAdd = () => {
    setEditingPartner(null);
    setIsModalOpen(true);
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  const handleSave = (partner: Partner) => {
    if (editingPartner) {
      updatePartners(partners.map(p => p.id === partner.id ? partner : p));
    } else {
      updatePartners([...partners, partner]);
    }
    setIsModalOpen(false);
    setEditingPartner(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-heading text-2xl font-black uppercase">
          Partners ({partners.length})
        </h3>
        <div className="flex gap-4">
          <NeoButton variant="ghost" onClick={() => updatePartners(defaultSiteData.partners)}>
            ↺ RESET
          </NeoButton>
          <NeoButton variant="primary" onClick={handleAdd}>
            + ADD PARTNER
          </NeoButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map(partner => (
          <NeoCard key={partner.id} className="bg-white p-0 overflow-hidden flex flex-col sm:flex-row">
            <div className="w-full sm:w-48 h-48 sm:h-auto bg-gray-100 border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-black flex items-center justify-center p-4">
              {partner.logoUrl ? (
                <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="font-bold text-gray-400">No Logo</span>
              )}
            </div>
            
            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-heading text-xl font-black uppercase line-clamp-1">{partner.name}</h4>
                </div>
                <p className="font-bold text-gray-600 text-sm mt-2 line-clamp-2">{partner.tagline || 'No tagline'}</p>
                <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-tertiary font-bold text-sm hover:underline mt-1 block truncate">
                  {partner.websiteUrl}
                </a>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t-[3px] border-black">
                <button 
                  className="p-2 hover:bg-gray-200 border-[3px] border-transparent hover:border-black transition-colors"
                  onClick={() => {
                    updatePartners(partners.map(p => p.id === partner.id ? { ...p, isVisible: !p.isVisible } : p));
                  }}
                  title="Toggle Visibility"
                >
                  {partner.isVisible ? <Eye size={20} /> : <EyeOff size={20} className="text-gray-400" />}
                </button>
                <button 
                  className="p-2 hover:bg-teal-100 border-[3px] border-transparent hover:border-black transition-colors text-tertiary"
                  onClick={() => handleEdit(partner)}
                >
                  <Pencil size={20} />
                </button>
                <button 
                  className="p-2 hover:bg-red-100 border-[3px] border-transparent hover:border-black transition-colors text-red-500"
                  onClick={() => { setDeletingId(partner.id); setIsConfirmOpen(true); }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </NeoCard>
        ))}
      </div>

      <PartnerModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingPartner(null); }}
        onSave={handleSave}
        partner={editingPartner}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Partner"
        message="Are you sure you want to delete this partner?"
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />

    </div>
  );
}
