import { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { NeoButton } from '../../components/NeoButton';
import { NeoCard } from '../../components/NeoCard';
import { NeoInput } from '../../components/NeoInput';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { defaultSiteData, type FAQ } from '../../data/siteData';
import { useSiteData } from '../../context/SiteDataContext';

export function FAQManager() {
  const { siteData, updateSiteData } = useSiteData();
  const faqs = siteData.faqs;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ question: '', answer: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({ question: '', answer: '' });

  const updateFaqs = (newFaqs: FAQ[]) => {
    updateSiteData({ ...siteData, faqs: newFaqs });
  };
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const startEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setEditForm({ question: faq.question, answer: faq.answer });
    setExpandedId(faq.id);
  };

  const saveEdit = (id: string) => {
    updateFaqs(faqs.map(f => f.id === id ? { ...f, ...editForm } : f));
    setEditingId(null);
  };

  const handleDelete = () => {
    if (deletingId) {
      updateFaqs(faqs.filter(f => f.id !== deletingId));
    }
    setIsConfirmOpen(false);
    setDeletingId(null);
  };

  const handleAdd = () => {
    if (!addForm.question.trim() || !addForm.answer.trim()) return;
    const newFaq: FAQ = {
      id: `faq-${Date.now()}`,
      question: addForm.question,
      answer: addForm.answer,
      displayOrder: faqs.length + 1,
      isPublished: true
    };
    updateFaqs([...faqs, newFaq]);
    setAddForm({ question: '', answer: '' });
    setIsAdding(false);
  };



  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-heading text-2xl font-black uppercase">
          FAQ ({faqs.length})
        </h3>
        <div className="flex gap-4">
          <NeoButton variant="ghost" onClick={() => { updateFaqs(defaultSiteData.faqs); setEditingId(null); setExpandedId(null); }}>
            ↺ RESET
          </NeoButton>
          <NeoButton variant="primary" onClick={() => setIsAdding(true)}>
            + ADD QUESTION
          </NeoButton>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {isAdding && (
          <NeoCard className="bg-white p-0 overflow-hidden border-[3px] border-secondary">
            <div className="p-4 bg-secondary/10 border-b-[3px] border-black">
              <h4 className="font-heading font-black text-lg uppercase">New Question</h4>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <NeoInput 
                label="Question" 
                value={addForm.question} 
                onChange={e => setAddForm({...addForm, question: e.target.value})} 
              />
              <div className="flex flex-col gap-2">
                <label className="font-heading font-black text-lg uppercase">Answer</label>
                <textarea className="rounded-none w-full p-3 border-[3px] border-black shadow-neo-sm font-bold outline-none focus:shadow-neo-hover transition-all min-h-[100px]"
                  value={addForm.answer}
                  onChange={e => setAddForm({...addForm, answer: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <NeoButton variant="secondary" onClick={() => { setIsAdding(false); setAddForm({ question: '', answer: '' }); }}>Cancel</NeoButton>
                <NeoButton variant="primary" onClick={handleAdd}>Add Question</NeoButton>
              </div>
            </div>
          </NeoCard>
        )}
        {faqs.map((faq, index) => (
          <NeoCard key={faq.id} className="bg-white p-0 overflow-hidden">
            <div 
              className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${expandedId === faq.id ? 'border-b-[3px] border-black' : ''}`}
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            >
              <div className="flex items-center gap-4">
                <span className="font-heading font-black text-xl text-gray-400">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <h4 className="font-bold text-lg">{faq.question}</h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                  <button 
                    className={`p-2 border-[3px] border-transparent hover:border-black transition-colors ${faq.isPublished ? 'hover:bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-400'}`}
                    onClick={() => {
                      updateFaqs(faqs.map(f => f.id === faq.id ? { ...f, isPublished: !f.isPublished } : f));
                    }}
                    title={faq.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {faq.isPublished ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  <button 
                    className="p-2 hover:bg-teal-100 border-[3px] border-transparent hover:border-black transition-colors text-tertiary"
                    onClick={() => startEdit(faq)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button 
                    className="p-2 hover:bg-red-100 border-[3px] border-transparent hover:border-black transition-colors text-red-500"
                    onClick={() => { setDeletingId(faq.id); setIsConfirmOpen(true); }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                {expandedId === faq.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>

            {expandedId === faq.id && (
              <div className="p-4 bg-gray-50">
                {editingId === faq.id ? (
                  <div className="flex flex-col gap-4">
                    <NeoInput 
                      label="Question" 
                      value={editForm.question} 
                      onChange={e => setEditForm({...editForm, question: e.target.value})} 
                    />
                    <div className="flex flex-col gap-2">
                      <label className="font-heading font-black text-lg uppercase">Answer</label>
                      <textarea className="rounded-none w-full p-3 border-[3px] border-black shadow-neo-sm font-bold outline-none focus:shadow-neo-hover transition-all min-h-[100px]"
                        value={editForm.answer}
                        onChange={e => setEditForm({...editForm, answer: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <NeoButton variant="secondary" onClick={() => setEditingId(null)}>Cancel</NeoButton>
                      <NeoButton variant="primary" onClick={() => saveEdit(faq.id)}>Save Changes</NeoButton>
                    </div>
                  </div>
                ) : (
                  <p className="font-bold text-gray-700 whitespace-pre-wrap">{faq.answer}</p>
                )}
              </div>
            )}
          </NeoCard>
        ))}
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete FAQ"
        message="Are you sure you want to delete this question?"
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />

    </div>
  );
}
