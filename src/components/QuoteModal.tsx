import React, { useState } from 'react';
import { X, Send, Truck, Calendar, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    collectionPostcode: '',
    deliveryPostcode: '',
    freightType: 'Full Truckload (FTL)',
    weightApprox: '',
    collectionDate: '',
    palletCount: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Prepare direct mailto link to Kalyalenterprise@gmail.com
    const subject = encodeURIComponent(
      `Freight Quotation Request: ${formData.freightType} [${formData.collectionPostcode} to ${formData.deliveryPostcode}]`
    );
    const body = encodeURIComponent(
      `FREIGHT QUOTATION ENQUIRY — KALYAL ENTERPRISE LTD\n\n` +
      `Contact Name: ${formData.fullName}\n` +
      `Company Name: ${formData.companyName || 'N/A'}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Collection Postcode: ${formData.collectionPostcode}\n` +
      `Delivery Postcode: ${formData.deliveryPostcode}\n` +
      `Collection Date: ${formData.collectionDate || 'Flexible'}\n` +
      `Freight Type: ${formData.freightType}\n` +
      `Pallet Count: ${formData.palletCount || 'N/A'}\n` +
      `Estimated Weight: ${formData.weightApprox || 'N/A'}\n\n` +
      `Additional Cargo Notes:\n${formData.notes || 'None provided'}`
    );

    // Open email client
    window.location.href = `mailto:Kalyalenterprise@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel-glow w-full max-w-2xl p-6 sm:p-8 rounded-3xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            setIsSubmitted(false);
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-2">
                <Truck className="w-3.5 h-3.5" />
                <span>UK Road Haulage Enquiry</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Request a Road Freight Quotation
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Provide consignment details below. Our dispatch team will review route feasibility and provide quotation.
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. David Clarke"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="Company / Logistics Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="david@company.co.uk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Contact Telephone *</label>
                <input
                  required
                  type="tel"
                  placeholder="+44 7..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                />
              </div>
            </div>

            {/* Route Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-white/5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Collection Postcode / City *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. B1 1AA (Birmingham)"
                  value={formData.collectionPostcode}
                  onChange={(e) => setFormData({ ...formData, collectionPostcode: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Delivery Postcode / City *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. M1 1AE (Manchester)"
                  value={formData.deliveryPostcode}
                  onChange={(e) => setFormData({ ...formData, deliveryPostcode: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold uppercase"
                />
              </div>
            </div>

            {/* Freight Specification */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Freight Type</label>
                <select
                  value={formData.freightType}
                  onChange={(e) => setFormData({ ...formData, freightType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white focus:outline-none focus:border-kalyal-gold"
                >
                  <option value="Full Truckload (FTL)">Full Truckload (FTL)</option>
                  <option value="Container Haulage (20ft / 40ft)">Container Haulage</option>
                  <option value="Scheduled Linehaul">Scheduled Linehaul</option>
                  <option value="Palletized Freight">Palletized Freight</option>
                  <option value="Warehouse Unloading Bay">Warehouse Bay Handover</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Approx. Weight</label>
                <input
                  type="text"
                  placeholder="e.g. 18 Tonnes"
                  value={formData.weightApprox}
                  onChange={(e) => setFormData({ ...formData, weightApprox: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-kalyal-gold" />
                  Collection Date
                </label>
                <input
                  type="date"
                  value={formData.collectionDate}
                  onChange={(e) => setFormData({ ...formData, collectionDate: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white focus:outline-none focus:border-kalyal-gold"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Load Specifications / Special Instructions
              </label>
              <textarea
                rows={2}
                placeholder="Access requirements, tail-lift needed, timed delivery slot, hazardous goods status..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-kalyal-darker bg-gradient-to-r from-amber-400 via-kalyal-gold to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-kalyal-gold/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Freight Quotation Enquiry</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3 text-kalyal-gold" />
                Enquiry opens verified email dispatch to Kalyalenterprise@gmail.com
              </p>
            </div>

          </form>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Quotation Request Formatted!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your road freight specifications have been compiled and sent to our operations desk at <strong className="text-amber-300">Kalyalenterprise@gmail.com</strong>. We will review route availability and respond promptly.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 border border-white/10"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
