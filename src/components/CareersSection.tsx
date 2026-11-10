import React, { useState } from 'react';
import { Briefcase, PoundSterling, MapPin, Clock, ArrowRight, CheckCircle2, Send, X } from 'lucide-react';

export const CareersSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedIn: '',
    experience: '',
    coverNote: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Trigger mailto fallback with application details
    const subject = encodeURIComponent('Application — Business Development Manager (KALYAL ENTERPRISE LTD)');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLinkedIn: ${formData.linkedIn}\nYears in Freight/Logistics: ${formData.experience}\n\nCover Note:\n${formData.coverNote}`
    );
    window.location.href = `mailto:Kalyalenterprise@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="careers" className="py-24 bg-kalyal-dark relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-semibold mb-4">
            <Briefcase className="w-3.5 h-3.5 text-kalyal-gold" />
            <span>Commercial Recruitment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Career Opportunities at <br />
            <span className="text-gold-gradient">KALYAL ENTERPRISE LTD</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Join our expanding road transport enterprise. We are seeking an ambitious commercial professional to drive client relationships, tender freight contracts, and accelerate commercial growth across the UK logistics sector.
          </p>
        </div>

        {/* Featured Job Card */}
        <div className="max-w-4xl mx-auto glass-panel-glow p-6 sm:p-10 rounded-3xl relative">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Open Vacancy
                </span>
                <span className="text-xs text-slate-400 font-medium">Road Freight Transport Sector</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Business Development Manager
              </h3>
            </div>

            <div className="flex flex-col sm:items-end">
              <div className="flex items-center gap-1.5 text-2xl font-extrabold text-amber-400">
                <PoundSterling className="w-6 h-6" />
                <span>52,500 – 57,500</span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5">
                (per annum, subject to contract confirmation)
              </span>
            </div>
          </div>

          {/* Job Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-6 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-kalyal-gold" />
              <span>United Kingdom</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-kalyal-gold" />
              <span>Full-time Position</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 col-span-2 sm:col-span-1">
              <Briefcase className="w-4 h-4 text-kalyal-gold" />
              <span>B2B Freight Development</span>
            </div>
          </div>

          {/* Role Responsibilities */}
          <div className="py-6 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Core Responsibilities:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0 mt-0.5" />
                <span>Identify and secure new commercial road haulage accounts across the UK.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0 mt-0.5" />
                <span>Build lasting B2B relationships with manufacturers, importers, and 3PLs.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0 mt-0.5" />
                <span>Prepare freight quotations, rate cards, and competitive tender submissions.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0 mt-0.5" />
                <span>Collaborate with dispatch operations to align fleet capacity with client demand.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0 mt-0.5" />
                <span>Track pipeline performance, recurring revenue, and contract renewals.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0 mt-0.5" />
                <span>Represent KALYAL ENTERPRISE LTD in high-level commercial freight discussions.</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              Send CV or direct enquiries to <strong className="text-slate-200">Kalyalenterprise@gmail.com</strong>
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-kalyal-darker bg-gradient-to-r from-amber-400 via-kalyal-gold to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-kalyal-gold/20 hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Apply for this Role</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Application Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel-glow w-full max-w-xl p-6 sm:p-8 rounded-3xl relative my-8">
            <button
              onClick={() => {
                setModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    Recruitment Application
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Apply: Business Development Manager
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    KALYAL ENTERPRISE LTD • £52,500 – £57,500 per annum
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.co.uk"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Telephone *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Experience in Freight (Years)</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g. 5+ Years"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Profile or CV Link</label>
                  <input
                    type="url"
                    value={formData.linkedIn}
                    onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Cover Note / Highlights</label>
                  <textarea
                    rows={3}
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Briefly state your experience securing road freight contracts..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-kalyal-darker bg-gradient-to-r from-amber-400 to-kalyal-gold hover:from-amber-300 hover:to-amber-400 shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application via Email</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Submitting prepares a pre-filled direct email to Kalyalenterprise@gmail.com.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Application Prepared!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Your details have been formatted and directed to <strong className="text-amber-300">Kalyalenterprise@gmail.com</strong>. Please attach your CV to the opened email draft.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 border border-white/10"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
