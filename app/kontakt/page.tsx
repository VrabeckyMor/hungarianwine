"use client"

import { useState } from "react";
import Nav from "../nav";
import Footer from "../footer";
import Top from "../top";
import { useEffect } from "react";
import Image from 'next/image';

export default function Kontakt() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1200);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Top />
            <Nav />
            <main className='flex justify-center items-center w-full flex-col'>
                <div className={isMobile ? "flex flex-wrap w-full justify-center items-center bg-white" : "flex flex-wrap w-[60%] justify-center bg-white"}>
                    <div className={isMobile ? "flex flex-col justify-center items-center w-full bg-white p-3" : "flex flex-wrap justify-center items-center w-[40%] bg-white"}>
                        <div className="w-full flex-col justify-center items-center">
                            <h1 className={isMobile ? "text-2xl text-[#007A37]" : "text-3xl text-[#007A37]"}>HUNGARIAN WINE</h1>
                            <p className="p-2">E-MAIL <br /> tomas@hungarianwine.cz</p>
                            <p className="p-2">TELEFON <br /> +420 736 502 958</p>
                            <p className="p-2">PONDĚLÍ - PÁTEK <br /> Od 9:00 do 18:00</p>
                        </div>
                    </div>
                    {isMobile ? null :
                        <div className="w-[40%] h-[80%] flex flex-wrap justify-center items-center">
                            <Image
                                src="/mail-ico.png"
                                width={300}
                                height={300}
                                alt="ikona mailu"
                            />
                        </div>
                    }
                    <Footer />
                </div>
            </main>
        </div>
    );
}
