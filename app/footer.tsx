import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[url('/footer.jpg')] text-white p-4 w-full h-[400px] flex flex-col justify-center items-center">
            <div className="container mx-auto h-full">
                <div className="flex flex-row justify-center items-center w-full h-[60%]">
                    <div className="flex flex-col justify-center items-center w-1/3 h-full">
                        <ul className="">
                            <li><Link href="/">ÚVOD</Link></li>
                            <li><Link href="/nabidka">NABÍDKA</Link></li>
                            <li><Link href="/vinarstvi">VINAŘSTVÍ</Link></li>
                            <li><Link href="/blog">BLOG</Link></li>
                            <li><Link href="/kontakt">KONTAKT</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/3 h-full">
                        <h2 className="text-xl w-full text-left">KONTAKT</h2>
                        <p className="text-left text-xs w-full">Email: tomas@hungarianwine.cz</p>
                        <p className="text-left text-xs w-full">Tel: +420 736 502 958</p>
                        <p className="text-left text-xs w-full">Facebook: <a href="https://www.facebook.com/hungarianwine.cz/">hungarianwine.cz</a></p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/3 h-full">
                        <ul className="text-right text-xs">
                            <li><Link href="/podminky">Obchodní podmínky</Link></li>
                            <li><Link href="/udaje">Zpracování osobních údajů</Link></li>
                            <li><Link href="/cookies">Cookies</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}