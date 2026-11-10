import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel-glow w-full max-w-2xl p-6 sm:p-8 rounded-3xl relative my-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-kalyal-gold">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="text-xl font-bold text-white">Privacy & Data Notice</h3>
          </div>

          <p className="text-xs text-slate-400">
            KALYAL ENTERPRISE LTD is committed to protecting your personal information and respecting your privacy in compliance with UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
          </p>

          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <h4 className="font-bold text-white mb-1">1. Freight Quotation & Contact Inquiries</h4>
              <p>
                When you request a quotation or submit a contact enquiry, we collect your name, business name, telephone, email address, collection and delivery locations, and consignment specifications strictly to evaluate route feasibility and provide quotation.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-1">2. Recruitment Applications</h4>
              <p>
                Information submitted for vacancies (such as the Business Development Manager position) is processed solely for recruitment assessment. Data is handled confidentially and not disclosed to third parties.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-1">3. Direct Contact</h4>
              <p>
                For data protection enquiries or to request deletion of your information, please contact: <strong className="text-amber-300">Kalyalenterprise@gmail.com</strong> or phone <strong className="text-amber-300">+44 7746 645195</strong>.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 border border-white/10"
            >
              Close Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
