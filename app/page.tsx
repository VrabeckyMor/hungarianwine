'use client';

import Footer from './footer';
import Nav from './nav';
import Top from './top';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const slideshow = [
    "/main.jpg",
    "/main2.jpg",
    "/main3.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [showAgePopup, setShowAgePopup] = useState(true);
  const router = useRouter();
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
      {showAgePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-[90%] text-center">
            <h2 className="text-2xl font-bold text-[#007A37] mb-4">Potvrzení plnoletosti</h2>
            <p className="text-black text-md leading-relaxed mb-2">Na těchto stránkách nabízíme alkohol.</p>
            <p className="text-black text-md leading-relaxed mb-2">Alkohol můžete nakupovat od 18 let.</p>
            <p className="text-black text-md leading-relaxed mb-6 font-semibold">Prosím potvrďte, že Vám již bylo 18 let:</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowAgePopup(false)}
                className="px-8 py-3 bg-[#007A37] text-white text-lg font-bold rounded-lg hover:bg-[#005a28] transition-colors cursor-pointer"
              >
                Ano
              </button>
              <button
                onClick={() => { window.location.href = 'https://www.google.com'; }}
                className="px-8 py-3 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              >
                Ne
              </button>
            </div>
          </div>
        </div>
      )}
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
          <p className='w-[95%] mt-5 text-justify text-lg p-8'>Naši deskovou hru Vinařská stezka se somelierem, jakož i skvělá maďarská vína, najdete zde na tomto webu. Více možností vám rádi zašleme e-mailem, případně nás můžete kontaktovat telefonicky. Původní přímý prodej prostřednictvím e-shopu jsme ukončili a hru Vinařská stezka prodáváme prostřednictvím našich partnerů a slevových serverů. Fungujeme a maďarské víno zůstává naším koníčkem, neváhejte se zeptat na cokoli!</p>
          <button className='flex flex-row justify-center items-center w-full'>
            <Link href="/nabidka" className='flex flex-row justify-center items-center w-[60%] text-4xl text-white font-bold rounded-lg bg-[#ffbb54] p-4 m-4 active:translate-y-4 transition-all'>VYBRAT SI</Link>
          </button>
          <h1 className='m-3 mt-5 text-center text-4xl text-[#007A37] p-1 border-b-2 border-red-600'>NAŠE VINAŘSTVÍ</h1>
          <div className='flex flex-wrap justify-center items-center w-full'>
            <div className='w-[400px] h-[400px] bg-[url("/polgar.jpg")] bg-cover bg-[75%_center] m-4 relative'>
              <Link href="/vinarstvi#polgar" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>POLGÁR</Link>
            </div>
            <div className='w-[400px] h-[400px] bg-[url("/fekete.jpg")] bg-cover bg-[75%_center] m-4 relative'>
              <Link href="/vinarstvi#fekete" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>FEKETE</Link>
            </div>
            <div className='w-[400px] h-[400px] bg-[url("/cseri.jpg")] bg-cover bg-[50%_center] m-4 relative'>
              <Link href="/vinarstvi#cseri" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>VINAŘSTVÍ CSERI</Link>
            </div>
            <div className='w-[400px] h-[400px] bg-[url("/schunk.jpg")] bg-cover bg-[75%_center] m-4 relative'>
              <Link href="/vinarstvi#schunk" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>VINNÝ SKLEP SCHUNK</Link>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
