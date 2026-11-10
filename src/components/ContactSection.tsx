import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const mailSubject = encodeURIComponent(`Contact Enquiry: ${formData.subject || 'Road Freight Service'}`);
    const mailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:Kalyalenterprise@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section id="contact" className="py-24 bg-kalyal-darker relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Company Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5 text-kalyal-gold" />
              <span>Contact Dispatch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get in Touch with <br />
              <span className="text-gold-gradient">KALYAL ENTERPRISE LTD</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you need an immediate quotation, ongoing contract haulage, or recruitment information, our team is available to assist you.
            </p>

            {/* Direct Cards */}
            <div className="space-y-4 pt-2">
              
              <a
                href="tel:+447746645195"
                className="glass-panel p-4 rounded-2xl flex items-center gap-4 hover:border-kalyal-gold/50 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-kalyal-navy flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-kalyal-gold" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Telephone Direct</div>
                  <div className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    +44 7746 645195
                  </div>
                </div>
              </a>

              <a
                href="mailto:Kalyalenterprise@gmail.com"
                className="glass-panel p-4 rounded-2xl flex items-center gap-4 hover:border-kalyal-gold/50 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-kalyal-navy flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-kalyal-gold" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Corporate Email</div>
                  <div className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Kalyalenterprise@gmail.com
                  </div>
                </div>
              </a>

              <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-kalyal-navy flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5 text-kalyal-gold" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Jurisdiction & Operations</div>
                  <div className="text-sm font-semibold text-white">
                    United Kingdom • Nationwide Road Transport
                  </div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-kalyal-navy flex items-center justify-center shrink-0 border border-white/10">
                  <Clock className="w-5 h-5 text-kalyal-gold" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Dispatch Operations</div>
                  <div className="text-sm font-semibold text-white">
                    Monday – Friday: 07:00 – 19:00 UK
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-glow p-6 sm:p-10 rounded-3xl">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill out the form below to enquire about freight capacity, driver partnerships, or commercial contracts.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Telephone</label>
                      <input
                        type="tel"
                        placeholder="+44..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                      <input
                        type="text"
                        placeholder="Freight Enquiry / Tender"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-kalyal-gold"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-bold text-sm text-kalyal-darker bg-gradient-to-r from-amber-400 via-kalyal-gold to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Message Formatted!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Your message has been addressed to <strong className="text-amber-300">Kalyalenterprise@gmail.com</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
