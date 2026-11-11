import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSequence } from './components/HeroSequence';
import { ZigzagSequence } from './components/ZigzagSequence';
import { Services } from './components/Services';
import { AboutUs } from './components/AboutUs';
import { CareersSection } from './components/CareersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { QuoteModal } from './components/QuoteModal';
import { PrivacyModal } from './components/PrivacyModal';

export const App: React.FC = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-kalyal-darker text-slate-100 flex flex-col selection:bg-kalyal-gold selection:text-kalyal-darker">
      
      {/* 1. Header with Top-Left Brand Logo ONLY */}
      <Header onOpenQuote={() => setQuoteOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* SECTION 01: Full-Viewport Opening Hero — Container Loading & Dispatch (CLIP_01, 42 frames) */}
        <HeroSequence onOpenQuote={() => setQuoteOpen(true)} />

        {/* SECTION 02: Zigzag 1 — UK Road Freight Journey (CLIP_02, 45 frames, Visual Right) */}
        <ZigzagSequence
          id="journey"
          badge="UK Motorway Corridor"
          headline="Freight Moving Across"
          highlightText="the UK Road Network."
          description="Connecting shipping terminals, industrial manufacturers, and regional distribution centers across England, Scotland, and Wales. Our modern fleet maintains scheduled headway through high-capacity motorway lanes and scenic arterial corridors."
          bullets={[
            'Punctual transit via M1, M6, M25, and UK trunk corridors',
            'Heavy haulage container transport with verified load securing',
            'Dedicated driver protocols adhering strictly to UK tachograph laws',
          ]}
          ctaText="Explore Our Services"
          onCtaClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          secondaryCtaText="Request a Quote"
          secondaryCtaLink="#hero"
          layout="visual-right"
          folder="clip-02"
          frameCount={45}
        />

        {/* SECTION 03: Zigzag 2 — Warehouse Unloading & Handover (CLIP_03, 31 frames, Visual Left) */}
        <ZigzagSequence
          id="unloading"
          badge="Delivery & Unloading"
          headline="From Arrival to"
          highlightText="Precise Warehouse Handover."
          description="Precision maneuvering into distribution center delivery bays. Our drivers coordinate directly with on-site forklift teams to inspect container seals, unload palletized cargo safely, and verify electronic proof-of-delivery documentation."
          bullets={[
            'Dock-level warehouse bay integration for rapid pallet discharge',
            'Full consignment integrity verification and seal inspection',
            'Seamless handover minimizing trailer turnaround time',
          ]}
          ctaText="Discuss Your Shipment"
          onCtaClick={() => setQuoteOpen(true)}
          secondaryCtaText="View All Services"
          secondaryCtaLink="#services"
          layout="visual-left"
          folder="clip-03"
          frameCount={31}
        />

        {/* SECTION 04: Zigzag 3 — Careers & Commercial Recruitment (CLIP_04, 31 frames, Visual Right) */}
        <ZigzagSequence
          id="careers-preview"
          badge="Careers & Expansion"
          headline="Build Your Career With"
          highlightText="KALYAL ENTERPRISE LTD."
          description="Accelerate commercial road haulage with our forward-looking logistics team. We are actively hiring a Business Development Manager (£52,500–£57,500) to nurture enterprise shipper relationships, tender freight contracts, and expand our UK footprint."
          bullets={[
            'Senior Business Development Manager opening (£52,500 – £57,500)',
            'Dynamic commercial environment with direct operations alignment',
            'Lead high-impact freight contracts across UK manufacturing and retail',
          ]}
          ctaText="View Vacancy / Apply Now"
          onCtaClick={() => {
            const el = document.getElementById('careers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          layout="visual-right"
          folder="clip-04"
          frameCount={31}
        />

        {/* Comprehensive Road Freight Services */}
        <Services onOpenQuote={() => setQuoteOpen(true)} />

        {/* Factual About Us Section */}
        <AboutUs />

        {/* Dedicated Careers Section with Apply Flow */}
        <CareersSection />

        {/* Contact Dispatch & Form */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer 
        onOpenQuote={() => setQuoteOpen(true)} 
        onOpenPrivacy={() => setPrivacyOpen(true)} 
      />

      {/* Floating Authentic WhatsApp Button */}
      <WhatsAppButton />

      {/* Freight Quotation Modal */}
      <QuoteModal 
        isOpen={quoteOpen} 
        onClose={() => setQuoteOpen(false)} 
      />

      {/* Privacy Notice Modal */}
      <PrivacyModal 
        isOpen={privacyOpen} 
        onClose={() => setPrivacyOpen(false)} 
      />

    </div>
  );
};

export default App;
