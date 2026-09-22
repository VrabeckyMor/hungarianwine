'use client';

import { useEffect, useState } from 'react';

interface ImageCarouselProps {
    images: string[];
    alt: string;
    className?: string;
    imageClassName?: string;
    fallback?: string;
    /** Interval automatického přepínání v ms. */
    intervalMs?: number;
    /** Po ručním kliknutí na šipku se automatické přepínání vypne. */
    stopOnInteraction?: boolean;
}

export default function ImageCarousel({
    images,
    alt,
    className = '',
    imageClassName = 'w-full h-full object-cover',
    fallback = 'https://placehold.co/800x800?text=Wine',
    intervalMs = 5000,
    stopOnInteraction = true,
}: ImageCarouselProps) {
    const [rawIndex, setIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const count = images.length;
    // Kratší seznam (jiný produkt) nesmí nechat index mimo rozsah.
    const index = count > 0 ? rawIndex % count : 0;

    useEffect(() => {
        if (!autoplay || count < 2) return;
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % count), intervalMs);
        return () => clearInterval(timer);
    }, [autoplay, count, intervalMs]);

    const go = (e: React.MouseEvent, step: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (stopOnInteraction) setAutoplay(false);
        setIndex((index + step + count) % count);
    };

    if (count === 0) {
        return (
            <div className={`relative ${className}`}>
                <img src={fallback} alt={alt} className={imageClassName} />
            </div>
        );
    }

    return (
        <div className={`relative group/carousel ${className}`}>
            {images.map((src, i) => (
                <img
                    key={`${src}-${i}`}
                    src={src}
                    alt={alt}
                    className={`${imageClassName} ${i === index ? '' : 'hidden'}`}
                    onError={(e) => ((e.target as HTMLImageElement).src = fallback)}
                />
            ))}

            {count > 1 && (
                <>
                    <button
                        type="button"
                        onClick={(e) => go(e, -1)}
                        aria-label="Předchozí obrázek"
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 focus:opacity-100"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={(e) => go(e, 1)}
                        aria-label="Další obrázek"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 focus:opacity-100"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((src, i) => (
                            <span
                                key={`dot-${src}-${i}`}
                                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/60'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
