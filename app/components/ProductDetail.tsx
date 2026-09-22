'use client';

import { renderRichText } from '@/lib/richtext';
import { productImages } from '@/lib/images';
import ImageCarousel from './ImageCarousel';

export interface ProductDetailData {
    name: string;
    price: number;
    category: string;
    image?: string | null;
    images?: string[] | null;
    description: string;
    region?: string | null;
    color?: string | null;
    sweetness?: string | null;
    country?: string | null;
    alcohol?: number | null;
    volume?: number | null;
}

const SWEETNESS_LABELS: Record<string, string> = {
    dry: 'Suché',
    mediumdry: 'Polosuché',
    medium: 'Polosladké',
    sweet: 'Sladké',
};

interface ProductDetailProps {
    product: ProductDetailData;
    onClose: () => void;
}

/** Obsah detailu produktu. Sdílí ho modal v nabídce i náhled v administraci,
 *  aby náhled ukazoval přesně to, co uvidí zákazník. */
export default function ProductDetail({ product, onClose }: ProductDetailProps) {
    return (
        <div
            className="bg-white w-full h-full md:h-auto md:max-w-4xl md:rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden relative flex flex-col md:flex-row transition-all animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-3 bg-white/90 md:bg-gray-100 hover:bg-red-50 text-gray-800 hover:text-red-600 rounded-full md:rounded-xl transition-all shadow-lg md:shadow-none"
                aria-label="Zavřít"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Image Panel */}
            <ImageCarousel
                images={productImages(product)}
                alt={product.name}
                className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100"
                imageClassName="w-full h-full object-cover"
            />

            {/* Content Panel */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col md:overflow-y-auto md:max-h-[80vh]">
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-bold mb-2">
                    {product.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 leading-tight">
                    {product.name}
                </h2>
                <div className="w-12 h-1 bg-red-600 mb-4"></div>

                <div className="mb-6">
                    <p className="text-sm text-gray-400 font-medium">Cena s DPH</p>
                    <p className="text-3xl font-black text-[#007A37]">{product.price} Kč</p>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Oblast</p>
                        <p className="font-bold text-gray-800">{product.region || 'Neznámo'}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Sladkost</p>
                        <p className="font-bold text-gray-800">{SWEETNESS_LABELS[product.sweetness ?? ''] || 'Neznámo'}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Alkohol</p>
                        <p className="font-bold text-gray-800">{product.alcohol}%</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Objem</p>
                        <p className="font-bold text-gray-800">{product.volume} L</p>
                    </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-8 grow">
                    {renderRichText(product.description)}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-auto pt-6 border-t border-gray-100">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gray-400 font-medium">Cena s DPH</p>
                        <p className="text-3xl font-black text-[#007A37]">{product.price} Kč</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors shadow-xl"
                    >
                        Zavřít detail
                    </button>
                </div>
            </div>
        </div>
    );
}
