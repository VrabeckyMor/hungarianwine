'use client';

import Footer from '../footer';
import Nav from '../nav';
import Top from '../top';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    region?: string | null;
    color?: string | null;
    sweetness?: string | null;
    country?: string | null;
    alcohol?: number | null;
    volume?: number | null;
}


export default function Nabidka() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 1200);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedProduct(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProduct]);

    const [products, setProducts] = useState<Product[]>([]);

    async function fetchProducts() {
        try {
            const res = await fetch('../api');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <Top />
            <Nav />
            <main className='flex justify-center items-center w-full flex-col'>
                <div className={isMobile ? "flex flex-col justify-center items-center w-full bg-white" : "flex flex-col justify-center items-center w-[60%] bg-white"}>
                    <h1 className='m-3 mt-5 text-center text-4xl text-[#007A37] p-1 border-b-2 border-red-600'>Produkty</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[95%] mb-12'>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="relative group bg-white border border-gray-100 flex flex-col items-center cursor-pointer"
                            >
                                <div className="w-full aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover grayscale-20"
                                        onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Wine')}
                                    />
                                </div>
                                <div className="w-full p-4 flex flex-col items-center text-center">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-bold mb-1">
                                        {product.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight min-h-12 flex items-center">
                                        {product.name}
                                    </h3>
                                    <div className="w-8 h-[2px] bg-red-600 mb-3"></div>
                                    <p className="text-xl font-extrabold text-[#007A37]">
                                        {product.price} Kč
                                    </p>
                                    <div className="mt-4 w-full pt-4 border-t border-gray-50 flex justify-between items-center text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                                        <span>{product.region || 'Maďarsko'}</span>
                                        <Link href="/nabidka" className="text-emerald-700 font-bold border-b border-emerald-700/0 hover:border-emerald-700 transition-all">
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            </main>

            {/* Modal Overlay */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm transition-all animate-in fade-in duration-300"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div
                        className="bg-white w-full h-full md:h-auto md:max-w-4xl md:rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden relative flex flex-col md:flex-row transition-all animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 p-3 bg-white/90 md:bg-gray-100 hover:bg-red-50 text-gray-800 hover:text-red-600 rounded-full md:rounded-xl transition-all shadow-lg md:shadow-none"
                            aria-label="Zavřít"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Panel */}
                        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                                onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/800x800?text=Wine')}
                            />
                        </div>

                        {/* Content Panel */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col md:overflow-y-auto md:max-h-[80vh]">
                            <span className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-bold mb-2">
                                {selectedProduct.category}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                {selectedProduct.name}
                            </h2>
                            <div className="w-12 h-1 bg-red-600 mb-6"></div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8 grow">
                                {selectedProduct.description}
                            </p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Oblast</p>
                                    <p className="font-bold text-gray-800">{selectedProduct.region || 'Neznámo'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Sladkost</p>
                                    <p className="font-bold text-gray-800">{selectedProduct.sweetness || 'Neznámo'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Alkohol</p>
                                    <p className="font-bold text-gray-800">{selectedProduct.alcohol}%</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Objem</p>
                                    <p className="font-bold text-gray-800">{selectedProduct.volume} L</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-auto pt-6 border-t border-gray-100">
                                <div className="text-center md:text-left">
                                    <p className="text-sm text-gray-400 font-medium">Cena s DPH</p>
                                    <p className="text-3xl font-black text-[#007A37]">{selectedProduct.price} Kč</p>
                                </div>
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors shadow-xl"
                                >
                                    Zavřít detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}