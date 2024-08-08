import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '../libs/firebase/auth'; // Ensure this path is correct

export function useUserSession(initialSession: string | null) {
  const [userUid, setUserUid] = useState<string | null>(initialSession);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
