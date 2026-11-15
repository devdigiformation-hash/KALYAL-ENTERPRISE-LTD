import { useState, useEffect, useRef, useCallback } from 'react';

interface UseImageSequenceOptions {
  folder?: string; // e.g. 'clip-01'
  frameCount?: number; // e.g. 38
  posterUrl: string;
  interimImageUrl?: string;
  priority?: boolean; // true for Hero (loads immediately), false for Zigzags (staged)
}

// Helper to asynchronously decode an image off the main UI thread
const loadAndDecode = async (
  src: string,
  fallbackSrc?: string
): Promise<HTMLImageElement | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    const onComplete = async () => {
      try {
        if ('decode' in img) {
          await img.decode();
        }
      } catch {
        // Non-fatal if decode fails or image is already decoded
      }
      resolve(img);
    };

    if (img.complete) {
      onComplete();
      return;
    }

    img.onload = () => {
      onComplete();
    };

    img.onerror = () => {
      if (fallbackSrc && img.src !== fallbackSrc) {
        img.src = fallbackSrc;
        img.onload = () => onComplete();
        img.onerror = () => resolve(null);
      } else {
        resolve(null);
      }
    };
  });
};

export const useImageSequence = ({
  folder,
  frameCount = 1,
  posterUrl,
  interimImageUrl,
  priority = false,
}: UseImageSequenceOptions) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Store loaded frame instances in a ref array for instant synchronous canvas access
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const hasTriggeredPrefetchRef = useRef(false);

  // Synchronous, non-flickering frame retriever with nearest-neighbor fallback
  const getFrame = useCallback(
    (targetIndex: number): HTMLImageElement | null => {
      const frames = framesRef.current;
      if (!frames || frames.length === 0) return null;

      const clamped = Math.max(0, Math.min(frameCount - 1, targetIndex));

      // 1. Exact frame if loaded and complete
      if (frames[clamped] && frames[clamped]?.complete) {
        return frames[clamped];
      }

      // 2. Search backwards for nearest ready frame
      for (let i = clamped - 1; i >= 0; i--) {
        if (frames[i] && frames[i]?.complete) {
          return frames[i];
        }
      }

      // 3. Search forwards for nearest ready frame
      for (let i = clamped + 1; i < frameCount; i++) {
        if (frames[i] && frames[i]?.complete) {
          return frames[i];
        }
      }

      // 4. Return initial frame or null
      return frames[0] || null;
    },
    [frameCount]
  );

  useEffect(() => {
    let isCancelled = false;
    hasTriggeredPrefetchRef.current = false;

    // Single static still handling (if interim mode is active or single frame)
    if (interimImageUrl || !folder || frameCount <= 1) {
      const singleUrl = interimImageUrl || posterUrl;
      loadAndDecode(singleUrl).then((img) => {
        if (isCancelled || !img) return;
        framesRef.current = [img];
        setImages([img]);
        setIsLoaded(true);
        setLoadProgress(100);
      });
      return () => {
        isCancelled = true;
      };
    }

    // Detect WebP support safely
    const testCanvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
    const isWebpSupported =
      testCanvas && testCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    const ext = isWebpSupported ? 'webp' : 'jpg';

    // 1. Immediately load and decode frame-001 with highest priority
    const frame001Src = `/sequences/${folder}/frame-001.${ext}`;
    const frame001Fallback = `/sequences/${folder}/frame-001.jpg`;

    loadAndDecode(frame001Src, frame001Fallback).then((firstImg) => {
      if (isCancelled || !firstImg) return;
      framesRef.current[0] = firstImg;
      setImages([firstImg]);
      setLoadProgress(Math.round((1 / frameCount) * 100));

      // 2. Schedule prefetching of remaining frames
      if (priority) {
        // High priority: start loading remaining frames immediately
        startPrefetching();
      } else {
        // Staged priority for secondary sequences: start after initial idle or short delay
        const timer = setTimeout(() => {
          if (!isCancelled) startPrefetching();
        }, 1200);
        return () => clearTimeout(timer);
      }
    });

    // Concurrently prefetch and decode remaining frames with a bounded concurrency pool (4 workers)
    const startPrefetching = async () => {
      if (hasTriggeredPrefetchRef.current || isCancelled) return;
      hasTriggeredPrefetchRef.current = true;

      let loadedCount = framesRef.current[0] ? 1 : 0;
      const concurrency = 4;
      let currentIndex = 1;

      const worker = async () => {
        while (currentIndex < frameCount && !isCancelled) {
          const indexToLoad = currentIndex++;
          const frameNum = String(indexToLoad + 1).padStart(3, '0');
          const primarySrc = `/sequences/${folder}/frame-${frameNum}.${ext}`;
          const fallbackSrc = `/sequences/${folder}/frame-${frameNum}.jpg`;

          const img = await loadAndDecode(primarySrc, fallbackSrc);
          if (isCancelled) return;

          if (img) {
            framesRef.current[indexToLoad] = img;
          }
          loadedCount++;

          const progress = Math.round((loadedCount / frameCount) * 100);
          setLoadProgress(progress);

          if (loadedCount === frameCount) {
            setIsLoaded(true);
            // Sync React state with complete loaded array
            setImages([...framesRef.current as HTMLImageElement[]]);
          }
        }
      };

      const workers = Array.from({ length: concurrency }, () => worker());
      await Promise.all(workers);
    };

    return () => {
      isCancelled = true;
    };
  }, [folder, frameCount, posterUrl, interimImageUrl, priority]);

  return {
    images,
    isLoaded,
    loadProgress,
    posterUrl,
    getFrame,
    totalFrames: frameCount,
  };
};
