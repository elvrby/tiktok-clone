"use client";

import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useUserSession } from '@/hooks/use-user-session';
import { onAuthStateChanged, getUserRoles, signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth';
import { createSession, removeSession } from '@/actions/auth-actions';
import IndexHome from '@/components/home/indexhome';
import HeaderHome from '@/components/home/headerhome';
import FooterMobileHome from '@/components/Mobile/footerhome';

const HomePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const userSessionId = useUserSession(null);
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
            <FooterMobileHome />
        </main>
    );
};

export default HomePage;
