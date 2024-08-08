"use client"
import Link from "next/link";
import { signOutWithGoogle } from '@/libs/firebase/auth';
import { removeSession } from '@/actions/auth-actions';

interface ProfilePageProps {
    session: string | null;
  }

export function ProfilePage({session}: ProfilePageProps){
    const handleSignOut = async () => {
        await signOutWithGoogle();
        await removeSession();
      };
    return(
        <main>
            <button onClick={handleSignOut}>Sign Out</button>
        </main>
    )
}
export default ProfilePage;