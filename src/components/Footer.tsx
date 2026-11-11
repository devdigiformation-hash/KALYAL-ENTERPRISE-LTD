import React from 'react';
import { ShieldCheck, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-kalyal-darker border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="inline-block">
              <img 
                src="/brand/logo.png" 
                alt="KALYAL ENTERPRISE LTD" 
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-[#00186B]"
              />
            </a>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Reliable road freight transport solutions across the United Kingdom. Operating dependable linehauls, container transport, and professional cargo delivery.
            </p>
            <div className="flex items-center gap-2 text-slate-300 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-kalyal-gold" />
              <span>United Kingdom Commercial Road Haulage</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-kalyal-gold transition-colors">Home</a></li>
              <li><a href="#journey" className="hover:text-kalyal-gold transition-colors">Road Journey</a></li>
              <li><a href="#unloading" className="hover:text-kalyal-gold transition-colors">Warehouse Unloading</a></li>
              <li><a href="#services" className="hover:text-kalyal-gold transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-kalyal-gold transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-kalyal-gold transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-kalyal-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-400">Full Truckload (FTL)</span></li>
              <li><span className="text-slate-400">Container Haulage</span></li>
              <li><span className="text-slate-400">Scheduled Trunk Linehaul</span></li>
              <li><span className="text-slate-400">Palletized Distribution</span></li>
              <li><span className="text-slate-400">Warehouse Bay Handover</span></li>
            </ul>
          </div>

          {/* Verified Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Dispatch</h4>
            <div className="space-y-2.5">
              <a 
                href="tel:+447746645195" 
                className="flex items-center gap-2 hover:text-kalyal-gold transition-colors text-slate-300 font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-kalyal-gold" />
                <span>+44 7746 645195</span>
              </a>
              <a 
                href="mailto:Kalyalenterprise@gmail.com" 
                className="flex items-center gap-2 hover:text-kalyal-gold transition-colors text-slate-300"
              >
                <Mail className="w-3.5 h-3.5 text-kalyal-gold" />
                <span>Kalyalenterprise@gmail.com</span>
              </a>
              <div className="pt-2">
                <button
                  onClick={onOpenQuote}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-kalyal-darker bg-kalyal-gold hover:bg-amber-400 transition-colors"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} KALYAL ENTERPRISE LTD. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={onOpenPrivacy} 
              className="hover:text-slate-300 transition-colors underline"
            >
              Privacy Notice
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-kalyal-gold transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
