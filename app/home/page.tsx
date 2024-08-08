"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LoginComponent from '@/components/Mobile/login';
import { useUserSession } from '@/hooks/use-user-session';
import { onAuthStateChanged, getUserRoles, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth';
import { User } from 'firebase/auth';
import { createSession, removeSession } from '@/actions/auth-actions';
import Index from '@/components';
import IndexHome from '@/components/home/indexhome';
import HeaderHome from '@/components/home/headerhome';
import FooterMobileHome from '@/components/Mobile/footerhome';

interface HomePageProps {
    session?: string | null;  // session is now optional with a default value of null
}

export function HomePage({ session = null }: HomePageProps) {
    const [user, setUser] = useState<User | null>(null);
    const userSessionId = useUserSession(session);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(async (authUser) => {
          setUser(authUser);
          if (authUser) {
              const roles = await getUserRoles(authUser.uid);
              if (Array.isArray(roles)) {
                  setIsAdmin(roles.includes('admin'));
              }
          }
      });
  
      return () => unsubscribe();
  }, []);

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
        <main className="relative min-h-screen">
            <HeaderHome />
            <IndexHome session={null} /> 
            <FooterMobileHome></FooterMobileHome>
        </main>
    );
}

export default HomePage;
