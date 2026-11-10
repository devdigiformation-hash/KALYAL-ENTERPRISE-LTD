import React, { useState } from 'react';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // International digits-only number
  const rawNumber = import.meta.env.VITE_KALYAL_WHATSAPP_NUMBER || '447746645195';
  const whatsappNumber = rawNumber.replace(/[^0-9]/g, '');

  const defaultMessage = encodeURIComponent(
    'Hello KALYAL ENTERPRISE LTD, I would like to enquire about road freight services.'
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      
      {/* Floating tooltip preview */}
      <div
        className={`glass-panel px-3.5 py-1.5 rounded-full text-xs font-semibold text-white shadow-xl transition-all duration-300 pointer-events-none hidden sm:block ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-3'
        }`}
      >
        <span>Chat on WhatsApp</span>
      </div>

      {/* Official WhatsApp Brand Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact KALYAL ENTERPRISE LTD on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/40 relative group"
      >
        {/* Authentic WhatsApp Icon SVG */}
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.777.98-.953 1.181-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.635-.929-2.239-.244-.588-.492-.508-.678-.518-.176-.009-.376-.009-.577-.009-.2 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.511s1.079 2.912 1.23 3.113c.15.2 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.379.197 1.898.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 2C6.51 2 2.019 6.49 2.019 12.02c0 1.95.56 3.77 1.53 5.32L2 22l4.82-1.53c1.5 1 3.27 1.57 5.22 1.57 5.53 0 10.02-4.49 10.02-10.02C22.06 6.49 17.57 2 12.04 2zm0 18.23c-1.74 0-3.36-.51-4.72-1.39l-.34-.22-2.86.91.93-2.79-.23-.37c-.98-1.55-1.57-3.37-1.57-5.35 0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24z"/>
        </svg>

        {/* Pulse beacon badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full" />
      </a>
    </div>
  );
};
