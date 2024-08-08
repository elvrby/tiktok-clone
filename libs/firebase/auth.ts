// src/libs/firebase/auth.ts
import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from './config';

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error('Google sign in failed');
    }
    const user = result.user;
    const uid = user.uid;
    const email = user.email || 'No email';
    const username = user.displayName || 'No username';

    const userDocRef = doc(firebaseFirestore, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Save user data to 'users' collection in Firestore with roles set to null
      await setDoc(userDocRef, {
        email,
        username,
        uid,
        roles: null, // Set roles to null initially
      });
    }

    return uid;
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
}

export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}

// Function to get user roles
export async function getUserRoles(uid: string) {
  try {
    const userDoc = await getDoc(doc(firebaseFirestore, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData?.roles || null;
    } else {
      throw new Error('No such user!');
    }
  } catch (error) {
    console.error('Error getting user roles', error);
    return null;
  }
}