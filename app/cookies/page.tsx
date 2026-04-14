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
                        Informace o cookies
                    </h1>
                    
                    <div className="w-full flex-col justify-center items-center min-w-[300px] p-8 lg:p-12 mb-12">
                        <p className="text-black text-justify text-md leading-relaxed">
                            Tyto webové stránky nepoužívají žádné soubory cookies ani jiné technologie ukládající data do koncového zařízení uživatele.
                        </p>

                        <h2 className="text-xl text-black mb-4 mt-8 font-bold">Co jsou cookies</h2>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Cookies jsou malé textové soubory, které webové stránky ukládají do zařízení uživatele za účelem zajištění funkčnosti webu, analýzy návštěvnosti nebo personalizace obsahu.
                        </p>

                        <h2 className="text-xl text-black mb-4 mt-8 font-bold">Používání cookies na těchto stránkách</h2>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Provozovatel těchto webových stránek prohlašuje, že:
                        </p>
                        <ul className="list-disc list-inside text-black text-justify text-md leading-relaxed mt-4 space-y-2">
                            <li>neukládá žádné cookies (ani technické, ani analytické či marketingové),</li>
                            <li>nepoužívá žádné nástroje třetích stran, které by cookies ukládaly,</li>
                            <li>nesleduje chování uživatelů na těchto stránkách.</li>
                        </ul>

                        <h2 className="text-xl text-black mb-4 mt-8 font-bold">Právní rámec</h2>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Podle české legislativy je ukládání cookies (s výjimkou nezbytných technických) možné pouze na základě předchozího souhlasu uživatele (tzv. režim opt-in).
                        </p>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Pokud web cookies nepoužívá, nevzniká povinnost získávat souhlas prostřednictvím cookie lišty. Provozovatel však i v takovém případě poskytuje transparentní informaci o této skutečnosti.
                        </p>

                        <h2 className="text-xl text-black mb-4 mt-8 font-bold">Ochrana osobních údajů</h2>
                        <p className="text-black text-justify text-md leading-relaxed mt-4">
                            Protože tyto stránky nevyužívají cookies ani jiné sledovací technologie, nedochází tímto způsobem ke zpracování osobních údajů uživatelů.
                        </p>
                    </div>

                    <Footer />
                </div>
            </main>
        </div>
    );
}