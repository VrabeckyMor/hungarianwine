export default function Footer() {
    return (
        <footer className="bg-[url('/footer.jpg')] text-white p-4 w-full h-[400px] flex flex-col justify-center items-center">
            <div className="container mx-auto h-full">
                <div className="flex flex-row justify-center items-center w-full h-[60%]">
                    <div className="flex flex-col justify-center items-center w-1/3 h-full">
                        <ul className="">
                            <li><a href="#">ÚVOD</a></li>
                            <li><a href="#">E-SHOP</a></li>
                            <li><a href="#">VINAŘSTVÍ</a></li>
                            <li><a href="#">BLOG</a></li>
                            <li><a href="#">KONTAKT</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/3 h-full">
                        <h2 className="text-xl w-full text-left">KONTAKT</h2>
                        <p className="text-left text-xs w-full">Email: xxxxxx@hungarianwine.cz</p>
                        <p className="text-left text-xs w-full">Tel: +420 xxx 502 958</p>
                        <p className="text-left text-xs w-full">Facebook: <a href="https://www.facebook.com/hungarianwine.cz/">hungarianwine.cz</a></p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/3 h-full">
                        <ul className="text-right text-xs">
                            <li><a href="#">Obchodní podmínky</a></li>
                            <li><a href="#">Zpracování osobních údajů</a></li>
                            <li><a href="#">Cookies</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}