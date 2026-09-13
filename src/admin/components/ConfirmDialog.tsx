import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { NeoCard } from '../../components/NeoCard';
import { NeoButton } from '../../components/NeoButton';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel'
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 -z-10"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-md"
          >
            <NeoCard className="bg-white p-6 md:p-8 border-[3px] border-black shadow-neo rounded-none">
              <div className="flex items-center gap-4 mb-4 text-red-500">
                <AlertTriangle size={32} />
                <h3 className="font-heading text-2xl font-black">{title}</h3>
              </div>
              <p className="text-gray-600 font-bold mb-8">{message}</p>
              
              <div className="flex justify-end gap-4">
                <NeoButton onClick={onCancel} variant="ghost">
                  {cancelText}
                </NeoButton>
                <NeoButton 
                  onClick={onConfirm} 
                  variant="danger"
                >
                  {confirmText}
                </NeoButton>
              </div>
            </NeoCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
