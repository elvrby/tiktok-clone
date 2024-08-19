"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useUserSession } from '@/hooks/use-user-session';
import { signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth';
import { createSession, removeSession } from '@/actions/auth-actions';

    interface LoginComponentProps {
    close: () => void;
    session: string | null;
  }

  export function LoginComponent({ close, session }: LoginComponentProps) {
    const userSessionId = useUserSession(session);
  
    const handleSignIn = async () => {
      const userUid = await signInWithGoogle();
      if (userUid) {
        await createSession(userUid);
      }
    };
  
    const handleSignOut = async () => {
      await signOutWithGoogle();
      await removeSession();
    };


  return (
    <div className="text-white">
        <Image src="/wall1.jpg" layout="fill" objectFit="cover" objectPosition="center" alt=""/>
    <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
      <div className="bg-[#1E1E1E] rounded-tl-lg rounded-tr-lg shadow-lg w-full max-w-md p-6">
        <div className="w-full h-8 justify-end flex">
            <Link href="/" passHref>
            <button className="w-8 h-8 bg-[#4A4A4A] rounded-full">
                <h1>X</h1>
            </button>
            </Link>
        </div>
        <div className="w-full items-center flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">Log In to TikTok</h2>
          </div>
          <div className="w-[340px] h-11 mt-2 mb-2">
            <button className="w-full h-full bg-[#4A4A4A] rounded-lg flex items-center justify-between p-3 border border-[#4A4A4A] hover:border-white hover:bg-black">
              <div className="flex items-center w-full">
                <svg className="w-5 h-5 " viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2 11.2V14.6M11.2 18H14.6V11.2M14.6 12.9H18M18 16.3V18M1.85 1H6.95C7.41944 1 7.8 1.38056 7.8 1.85V6.95C7.8 7.41944 7.41944 7.8 6.95 7.8H1.85C1.38056 7.8 1 7.41944 1 6.95V1.85C1 1.38056 1.38056 1 1.85 1ZM1.85 11.2H6.95C7.41944 11.2 7.8 11.5806 7.8 12.05V17.15C7.8 17.6194 7.41944 18 6.95 18H1.85C1.38056 18 1 17.6194 1 17.15V12.05C1 11.5806 1.38056 11.2 1.85 11.2ZM12.05 1H17.15C17.6194 1 18 1.38056 18 1.85V6.95C18 7.41944 17.6194 7.8 17.15 7.8H12.05C11.5806 7.8 11.2 7.41944 11.2 6.95V1.85C11.2 1.38056 11.5806 1 12.05 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className="w-full text-center flex-grow">Use QR Code</span>
              </div>
            </button>
          </div>
          <div className="w-[340px] h-11 mt-2 mb-2">
            <button className="w-full h-full bg-[#4A4A4A] rounded-lg flex items-center justify-between p-3 border border-[#4A4A4A] hover:border-white hover:bg-black">
              <div className="flex items-center w-full">
                <svg className="w-5 h-5" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <   path d="M1 31C1 31 1.70315 20.1955 11.485 20.1955C21.2668 20.1955 22.3535 31 22.3535 31M19.1432 7.85658C19.1432 11.6434 16.0734 14.7132 12.2866 14.7132C8.49986 14.7132 5.43006 11.6434 5.43006 7.85658C5.43006 4.06979 8.49986 1 12.2866 1C16.0734 1 19.1432 4.06979 19.1432 7.85658Z" stroke="white" stroke-miterlimit="10" stroke-width="3"/>
                </svg>

                <span className="w-full text-center flex-grow">Use phone / email / username</span>
              </div>
            </button>
          </div>
          <div className="w-[340px] h-11 mt-2 mb-2">
            <button className="w-full h-full bg-[#4A4A4A] rounded-lg flex items-center justify-between p-3 border border-[#4A4A4A] hover:border-white hover:bg-black">
              <div className="flex items-center w-full">
                <svg width="24" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0117 26C20.1505 26 26 20.1505 26 13.0117C26 5.84919 20.1505 0 13.0117 0C5.84919 0 0 5.84919 0 13.0117C0 20.1505 5.84919 26 13.0117 26Z" fill="#3A5BA2"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3762 8.12932C11.3762 6.33308 12.8272 4.88206 14.623 4.88206H17.0642V8.12932H15.4291C14.9919 8.12932 14.623 8.49784 14.623 8.93537V10.5701H17.0642V13.817H14.623V21.1406H11.3762V13.817H8.93537V10.5701H11.3762V8.12932Z" fill="white"/>
                </svg>
                <span className="w-full text-center flex-grow">Continue with Facebook</span>
              </div>
            </button>
          </div>
          <div className="w-[340px] h-11 mt-2 mb-2">
            <button onClick={handleSignIn} className="w-full h-full bg-[#4A4A4A] rounded-lg flex items-center justify-between p-3 border border-[#4A4A4A] hover:border-white hover:bg-black">
              <div className="flex items-center w-full">
                <svg className="w-5 h-5" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.6542C22 10.8798 21.9382 10.1012 21.8062 9.3394H11.2216V13.7262H17.2829C17.0314 15.141 16.2232 16.3926 15.0398 17.1879V20.0342H18.656C20.7795 18.0502 22 15.1201 22 11.6542Z" fill="#4285F4"/>
                    <path d="M11.2216 22.7843C14.2481 22.7843 16.8005 21.7756 18.6601 20.0342L15.044 17.1879C14.0379 17.8827 12.739 18.2762 11.2258 18.2762C8.29819 18.2762 5.81595 16.2712 4.92531 13.5755H1.1937V16.5098C3.09868 20.3566 6.97873 22.7843 11.2216 22.7843Z" fill="#34A853"/>
                    <path d="M4.92119 13.5755C4.45113 12.1607 4.45113 10.6286 4.92119 9.21382V6.27954H1.1937C-0.397901 9.49846 -0.397901 13.2908 1.1937 16.5098L4.92119 13.5755Z" fill="#FBBC04"/>
                    <path d="M11.2216 4.50893C12.8215 4.48381 14.3677 5.09495 15.5264 6.21675L18.7302 2.96435C16.7015 1.03049 14.009 -0.0327191 11.2216 0.000767679C6.97873 0.000767679 3.09868 2.42856 1.1937 6.27954L4.92119 9.21382C5.8077 6.51395 8.29407 4.50893 11.2216 4.50893Z" fill="#EA4335"/>
                </svg>
                <span className="w-full text-center flex-grow">Continue with Google</span>
              </div>
            </button>
          </div>
          <div className="w-[340px] h-11 mt-2 mb-2">
            <button className="w-full h-full bg-[#4A4A4A] rounded-lg flex items-center justify-between p-3 border border-[#4A4A4A] hover:border-white hover:bg-black">
              <div className="flex items-center w-full">
                <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7047 13.051C16.6737 9.93992 19.2417 8.44776 19.3565 8.37238C17.9133 6.26218 15.6648 5.97264 14.8646 5.93969C12.9525 5.74549 11.1319 7.06592 10.1619 7.06592C9.19394 7.06592 7.69529 5.96814 6.10978 5.9961C4.02405 6.02705 2.10156 7.2092 1.02824 9.07627C-1.13786 12.8339 0.47411 18.4027 2.5848 21.4524C3.61668 22.943 4.84726 24.6204 6.46172 24.559C8.01779 24.4976 8.60486 23.5526 10.4859 23.5526C12.367 23.5526 12.8951 24.559 14.5411 24.5275C16.2144 24.4971 17.2753 23.0084 18.2987 21.5118C19.4833 19.78 19.971 18.1031 20 18.0183C19.9636 18.0013 16.7381 16.7657 16.7047 13.051Z" fill="white"/>
                    <path d="M13.612 3.92135C14.4682 2.88198 15.0483 1.43775 14.8905 0C13.6549 0.0499217 12.1593 0.821213 11.2722 1.85958C10.4774 2.78114 9.78252 4.24834 9.96873 5.66013C11.3471 5.76696 12.7529 4.95873 13.612 3.92135Z" fill="white"/>
                </svg>
                <span className="w-full text-center flex-grow">Continue with Apple</span>
              </div>
            </button>
          </div>

          <div className="text-center w-full text-xs items-center justify-center flex mt-4">
            <div className="w-80">
                <span>By continuing with an account located in English, you 
                agree to our Terms of Service and acknowledge that you
                have read our Privacy Policy.</span>
            </div>
          </div>

          
          
        </div>
      </div>
        <div className="w-full max-w-md text-center bg-[#1E1E1E] p-4 border-t border-[#4A4A4A] rounded-bl-lg rounded-br-lg">
            <span>Dont have an account? <a className="text-red-700 font-semibold" href="">Sign In</a></span>
        </div>
    </div>
    </div>
  );
};

export default LoginComponent;
