import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamically measure and broadcast real header height using ResizeObserver
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
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
        ref={headerRef}
        id="site-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-kalyal-dark/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/10 py-2' 
            : 'bg-kalyal-dark/85 backdrop-blur-sm border-b border-white/5 py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Top-Left Approved Full-Resolution Brand Logo ONLY (Curved corners rounded-2xl preserved) */}
          <a href="#hero" className="flex items-center group focus:outline-none shrink-0" aria-label="KALYAL ENTERPRISE LTD Home">
            <img 
              src="/brand/logo.png" 
              alt="KALYAL ENTERPRISE LTD - Freight Transport By Road" 
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-contain rounded-2xl overflow-hidden shadow-xl border border-white/10 transition-transform group-hover:scale-[1.02] shrink-0 bg-[#00186B]"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-200 hover:text-kalyal-gold transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Telephone Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+447746645195"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-kalyal-gold" />
              <span>07746 645195</span>
            </a>

            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-kalyal-darker bg-gradient-to-r from-amber-400 via-kalyal-gold to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-kalyal-gold/20 hover:shadow-glow-gold transition-all duration-300 flex items-center gap-1.5"
            >
              <span>Get Freight Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-kalyal-darker bg-gradient-to-r from-amber-400 to-kalyal-gold"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-kalyal-dark/98 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-kalyal-gold hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:+447746645195"
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-center text-slate-200 bg-white/5 border border-white/10 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-kalyal-gold" />
                  <span>Call Dispatch: +44 7746 645195</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-center text-kalyal-darker bg-gradient-to-r from-amber-400 via-kalyal-gold to-amber-500"
                >
                  Request Freight Quote
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
