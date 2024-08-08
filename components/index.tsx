import next from "next";
import Image from "next/image";

const Index: React.FC = () =>{
    return(
        <main className="flex justify-between w-full h-[calc(100vh-4rem)]">

            {/*         Side Bar         */}
            <div className="w-72 h-full bg-[#1E1E1E] p-5 hidden xl:block ">
                {/*     Page Sidebar     */}
                <div className="Pages-Sidebar block relative font-semibold ml-2">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 hover:text-red">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="29" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6867 0.0982985L0.114698 12.0156C-0.123481 12.241 0.0340921 12.6458 0.359638 12.6458H2.46112C2.65926 12.6458 2.81995 12.8089 2.81995 13.01V23.6358C2.81995 23.8369 2.98065 24 3.17878 24H11.3726C11.5707 24 11.7314 23.8369 11.7314 23.6358V16.4305C11.7314 16.2295 11.8921 16.0664 12.0902 16.0664H13.6722C13.8703 16.0664 14.031 16.2295 14.031 16.4305V24H22.5893C22.7875 24 22.9482 23.8369 22.9482 23.6358V13.105C22.9482 12.9039 23.1088 12.7408 23.307 12.7408H25.6404C25.9665 12.7408 26.1235 12.3355 25.8848 12.1101L13.175 0.0977718C13.0372 -0.0325906 12.8235 -0.0325906 12.6857 0.0977718L12.6867 0.0982985Z" fill="#FF3B5C"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="text-xl items-center justify-center text-[#FF3B5C]">For You</h1>
                            </div>
                        </div>  
                    </a> 
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C] ">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="white" stroke-miterlimit="10"/>
                                    <path d="M10.4328 12.6361L9.16772 20.8826L17.0097 16.2281L18.4265 7.88L10.4328 12.6355V12.6361ZM15.1984 15.1868L11.7787 17.2166L12.3303 13.6208L15.8161 11.5471L15.1984 15.1873V15.1868Z" fill="white"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="text-xl items-center justify-center">Explore</h1>
                                <span className="text-sm w-14 rounded-xl bg-red-700 ml-2 hover:text-white text-white">New</span>
                            </div>
                        </div> 
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="25" viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 24.0264C1 24.0264 2.08901 16.3206 10.2027 16.3206C18.3164 16.3206 19.0087 24.0264 19.0087 24.0264M31.0001 24.0264C31.0001 24.0264 29.4036 18.2689 24.1413 18.2689C18.8791 18.2689 17.7987 20.4285 17.7987 20.4285M15.7871 6.58441C15.7871 9.6686 13.2869 12.1688 10.2027 12.1688C7.11853 12.1688 4.6183 9.6686 4.6183 6.58441C4.6183 3.50023 7.11853 1 10.2027 1C13.2869 1 15.7871 3.50023 15.7871 6.58441ZM27.7933 10.2364C27.7933 12.2533 26.1582 13.8884 24.1413 13.8884C22.1244 13.8884 20.4893 12.2533 20.4893 10.2364C20.4893 8.21946 22.1244 6.58441 24.1413 6.58441C26.1582 6.58441 27.7933 8.21946 27.7933 10.2364Z" stroke="white" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="text-xl items-center justify-center">Following</h1>
                            </div>
                        </div>  
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 16.9439V20.1004C1 20.3211 1.17861 20.4997 1.39932 20.4997H22.4265C22.6472 20.4997 22.8258 20.3211 22.8258 20.1004V13.0293C22.8258 12.9548 22.9192 12.921 22.967 12.9779L30.6007 17.973C30.8214 17.973 31 17.7944 31 17.5737V3.44414C31 3.22344 30.8214 3.04482 30.6007 3.04482L22.8854 8.47049C22.8397 8.53208 22.7411 8.49974 22.7411 8.42275V1.39932C22.7411 1.17861 22.5625 1 22.3418 1H1.39932C1.17861 1 1 1.17861 1 1.39932V16.9444V16.9439Z" stroke="white" stroke-miterlimit="10"/>
                                    <path d="M9.79266 6.80907V14.547L16 10.678L9.79266 6.80907Z" fill="white"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="text-xl items-center justify-center">Live</h1>
                            </div>
                        </div>  
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-3 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="23" height="32" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 31C1 31 1.70315 20.1955 11.485 20.1955C21.2668 20.1955 22.3535 31 22.3535 31M19.1432 7.85658C19.1432 11.6434 16.0734 14.7132 12.2866 14.7132C8.49986 14.7132 5.43006 11.6434 5.43006 7.85658C5.43006 4.06979 8.49986 1 12.2866 1C16.0734 1 19.1432 4.06979 19.1432 7.85658Z" stroke="white" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="text-xl items-center justify-center">Profile</h1>
                            </div>
                        </div>  
                    </a>
                </div>

                {/*     Log In Sidebar   */}
                <div className="w-full mt-10">
                    <div>
                        <span>Log In to follow creators,
                            like videos, and view
                            comments.
                        </span>
                    </div>

                    <div className="w-full mt-5">
                        <button type="button" className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Log In</button>
                    </div>
                </div>

                {/* Tiktok Coins */}
                <div className="mt-5">
                    <Image src="/Tiktok-coins.png" alt="" width={500} height={300} />
                </div>

                {/*     Tentang Navbar   */}
                <div className="w-full mt-5 text-base">
                    <div className="mb-4">
                        <a href="#">Company</a>
                    </div>
                    <div className="mb-4">
                        <a href="#">Program</a>
                    </div>
                    <div className="mb-4">
                        <a href="#">Terms & Policies</a>
                        <p className="text-xs">@2024 Tiktok-Clone</p>
                    </div>
                    
                </div>

            </div>

            {/*         Side Bar Tablet         */}
            <div className="w-20 h-full bg-[#1E1E1E] p-5 hidden xl:hidden md:block">
                {/*     Page Sidebar     */}
                <div className="Pages-Sidebar block relative font-semibold ml-2">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 hover:text-red">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="29" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6867 0.0982985L0.114698 12.0156C-0.123481 12.241 0.0340921 12.6458 0.359638 12.6458H2.46112C2.65926 12.6458 2.81995 12.8089 2.81995 13.01V23.6358C2.81995 23.8369 2.98065 24 3.17878 24H11.3726C11.5707 24 11.7314 23.8369 11.7314 23.6358V16.4305C11.7314 16.2295 11.8921 16.0664 12.0902 16.0664H13.6722C13.8703 16.0664 14.031 16.2295 14.031 16.4305V24H22.5893C22.7875 24 22.9482 23.8369 22.9482 23.6358V13.105C22.9482 12.9039 23.1088 12.7408 23.307 12.7408H25.6404C25.9665 12.7408 26.1235 12.3355 25.8848 12.1101L13.175 0.0977718C13.0372 -0.0325906 12.8235 -0.0325906 12.6857 0.0977718L12.6867 0.0982985Z" fill="#FF3B5C"/>
                                </svg>
                            </div>
                        </div>  
                    </a> 
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C] ">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="white" stroke-miterlimit="10"/>
                                    <path d="M10.4328 12.6361L9.16772 20.8826L17.0097 16.2281L18.4265 7.88L10.4328 12.6355V12.6361ZM15.1984 15.1868L11.7787 17.2166L12.3303 13.6208L15.8161 11.5471L15.1984 15.1873V15.1868Z" fill="white"/>
                                </svg>
                            </div>
                        </div> 
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="25" viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 24.0264C1 24.0264 2.08901 16.3206 10.2027 16.3206C18.3164 16.3206 19.0087 24.0264 19.0087 24.0264M31.0001 24.0264C31.0001 24.0264 29.4036 18.2689 24.1413 18.2689C18.8791 18.2689 17.7987 20.4285 17.7987 20.4285M15.7871 6.58441C15.7871 9.6686 13.2869 12.1688 10.2027 12.1688C7.11853 12.1688 4.6183 9.6686 4.6183 6.58441C4.6183 3.50023 7.11853 1 10.2027 1C13.2869 1 15.7871 3.50023 15.7871 6.58441ZM27.7933 10.2364C27.7933 12.2533 26.1582 13.8884 24.1413 13.8884C22.1244 13.8884 20.4893 12.2533 20.4893 10.2364C20.4893 8.21946 22.1244 6.58441 24.1413 6.58441C26.1582 6.58441 27.7933 8.21946 27.7933 10.2364Z" stroke="white" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                        </div>  
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 16.9439V20.1004C1 20.3211 1.17861 20.4997 1.39932 20.4997H22.4265C22.6472 20.4997 22.8258 20.3211 22.8258 20.1004V13.0293C22.8258 12.9548 22.9192 12.921 22.967 12.9779L30.6007 17.973C30.8214 17.973 31 17.7944 31 17.5737V3.44414C31 3.22344 30.8214 3.04482 30.6007 3.04482L22.8854 8.47049C22.8397 8.53208 22.7411 8.49974 22.7411 8.42275V1.39932C22.7411 1.17861 22.5625 1 22.3418 1H1.39932C1.17861 1 1 1.17861 1 1.39932V16.9444V16.9439Z" stroke="white" stroke-miterlimit="10"/>
                                    <path d="M9.79266 6.80907V14.547L16 10.678L9.79266 6.80907Z" fill="white"/>
                                </svg>
                            </div>
                        </div>  
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-3 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="23" height="32" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 31C1 31 1.70315 20.1955 11.485 20.1955C21.2668 20.1955 22.3535 31 22.3535 31M19.1432 7.85658C19.1432 11.6434 16.0734 14.7132 12.2866 14.7132C8.49986 14.7132 5.43006 11.6434 5.43006 7.85658C5.43006 4.06979 8.49986 1 12.2866 1C16.0734 1 19.1432 4.06979 19.1432 7.85658Z" stroke="white" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                        </div>  
                    </a>
                </div>

            </div>

            {/*     Main Konten     */}
            <div className="w-full text-center items-center justify-center hidden md:flex">
                <div className="w-full items-center justify-center flex p-1 h-[calc(100vh-10rem)]">
                    <div className="w-[calc(100vh-32rem)] h-full bg-[#4A4A4A] rounded-xl">
                        <h1>Main</h1>
                    </div>
                </div>
            </div>

            {/* Main Konten Mobile */}
            <div className="w-full h-full text-center flex items-center justify-center md:hidden">
                <div className="relative w-full h-full">
                    <Image 
                        src="/wall1.jpg" 
                        alt="" 
                        layout="fill" 
                        objectFit="cover" 
                        objectPosition="center" 
                    />
                </div>
            </div>

            

            

        </main>
    )
}
export default Index;