"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginComponent from "@/components/Mobile/login";
import ClipLoader from "react-spinners/ClipLoader";
import { useUserSession } from '@/hooks/use-user-session';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const userSession = useUserSession(null);
  const [isLoginVisible, setLoginVisible] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (userSession) {
      setLoading(true);
      setTimeout(() => {
        router.push("/home");
      }, 500); // Optional delay for the loading effect
    }
  }, [userSession, router]);

  const handleShowLogin = () => {
    setLoginVisible(true);
  };

  const handleCloseLogin = () => {
    setLoginVisible(false);
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <ClipLoader size={50} color="#3498db" />
      ) : (
        isLoginVisible && <LoginComponent close={handleCloseLogin} session={null}/>
      )}
    </main>
  );
};

export default LoginPage;
