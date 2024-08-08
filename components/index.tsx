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

            {/* Main Konten */}
            <div className="w-full text-center items-center justify-center hidden md:flex">
                <div className="w-5/6 items-center justify-center flex p-1 h-[calc(100vh-8rem)] ml-11">
                    {/* Layout */}
                    <div className="w-[calc(100vh-32rem)] h-full bg-[#4A4A4A] rounded-xl relative overflow-hidden">
                        <Image 
                            src="/wall1.jpg" 
                            alt="" 
                            layout="fill" 
                            objectFit="cover" 
                            objectPosition="center" 
                        />
                    </div>

                    {/* Container Layout */}
                    <div className="ml-2 w-11 h-full flex flex-col justify-end">
                        <div className="w-full h-full flex flex-col justify-end">
                            {/* fitur */}
                            <div className="bg-white rounded-full w-full h-11 mb-2">

                            </div>
                            <div className="w-full flex flex-col mt-2">
                                <div className="bg-[#4A4A4A] rounded-full w-full h-11 flex items-center justify-center">
                                    <svg className="w-5" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.9508 25.4304C14.5553 25.4314 14.1635 25.3541 13.7979 25.2031C13.4324 25.0521 13.1003 24.8303 12.8208 24.5504L2.52079 14.2504C1.70713 13.4279 1.06528 12.4517 0.632638 11.3787C0.199995 10.3057 -0.0147917 9.15727 0.000791025 8.00041C0.00863074 6.94025 0.22555 5.89205 0.639123 4.91585C1.0527 3.93966 1.6548 3.05465 2.41094 2.31151C3.16708 1.56837 4.0624 0.981714 5.04563 0.585137C6.02885 0.18856 7.08065 -0.0101431 8.14079 0.000408903C9.2199 -0.0104609 10.2902 0.195485 11.2882 0.606032C12.2863 1.01658 13.1917 1.62337 13.9508 2.39041L14.9508 3.39041L15.7708 2.57041C17.1867 1.11698 19.0814 0.225922 21.1039 0.0622833C23.1264 -0.101355 25.1396 0.473512 26.7708 1.68041C27.6993 2.39546 28.4648 3.30013 29.0164 4.33417C29.5679 5.36821 29.8928 6.5079 29.9695 7.67733C30.0461 8.84676 29.8727 10.0191 29.4608 11.1163C29.049 12.2135 28.4081 13.2103 27.5808 14.0404L17.0808 24.5504C16.8013 24.8303 16.4692 25.0521 16.1037 25.2031C15.7381 25.3541 15.3463 25.4314 14.9508 25.4304Z" fill="white"/>
                                    </svg>
                                </div>
                                <span className="mt-1">80k</span>
                            </div>
                            <div className="w-full flex flex-col mt-2">
                                <div className="bg-[#4A4A4A] rounded-full w-full h-11 flex items-center justify-center">
                                    <svg className="w-5" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.5118 20.6223V25C11.5118 25 25 19.7581 25 10.2534C25 0.748766 17.6747 0 11.5118 0C5.3489 0 0 5.24189 0 11.0022C0 16.7625 6.33712 20.6223 11.5118 20.6223Z" fill="white"/>
                                        <path d="M8.23125 11.6429C8.98483 11.6429 9.59573 11.0377 9.59573 10.291C9.59573 9.54439 8.98483 8.93912 8.23125 8.93912C7.47767 8.93912 6.86677 9.54439 6.86677 10.291C6.86677 11.0377 7.47767 11.6429 8.23125 11.6429Z" fill="#231F20"/>
                                        <path d="M12.6887 11.6429C13.4422 11.6429 14.0531 11.0377 14.0531 10.291C14.0531 9.54439 13.4422 8.93912 12.6887 8.93912C11.9351 8.93912 11.3242 9.54439 11.3242 10.291C11.3242 11.0377 11.9351 11.6429 12.6887 11.6429Z" fill="#231F20"/>
                                        <path d="M17.1461 11.6429C17.8997 11.6429 18.5106 11.0377 18.5106 10.291C18.5106 9.54439 17.8997 8.93912 17.1461 8.93912C16.3925 8.93912 15.7816 9.54439 15.7816 10.291C15.7816 11.0377 16.3925 11.6429 17.1461 11.6429Z" fill="#231F20"/>
                                    </svg>
                                </div>
                                <span className="mt-1">80k</span>
                            </div>
                            <div className="w-full flex flex-col mt-2">
                                <div className="bg-[#4A4A4A] rounded-full w-full h-11 flex items-center justify-center">
                                    <svg className="w-4" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.02767 17.7554H11.1299L17.0214 22.3394C17.3445 22.5907 17.7402 22.7268 18.1478 22.7268C19.1703 22.7268 19.9985 21.8885 19.9975 20.8522C19.99 15.4108 19.9716 0 20 0C20.0343 0 0 0 0 0V20.8527C0 21.888 0.828155 22.7273 1.84968 22.7273H1.8964C2.29805 22.7273 2.68827 22.5948 3.00889 22.3499L9.02817 17.7554H9.02767Z" fill="white"/>
                                    </svg>
                                </div>
                                <span className="mt-1">80k</span>
                            </div>
                            <div className="w-full flex flex-col mt-2">
                                <div className="bg-[#4A4A4A] rounded-full w-full h-11 flex items-center justify-center">
                                    <svg className="w-5" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.49569 17.3381H15.974L16.0183 23.015L29 11.9696L15.9303 0V5.06086C15.9303 5.06086 0 3.3005 0 22.0033L3.21667 19.2755C4.69171 18.0249 6.56246 17.3387 8.49621 17.3387L8.49569 17.3381Z" fill="white"/>
                                    </svg>
                                </div>
                                <span className="mt-1">80k</span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


            {/* Main Konten Mobile */}
            <div className="relative w-full h-full text-center flex items-center justify-center md:hidden">
                <div className="relative w-full h-full">
                    <Image 
                        src="/wall1.jpg" 
                        alt="" 
                        layout="fill" 
                        objectFit="cover" 
                        objectPosition="center" 
                    />
                </div>

                {/* Container Layout */}
                <div className="absolute bottom-0 right-0 h-full mr-2 w-11 flex flex-col justify-end mb-4">
                        <div className="w-full h-full flex flex-col justify-end">
                            {/* fitur */}
                            <div className="bg-white rounded-full w-full h-11 mb-2 flex flex-col justify-end right-0 bottom-0 items-center relative">
                                <a className="absolute bottom-0 top-8 bg-red-700 w-6 h-6 rounded-full">
                                    <svg className="w-full" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16V17C32 25.8366 24.8366 33 16 33C7.16344 33 0 25.8366 0 17V16Z" fill="#FF3B5C"/>
                                        <path d="M15.125 10H16.875V23H15.125V10Z" fill="white"/>
                                        <path d="M23 15.6875V17.3125H9V15.6875H23Z" fill="white"/>
                                    </svg>
                                </a>
                            </div>
                            <div className="w-full flex flex-col mt-2">
                                <div className="rounded-full w-full h-11 flex items-center justify-center">
                                    <svg className="w-7" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.9508 25.4304C14.5553 25.4314 14.1635 25.3541 13.7979 25.2031C13.4324 25.0521 13.1003 24.8303 12.8208 24.5504L2.52079 14.2504C1.70713 13.4279 1.06528 12.4517 0.632638 11.3787C0.199995 10.3057 -0.0147917 9.15727 0.000791025 8.00041C0.00863074 6.94025 0.22555 5.89205 0.639123 4.91585C1.0527 3.93966 1.6548 3.05465 2.41094 2.31151C3.16708 1.56837 4.0624 0.981714 5.04563 0.585137C6.02885 0.18856 7.08065 -0.0101431 8.14079 0.000408903C9.2199 -0.0104609 10.2902 0.195485 11.2882 0.606032C12.2863 1.01658 13.1917 1.62337 13.9508 2.39041L14.9508 3.39041L15.7708 2.57041C17.1867 1.11698 19.0814 0.225922 21.1039 0.0622833C23.1264 -0.101355 25.1396 0.473512 26.7708 1.68041C27.6993 2.39546 28.4648 3.30013 29.0164 4.33417C29.5679 5.36821 29.8928 6.5079 29.9695 7.67733C30.0461 8.84676 29.8727 10.0191 29.4608 11.1163C29.049 12.2135 28.4081 13.2103 27.5808 14.0404L17.0808 24.5504C16.8013 24.8303 16.4692 25.0521 16.1037 25.2031C15.7381 25.3541 15.3463 25.4314 14.9508 25.4304Z" fill="white"/>
                                    </svg>
                                </div>
                                <span className="mt-1 inline-block leading-none">80k</span>
                            </div>
                            <div className="w-full flex flex-col mt-2">
                                <div className=" rounded-full w-full h-11 flex items-center justify-center">
                                    <svg className="w-7" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.5118 20.6223V25C11.5118 25 25 19.7581 25 10.2534C25 0.748766 17.6747 0 11.5118 0C5.3489 0 0 5.24189 0 11.0022C0 16.7625 6.33712 20.6223 11.5118 20.6223Z" fill="white"/>
                                        <path d="M8.23125 11.6429C8.98483 11.6429 9.59573 11.0377 9.59573 10.291C9.59573 9.54439 8.98483 8.93912 8.23125 8.93912C7.47767 8.93912 6.86677 9.54439 6.86677 10.291C6.86677 11.0377 7.47767 11.6429 8.23125 11.6429Z" fill="#231F20"/>
                                        <path d="M12.6887 11.6429C13.4422 11.6429 14.0531 11.0377 14.0531 10.291C14.0531 9.54439 13.4422 8.93912 12.6887 8.93912C11.9351 8.93912 11.3242 9.54439 11.3242 10.291C11.3242 11.0377 11.9351 11.6429 12.6887 11.6429Z" fill="#231F20"/>
                                        <path d="M17.1461 11.6429C17.8997 11.6429 18.5106 11.0377 18.5106 10.291C18.5106 9.54439 17.8997 8.93912 17.1461 8.93912C16.3925 8.93912 15.7816 9.54439 15.7816 10.291C15.7816 11.0377 16.3925 11.6429 17.1461 11.6429Z" fill="#231F20"/>
                                    </svg>
                                </div>
                                <span className="mt-1 inline-block leading-none">80k</span>
                            </div>
                            <div className="w-full flex flex-col mt-2">
                                <div className=" rounded-full w-full h-11 flex items-center justify-center">
                                    <svg className="w-6" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.02767 17.7554H11.1299L17.0214 22.3394C17.3445 22.5907 17.7402 22.7268 18.1478 22.7268C19.1703 22.7268 19.9985 21.8885 19.9975 20.8522C19.99 15.4108 19.9716 0 20 0C20.0343 0 0 0 0 0V20.8527C0 21.888 0.828155 22.7273 1.84968 22.7273H1.8964C2.29805 22.7273 2.68827 22.5948 3.00889 22.3499L9.02817 17.7554H9.02767Z" fill="white"/>
                                    </svg>
                                </div>
                                <span className="mt-1 inline-block leading-none">80k</span>
                            </div>
                            <div className="w-full flex flex-col mt-2">
                                <div className=" rounded-full w-full h-11 flex items-center justify-center">
                                    <svg className="w-7" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.49569 17.3381H15.974L16.0183 23.015L29 11.9696L15.9303 0V5.06086C15.9303 5.06086 0 3.3005 0 22.0033L3.21667 19.2755C4.69171 18.0249 6.56246 17.3387 8.49621 17.3387L8.49569 17.3381Z" fill="white"/>
                                    </svg>
                                </div>
                                <span className="mt-1 inline-block leading-none">80k</span>
                            </div>
                        </div>
                    </div>
            </div>

            

            

        </main>
    )
}
export default Index;