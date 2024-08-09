"use client";

import React from "react";
import { signOutWithGoogle } from '@/libs/firebase/auth';
import { removeSession } from '@/actions/auth-actions';

const ProfilePage: React.FC = () => {
    const handleSignOut = async () => {
        await signOutWithGoogle();
        await removeSession();
    };

    return (
        <main>
            <button onClick={handleSignOut}>Sign Out</button>
        </main>
    );
};

export default ProfilePage;
