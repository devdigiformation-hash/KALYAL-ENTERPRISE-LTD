import React from 'react';
import { Truck, Box, ShieldCheck, Clock, MapPin, Layers, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onOpenQuote: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuote }) => {
  const serviceList = [
    {
      icon: Truck,
      title: 'Full Truckload (FTL) Haulage',
      tag: 'Dedicated Capacity',
      description: 'Exclusive vehicle allocation for high-volume road freight consignments across England, Scotland, and Wales with direct point-to-point transit.',
      benefits: ['Zero intermediate handling', 'Direct driver routing', 'Payload integrity'],
    },
    {
      icon: Box,
      title: 'Container Drayage & Haulage',
      tag: 'Intermodal Port Transfer',
      description: 'Specialized road transport of shipping containers from key UK container ports and inland rail terminals directly to warehouse facilities.',
      benefits: ['Standard 20ft & 40ft units', 'Prompt quay clearing', 'Reliable scheduled slots'],
    },
    {
      icon: Clock,
      title: 'Scheduled Trunk & Linehaul',
      tag: 'Time-Definite Delivery',
      description: 'Dependable day and night trunk services between regional distribution centers, fulfilling strict manufacturer and 3PL linehaul timetables.',
      benefits: ['Consistent schedule adherence', 'Motorway corridor optimization', 'Live dispatch support'],
    },
    {
      icon: Layers,
      title: 'Palletized Freight Transport',
      tag: 'Commercial Freight',
      description: 'Safe road movement of standard UK and Euro pallets. Well-secured cargo bays ensure zero damage from collection through final destination.',
      benefits: ['Strict load securing', 'Accurate pallet counts', 'Clean proof of delivery'],
    },
    {
      icon: MapPin,
      title: 'Warehouse Bay Handover',
      tag: 'Direct Unloading',
      description: 'Seamless arrival and dock alignment at distribution warehouses, coordinating with on-site forklift operators for rapid, verified turnarounds.',
      benefits: ['Precise bay docking', 'Consignment paperwork handover', 'Rapid trailer release'],
    },
    {
      icon: ShieldCheck,
      title: 'Dedicated Contract Logistics',
      tag: 'Tailored Fleets',
      description: 'Bespoke road haulage partnerships for commercial enterprises requiring regular recurring transport capacity and accountable reporting.',
      benefits: ['Dedicated driver planning', 'Transparent service reviews', 'Long-term rate stability'],
    },
  ];

  return (
    <section id="services" className="py-24 bg-kalyal-dark relative overflow-hidden border-t border-white/5">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-kalyal-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-kalyal-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-semibold mb-4">
            <span>Verified Freight Operations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive <span className="text-gold-gradient">Road Freight Services</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Delivering robust road haulage solutions built on vehicle reliability, punctual highway transit, and meticulous operational control throughout the United Kingdom.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-kalyal-gold/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-kalyal-navy flex items-center justify-center border border-white/10 group-hover:border-kalyal-gold/50 transition-colors">
                      <Icon className="w-6 h-6 text-kalyal-gold" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-white/5">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
                    {service.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-kalyal-gold shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenQuote}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/70 hover:bg-kalyal-gold hover:text-kalyal-darker transition-all flex items-center justify-center gap-1.5 border border-white/5"
                >
                  <span>Book This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 glass-panel-glow p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Have Specific Haulage or Linehaul Requirements?
            </h3>
            <p className="text-sm text-slate-300">
              Speak directly with our freight dispatch team to organize single-load consignments, regular contracted lanes, or specialized delivery schedules.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <a
              href="tel:+447746645195"
              className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors"
            >
              Call +44 7746 645195
            </a>
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-kalyal-darker bg-gradient-to-r from-amber-400 to-kalyal-gold hover:from-amber-300 hover:to-amber-400 shadow-md transition-all"
            >
              Request a Freight Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
