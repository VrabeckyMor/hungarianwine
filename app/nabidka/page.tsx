'use client';

import Footer from '../footer';
import Nav from '../nav';
import Top from '../top';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { productImages } from '@/lib/images';
import ImageCarousel from '../components/ImageCarousel';
import ProductDetail from '../components/ProductDetail';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    images?: string[] | null;
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
                                <ImageCarousel
                                    images={productImages(product)}
                                    alt={product.name}
                                    className="w-full aspect-square overflow-hidden bg-gray-50 border-b border-gray-100"
                                    imageClassName="w-full h-full object-cover grayscale-20"
                                    fallback="https://placehold.co/400x400?text=Wine"
                                />
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
                    <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                </div>
            )}
        </div>
    );
}