import React, { useRef, useEffect, useCallback } from 'react';
import { useImageSequence } from '../hooks/useImageSequence';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ZigzagSequenceProps {
  id: string;
  badge: string;
  headline: string;
  highlightText: string;
  description: string;
  bullets: string[];
  ctaText: string;
  onCtaClick: () => void;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  layout: 'visual-right' | 'visual-left';
  folder: string;
  frameCount: number;
  interimImageUrl?: string;
}

export const ZigzagSequence: React.FC<ZigzagSequenceProps> = ({
  id,
  badge,
  headline,
  highlightText,
  description,
  bullets,
  ctaText,
  onCtaClick,
  secondaryCtaText,
  secondaryCtaLink,
  layout,
  folder,
  frameCount,
  interimImageUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeFrameRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 0 });
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);

  const { images, getFrame, posterUrl } = useImageSequence({
    folder,
    frameCount,
    posterUrl: `/posters/${folder}.jpg`,
    interimImageUrl,
    priority: false, // Staged loading: frame 001 first, remaining frames prefetched smoothly
  });

  // High performance canvas renderer: persists previous frame until next is ready
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const img = getFrame(index) || lastDrawnImgRef.current;
      if (!img || !img.complete) return;
      lastDrawnImgRef.current = img;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep aspect ratio intact (16:9 cinematic)
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let renderW: number, renderH: number, renderX: number, renderY: number;

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

      // Draw frame directly over canvas: NO fillRect wipe between frames to prevent blinking
      ctx.drawImage(img, renderX, renderY, renderW, renderH);
    },
    [getFrame]
  );

  // Decoupled canvas buffer resizing: runs ONLY on resize/orientation change
  useEffect(() => {
    const updateCanvasBuffer = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      if (
        canvasSizeRef.current.width !== width ||
        canvasSizeRef.current.height !== height ||
        canvasSizeRef.current.dpr !== dpr
      ) {
        canvasSizeRef.current = { width, height, dpr };
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        // Immediately redraw current active frame so canvas is never transparent or blank
        renderFrame(activeFrameRef.current);
      }
    };

    updateCanvasBuffer();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvasRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateCanvasBuffer();
      });
      resizeObserver.observe(canvasRef.current);
    }

    window.addEventListener('resize', updateCanvasBuffer);
    window.addEventListener('orientationchange', updateCanvasBuffer);

    return () => {
      window.removeEventListener('resize', updateCanvasBuffer);
      window.removeEventListener('orientationchange', updateCanvasBuffer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [renderFrame]);

  // Scroll listener for center-pinned stage with header compensation
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      renderFrame(0);
      return;
    }

    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Compensate for real sticky header height
      const headerOffset =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height')
        ) || 80;

      // Scrollable distance inside this pinned track
      const scrollableDistance = containerHeight - windowHeight;
      if (scrollableDistance <= 0) return;

      // Pinned track scrubbing progress 0 -> 1 aligned below header
      const rawProgress = (headerOffset - rect.top) / scrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      const targetFrame = Math.min(
        Math.round(clampedProgress * (frameCount - 1)),
        frameCount - 1
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
  }, [renderFrame, frameCount]);

  // Initial paint when frame 0 is decoded and available
  useEffect(() => {
    if (images.length > 0) {
      renderFrame(activeFrameRef.current);
    }
  }, [images, renderFrame]);

  // Clean visual element JSX — zero technical debug badges, pure cinematic footage
  const visualElement = (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-kalyal-card border border-white/10 shadow-2xl group">
      
      {/* Cinematic Frame Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover block"
        aria-label={`${headline} ${highlightText} road freight transport`}
      />

      {/* Fallback */}
      <noscript>
        <img 
          src={posterUrl} 
          alt={headline} 
          className="w-full h-full object-cover"
        />
      </noscript>

      {/* Subtle cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-kalyal-darker/60 via-transparent to-transparent pointer-events-none" />

      {/* Background ambient lighting accent */}
      <div className="absolute -inset-1 bg-gradient-to-r from-kalyal-gold/20 via-kalyal-blue/30 to-kalyal-gold/10 rounded-3xl blur-2xl -z-10 opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />
    </div>
  );

  // Content element JSX
  const contentElement = (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Editorial Category Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-300 text-xs font-semibold">
        <span>{badge}</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {headline} <br />
        <span className="text-gold-gradient">{highlightText}</span>
      </h2>

      {/* Description Body */}
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
        {description}
      </p>

      {/* Key verified highlights / bullets */}
      <div className="space-y-2.5 pt-2">
        {bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-kalyal-gold shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </div>
        ))}
      </div>

      {/* Action CTA Buttons */}
      <div className="pt-4 flex flex-wrap items-center gap-3.5">
        <button
          onClick={onCtaClick}
          className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-kalyal-darker bg-gradient-to-r from-amber-400 via-kalyal-gold to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-kalyal-gold/20 hover:shadow-glow-gold transition-all duration-300 flex items-center gap-2 group"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {secondaryCtaText && secondaryCtaLink && (
          <a
            href={secondaryCtaLink}
            className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 transition-all flex items-center gap-1.5"
          >
            <span>{secondaryCtaText}</span>
          </a>
        )}
      </div>

    </div>
  );

  return (
    <section 
      id={id}
      ref={containerRef}
      className="relative w-full bg-kalyal-darker border-t border-white/5"
      style={{ height: '200vh' }} // Generous scrub distance for center-pinned playback
    >
      {/* Sticky centered viewport stage pinned safely below header */}
      <div className="sticky top-[var(--header-height,80px)] h-[calc(100svh-var(--header-height,80px))] w-full flex items-center justify-center overflow-hidden py-4 sm:py-8">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Conditional Zigzag Column Order on Desktop */}
            {layout === 'visual-right' ? (
              <>
                <div className="lg:col-span-5 order-2 lg:order-1">
                  {contentElement}
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2">
                  {visualElement}
                </div>
              </>
            ) : (
              <>
                <div className="lg:col-span-7 order-1 lg:order-1">
                  {visualElement}
                </div>
                <div className="lg:col-span-5 order-2 lg:order-2">
                  {contentElement}
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
