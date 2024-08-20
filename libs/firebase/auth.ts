// src/libs/firebase/auth.ts
import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

import { doc, collection, query, where, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from './config';

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

// Function to generate a random name starting with 'user'
function generateRandomName(): string {
  const randomString = Math.random().toString(36).substring(2, 15); // Generate random string
  return `user${randomString}`; // Prefix with 'user'
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
    const name = generateRandomName();

    const userDocRef = doc(firebaseFirestore, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Save user data to 'users' collection in Firestore with roles set to null
      await setDoc(userDocRef, {
        email,
        name,
        username,
        uid,
        roles: null, // Set roles to null initially
        bio: 'your bio goes here', // Default bio
        following: [], // Default empty array for following
        followers: [], // Default empty array for followers
        likes: [], // Default likes count
        posts: [], // Default empty array for posts
        profileImage: '', // Default empty string for profile image
        theme: 'dark', // Default theme
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



export async function getUserData(identifier: string) {
  try {
    // Coba cari berdasarkan UID
    let userDoc = await getDoc(doc(firebaseFirestore, 'users', identifier));
    
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      // Jika tidak ditemukan, cari berdasarkan username
      const usersCollection = collection(firebaseFirestore, 'users');
      const q = query(usersCollection, where('username', '==', identifier));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocFromUsername = querySnapshot.docs[0];
        return userDocFromUsername.data();
      } else {
        throw new Error('Pengguna tidak ditemukan');
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}




