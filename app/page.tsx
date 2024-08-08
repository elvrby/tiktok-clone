"use client"
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header"
import Index from "@/components/index"
import FooterMobile from "@/components/Mobile/footer";
import LoginComponent from "@/components/Mobile/login";

const Page: React.FC = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);

  const handleShowLogin = () => {
    setLoginVisible(true);
  };

  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  return (
    <main className="relative min-h-screen">
      <Header onLoginClick={handleShowLogin} />
      <Index onLoginClick={handleShowLogin}></Index>

        <FooterMobile></FooterMobile>
        {isLoginVisible && <LoginComponent close={handleCloseLogin} />}
    </main>
  );
}
export default Page;