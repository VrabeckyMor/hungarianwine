'use client';

import Footer from './footer';
import Nav from './nav';
import Top from './top';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page() {
  const slideshow = [
    "/main.jpg",
    "/main2.jpg",
    "/main3.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === slideshow.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
        <div className={isMobile ? "relative w-full aspect-20/9 overflow-hidden bg-black transition-all" : "relative w-[60%] aspect-20/9 overflow-hidden bg-black transition-all"}>
          <Image src={slideshow[index]} alt="Slideshow" width={1504} height={704} className="object-cover animate-fade-long" />
          <label className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-3xl">
            EXKLUZIVNÍ MAĎARSKÁ VÍNA
          </label>
          <label className="absolute top-9/10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-xs w-[90%]">
            Tyto stránky jsou určeny pouze návštěvníkům starším 18 let. Pokud vám je méně než 18 let, ihned stránky opusťte!
          </label>
        </div>
        <div className={isMobile ? "flex flex-col justify-center items-center w-full bg-white" : "flex flex-col justify-center items-center w-[60%] bg-white"}>
          <p className='w-[95%] mt-5 text-justify text-md'>Všechna naše vína jsou jakostní, 95% z nich jsou s Chráněným označením původu - DHC (Districtus Hungaricus Controllatus). Vína jsou převážně z jižních oblastí - Villány, Szekszárd, Pécs... Vyzkoušejte zajímavé maďarské odrůdy, či poctivě vyrobená vína z klasických odrůd. Naši vinaři kladou důraz na vysokou kvalitu zpracování. Ruční sběr hroznů, žádné herbicidy, insekticidy a umělá hnojiva, zkrátka péče o révu v souladu s přírodou a příprava vína s láskou a odborností.</p>
          <label className='w-[95%] mt-5 text-center text-sm font-bold text-red-600'>Pojďte si objednat něco dobrého!</label>
          <button className='flex flex-row justify-center items-center w-full'>
            <Link href="/nabidka" className='flex flex-row justify-center items-center w-[60%] text-4xl text-white font-bold border-b-10 border-amber-500 bg-[#ffbb54] p-4 m-4 active:border-white active:translate-y-4 transition-all'>VYBRAT SI</Link>
          </button>
          <h1 className='m-3 mt-5 text-center text-4xl text-[#007A37] p-1 border-b-2 border-red-600'>NAŠE VINAŘSTVÍ</h1>
          <div className='flex flex-wrap justify-center items-center w-full'>
            <div className='w-[300px] h-[300px] bg-[url("/polgar.jpg")] bg-cover bg-[75%_center] m-4 relative'>
              <Link href="/vinarstvi#polgar" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>POLGÁR</Link>
            </div>
            <div className='w-[300px] h-[300px] bg-[url("/fekete.jpg")] bg-cover bg-[75%_center] m-4 relative'>
              <Link href="/vinarstvi#fekete" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>FEKETE</Link>
            </div>
            <div className='w-[300px] h-[300px] bg-[url("/cseri.jpg")] bg-cover bg-[50%_center] m-4 relative'>
              <Link href="/vinarstvi#cseri" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>VINAŘSTVÍ CSERI</Link>
            </div>
            <div className='w-[300px] h-[300px] bg-[url("/schunk.jpg")] bg-cover bg-[75%_center] m-4 relative'>
              <Link href="/vinarstvi#schunk" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>VINNÝ SKLEP SCHUNK</Link>
            </div>
            <div className='w-[300px] h-[300px] bg-[url("/haraszthy.jpg")] bg-cover bg-[55%_center] m-4 relative'>
              <Link href="/vinarstvi#haraszthy" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>VINICE HARASZTHY</Link>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
