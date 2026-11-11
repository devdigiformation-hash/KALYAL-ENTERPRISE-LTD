import React, { useRef, useEffect, useCallback } from 'react';
import { useImageSequence } from '../hooks/useImageSequence';
import { ArrowRight, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSequenceProps {
  onOpenQuote: () => void;
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeFrameRef = useRef(0);

  const { images, posterUrl } = useImageSequence({
    folder: 'clip-01',
    frameCount: 42,
    posterUrl: '/posters/clip-01.jpg',
  });

  // Render active frame to canvas with high fidelity
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = images[index] || images[0];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate aspect ratio cover / contain based on screen width
    // On desktop, safe cover focusing on middle-right truck & crane
    // On mobile (<768px), contain or high-aspect fit to keep the crane & container fully visible
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let renderW: number, renderH: number, renderX: number, renderY: number;

    if (width < 768) {
      // Mobile: preserve full scene with slight margin
      if (canvasRatio > imgRatio) {
        renderH = height;
        renderW = height * imgRatio;
        renderX = (width - renderW) / 2;
        renderY = 0;
      } else {
        renderW = width;
        renderH = width / imgRatio;
        renderX = 0;
        renderY = (height - renderH) / 2;
      }
      // Fill canvas background
      ctx.fillStyle = '#050d1a';
      ctx.fillRect(0, 0, width, height);
    } else {
      // Desktop: cinematic cover with subtle alignment
      if (canvasRatio > imgRatio) {
        renderW = width;
        renderH = width / imgRatio;
        renderX = 0;
        renderY = (height - renderH) / 2;
      } else {
        renderH = height;
        renderW = height * imgRatio;
        renderX = (width - renderW) / 2;
        renderY = 0;
      }
    }

    ctx.drawImage(img, renderX, renderY, renderW, renderH);
    ctx.restore();
  }, [images]);

  // Handle scroll progress internally without exposing debug metadata
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // When the top of container enters viewport, progress goes 0 -> 1
      const scrollableDistance = containerHeight - windowHeight;
      if (scrollableDistance <= 0) return;

      const rawProgress = -rect.top / scrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      const targetFrame = Math.min(
        Math.round(clampedProgress * 41),
        41
      );

      if (targetFrame !== activeFrameRef.current) {
        activeFrameRef.current = targetFrame;
        animationFrameId = requestAnimationFrame(() => renderFrame(targetFrame));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [renderFrame]);

  // Initial paint when first image is loaded
  useEffect(() => {
    if (images[0]) {
      renderFrame(0);
    }
  }, [images, renderFrame]);

  return (
    <div 
      id="hero"
      ref={containerRef} 
      className="relative w-full bg-kalyal-darker"
      style={{ height: '240vh' }} // Ample scroll room to scrub all 42 frames smoothly
    >
      {/* Sticky viewport frame pinned dynamically below header */}
      <div className="sticky top-[var(--header-height,80px)] h-[calc(100svh-var(--header-height,80px))] w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Canvas Rendering Sequence */}
        <div className="absolute inset-0 z-0">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover"
            aria-label="KALYAL ENTERPRISE LTD road freight container dispatch scroll animation"
          />

          {/* Fallback image if canvas loading or JS disabled */}
          <noscript>
            <img 
              src={posterUrl} 
              alt="KALYAL ENTERPRISE LTD container haulage truck" 
              className="w-full h-full object-cover"
            />
          </noscript>

          {/* Cinematic Vignette and Contrast Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-kalyal-darker/80 via-transparent to-kalyal-darker/90 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-kalyal-darker/95 via-kalyal-darker/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-kalyal-darker via-kalyal-darker/50 to-transparent pointer-events-none" />
        </div>

        {/* Real Accessible HTML Content Overlays */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-10 md:pt-14 pb-8 flex-1 flex flex-col justify-between pointer-events-none">
          
          {/* Top Tag & Main Headline */}
          <div className="max-w-2xl pointer-events-auto">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-kalyal-navy/80 border border-kalyal-gold/40 text-amber-300 text-xs font-semibold mb-4 backdrop-blur-md shadow-lg shadow-black/30">
              <Sparkles className="w-3.5 h-3.5 text-kalyal-gold animate-pulse" />
              <span>United Kingdom Road Haulage Fleet</span>
            </div>

            {/* Strict rule: No duplicate logo here, pure high-impact typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4 drop-shadow-md">
              Reliable Road Freight, <br />
              <span className="text-gold-gradient">From Collection</span> <br className="hidden sm:inline" />
              to Delivery.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed mb-6 max-w-xl drop-shadow">
              Specialized UK freight transport by road. Operating dependable heavy haulage, scheduled motorway linehauls, and container logistics with dedicated operational precision.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-kalyal-darker bg-gradient-to-r from-amber-400 via-kalyal-gold to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-kalyal-gold/20 hover:shadow-glow-gold transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Request a Freight Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#services"
                className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-100 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-white/20 backdrop-blur-md transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Quick Factual Highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0" />
                <span>Standard & FTL Haulage</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0" />
                <span>Intermodal Containers</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0" />
                <span>Direct UK Motorways</span>
              </div>
            </div>

          </div>

          {/* Bottom Guidance Hint (Pure marketing hint, zero debug counters or frame text) */}
          <div className="w-full flex items-end justify-end pointer-events-auto pt-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 animate-bounce">
              <span>Scroll to explore</span>
              <ChevronDown className="w-4 h-4 text-kalyal-gold" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
