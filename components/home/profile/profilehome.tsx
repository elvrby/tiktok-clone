"use client"
import next from "next";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderHome from "@/components/home/headerhome";
import FooterMobileHome from "@/components/Mobile/footerhome";
import { getUserData, onAuthStateChanged} from '../../../libs/firebase/auth';
import EditProfileCom from "./editprofile";
import { onAuthStateChanged as onauthoriginal, User } from 'firebase/auth';
import { firebaseAuth, firebaseFirestore  } from '@/libs/firebase/config';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

import ClipLoader from 'react-spinners/ClipLoader';


const ProfilePageCom: React.FC = () =>{
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const pathSegment = window.location.pathname.split('/').pop();
            let uidToUse = pathSegment;
    
            if (!uidToUse) {
              throw new Error('UID atau username tidak ditemukan dalam URL.');
            }
    
            let userDocRef;
    
            // Periksa apakah `uidToUse` adalah `uid` atau `username`
            if (uidToUse.length < 28) { // Jika lebih pendek dari UID Firebase yang biasanya 28 karakter
              const usersRef = collection(firebaseFirestore, "users");
              const q = query(usersRef, where("username", "==", uidToUse));
              const querySnapshot = await getDocs(q);
    
              if (!querySnapshot.empty) {
                uidToUse = querySnapshot.docs[0].id; // Ambil UID dari hasil pencarian username
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
          } catch (error) {
            console.error("Error fetching user data: ", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, []);

      const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
      const [currentUsername, setCurrentUser] = useState<User | null>(null);
      const [showSuccess, setShowSuccess] = useState(false);
  
      useEffect(() => {
          const unsubscribe = onauthoriginal(firebaseAuth, (authUser) => {
              setCurrentUser(authUser);
          });
  
          return () => unsubscribe(); // Cleanup on unmount
      }, []);
  
      const openEditProfile = () => {
          setIsEditProfileOpen(true);
      };
  
      const closeEditProfile = () => {
          setIsEditProfileOpen(false);
      };
  
      const handleUsernameUpdated = () => {
          setShowSuccess(true);
          setTimeout(() => {
              setShowSuccess(false);
          }, 2000); // Hide the success message after 2 seconds
      };

    // underline Main konten
    const [underlineStyle, setUnderlineStyle] = useState({});
    const [selectedButton, setSelectedButton] = useState("videos"); // State untuk melacak tombol yang dipilih
    const videoButtonRef = useRef<HTMLButtonElement>(null);
    const favoritesButtonRef = useRef<HTMLButtonElement>(null);
    const likesButtonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

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

    //   Database
    const [username, setUsername] = useState<string | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [followersCount, setFollowersCount] = useState<number>(0);
    const [likesCount, setLikesCount] = useState<number>(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged( async (user) => {
            if (!user) {
                // Redirect to home if the user is not logged in
                window.location.href = '/login';
            } else {
                setUid(user.uid);
                const userData = await getUserData(user.uid);
                if (userData) {
                    setUsername(userData.username);
                    setName(userData.name);
                    setBio(userData.bio);
                    setFollowingCount(userData.following?.length || 0);
                    setFollowersCount(userData.followers?.length || 0);
                    setLikesCount(userData.likes?.length || 0);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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

    return(
        
        <main>
            <div className=" hidden md:flex md:flex-col">
                <HeaderHome />
            </div>

        {/*     Mobile Header    */}
        <header className="fixed w-full h-16 items-center flex p-3 md:hidden z-10">
                <div className="w-full flex items-center justify-between p-2">
                    <div>
                        <div>
                            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.4354 16.2789C26.7747 16.2789 27.0501 16.0036 27.0501 15.6642C27.0501 15.3249 26.7747 15.0496 26.4354 15.0496H22.9163V11.4822H26.4351C26.7744 11.4822 27.0497 11.2068 27.0497 10.8675C27.0497 10.5282 26.7744 10.2528 26.4351 10.2528H22.3016C21.9623 10.2528 21.6869 10.5282 21.6869 10.8675V20.461C21.6869 20.8003 21.9623 21.0756 22.3016 21.0756H26.4351C26.7744 21.0756 27.0497 20.8003 27.0497 20.461C27.0497 20.1217 26.7744 19.8463 26.4351 19.8463H22.9163V16.2789H26.4354Z" fill="white"/>
                                <path d="M8.25537 10.8675V20.461C8.25537 20.8003 8.53075 21.0756 8.87005 21.0756C9.20936 21.0756 9.48474 20.8003 9.48474 20.461V10.8675C9.48474 10.5282 9.20936 10.2528 8.87005 10.2528C8.53075 10.2528 8.25537 10.5279 8.25537 10.8675Z" fill="white"/>
                                <path d="M6.19063 20.2237C6.19063 19.8844 5.91525 19.609 5.57594 19.609H2.14783V11.1048C2.14783 10.7655 1.87245 10.4901 1.53314 10.4901C1.19384 10.4901 0.918457 10.7655 0.918457 11.1048V20.2234C0.918457 20.5627 1.19384 20.8381 1.53314 20.8381H5.57564C5.91525 20.8384 6.19063 20.563 6.19063 20.2237Z" fill="white"/>
                                <path d="M18.5517 10.6613L15.7155 18.628L12.8794 10.6613C12.7656 10.3414 12.4134 10.1748 12.0941 10.2885C11.7741 10.4025 11.6076 10.7541 11.7213 11.0738L15.1368 20.6672C15.2238 20.9121 15.4558 21.0756 15.7158 21.0756C15.9758 21.0756 16.2079 20.9121 16.2949 20.6672L19.7098 11.0738C19.8238 10.7538 19.6566 10.4022 19.337 10.2885C19.017 10.1748 18.6651 10.3414 18.5517 10.6613Z" fill="white"/>
                                <path d="M2.40877 8.38973C2.74439 8.43398 3.05388 8.19641 3.09783 7.85987C3.32988 6.0828 4.85645 4.74279 6.64857 4.74279H21.3202C23.1124 4.74279 24.6389 6.0828 24.871 7.85956C24.9116 8.16905 25.1756 8.39464 25.4795 8.39464C25.5063 8.39464 25.533 8.39311 25.5601 8.38942C25.8969 8.34547 26.1339 8.0369 26.0902 7.70035C25.7786 5.31322 23.728 3.5131 21.3202 3.5131H15.5517L18.0274 1.21878C18.2766 0.987967 18.2911 0.599177 18.0602 0.350229C17.8291 0.100973 17.44 0.086835 17.1917 0.317343L13.9843 3.29028L10.7768 0.31765C10.5276 0.0865276 10.1391 0.101895 9.90826 0.350536C9.67745 0.599484 9.6922 0.988274 9.94115 1.21909L12.4168 3.51341H6.64827C4.24084 3.51341 2.19055 5.31352 1.8786 7.70035C1.83496 8.03751 2.07192 8.34608 2.40877 8.38973Z" fill="white"/>
                                <path d="M25.5597 22.9385C25.226 22.8939 24.9146 23.1318 24.8707 23.4686C24.6386 25.2454 23.1124 26.5854 21.3199 26.5854H6.64827C4.85615 26.5854 3.32988 25.2454 3.09783 23.4683C3.05388 23.1315 2.74408 22.896 2.40877 22.9382C2.07192 22.9824 1.83496 23.2907 1.8786 23.6272C2.19055 26.0147 4.24115 27.8148 6.64827 27.8148H21.3199C23.7277 27.8148 25.7783 26.0147 26.0899 23.6275C26.1336 23.291 25.8966 22.9824 25.5597 22.9385Z" fill="white"/>
                            </svg>
                        </div>
                    </div>

                    <div className="flex justify-between w-56">
                        <div>
                            <h1 className="text-[#DADADA]">Friends</h1>
                        </div>
                        <div>
                            <h1 className="text-[#DADADA]">Following</h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="font-bold">For You</h1>
                            {/* Line */}
                            <div className="w-8 bg-white h-[2px]"></div>
                        </div>
                    </div>

                    

                    <div>
                        <div>
                            <svg width="20" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.9141 18.2812C23.0859 16.4375 23.7734 14.25 23.7734 11.8984C23.7734 5.32813 18.4531 0 11.8906 0C5.32031 0 0 5.32813 0 11.8984C0 18.4688 5.32031 23.7969 11.8828 23.7969C14.2656 23.7969 16.4844 23.0938 18.3438 21.8906C18.6557 21.6736 19.0784 21.7112 19.3471 21.98L26.027 28.6598C26.7652 29.3981 27.9638 29.3928 28.6955 28.648C29.4179 27.9128 29.413 26.7327 28.6845 26.0036L22.0029 19.3159C21.7258 19.0385 21.6883 18.6019 21.9141 18.2812ZM18.5469 5.25C20.3203 7.02344 21.2969 9.38281 21.2969 11.8906C21.2969 14.3984 20.3203 16.7578 18.5469 18.5312C16.7734 20.3047 14.4141 21.2812 11.9062 21.2812C9.39844 21.2812 7.03906 20.3047 5.26562 18.5312C3.49219 16.7578 2.51562 14.3984 2.51562 11.8906C2.51562 9.38281 3.49219 7.02344 5.26562 5.25C7.03906 3.47656 9.39844 2.5 11.9062 2.5C14.4141 2.5 16.7734 3.47656 18.5469 5.25Z" fill="#DADADA"/>
                            </svg>

                        </div>
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

                            <div className="w-full flex text-[#DADADA] text-sm mt-2">
                                <span>{bio ? bio : 'No bio yet'}</span>
                            </div>

                            <div className="w-full flex text-sm mt-3">
                                <div>
                                <button
                                    className="bg-[#FF3B5C] w-28 p-3 rounded-lg mr-3"
                                    onClick={openEditProfile}
                                >
                                    <h2 className="text-white">Edit Profile</h2>
                                </button>

                                {isEditProfileOpen && currentUsername?.uid &&(
                                    <EditProfileCom close={closeEditProfile} uid={currentUsername.uid} currentUsername={currentUsername.displayName || ''} onUsernameUpdated={handleUsernameUpdated}/>
                                )}
                                </div>
                                <button className="bg-[#1E1E1E] w-11  p-3 rounded-lg mr-3">
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.7352 8.7347H18.9031C18.2243 8.7347 17.655 8.12184 17.655 7.39443C17.655 7.02786 17.8028 6.69565 18.0655 6.44936L18.602 5.89951C19.1331 5.34965 19.1331 4.4504 18.602 3.90055L17.3812 2.63473C17.1404 2.38271 16.7845 2.23379 16.4232 2.23379C16.0619 2.23379 15.7116 2.38271 15.4652 2.63473L14.9506 3.17313C14.7043 3.45952 14.3758 3.61416 14.02 3.61416C13.3192 3.61416 12.7335 3.01848 12.7335 2.31398V1.43765C12.7335 0.66441 12.1368 0 11.3922 0H9.72802C8.98351 0 8.39227 0.658682 8.39227 1.43765V2.30825C8.39227 3.01276 7.80651 3.60844 7.10578 3.60844C6.75542 3.60844 6.43243 3.45379 6.19703 3.18459L5.66601 2.63473C5.42514 2.37699 5.0693 2.23379 4.70799 2.23379C4.34668 2.23379 3.99632 2.38271 3.74997 2.63473L2.51823 3.89482C1.99268 4.44468 1.99268 5.34392 2.51823 5.88805L3.03282 6.42645C3.30654 6.6842 3.45983 7.02786 3.45983 7.39443C3.45983 8.12757 2.89049 8.7347 2.21166 8.7347H1.37955C0.629557 8.7347 0 9.34757 0 10.1265V10.9971V11.8677C0 12.641 0.629557 13.2596 1.37955 13.2596H2.21166C2.89049 13.2596 3.45983 13.8724 3.45983 14.5998C3.45983 14.9664 3.30654 15.3101 3.03282 15.5678L2.51823 16.1005C1.99268 16.6504 1.99268 17.5496 2.51823 18.0937L3.73902 19.3653C3.9799 19.623 4.33573 19.7662 4.69704 19.7662C5.05835 19.7662 5.40872 19.6173 5.65506 19.3653L6.18608 18.8154C6.41601 18.5462 6.74447 18.3916 7.09483 18.3916C7.79556 18.3916 8.38132 18.9872 8.38132 19.6917V20.5624C8.38132 21.3356 8.97256 22 9.72255 22H11.3868C12.1313 22 12.7225 21.3413 12.7225 20.5624V19.6917C12.7225 18.9872 13.3083 18.3916 14.009 18.3916C14.3594 18.3916 14.6878 18.5519 14.9397 18.8326L15.4543 19.371C15.7006 19.623 16.051 19.7719 16.4123 19.7719C16.7736 19.7719 17.124 19.623 17.3703 19.371L18.5911 18.0995C19.1166 17.5496 19.1166 16.6504 18.5911 16.1005L18.0546 15.5506C17.7918 15.3043 17.644 14.9664 17.644 14.6056C17.644 13.8724 18.2134 13.2653 18.8922 13.2653H19.7243C20.4688 13.2653 20.9998 12.6524 20.9998 11.8735V10.9971V10.1265C21.0108 9.34757 20.4798 8.7347 19.7352 8.7347ZM14.9342 10.9971C14.9342 13.523 12.9798 15.5793 10.5547 15.5793C8.1295 15.5793 6.17513 13.523 6.17513 10.9971C6.17513 8.47123 8.1295 6.415 10.5547 6.415C12.9798 6.415 14.9342 8.47123 14.9342 10.9971Z" fill="#DADADA"/>
                                    </svg>
                                </button>
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
            <div className="relative w-full h-full text-center flex items-center justify-center md:hidden">

                
            </div>

            

            

        </div>
        <FooterMobileHome></FooterMobileHome>
        
        </main>
    )
}
export default ProfilePageCom;