import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useImageSequence } from '../hooks/useImageSequence';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ZigzagSequenceProps {
  id: string;
  stageNumber: string;
  stageTitle: string;
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
}

export const ZigzagSequence: React.FC<ZigzagSequenceProps> = ({
  id,
  stageNumber,
  stageTitle,
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
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { images, posterUrl } = useImageSequence({
    folder,
    frameCount,
    posterUrl: `/posters/${folder}.jpg`,
  });

  // High performance canvas renderer
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

    ctx.fillStyle = '#081426';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, renderX, renderY, renderW, renderH);
    ctx.restore();
  }, [images]);

  // Scroll listener for pinned stage
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Scrollable distance inside this pinned track
      const scrollableDistance = containerHeight - windowHeight;
      if (scrollableDistance <= 0) return;

      const rawProgress = -rect.top / scrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);

      const targetFrame = Math.min(
        Math.round(clampedProgress * (frameCount - 1)),
        frameCount - 1
      );

      setCurrentFrameIndex(targetFrame);
      animationFrameId = requestAnimationFrame(() => renderFrame(targetFrame));
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

  // Initial paint
  useEffect(() => {
    if (images[0]) {
      renderFrame(0);
    }
  }, [images, renderFrame]);

  // Visual element JSX
  const visualElement = (
    <div className="w-full relative group">
      
      {/* Outer cinematic container with glass border and glow */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-kalyal-dark/90 border border-white/15 shadow-2xl shadow-black/80 aspect-video">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover block"
          aria-label={`${headline} - scroll driven sequence`}
        />

        {/* Fallback */}
        <noscript>
          <img 
            src={posterUrl} 
            alt={headline} 
            className="w-full h-full object-cover"
          />
        </noscript>

        {/* Subtle cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-kalyal-darker/70 via-transparent to-transparent pointer-events-none" />

        {/* Interactive Scrub Info Badge on the Canvas */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass-panel px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2.5 text-[11px] sm:text-xs">
          <div className="w-2 h-2 rounded-full bg-kalyal-gold animate-ping" />
          <span className="text-slate-300 font-medium">
            Frame {currentFrameIndex + 1}/{frameCount}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-400 font-semibold">
            {Math.round(scrollProgress * 100)}% Scrubbed
          </span>
        </div>

        {/* Subtle stage watermark */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-kalyal-dark/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          {stageTitle}
        </div>
      </div>

      {/* Background ambient lighting accent */}
      <div className="absolute -inset-1 bg-gradient-to-r from-kalyal-gold/20 via-kalyal-blue/30 to-kalyal-gold/10 rounded-3xl blur-2xl -z-10 opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />
    </div>
  );

  // Content element JSX
  const contentElement = (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Stage Number & Category Badge */}
      <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-300 text-xs font-semibold">
        <span className="w-5 h-5 rounded-full bg-kalyal-gold text-kalyal-darker flex items-center justify-center font-bold text-[11px]">
          {stageNumber}
        </span>
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
      {/* Sticky centered viewport stage */}
      <div className="sticky top-[58px] sm:top-[74px] h-[calc(100svh-58px)] sm:h-[calc(100svh-74px)] w-full flex items-center justify-center overflow-hidden py-4 sm:py-8">
        
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
