'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 700);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const links = (
        <>
            <Link href="/" className="p-3 hover:bg-[#d00a17] text-[#ffffff]">ÚVOD</Link>
            <Link href="/nabidka" className="p-3 hover:bg-[#d00a17] text-[#ffffff]">NABÍDKA</Link>
            <Link href="/vinarstvi" className="p-3 hover:bg-[#d00a17] text-[#ffffff]">VINAŘSTVÍ</Link>
            <Link href="/blog" className="p-3 hover:bg-[#d00a17] text-[#ffffff]">BLOG</Link>
            <Link href="/kontakt" className="p-3 hover:bg-[#d00a17] text-[#ffffff]">KONTAKT</Link>
        </>
    );

    if (isMobile) {
        return (
            <nav className="sticky top-0 z-50 bg-[#ffbb54] flex flex-col">
                <button onClick={() => setIsOpen(!isOpen)} className="p-3 text-[#ffffff] text-center outline-none">
                    {isOpen ? 'ZAVŘÍT' : 'MENU'}
                </button>
                <div className={`flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    {links}
                </div>
            </nav>
        );
    }

    return (
        <nav className="flex justify-center sticky top-0 z-50 bg-[#ffbb54]">
            {links}
        </nav>
    );
}