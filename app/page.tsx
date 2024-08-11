"use client"
import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Index from "@/components/index";
import FooterMobile from "@/components/Mobile/footer";
import FloatingLoginComponent from "@/components/floatinglogin";
import { useUserSession } from '@/hooks/use-user-session';

const Page: React.FC = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);

  // Assuming you might have a session value, you can set it here
  const session = null; // Replace this with the actual session value if available
  const userSessionId = useUserSession(session);

  const handleShowLogin = () => {
    setLoginVisible(true);
  };

  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  return (
    <main className="relative min-h-screen">
      <Header onLoginClick={handleShowLogin} />
      <Index onLoginClick={handleShowLogin} />
      <FooterMobile />
      {isLoginVisible && <FloatingLoginComponent close={handleCloseLogin} session={userSessionId} />}
    </main>
  );
}

export default Page;
