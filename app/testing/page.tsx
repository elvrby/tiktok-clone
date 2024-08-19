"use client";
import { useState, useEffect } from 'react';
import { getUserData, signOutWithGoogle } from '../../libs/firebase/auth';
import { firebaseAuth, firebaseFirestore } from '../../libs/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function PageTest() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
      if (authUser) {
        const fetchTheme = async () => {
          try {
            const userData = await getUserData(authUser.uid);
            if (userData) {
              const theme = userData.theme === 'dark' ? 'dark' : 'light';
              setTheme(theme);
              document.body.className = `${theme}-theme`;
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchTheme();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  const setThemeAndSave = async (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    document.body.className = `${newTheme}-theme`;

    if (user) {
      try {
        await updateDoc(doc(firebaseFirestore, 'users', user.uid), {
          theme: newTheme,
        });
      } catch (error) {
        console.error('Error updating theme:', error);
      }
    }
  };

  const signOut = async () => {
    try {
      await signOutWithGoogle();
      window.location.href = '/login'; // Redirect to login page after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <header className="mb-4">
        <button onClick={() => setThemeAndSave('light')} className="px-4 py-2 border rounded">
          Light Mode
        </button>
        <button onClick={() => setThemeAndSave('dark')} className="ml-4 px-4 py-2 border rounded">
          Dark Mode
        </button>
        <button onClick={signOut} className="ml-4 px-4 py-2 border rounded">
          Sign Out
        </button>
      </header>
      <main>
        <h1 className="text-2xl">Welcome to the Themed Page</h1>
      </main>
    </div>
  );
}
