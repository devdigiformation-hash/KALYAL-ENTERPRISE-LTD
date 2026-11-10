import { useState, useEffect, useRef } from 'react';

interface UseImageSequenceOptions {
  folder: string; // e.g. 'clip-01'
  frameCount: number; // e.g. 42
  posterUrl: string;
}

export const useImageSequence = ({ folder, frameCount, posterUrl }: UseImageSequenceOptions) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    // Detect WebP support quickly
    const testCanvas = document.createElement('canvas');
    const isWebpSupported = testCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    const extension = isWebpSupported ? 'webp' : 'jpg';

    // 1. Immediately load the first frame & poster
    const firstImg = new Image();
    firstImg.src = `/sequences/${folder}/frame-001.${extension}`;
    firstImg.onload = () => {
      if (isCancelled) return;
      loadedImages[0] = firstImg;
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / frameCount) * 100));
      // First frame ready
      imagesRef.current = loadedImages;
      setImages([...loadedImages]);
    };
    firstImg.onerror = () => {
      // Fallback to jpg if webp failed
      firstImg.src = `/sequences/${folder}/frame-001.jpg`;
    };

    // 2. Preload the remaining frames progressively
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, '0');
      img.src = `/sequences/${folder}/frame-${frameNum}.${extension}`;
      img.onload = () => {
        if (isCancelled) return;
        loadedImages[i] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setIsLoaded(true);
          imagesRef.current = loadedImages;
          setImages([...loadedImages]);
        }
      };
      img.onerror = () => {
        // Fallback to jpg
        img.src = `/sequences/${folder}/frame-${frameNum}.jpg`;
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [folder, frameCount]);

  return { images, isLoaded, loadProgress, posterUrl };
};
