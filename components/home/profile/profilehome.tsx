"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderHome from "@/components/home/headerhome";
import FooterMobileHome from "@/components/Mobile/footerhome";
import EditProfileCom from "./editprofile";
import { onAuthStateChanged as onauthoriginal, User } from 'firebase/auth';
import { firebaseAuth, firebaseFirestore } from '@/libs/firebase/config';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import AlertSukses from "@/src/alert-sukses";
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';

const ProfilePageCom: React.FC = () => {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [currentUsername, setCurrentUser] = useState<User | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [canEditProfile, setCanEditProfile] = useState(false); // Menyimpan status apakah tombol edit dapat ditampilkan
    const [loading, setLoading] = useState(true);

    const videoButtonRef = useRef<HTMLButtonElement>(null);
    const favoritesButtonRef = useRef<HTMLButtonElement>(null);
    const likesButtonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [underlineStyle, setUnderlineStyle] = useState({});
    const [selectedButton, setSelectedButton] = useState("videos"); // State untuk melacak tombol yang dipilih

    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Database
    useEffect(() => {
        const fetchAndCheckUserData = async () => {
            try {
                const pathSegment = window.location.pathname.split('/').pop();
                let uidToUse = pathSegment;

                if (!uidToUse) {
                    throw new Error('UID atau username tidak ditemukan dalam URL.');
                }

                let userDocRef;

                // Periksa apakah `uidToUse` adalah `uid` atau `username`
                if (uidToUse.length < 28) {
                    const usersRef = collection(firebaseFirestore, "users");
                    const q = query(usersRef, where("username", "==", uidToUse));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        uidToUse = querySnapshot.docs[0].id;
                    } else {
                        throw new Error('User tidak ditemukan dengan username tersebut.');
                    }
                }

                // Dapatkan dokumen pengguna berdasarkan UID
                userDocRef = doc(firebaseFirestore, "users", uidToUse);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUsername(data?.username || 'user');
                    setName(data?.name || '');
                    setBio(data?.bio || '');
                    setFollowingCount(data?.following?.length || 0);
                    setFollowersCount(data?.followers?.length || 0);
                    setLikesCount(data?.likes?.length || 0);
                } else {
                    throw new Error('User tidak ditemukan.');
                }

                const unsubscribe = onauthoriginal(firebaseAuth, async (authUser) => {
                    if (!authUser) {
                        // Redirect to login page if the user is not logged in
                        router.push('/login'); // Gunakan router.push daripada window.location.href
                        return;
                    }

                    setCurrentUser(authUser);
                    setUid(authUser.uid);

                    if (uidToUse === authUser.uid) {
                        setCanEditProfile(true);
                    } else {
                        setCanEditProfile(false);
                    }

                    setLoading(false);
                });

                return () => unsubscribe(); // Cleanup on unmount
            } catch (error) {
                console.error("Error fetching user data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndCheckUserData();
    }, [router]);
    
    
    // Button Disable
    useEffect(() => {
        const unsubscribe = onauthoriginal(firebaseAuth, async (authUser) => {
            if (!authUser) {
                // Redirect to login page if the user is not logged in
                router.push('/login'); // Gunakan router.push daripada window.location.href
                return;
            }

            setCurrentUser(authUser);
            setUid(authUser.uid);

            const pathSegment = window.location.pathname.split('/').pop();
            if (pathSegment && pathSegment.length >= 28) {
                // Jika pathSegment adalah UID, bandingkan dengan UID sesi
                if (pathSegment === authUser.uid) {
                    setCanEditProfile(true);
                } else {
                    setCanEditProfile(false);
                }
            } else {
                // Jika pathSegment adalah username
                const usersRef = collection(firebaseFirestore, "users");
                const q = query(usersRef, where("username", "==", pathSegment));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty && querySnapshot.docs[0].id === authUser.uid) {
                    setCanEditProfile(true);
                } else {
                    setCanEditProfile(false);
                }
            }

            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [router]);

    const openEditProfile = () => {
        setIsEditProfileOpen(true);
    };

    const closeEditProfile = () => {
        setIsEditProfileOpen(false);
    };

    const handleUsernameUpdated = () => {
        setAlertMessage("username berhasil di ubah");
            setShowAlert(true);
    
            // Sembunyikan alert setelah 2 detik
            setTimeout(() => {
            router.push('/home')
            setShowAlert(false);
        }, 2000);
    };
    const handleNameUpdated = () => {
        setAlertMessage("username berhasil di ubah");
            setShowAlert(true);
    
            // Sembunyikan alert setelah 2 detik
            setTimeout(() => {
            router.push('/home')
            setShowAlert(false);
        }, 2000);
    };
    const handleBioUpdated = () => {
        setAlertMessage("Bio berhasil di ubah");
            setShowAlert(true);
    
            // Sembunyikan alert setelah 2 detik
            setTimeout(() => {
            router.push('/home')
            setShowAlert(false);
        }, 2000);
    };

    // Underline
    const updateUnderline = (buttonRef: React.RefObject<HTMLButtonElement>, transition: string) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setUnderlineStyle({
                width: `${rect.width}px`,
                transform: `translateX(${rect.left - buttonRef.current.parentElement!.getBoundingClientRect().left}px)`,
                transition: transition
            });
        }
    };

    useEffect(() => {
        // Update underline position on initial render based on selected button
        switch (selectedButton) {
            case "videos":
                updateUnderline(videoButtonRef, "none"); // No transition for initial render
                break;
            case "favorites":
                updateUnderline(favoritesButtonRef, "none"); // No transition for initial render
                break;
            case "likes":
                updateUnderline(likesButtonRef, "none"); // No transition for initial render
                break;
            default:
                break;
        }
    }, [selectedButton]);

    const handleHover = (buttonName: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedButton === buttonName) return; // Jangan update underline jika tombol yang dipilih dihover
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        setUnderlineStyle({
            width: `${rect.width}px`,
            transform: `translateX(${rect.left - button.parentElement!.getBoundingClientRect().left}px)`,
            transition: 'transform 0.3s ease, width 0.3s ease'
        });
    };

    const handleButtonClick = (buttonName: string) => () => {
        setSelectedButton(buttonName);
        // Update underline to the clicked button
        switch (buttonName) {
        case "videos":
            updateUnderline(videoButtonRef, "transform 0.3s ease, width 0.3s ease");
            break;
        case "favorites":
            updateUnderline(favoritesButtonRef, "transform 0.3s ease, width 0.3s ease");
            break;
        case "likes":
            updateUnderline(likesButtonRef, "transform 0.3s ease, width 0.3s ease");
            break;
        default:
            break;
        }
    };

    const handleMouseLeave = () => {
        // Kembalikan garis bawah ke tombol yang dipilih saat ini
        switch (selectedButton) {
            case "videos":
                updateUnderline(videoButtonRef, "transform 0.3s ease, width 0.3s ease");
                break;
            case "favorites":
                updateUnderline(favoritesButtonRef, "transform 0.3s ease, width 0.3s ease");
                break;
            case "likes":
                updateUnderline(likesButtonRef, "transform 0.3s ease, width 0.3s ease");
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        // Add event listener to handle mouse leave on container
        const handleContainerMouseLeave = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                handleMouseLeave();
            }
        };

        document.addEventListener("mouseup", handleContainerMouseLeave);
        return () => {
            document.removeEventListener("mouseup", handleContainerMouseLeave);
        };
    }, );

    // Loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black z-100000000000000000">
                <div className="text-center">
                    <ClipLoader color="white" loading={loading} size={30} /> {/* Loading spinner */}
                    <h2 className="text-white mt-4">Tunggu Sebentar...</h2>
                </div>
            </div>
        );
    }

    return (
        
        <main className="w-full items-center  flex flex-col ">
            {/*     Alert    */}
            <div className='relative top-0 w-96 items-center justify-center z-9999999999999999999999'>
                {showAlert && (
                    <AlertSukses
                        type="sukses"
                        message={alertMessage}
                        onClose={() => setShowAlert(false)}
                    />
                )}
            </div>
            
            <div className=" w-full hidden md:flex md:flex-col">
                <HeaderHome />
            </div>

        {/*     Mobile Header    */}
        <header className="fixed w-full h-16 items-center flex p-3 md:hidden z-10">
                <div className="w-full flex items-center justify-between p-2">
                    <div>
                        <div className="w-6">
                        <Image src="/TiktokCoin.png" alt="" width={500} height={300} />
                        </div>
                    </div>

                    <div className="flex justify-center w-56">
                        <div className="flex items-center">
                            <h2 className="font-bold pr-1">{username ? username : 'user'}</h2>
                            <svg width="10" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L11.5 13L22 1" stroke="white" strokeWidth={3}/>
                            </svg>
                        </div>
                    </div>

                    

                    <div>
                        <button>
                            <svg className="w-4" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5149 0.936037H0.485074C0.356425 0.936037 0.233044 0.886728 0.142075 0.798958C0.0511059 0.711187 0 0.592145 0 0.468019C0 0.343892 0.0511059 0.22485 0.142075 0.137079C0.233044 0.0493086 0.356425 0 0.485074 0H12.5149C12.6436 0 12.767 0.0493086 12.8579 0.137079C12.9489 0.22485 13 0.343892 13 0.468019C13 0.592145 12.9489 0.711187 12.8579 0.798958C12.767 0.886728 12.6436 0.936037 12.5149 0.936037Z" fill="white"/>
                                <path d="M12.5149 4.46802H0.485075C0.356425 4.46802 0.233044 4.41871 0.142075 4.33094C0.051106 4.24317 6.46176e-08 4.12413 6.46176e-08 4C6.46176e-08 3.87587 0.051106 3.75683 0.142075 3.66906C0.233044 3.58129 0.356425 3.53198 0.485075 3.53198H12.5149C12.6436 3.53198 12.767 3.58129 12.8579 3.66906C12.9489 3.75683 13 3.87587 13 4C13 4.12413 12.9489 4.24317 12.8579 4.33094C12.767 4.41871 12.6436 4.46802 12.5149 4.46802Z" fill="white"/>
                                <path d="M12.5149 8H0.485075C0.356425 8 0.233044 7.95069 0.142075 7.86292C0.051106 7.77515 6.46176e-08 7.65611 6.46176e-08 7.53198C6.46176e-08 7.40785 0.051106 7.28881 0.142075 7.20104C0.233044 7.11327 0.356425 7.06396 0.485075 7.06396H12.5149C12.6436 7.06396 12.767 7.11327 12.8579 7.20104C12.9489 7.28881 13 7.40785 13 7.53198C13 7.65611 12.9489 7.77515 12.8579 7.86292C12.767 7.95069 12.6436 8 12.5149 8Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
        </header>
            
        <div className="flex justify-between w-full h-[calc(100vh-4rem)]">

            {/*         Side Bar         */}
            <div className="bar w-72 h-full p-5 hidden xl:block ">
                {/*     Page Sidebar     */}
                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <Link href="/home" passHref>
                        <div className="flex items-center w-full h-10 mb-5 hover:text-red">
                            <div className="w-7 justify-center flex items-center">
                                <svg className="ofill w-8" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6867 0.0982985L0.114698 12.0156C-0.123481 12.241 0.0340921 12.6458 0.359638 12.6458H2.46112C2.65926 12.6458 2.81995 12.8089 2.81995 13.01V23.6358C2.81995 23.8369 2.98065 24 3.17878 24H11.3726C11.5707 24 11.7314 23.8369 11.7314 23.6358V16.4305C11.7314 16.2295 11.8921 16.0664 12.0902 16.0664H13.6722C13.8703 16.0664 14.031 16.2295 14.031 16.4305V24H22.5893C22.7875 24 22.9482 23.8369 22.9482 23.6358V13.105C22.9482 12.9039 23.1088 12.7408 23.307 12.7408H25.6404C25.9665 12.7408 26.1235 12.3355 25.8848 12.1101L13.175 0.0977718C13.0372 -0.0325906 12.8235 -0.0325906 12.6857 0.0977718L12.6867 0.0982985Z"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="thover text-xl items-center justify-center">For You</h1>
                            </div>
                        </div>  
                    </Link> 
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C] ">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg className="w-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ostroke" d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke-miterlimit="10"/>
                                    <path className="ofill" d="M10.4328 12.6361L9.16772 20.8826L17.0097 16.2281L18.4265 7.88L10.4328 12.6355V12.6361ZM15.1984 15.1868L11.7787 17.2166L12.3303 13.6208L15.8161 11.5471L15.1984 15.1873V15.1868Z"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="thover text-xl items-center justify-center">Explore</h1>
                                <h2 className="text-sm w-14 rounded-xl bg-red-700 ml-2 text-white">New</h2>
                            </div>
                        </div> 
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg className="w-7" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ostroke" d="M1.00785 27C1.00785 27 0.234125 17.168 14.048 17.168M20.3698 17.72L15.5104 22.5228M15.5104 22.5228L20.1528 26.9528M15.5104 22.5228L28.4939 22.4001M16.9353 6.65197C16.9353 9.77347 14.4048 12.3039 11.2833 12.3039C8.1618 12.3039 5.63133 9.77347 5.63133 6.65197C5.63133 3.53047 8.1618 1 11.2833 1C14.4048 1 16.9353 3.53047 16.9353 6.65197Z" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="thover text-xl items-center justify-center">Following</h1>
                            </div>
                        </div>  
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <Link href="">
                        <div className="flex items-center w-full h-10 mb-3 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg className="w-7" viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ostroke" d="M1 24.0264C1 24.0264 2.08901 16.3206 10.2027 16.3206C18.3164 16.3206 19.0087 24.0264 19.0087 24.0264M31.0001 24.0264C31.0001 24.0264 29.4036 18.2689 24.1413 18.2689C18.8791 18.2689 17.7987 20.4285 17.7987 20.4285M15.7871 6.58441C15.7871 9.6686 13.2869 12.1688 10.2027 12.1688C7.11853 12.1688 4.6183 9.6686 4.6183 6.58441C4.6183 3.50023 7.11853 1 10.2027 1C13.2869 1 15.7871 3.50023 15.7871 6.58441ZM27.7933 10.2364C27.7933 12.2533 26.1582 13.8884 24.1413 13.8884C22.1244 13.8884 20.4893 12.2533 20.4893 10.2364C20.4893 8.21946 22.1244 6.58441 24.1413 6.58441C26.1582 6.58441 27.7933 8.21946 27.7933 10.2364Z" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="thover text-xl items-center justify-center">Friends</h1>
                            </div>
                        </div>  
                    </Link>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg className="w-7" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ostroke" d="M1 16.9439V20.1004C1 20.3211 1.17861 20.4997 1.39932 20.4997H22.4265C22.6472 20.4997 22.8258 20.3211 22.8258 20.1004V13.0293C22.8258 12.9548 22.9192 12.921 22.967 12.9779L30.6007 17.973C30.8214 17.973 31 17.7944 31 17.5737V3.44414C31 3.22344 30.8214 3.04482 30.6007 3.04482L22.8854 8.47049C22.8397 8.53208 22.7411 8.49974 22.7411 8.42275V1.39932C22.7411 1.17861 22.5625 1 22.3418 1H1.39932C1.17861 1 1 1.17861 1 1.39932V16.9444V16.9439Z" stroke-miterlimit="10"/>
                                    <path className="ofill" d="M9.79266 6.80907V14.547L16 10.678L9.79266 6.80907Z"/>
                                </svg>
                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="thover text-xl items-center justify-center">Live</h1>
                            </div>
                        </div>  
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="">
                        <div className="flex items-center w-full h-10 "> 
                            <div className="w-8 h-6 bg-[#FF3B5C] rounded-full justify-center flex items-center">

                            </div>
                            <div className="w-full flex items-center text-center ml-3">
                                <h1 className="thover text-xl items-center justify-center text-[#FF3B5C]">Profile</h1>
                            </div>
                        </div>  
                    </a>
                </div>

                

                {/*     Followers Sidebar   */}
                <div className="w-full mt-5 text-sm text-[#DADADA]">
                    <div className="text-[12px]">
                        <span>Following accounts</span>
                    </div>

                    <div className="w-full mt-4 flex items-center justify-between">
                        <div className="w-8 h-7 bg-white rounded-full">

                        </div>
                        <div className="w-full flex flex-col ml-2">
                            <a href="">Akimania</a>
                            <span className="text-[10px]">Akimania</span>
                        </div>
                    </div>
                    <div className="text-[12px] text-[#FF3B5C] mt-2">
                        <Link href={"/following"} passHref>
                            <span>See more</span>
                        </Link>
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
            <div className="bar w-20 h-full bg-[#1E1E1E] p-5 hidden xl:hidden md:block">
                {/*     Page Sidebar     */}
                <div className="Pages-Sidebar block relative font-semibold ml-2">
                    <Link href="/">
                        <div className="flex items-center w-full h-10 mb-5 hover:text-red">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="29" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ofill" d="M12.6867 0.0982985L0.114698 12.0156C-0.123481 12.241 0.0340921 12.6458 0.359638 12.6458H2.46112C2.65926 12.6458 2.81995 12.8089 2.81995 13.01V23.6358C2.81995 23.8369 2.98065 24 3.17878 24H11.3726C11.5707 24 11.7314 23.8369 11.7314 23.6358V16.4305C11.7314 16.2295 11.8921 16.0664 12.0902 16.0664H13.6722C13.8703 16.0664 14.031 16.2295 14.031 16.4305V24H22.5893C22.7875 24 22.9482 23.8369 22.9482 23.6358V13.105C22.9482 12.9039 23.1088 12.7408 23.307 12.7408H25.6404C25.9665 12.7408 26.1235 12.3355 25.8848 12.1101L13.175 0.0977718C13.0372 -0.0325906 12.8235 -0.0325906 12.6857 0.0977718L12.6867 0.0982985Z" fill="white"/>
                                </svg>
                            </div>
                        </div>  
                    </Link> 
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C] ">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ostroke" d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="white" stroke-miterlimit="10"/>
                                    <path className="ofill" d="M10.4328 12.6361L9.16772 20.8826L17.0097 16.2281L18.4265 7.88L10.4328 12.6355V12.6361ZM15.1984 15.1868L11.7787 17.2166L12.3303 13.6208L15.8161 11.5471L15.1984 15.1873V15.1868Z" fill="white"/>
                                </svg>
                            </div>
                        </div> 
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ostroke" d="M1.00785 27C1.00785 27 0.234125 17.168 14.048 17.168M20.3698 17.72L15.5104 22.5228M15.5104 22.5228L20.1528 26.9528M15.5104 22.5228L28.4939 22.4001M16.9353 6.65197C16.9353 9.77347 14.4048 12.3039 11.2833 12.3039C8.1618 12.3039 5.63133 9.77347 5.63133 6.65197C5.63133 3.53047 8.1618 1 11.2833 1C14.4048 1 16.9353 3.53047 16.9353 6.65197Z" stroke="white" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                        </div>  
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <Link href="">
                        <div className="flex items-center w-full h-10 mb-3 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="25" viewBox="0 0 32 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ostroke" d="M1 24.0264C1 24.0264 2.08901 16.3206 10.2027 16.3206C18.3164 16.3206 19.0087 24.0264 19.0087 24.0264M31.0001 24.0264C31.0001 24.0264 29.4036 18.2689 24.1413 18.2689C18.8791 18.2689 17.7987 20.4285 17.7987 20.4285M15.7871 6.58441C15.7871 9.6686 13.2869 12.1688 10.2027 12.1688C7.11853 12.1688 4.6183 9.6686 4.6183 6.58441C4.6183 3.50023 7.11853 1 10.2027 1C13.2869 1 15.7871 3.50023 15.7871 6.58441ZM27.7933 10.2364C27.7933 12.2533 26.1582 13.8884 24.1413 13.8884C22.1244 13.8884 20.4893 12.2533 20.4893 10.2364C20.4893 8.21946 22.1244 6.58441 24.1413 6.58441C26.1582 6.58441 27.7933 8.21946 27.7933 10.2364Z" stroke="white" stroke-miterlimit="10"/>
                                </svg>
                            </div>
                        </div>  
                    </Link>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 mb-5 ">
                            <div className="w-8 justify-center flex items-center">
                                <svg width="28" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="ostroke" d="M1 16.9439V20.1004C1 20.3211 1.17861 20.4997 1.39932 20.4997H22.4265C22.6472 20.4997 22.8258 20.3211 22.8258 20.1004V13.0293C22.8258 12.9548 22.9192 12.921 22.967 12.9779L30.6007 17.973C30.8214 17.973 31 17.7944 31 17.5737V3.44414C31 3.22344 30.8214 3.04482 30.6007 3.04482L22.8854 8.47049C22.8397 8.53208 22.7411 8.49974 22.7411 8.42275V1.39932C22.7411 1.17861 22.5625 1 22.3418 1H1.39932C1.17861 1 1 1.17861 1 1.39932V16.9444V16.9439Z" stroke="white" stroke-miterlimit="10"/>
                                    <path className="" d="M9.79266 6.80907V14.547L16 10.678L9.79266 6.80907Z" fill="white"/>
                                </svg>
                            </div>
                        </div>  
                    </a>
                </div>

                <div className="Pages-Sidebar block relative font-semibold ml-2 hover:text-[#FF3B5C]">
                    <a href="#">
                        <div className="flex items-center w-full h-10 "> 
                            <div className="w-8 h-8 bg-[#FF3B5C] rounded-full justify-center flex items-center">

                            </div>
                        </div>  
                    </a>
                </div>

                

            </div>

            {/* Main Konten */}
            <div className="w-full h-full overflow-y-auto flex-wrap text-center items-start justify-center hidden md:flex no-scrollbar">
                <div className="w-full h-4/5 p-6 flex flex-col">
                    <div className="w-full h-full flex items-start">
                        <div className="w-60 h-60 bg-white rounded-full">

                        </div>
                        <div className="items-center flex flex-col ml-8 font-bold">
                            <div className="w-full flex items-center text-3xl">
                                <h2>{username ? username : 'user'}</h2>
                                <span className="text-[#DADADA] text-2xl ml-2">{name ? name : 'user'}</span>
                            </div>

                            <div className="flex w-full">
                                <div className="mr-2">
                                    <span>{followingCount}</span>
                                    <span className="ml-1 text-[#DADADA]">Following</span>
                                </div>
                                <div className="mr-2">
                                    <span>{followersCount}</span>
                                    <span className="ml-1 text-[#DADADA]">Followers</span>
                                </div>
                                <div className="mr-2">
                                    <span>{likesCount}</span>
                                    <span className="ml-1 text-[#DADADA]">Likes</span>
                                </div>
                            </div>

                            <div className="w-96 flex text-[#DADADA] text-sm mt-2 text-start">
                                <span>{bio ? bio : 'No bio yet'}</span>
                            </div>

                            <div className="w-full flex text-sm mt-3">
                                <div>
                                {canEditProfile && (
                                    <button
                                        className="bg-[#FF3B5C] w-28 p-3 rounded-lg mr-3"
                                        onClick={openEditProfile}
                                    >
                                        <h2 className="text-white">Edit Profile</h2>
                                    </button>
                                )}

                                {isEditProfileOpen && currentUsername?.uid &&(
                                    <EditProfileCom close={closeEditProfile} 
                                    uid={currentUsername.uid} 
                                    currentUsername={currentUsername.displayName || ''}
                                    currentName={currentUsername.displayName || ''}
                                    currentBio={currentUsername.displayName || ''}
                                    onUsernameUpdated={handleUsernameUpdated} onNameUpdated={handleNameUpdated} onBioUpdated={handleBioUpdated}/>
                                )}
                                </div>
                                {canEditProfile && (
                                <button className="bg-[#1E1E1E] w-11  p-3 rounded-lg mr-3">
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.7352 8.7347H18.9031C18.2243 8.7347 17.655 8.12184 17.655 7.39443C17.655 7.02786 17.8028 6.69565 18.0655 6.44936L18.602 5.89951C19.1331 5.34965 19.1331 4.4504 18.602 3.90055L17.3812 2.63473C17.1404 2.38271 16.7845 2.23379 16.4232 2.23379C16.0619 2.23379 15.7116 2.38271 15.4652 2.63473L14.9506 3.17313C14.7043 3.45952 14.3758 3.61416 14.02 3.61416C13.3192 3.61416 12.7335 3.01848 12.7335 2.31398V1.43765C12.7335 0.66441 12.1368 0 11.3922 0H9.72802C8.98351 0 8.39227 0.658682 8.39227 1.43765V2.30825C8.39227 3.01276 7.80651 3.60844 7.10578 3.60844C6.75542 3.60844 6.43243 3.45379 6.19703 3.18459L5.66601 2.63473C5.42514 2.37699 5.0693 2.23379 4.70799 2.23379C4.34668 2.23379 3.99632 2.38271 3.74997 2.63473L2.51823 3.89482C1.99268 4.44468 1.99268 5.34392 2.51823 5.88805L3.03282 6.42645C3.30654 6.6842 3.45983 7.02786 3.45983 7.39443C3.45983 8.12757 2.89049 8.7347 2.21166 8.7347H1.37955C0.629557 8.7347 0 9.34757 0 10.1265V10.9971V11.8677C0 12.641 0.629557 13.2596 1.37955 13.2596H2.21166C2.89049 13.2596 3.45983 13.8724 3.45983 14.5998C3.45983 14.9664 3.30654 15.3101 3.03282 15.5678L2.51823 16.1005C1.99268 16.6504 1.99268 17.5496 2.51823 18.0937L3.73902 19.3653C3.9799 19.623 4.33573 19.7662 4.69704 19.7662C5.05835 19.7662 5.40872 19.6173 5.65506 19.3653L6.18608 18.8154C6.41601 18.5462 6.74447 18.3916 7.09483 18.3916C7.79556 18.3916 8.38132 18.9872 8.38132 19.6917V20.5624C8.38132 21.3356 8.97256 22 9.72255 22H11.3868C12.1313 22 12.7225 21.3413 12.7225 20.5624V19.6917C12.7225 18.9872 13.3083 18.3916 14.009 18.3916C14.3594 18.3916 14.6878 18.5519 14.9397 18.8326L15.4543 19.371C15.7006 19.623 16.051 19.7719 16.4123 19.7719C16.7736 19.7719 17.124 19.623 17.3703 19.371L18.5911 18.0995C19.1166 17.5496 19.1166 16.6504 18.5911 16.1005L18.0546 15.5506C17.7918 15.3043 17.644 14.9664 17.644 14.6056C17.644 13.8724 18.2134 13.2653 18.8922 13.2653H19.7243C20.4688 13.2653 20.9998 12.6524 20.9998 11.8735V10.9971V10.1265C21.0108 9.34757 20.4798 8.7347 19.7352 8.7347ZM14.9342 10.9971C14.9342 13.523 12.9798 15.5793 10.5547 15.5793C8.1295 15.5793 6.17513 13.523 6.17513 10.9971C6.17513 8.47123 8.1295 6.415 10.5547 6.415C12.9798 6.415 14.9342 8.47123 14.9342 10.9971Z" fill="#DADADA"/>
                                    </svg>
                                </button>
                                )}
                                <button className="bg-[#1E1E1E] w-11  p-3 rounded-lg">
                                    <svg width="21" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.49569 17.3381H15.974L16.0183 23.015L29 11.9696L15.9303 0V5.06086C15.9303 5.06086 0 3.3005 0 22.0033L3.21667 19.2755C4.69171 18.0249 6.56246 17.3387 8.49621 17.3387L8.49569 17.3381Z" stroke="white" strokeWidth={"2"}/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div ref={containerRef} className="bar w-full h-40 items-center justify-start flex relative">
                        <div className="text-[#BDBDBD] w-full flex justify-start items-center text-center relative">
                            <button
                            ref={videoButtonRef}
                            className={`menu-item w-24 flex items-center justify-center relative ${selectedButton === "videos" ? "selected" : ""}`}
                            onMouseEnter={handleHover("videos")}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleButtonClick("videos")}
                            >
                            <span>Videos</span>
                            </button>
                            <button
                            ref={favoritesButtonRef}
                            className={`menu-item w-24 flex items-center justify-center relative ${selectedButton === "favorites" ? "selected" : ""}`}
                            onMouseEnter={handleHover("favorites")}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleButtonClick("favorites")}
                            >
                            <svg
                                className="w-3 mr-2"
                                viewBox="0 0 14 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M0.816667 16.3333H13.1833C13.6318 16.3333 14 15.9724 14 15.5276V7.80208C14 7.35729 13.6354 7 13.1833 7H12.3958V5.87344C12.3958 4.36042 11.8052 2.67969 10.8427 1.66615C9.88385 0.652604 8.50937 0 7.00365 0C7 0 7 0 7 0H6.99635C5.49062 0 4.11615 0.652604 3.15729 1.6625C2.19479 2.67604 1.60417 4.35677 1.60417 5.86979V7H0.911458H0.816667C0.364583 7 0 7.36094 0 7.80208V15.5276C0 15.9724 0.364583 16.3333 0.816667 16.3333ZM3.53646 5.87344C3.53646 4.87813 3.8974 3.64583 4.56094 2.94583V2.9349C5.2026 2.25677 6.08854 1.85938 6.99635 1.85938H7H7.00365C7.91146 1.85938 8.7974 2.25677 9.43906 2.9349V2.94219L9.43542 2.94583C10.1026 3.64583 10.4599 4.87813 10.4599 5.87344V7H9.82187H4.17083H3.53646V5.87344Z"
                                fill="#BDBDBD"
                                />
                            </svg>
                            <span>Favorites</span>
                            </button>
                            <button
                            ref={likesButtonRef}
                            className={`menu-item w-24 flex items-center justify-center relative ${selectedButton === "likes" ? "selected" : ""}`}
                            onMouseEnter={handleHover("likes")}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleButtonClick("likes")}
                            >
                            <svg
                                className="w-3 mr-2"
                                viewBox="0 0 14 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M0.816667 16.3333H13.1833C13.6318 16.3333 14 15.9724 14 15.5276V7.80208C14 7.35729 13.6354 7 13.1833 7H12.3958V5.87344C12.3958 4.36042 11.8052 2.67969 10.8427 1.66615C9.88385 0.652604 8.50937 0 7.00365 0C7 0 7 0 7 0H6.99635C5.49062 0 4.11615 0.652604 3.15729 1.6625C2.19479 2.67604 1.60417 4.35677 1.60417 5.86979V7H0.911458H0.816667C0.364583 7 0 7.36094 0 7.80208V15.5276C0 15.9724 0.364583 16.3333 0.816667 16.3333ZM3.53646 5.87344C3.53646 4.87813 3.8974 3.64583 4.56094 2.94583V2.9349C5.2026 2.25677 6.08854 1.85938 6.99635 1.85938H7H7.00365C7.91146 1.85938 8.7974 2.25677 9.43906 2.9349V2.94219L9.43542 2.94583C10.1026 3.64583 10.4599 4.87813 10.4599 5.87344V7H9.82187H4.17083H3.53646V5.87344Z"
                                fill="#BDBDBD"
                                />
                            </svg>
                            <span>Likes</span>
                            </button>
                        </div>
                        <div
                            className="absolute bottom-0 left-0 h-0.5 bg-[#BDBDBD]"
                            style={underlineStyle}
                            id="underline"
                        ></div>
                    </div>



                    <div className="w-full h-full flex flex-wrap items-center justify-start gap-3 pt-5">
                        <button className="w-64 h-80 bg-[#4A4A4A] rounded-md items-start justify-end flex flex-col pl-2 pr-2 pb-2">
                            <h2 className="text-sm font-bold text-white">First Tiktok Clone Video</h2>
                            <h2 className="text-white">First Tiktok Clone Video</h2>
                        </button>
                    </div>

                </div>
            </div>


            {/* Main Konten Mobile */}
            <div className="relative w-full h-full overflow-y-auto text-center flex justify-center md:hidden">
                <div className="w-full pt-20">
                    <div className="w-full flex flex-col items-center">
                        <div className="w-28 h-28 bg-white rounded-full mb-4">

                        </div>
                        <h2>@{name ? name : 'user'}</h2>
                    </div>
                    <div className="flex w-full justify-center mt-4">
                        <div className="mr-2 flex flex-col w-20">
                            <span>{followingCount}</span>
                            <span className="ml-1 text-[#DADADA] text-sm">Following</span>
                        </div>
                        <div className="mr-2 flex flex-col w-20">
                            <span>{followersCount}</span>
                            <span className="ml-1 text-[#DADADA] text-sm">Followers</span>
                        </div>
                        <div className="mr-2 flex flex-col w-16 justify-center">
                            <span>{likesCount}</span>
                            <span className="ml-1 text-[#DADADA] text-sm">Likes</span>
                        </div>
                    </div>
                    {canEditProfile && (
                    <div className="w-full flex items-center justify-center mt-4">
                        <button className="bg-[#4A4A4A] w-auto p-2 pl-5 pr-5 rounded-md text-sm mr-1">Edit Profile</button>
                        <button className="bg-[#4A4A4A] w-auto p-2 pl-5 pr-5 rounded-md text-sm mr-1">Share Profile</button>
                        <button className="bg-[#4A4A4A] w-5 p-2 pl-5 pr-5 rounded-md text-sm items-center justify-center flex flex-col">
                            <svg className="w-4" viewBox="0 0 19 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.00785 27C1.00785 27 0.234125 17.168 14.048 17.168M15 15V24.5M11 19.5H19M16.9353 6.65197C16.9353 9.77347 14.4048 12.3039 11.2833 12.3039C8.1618 12.3039 5.63133 9.77347 5.63133 6.65197C5.63133 3.53047 8.1618 1 11.2833 1C14.4048 1 16.9353 3.53047 16.9353 6.65197Z" stroke="white" stroke-miterlimit="10" strokeWidth={2}/>
                            </svg>
                        </button>
                    </div>
                    )}
                    <div className="w-full flex text-[#DADADA] text-sm mt-3 text-start items-center justify-center">
                        <span>{bio ? bio : 'No bio yet'}</span>
                    </div>
                </div>
                
            </div>

            

            

        </div>
        <FooterMobileHome></FooterMobileHome>
        
        </main>
    )
}
export default ProfilePageCom;