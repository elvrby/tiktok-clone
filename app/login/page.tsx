"use client"
import next from "next";
import React, { useState } from "react";
import Image from "next/image";
import LoginComponent from "@/components/Mobile/login";

const LoginPage: React.FC = () =>{
    const [isLoginVisible, setLoginVisible] = useState(true);

    const handleShowLogin = () => {
      setLoginVisible(true);
    };
  
    const handleCloseLogin = () => {
      setLoginVisible(false);
    };
    return(
        <main>
            {isLoginVisible && <LoginComponent close={handleCloseLogin} />}
        </main>
    )
}
export default LoginPage;