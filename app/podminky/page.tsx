'use client';

import Footer from '../footer';
import Nav from '../nav';
import Top from '../top';
import { useState, useEffect } from 'react';

export default function CookiesPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 1200);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <Top />
            <Nav />
            <main className='flex justify-center items-center w-full flex-col'>
                <div className={isMobile ? "flex flex-col justify-center items-center w-full bg-white" : "flex flex-col justify-center items-center w-[60%] bg-white"}>
                    <h1 className='m-3 mt-5 text-center text-4xl text-[#007A37] p-1 border-b-2 border-red-600 uppercase'>
                        Informace o ochraně soukromí a souborech cookies
                    </h1>

                    <div className="w-full flex-col justify-center items-center min-w-[300px] p-8 lg:p-12 mb-12">
                        <p className="text-black text-justify text-md leading-relaxed">
                            Tento web je postaven s důrazem na minimalismus a soukromí uživatelů. Snažíme se omezit ukládání dat ve vašem prohlížeči na naprosté minimum.
                        </p>

                        <h2 className="text-xl text-black mb-4 mt-8 font-bold">1. Soubory cookies</h2>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            V současné době web nepoužívá žádné vlastní marketingové ani trackovací cookies.
                        </p>

                        <h2 className="text-xl text-black mb-4 mt-8 font-bold">2. Analytika webu</h2>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Pro měření návštěvnosti využíváme nástroj Vercel Analytics.
                        </p>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Tato služba nepoužívá cookies ani nesleduje vaši historii napříč jinými weby.
                        </p>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Veškerá data jsou anonymizována a slouží nám pouze k technickému vylepšování webu a sledování celkového počtu návštěv.
                        </p>

                        <h2 className="text-xl text-black mb-4 mt-8 font-bold">3. Služby třetích stran (YouTube)</h2>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Na webu se nachází vložená videa ze služby YouTube. Abychom chránili vaše soukromí, používáme tzv. režim zvýšeného soukromí (doména youtube-nocookie.com).
                        </p>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            <strong>Před spuštěním:</strong> YouTube do vašeho zařízení neukládá žádné cookies.
                        </p>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            <strong>Po spuštění:</strong> Jakmile video přehrajete, může si společnost Google (provozovatel YouTube) uložit technické cookies nezbytné pro fungování přehrávače a zapamatování vašich preferencí v rámci této služby.
                        </p>

                        <h2 className="text-xl text-black mb-4 mt-8 font-bold">4. Proč zde není souhlasná lišta?</h2>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Vzhledem k tomu, že web nepoužívá žádné sledovací skripty vyžadující předchozí souhlas (dle legislativy EU a ČR), není nutné vás obtěžovat vyskakovacím oknem.
                        </p>
                    </div>

                    <Footer />
                </div>
            </main>
        </div>
    );
}