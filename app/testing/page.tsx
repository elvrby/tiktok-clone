"use client";
import { useState, useEffect } from "react";
import { firebaseAuth, firebaseFirestore } from '@/libs/firebase/config';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged as onauthoriginal } from 'firebase/auth';
import ClipLoader from 'react-spinners/ClipLoader'; // Untuk menampilkan loading spinner
import { useRouter } from 'next/navigation';

const Testing: React.FC = () => {
    const [userData, setUserData] = useState<any>(null); // State untuk menyimpan data pengguna
    const [username, setUsername] = useState<string | null>(null); // State untuk username
    const [loading, setLoading] = useState<boolean>(true); // State untuk loading spinner
    const [uid, setUid] = useState<string | null>(null); // Menyimpan UID pengguna
    const router = useRouter();

    useEffect(() => {
        // Fungsi untuk mengambil data pengguna dari Firestore
        const fetchUserData = async (userUid: string) => {
            try {
                const userDocRef = doc(firebaseFirestore, 'users', userUid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setUserData(userData);
                    setUsername(userData?.username || 'user');
                } else {
                    console.error("User not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false); // Sembunyikan spinner setelah data diambil
            }
        };

        // Pantau status autentikasi
        const unsubscribe = onauthoriginal(firebaseAuth, (user) => {
            if (user) {
                setUid(user.uid); // Set UID pengguna
                fetchUserData(user.uid); // Ambil data pengguna dari Firestore
            } else {
                router.push('/login'); // Arahkan ke halaman login jika belum login
            }
        });

        return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
    }, [router]);

    return (
        <div className="profile-container">
            {loading ? (
                <ClipLoader size={50} /> // Tampilkan loading spinner jika masih mengambil data
            ) : userData ? (
                <>
                    <img
                        src={userData.profileImage} // Menampilkan gambar profil dari Firestore
                        alt="Profile"
                        className="profile-image"
                    />
                    <h2>{username}</h2> {/* Menampilkan username dari Firestore */}
                </>
            ) : (
                <p>Data user tidak ditemukan</p>
            )}
        </div>
    );
};

export default Testing;
