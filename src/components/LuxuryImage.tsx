import React, { useState } from 'react';
import { Compass, Ship, Anchor } from 'lucide-react';

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: 'yacht' | 'destination' | 'interior' | 'avatar';
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  className = '',
  category = 'yacht',
  aspectRatio = 'video',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {/* Aesthetic fallback placeholder / gradient mesh */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1322] via-[#101b30] to-[#080d18] text-slate-400 p-4 select-none">
          {/* Subtle architectural marine grid lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="w-12 h-12 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center justify-center text-amber-300/70 mb-2">
            {category === 'destination' ? (
              <Compass className="w-5 h-5" />
            ) : category === 'avatar' ? (
              <Anchor className="w-5 h-5" />
            ) : (
              <Ship className="w-5 h-5" />
            )}
          </div>
          <span className="text-[11px] font-medium tracking-widest uppercase text-amber-200/50 text-center max-w-[80%] truncate">
            {alt || 'Pelagos Atelier'}
          </span>
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
