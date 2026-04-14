"use client";

import Nav from "../nav";
import Top from "../top";
import Footer from "../footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

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
            <main className="flex justify-center items-center w-full flex-col">
                <div className={isMobile ? "flex flex-col justify-center items-center w-full bg-white" : "flex flex-col justify-center items-center w-[60%] bg-white"}>
                    <h1 className='m-3 mt-5 text-center text-4xl text-[#007A37] p-1 border-b-2 border-red-600'>NAŠE VINAŘSTVÍ</h1>
                    <div className='flex flex-wrap justify-center items-center w-full'>
                        <div className='w-[400px] h-[400px] bg-[url("/polgar.jpg")] bg-cover bg-[75%_center] m-4 relative'>
                            <Link href="#polgar" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>POLGÁR</Link>
                        </div>
                        <div className='w-[400px] h-[400px] bg-[url("/fekete.jpg")] bg-cover bg-[75%_center] m-4 relative'>
                            <Link href="#fekete" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>FEKETE</Link>
                        </div>
                        <div className='w-[400px] h-[400px] bg-[url("/cseri.jpg")] bg-cover bg-[50%_center] m-4 relative'>
                            <Link href="#cseri" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>VINAŘSTVÍ CSERI</Link>
                        </div>
                        <div className='w-[400px] h-[400px] bg-[url("/schunk.jpg")] bg-cover bg-[75%_center] m-4 relative'>
                            <Link href="#schunk" className='absolute inset-0 bg-black/40 flex justify-center items-center text-white text-2xl text-center p-2'>VINNÝ SKLEP SCHUNK</Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full mt-10">

                        <div id="polgar" className="flex flex-wrap justify-center items-stretch w-full lg:w-[90%]">
                            <div className="w-full lg:w-2/3 min-w-[200px]">
                                <Image
                                    src="/polgar.jpg"
                                    alt="Polgár"
                                    width={1504}
                                    height={704}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-[#007A37] min-w-[200px] p-8 lg:p-12">
                                <h2 className="text-2xl text-white mb-4">POLGÁR</h2>
                                <p className="text-white text-center text-md leading-relaxed">
                                    „Od našich prarodičů, rodičů a zemědělských pedagogů jsme dostali do vínku lásku k Zemi, přírodě a životodárné rostlině – vinné révě. Naším cílem a posláním je starat se o toto přírodní dědictví, uchovat ho a předat ho našim potomkům, aby také mohli žít zdravě, v harmonii s přírodou a vychovávat ve stejném duchu i naše vnoučata.“
                                </p>
                            </div>
                            <div className="w-full lg:w-2/3 min-w-[300px] p-8 lg:p-12">
                                <h2 className="text-xl text-black mb-4">PAN ZOLTÁN POLGÁR VYPRÁVÍ SVŮJ PŘÍBĚH:</h2>
                                <p className="text-black text-justify text-md leading-relaxed">
                                    „V roce 1974, když jsme oba seděli v lavicích Zemědělské univerzity, jsme si s manželkou vysnili sen: chceme žít ve Villány, pěstovat hrozny a pít své vlastní víno. Již v roce 1975 jsme ještě jako studenti  vysadili náš první čtvrthektarový vinohrad na vinici Bocor v Kisharsány. Od té doby jsme snili a neustále sníme o dalších vinicích, odrůdách, vinném sklípku, penzionu a pomalu, tiše, nyní již s našimi dospělými dětmi, jsme za posledních několik desetiletí tyto sny uskutečnili.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    My ve vinařství Polgár i dnes věříme ve Villány, jeho výjimečné podmínky a půdu, ve vinařskou oblast, kde paprsky jižního slunce přinášejí i požehnání od Boha. Věříme v sebe, ale také v lidi, stejně jako v mimořádnou energii hroznů vyprodukovaných ve Villánnyi, a v čistotu našich vín, připravených s řemeslnou pečlivostí. Vyrábíme naše vína s vírou a láskou a věříme, že tato láska prochází skrze naše vína a že každý, kdo je popíjí, se stává její součástí.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    Naším cílem je, aby naše elegantní a chutná vína, vyrobená z hroznů sklizených s rukodělnou pečlivostí, poskytly jedinečný zážitek všem milovníkům přírodních chutí a přírodních vín.“
                                </p>
                            </div>
                            <div className="w-full flex-col justify-center items-center lg:w-1/3 min-w-[300px] mt-10">
                                <Image
                                    src="/polgar_diplom1.jpg"
                                    alt="Polgár"
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full p-4"
                                />
                                <Image
                                    src="/polgar_diplom2.jpg"
                                    alt="Polgár"
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full p-4"
                                />
                            </div>
                        </div>

                        <div id="cseri" className="flex flex-wrap justify-center items-stretch w-full lg:w-[90%] scroll-mt-16">
                            <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-[#007A37] min-w-[200px] p-8 lg:p-12">
                                <h2 className="text-2xl text-white mb-4">VINAŘSTVÍ CSERI</h2>
                                <p className="text-white text-center text-md leading-relaxed">
                                    V srdci vinařské oblasti Pannonhalma se nachází malé vinařství, kde návštěvníky vítá jedinečné panorama, rodinná atmosféra a samozřejmě vynikající vína. Vinařství Cseri se rychle stalo oblíbeným dodavatelem gurmánských restaurací, a to i přesto, že je nejmladším členem vinařské oblasti.
                                </p>
                            </div>
                            <div className="w-full lg:w-2/3 min-w-[200px]">
                                <Image
                                    src="/cseri.jpg"
                                    alt="Cseri"
                                    width={1504}
                                    height={704}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="w-full lg:w-2/3 min-w-[300px] p-8 lg:p-12">
                                <h2 className="text-xl text-black mb-4">SKUTEČNÉ RODINNÉ VINAŘSTVÍ</h2>
                                <p className="text-black text-justify text-md leading-relaxed">
                                    „Pohled klouže po svazích Pannonhalmy v pozdním letním ránu, kdy slunce postupně odkrývá zeleň krajiny a vysušuje poslední kapky rosy. Mlha ustupuje, zvířata se vracejí k odpočinku a krajina se probouzí do nového dne. Právě zde čerpáme inspiraci i úctu k přírodě, která se odráží v našich vínech – v jejich svěžesti, charakteru a síle zdejšího terroiru."
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    V srdci vinařské oblasti Pannonhalma stojí malé rodinné vinařství Cseri, které nabízí krásné panorama, přátelskou atmosféru a kvalitní vína. Založili ho roku 2012 Róbert a Norbert Cseri, k nimž se později přidal Norbertův syn Barnabás, který je také kvalifikovaným vinařským a enologickým inženýrem. Zdejší Ryzlink rýnský, Sauvignon Blanc, Rulandské bílé, Tramín, Merlot, Cabernet Franc a Frankovka nejenže produkují vynikající odrůdová vína, ale jsou také podkladem pro úžasná cuvée. Rodina sází na omezené výnosy se zaměřením na kvalitu hroznů, ruční sklizeň a šetrné zpracování. Díky tomu vznikla zajímavá řada bílých i červených vín, která získala již mnoho prestižních domácích i mezinárodních ocenění.
                                </p>
                            </div>
                            <div className="w-full flex-col justify-center items-center lg:w-1/3 min-w-[300px] mt-10">
                                <Image
                                    src="/cseri_popis1.jpg"
                                    alt="Cseri"
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full p-4"
                                />
                                <Image
                                    src="/cseri_popis2.jpg"
                                    alt="Cseri"
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full p-4"
                                />
                            </div>
                        </div>

                        <div id="fekete" className="flex flex-wrap justify-center items-stretch w-full lg:w-[90%]">
                            <div className="w-full lg:w-2/3 min-w-[200px]">
                                <Image
                                    src="/fekete.jpg"
                                    alt="Fekete"
                                    width={1504}
                                    height={704}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-[#007A37] min-w-[200px] p-8 lg:p-12">
                                <h2 className="text-2xl text-white mb-4">FEKETE</h2>
                                <p className="text-white text-center text-md leading-relaxed">
                                    Rodina Fekete se věnuje vinařství od počátku šedesátých let. V současné době se rozloha vinařství rozrostla na téměř 9 hektarů. Podíl našich vinic produkujících červené a bílé víno je 95 : 5%. Většina našich hroznů se pěstuje na již po staletí nejslavnější trati vinařské oblasti Szekszárd, v údolí Iván.
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full min-w-[300px] p-8 lg:p-12">
                                <h2 className="text-xl text-black mb-4">VYZNÁNÍ PANA <b>FEKETE MIHÁLY ENDRE</b>, ZAKLADATELE A MAJITELE VINAŘSTVÍ FEKETE</h2>
                                <p className="text-black text-justify text-md leading-relaxed">
                                    "Vína jsem začal vyrábět v návaznosti na rodinnou tradici a pokračoval jsem v práci svých rodičů. Zpočátku jsem vyráběl víno pro sebe a svou rodinu, proto jsem tuto práci vykonával se zvláštní péčí a pozorností. Později se to stalo mým povoláním, vinařství se rozšířilo a stalo se rodinným podnikem.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    Způsob zpracování hroznů a výroby vína je pro mě od počátku určován respektem k tradici a životnímu prostředí a mým pocitem zodpovědnosti vůči spotřebitelům mých vín. I jako profesionální vinař vyrábím svá vína se stejnou péčí, jako předtím.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    Mým cílem je přirozeným a ekologickým způsobem vyrábět trvale a stejnoměrně kvalitní vína, ovocná, sametová a ohnivá, typická pro vinařskou oblast Szekszárd. Těší mě, že zpětná vazba od spotřebitelů našich vín, jakož i úspěchy dosažené na mezinárodních a domácích soutěžích potvrzují správnost našeho úsilí."
                                </p>
                            </div>
                            <div className="w-full lg:w-2/3 min-w-[300px] p-8 pt-0 lg:p-12">
                                <h2 className="text-xl text-black mb-4">VINICE A ZEMĚDĚLSTVÍ</h2>
                                <p className="text-black text-justify text-md leading-relaxed">
                                    Rodina Fekete se věnuje vinařství od počátku šedesátých let. V současné době se rozloha vinařství rozrostla na téměř 9 hektarů. Podíl našich vinic produkujících červené a bílé víno je 95 : 5%. Většina našich hroznů se pěstuje na již po staletí nejslavnější trati vinařské oblasti Szekszárd, v údolí Iván. Příznivé složení půdy a jihozápadní poloha umožňují produkci vysoce kvalitních modrých hroznů. A hrozny jsou duší vína.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    Ochrana ekosystému a biologické rozmanitosti vinařských oblastí je při práci naší nejvyšší prioritou. Důraz je kladen na prevenci: máme zkušenost, že pokud se podaří révu udržet silnou a zdravou v raných stádiích vývoje, snižuje se riziko nákazy později v období květu. Kontrola plevele se provádí okopáváním a zralé hrozny se sklízejí ručně. Při pěstování vinné révy dáváme přednost biologickým metodám ochrany rostlin. Již po mnoho let máme na vinicích rozmístěny krmítka pro ptáky. Přezimující ptáci jsou v oblasti udržovány krmením. Bylo dobře patrné, jak už za několik let byla obnovena přirozená rovnováha ptactva a hmyzu. Proto jsme insekticid nemuseli použít již mnoho let a nemáme žádné poškození hmyzem.
                                </p>
                            </div>
                            <div className="w-full flex-col justify-center items-center lg:w-1/3 min-w-[300px] mt-10">
                                <Image
                                    src="/fekete_popis1.jpg"
                                    alt="Fekete"
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full p-4"
                                />
                                <Image
                                    src="/fekete_popis2.jpg"
                                    alt="Fekete"
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full p-4"
                                />
                            </div>
                        </div>

                        <div id="schunk" className="flex flex-wrap justify-center items-stretch w-full lg:w-[90%] scroll-mt-[20px]">
                            <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-[#007A37] min-w-[200px] p-8 lg:p-12">
                                <h2 className="text-2xl text-white mb-4">VINNÝ SKLEP SCHUNK</h2>
                                <p className="text-white text-center text-md leading-relaxed">
                                    Jsme rodinně provozované vinařství, kde výroba vína je založena na rodinných tradicích. Od roku 1996 připravujeme v menších či větších objemech různorodá červená vína, svěží bílá vína a osvěžující růžová.
                                </p>
                            </div>
                            <div className="w-full lg:w-2/3 min-w-[200px]">
                                <Image
                                    src="/schunk.jpg"
                                    alt="Schunk"
                                    width={1504}
                                    height={704}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center w-full min-w-[300px] p-8 lg:p-12">
                                <p className="text-black text-justify text-md leading-relaxed">
                                    Bílá vína vyrábíme především reduktivním kvašením v nerezových nádržích, zatímco červená vína se vyrábějí za použití tradičních dubových sudů s využitím barikového školení vína.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    Vytrvalý rozvoj, nová výsadba, nové odrůdy révy a technologický pokrok charakterizují růst a vývoj našeho rodinného vinařství. Náš závazek vůči vinařskému řemeslu dokazují i četné úspěchy našich vín na místních, regionálních a širších vinařských soutěžích.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    Naším cílem je, aby vinařství Schunk svými kvalitními víny přispělo k navrácení dřívějšího věhlasu vinařské oblasti Pécs, známé svou bohatou historií a vynikajícími pěstitelskými podmínkami!
                                </p>
                            </div>
                            <div className="w-full lg:w-2/3 min-w-[300px] p-8 lg:p-12">
                                <h2 className="text-xl text-black mb-4">TERROIR</h2>
                                <p className="text-black text-justify text-md leading-relaxed">
                                    Vinný sklep Schunk se nachází v obci Hosszúhetény, 20 km od města Pécs, ve vinařské oblasti Pécs-Mecsek, na jižním úpatí hory Zengő, nejvyšší hory pohoří Mecsek.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    V rámci Karpatské pánve má podnebí regionu Pécs středomořské rysy, které vytvářejí vynikající podmínky pro pěstování a výrobu vína. Půdní podmínky jsou příznivé pro vinařství - střídají se lesní půdy, sprašové a slínové typy půd, ale vyloženě v regionu Mecsek nalézáme horniny - zejména pískovec, vápenec a granit - což také dodává vínu vynikající minerální charakter a plnou, ohnivou chuť.
                                </p>
                                <p className="text-black text-justify text-md leading-relaxed mt-4">
                                    Počet hodin slunečního svitu a roční úhrn teplot vykazují hodnoty odpovídající prvotřídním francouzským vinicím. Nejvíce se zde uplatňuje teplé podzimní počasí a dlouhé „babí léto“, významně ovlivněné jižním, středomořským typem klimatu.
                                </p>
                            </div>
                            <div className="w-full flex-col justify-center items-center lg:w-1/3 min-w-[300px] mt-10">
                                <Image
                                    src="/schunk_popis1.jpg"
                                    alt="Schunk"
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full p-4 h-[300px]"
                                />
                                <Image
                                    src="/schunk_popis2.jpg"
                                    alt="Schunk"
                                    width={1080}
                                    height={1080}
                                    className="object-cover w-full p-4"
                                />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </main>
        </div>
    );
}  