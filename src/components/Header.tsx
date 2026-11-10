import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Road Network', href: '#journey' },
    { name: 'Delivery', href: '#unloading' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro bar for corporate trust */}
      <div className="bg-kalyal-dark border-b border-white/5 text-xs text-slate-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-kalyal-gold" />
              UK Freight Transport by Road
            </span>
            <span className="text-slate-500">|</span>
            <a 
              href="mailto:Kalyalenterprise@gmail.com" 
              className="flex items-center gap-1.5 hover:text-kalyal-gold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-kalyal-gold" />
              Kalyalenterprise@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+447746645195" 
              className="flex items-center gap-1.5 font-medium text-slate-200 hover:text-kalyal-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-kalyal-gold" />
              +44 7746 645195
            </a>
            <span className="text-emerald-400 text-[11px] font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Dispatch Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        id="site-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-kalyal-dark/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/10 py-3' 
            : 'bg-kalyal-dark/80 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Top-Left Approved Brand Logo ONLY (Strict Rule: No duplicate next to hero heading) */}
          <a href="#hero" className="flex items-center group focus:outline-none">
            <img 
              src="/brand/logo.png" 
              alt="KALYAL ENTERPRISE LTD - Freight Transport By Road" 
              className="h-10 sm:h-12 w-auto object-contain rounded-xl overflow-hidden shadow-md transition-transform group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-kalyal-gold transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-kalyal-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a 
              href="tel:+447746645195" 
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-kalyal-gold" />
              Call Dispatch
            </a>
            
            <button
              onClick={onOpenQuote}
              className="px-4 py-2 text-xs font-bold text-kalyal-darker bg-gradient-to-r from-amber-400 via-kalyal-gold to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md hover:shadow-glow-gold transition-all duration-300 flex items-center gap-1.5"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 text-xs font-bold text-kalyal-darker bg-kalyal-gold rounded-md sm:hidden"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-kalyal-dark/98 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-kalyal-gold hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href="tel:+447746645195"
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/80 rounded-lg"
              >
                <Phone className="w-4 h-4 text-kalyal-gold" />
                +44 7746 645195
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-2.5 text-sm font-bold text-kalyal-darker bg-gradient-to-r from-amber-400 to-kalyal-gold rounded-lg shadow-md"
              >
                Request a Freight Quote
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
