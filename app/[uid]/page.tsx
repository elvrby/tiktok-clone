"use client";

import { useEffect, useState } from 'react';
import { firebaseFirestore } from '@/libs/firebase/config'; // Ganti dengan path yang sesuai
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation'; // Import useRouter
import ProfilePageCom from '@/components/home/profile/profilehome';
import ClipLoader from 'react-spinners/ClipLoader';

const UserProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Inisialisasi useRouter

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const urlPath = window.location.pathname.split('/').pop();

        if (!urlPath) {
          throw new Error('URL tidak valid.');
        }

        // Cari dokumen pengguna berdasarkan username
        const userQuery = query(collection(firebaseFirestore, 'users'), where('username', '==', urlPath));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Ambil dokumen pertama yang cocok
          const uid = userDoc.id; // UID pengguna adalah ID dokumen

          // Ambil data pengguna berdasarkan UID
          const userDocRef = doc(firebaseFirestore, 'users', uid);
          const userDocData = await getDoc(userDocRef);

          if (userDocData.exists()) {
            const data = userDocData.data();
            setUsername(data?.username || 'user');
          } else {
            setError('User tidak ditemukan.');
          }
        } else {
          setError('Username tidak ditemukan.');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(`Terjadi kesalahan saat mengambil data pengguna: ${error.message}`);
        } else {
          setError('Terjadi kesalahan yang tidak diketahui.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-black z-100000000000000000">
            <div className="text-center">
                <ClipLoader color="white" loading={loading} size={30} /> {/* Loading spinner */}
                <h2 className="text-white mt-4">Tunggu Sebentar...</h2>
            </div>
        </div>
    );
}

  return (
    <main>
      {error ? (
        <h2 className="text-white">{error}</h2>
      ) : (
        // <h2 className="text-white">{username}</h2>
        <ProfilePageCom></ProfilePageCom>
      )}
    </main>
  );
};

export default UserProfilePage;
