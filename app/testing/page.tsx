"use client";

import { useEffect, useState } from 'react';
import { firebaseAuth, firebaseFirestore } from '@/libs/firebase/config'; // Ganti dengan path yang sesuai
import { doc, getDoc } from 'firebase/firestore';

const PageTesting: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebaseAuth.currentUser;
        if (user) {
          const uid = user.uid;
          const userDocRef = doc(firebaseFirestore, 'users', uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data?.username || 'user'); // Ganti 'user' dengan nilai default jika username tidak ada
          } else {
            console.error('No such user!');
            setUsername('user');
          }
        } else {
          console.error('No authenticated user');
          setUsername('user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUsername('user');
      }
    };

    fetchUserData();
  }, []);

  return (
    <main>
      <h2 className="text-white">{username}</h2>
    </main>
  );
};

export default PageTesting;
