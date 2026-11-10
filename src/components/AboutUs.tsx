import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-kalyal-darker relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Factual Company Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-kalyal-gold" />
              <span>About KALYAL ENTERPRISE LTD</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Dedicated to Professional <br />
              <span className="text-gold-gradient">UK Road Freight Transport</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              <strong className="text-white font-semibold">KALYAL ENTERPRISE LTD</strong> is a United Kingdom enterprise operating in road freight transportation. We deliver reliable haulage solutions that connect maritime ports, regional warehouses, and major commercial hubs across the UK highway network.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Our operations prioritize vehicle roadworthiness, punctual dispatch schedules, and accountable communication. By focusing on disciplined fleet coordination and cargo security, we ensure that every consignment moves smoothly from initial loading bay dispatch to final warehouse handover.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-kalyal-gold" />
                  <h4 className="text-sm font-bold text-white">Rigorous Vehicle Standards</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Well-maintained road freight vehicles ensuring safe, compliant, and continuous motorway transit.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-kalyal-gold" />
                  <h4 className="text-sm font-bold text-white">Punctual Linehaul Delivery</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Precision transit schedules planned around UK motorway flow and booked distribution slots.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-kalyal-gold" />
                  <h4 className="text-sm font-bold text-white">Cargo Care & Security</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Attentive pallet and container securing protocols to safeguard all commercial goods in transit.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-kalyal-gold" />
                  <h4 className="text-sm font-bold text-white">Direct Dispatch Contacts</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Immediate telephone and email access to operations for live transport updates and bookings.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Brand Card */}
          <div className="lg:col-span-5">
            <div className="relative glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
              
              <div className="flex items-center justify-center p-6 bg-slate-900/60 rounded-3xl border border-white/5 mb-6">
                <img 
                  src="/brand/hero-badge.png" 
                  alt="KALYAL ENTERPRISE LTD Emblem" 
                  className="w-full max-w-xs object-contain drop-shadow-xl rounded-2xl overflow-hidden"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-slate-400">Registered Business</span>
                  <span className="text-xs font-bold text-white">KALYAL ENTERPRISE LTD</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-slate-400">Industry Activity</span>
                  <span className="text-xs font-semibold text-slate-200">Freight Transport by Road</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-slate-400">Operational Area</span>
                  <span className="text-xs font-semibold text-slate-200">United Kingdom</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Enquiries Direct</span>
                  <a href="tel:+447746645195" className="text-xs font-bold text-kalyal-gold hover:underline">
                    +44 7746 645195
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
