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
        
        {/* SECTION 01: Full-Viewport Opening Hero — Container Loading (VIDEO_01, 38 frames) */}
        <HeroSequence onOpenQuote={() => setQuoteOpen(true)} />

        {/* SECTION 02: Zigzag 1 — Road Freight Delivery (VIDEO_02, Visual Right) */}
        <ZigzagSequence
          id="journey"
          badge="Road Freight Delivery"
          headline="Road Freight"
          highlightText="Delivery."
          description="Connecting shipping terminals, industrial manufacturers, and regional distribution centers across England, Scotland, and Wales. Coordinated freight routing maintains scheduled headway through high-capacity motorway lanes and primary arterial corridors."
          bullets={[
            'Punctual transit via M1, M6, M25, and UK trunk corridors',
            'Heavy haulage container transport with verified load securing',
            'Disciplined transport operations adhering strictly to UK tachograph laws',
          ]}
          ctaText="Our Services"
          onCtaClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          secondaryCtaText="Contact Us"
          secondaryCtaLink="#contact"
          layout="visual-right"
          folder="clip-02"
          frameCount={28}
        />

        {/* SECTION 03: Zigzag 2 — Cargo Handling & Warehouse Delivery (VIDEO_03, 35 frames, Visual Left) */}
        <ZigzagSequence
          id="unloading"
          badge="Cargo Handling"
          headline="Cargo Handling &"
          highlightText="Warehouse Delivery."
          description="Smooth transfer and cargo intake at regional warehouse facilities. Palletised freight is unloaded with dedicated handling protocols, verifying consignment seals and paperwork for prompt distribution turnaround."
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
          frameCount={35}
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
