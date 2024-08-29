"use client"
import React, { useState } from 'react';
import { doc, updateDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { firebaseFirestore } from '@/libs/firebase/config'; // Pastikan path ini benar
import { useRouter } from 'next/navigation';
import AlertError from '@/src/alert-error';

interface EditProfileProps {
  close: () => void;
  uid: string;
  currentUsername: string;
  currentName: string;
  currentBio: string;
  onUsernameUpdated: () => void;
  onNameUpdated: () => void;
  onBioUpdated: () => void;
}

const EditProfileCom: React.FC<EditProfileProps> = ({ close, uid, currentUsername, onUsernameUpdated, onNameUpdated, onBioUpdated }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newName, setNewName] = useState('');
    const [newBio, setNewBio] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const maxChars = 80;
    const router = useRouter();

    // Handlesave Username
    const handleSave = async () => {
        let tempUsername: string | null = newUsername?.trim() || null;
        let tempName: string | null = newName?.trim() || null;
        let tempBio: string | null = newBio?.trim() || null;
    
        if (!tempUsername && !tempName && !tempBio) {
            alert('Tidak ada perubahan yang dilakukan');
            return;
        }
    
        if (!uid) {
            console.error('UID is undefined or invalid');
            alert('Failed to update profile: User ID is missing');
            return;
        }
    
        try {
            const userDocRef = doc(firebaseFirestore, 'users', uid);
            const userDocSnap = await getDoc(userDocRef);
            const currentUsername = userDocSnap.data()?.username;
            const currentName = userDocSnap.data()?.name;
            const currentBio = userDocSnap.data()?.bio;
    
            // Check if the new username is the same as the current one
            if (tempUsername && tempUsername === currentUsername) {
                setAlertMessage("Username sedang Anda gunakan");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2000);
                return;
            }
    
            // Check if the new name is the same as the current one
            if (tempName && tempName === currentName) {
                setAlertMessage("Nama sedang Anda gunakan");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2000);
                return;
            }
    
            const updates: Record<string, string> = {}; // Prepare updates object
    
            // Check if new username is already taken by another user
            if (tempUsername) {
                const usersRef = collection(firebaseFirestore, 'users');
                const qUsername = query(usersRef, where('username', '==', tempUsername));
                const querySnapshotUsername = await getDocs(qUsername);
    
                if (!querySnapshotUsername.empty && querySnapshotUsername.docs[0].id !== uid) {
                    setAlertMessage("Username telah digunakan");
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 2000);
                    return;
                }
    
                updates['username'] = tempUsername;
            }
    
            // Check if new name is already taken by another user
            if (tempName) {
                const usersRef = collection(firebaseFirestore, 'users');
                const qName = query(usersRef, where('name', '==', tempName));
                const querySnapshotName = await getDocs(qName);
    
                if (!querySnapshotName.empty && querySnapshotName.docs[0].id !== uid) {
                    setAlertMessage("Nama telah digunakan");
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 2000);
                    return;
                }
    
                updates['name'] = tempName;
            }

            if (tempBio) {
                const usersRef = collection(firebaseFirestore, 'users');
                const qBio = query(usersRef, where('bio', '==', tempBio));
                const querySnapshotBio = await getDocs(qBio);
    
                if (!querySnapshotBio.empty && querySnapshotBio.docs[0].id !== uid) {
                    setAlertMessage("Nama telah digunakan");
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 2000);
                    return;
                }
    
                updates['bio'] = tempBio;
            }
    
            // Update if there are changes
            if (Object.keys(updates).length > 0) {
                await updateDoc(userDocRef, updates);
                
                if (tempUsername) {
                    onUsernameUpdated(); // Call callback after username update
                    close();
    
                    // Redirect to /home after 2 seconds if username is updated
                    setTimeout(() => {
                        setShowAlert(false);
                        router.push('/home');
                    }, 2000);
                }
    
                if (tempName) {
                    onNameUpdated(); // Call callback after name update
                    close();
    
                    // Refresh the page after name is updated
                    setTimeout(() => {
                        setShowAlert(false);
                        window.location.reload(); // This refreshes the current page
                    }, 2000);
                }

                if (tempBio) {
                    onBioUpdated(); // Call callback after name update
                    close();
    
                    // Refresh the page after name is updated
                    setTimeout(() => {
                        setShowAlert(false);
                        window.location.reload(); // This refreshes the current page
                    }, 2000);
                }
            }
    
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error updating profile:', error);
                alert(`Failed to update profile: ${error.message}`);
            } else {
                console.error('Unexpected error:', error);
                alert('Failed to update profile due to an unexpected error');
            }
        }
    };
    
    

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Hanya izinkan huruf, angka, underscore, dan titik
        const regex = /^[a-zA-Z0-9._]*$/;
    
        if (regex.test(value)) {
            setNewUsername(value);
        } else {
            // Tampilkan alert
            setAlertMessage("Hanya huruf, nomer, underscores, dan titik yang di perbolehkan.");
            setShowAlert(true);
    
            // Sembunyikan alert setelah 2 detik
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Hanya izinkan huruf, angka, underscore, dan titik
        const regex = /^[a-zA-Z0-9._]*$/;
    
        if (regex.test(value)) {
            setNewName(value);
        } else {
            // Tampilkan alert
            setAlertMessage("Hanya huruf, nomer, underscores, dan titik yang di perbolehkan.");
            setShowAlert(true);
    
            // Sembunyikan alert setelah 2 detik
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    };
    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= maxChars) {
            setNewBio(value);
        }
    };

    // Hitung sisa karakter
    const charCount = newBio.length;
    
      
      
      
    return(
        <div className="post fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
            <div className='fixed top-0 w-96 items-center justify-center'>
                {showAlert && (
                    <AlertError
                        type="error"
                        message={alertMessage}
                        onClose={() => setShowAlert(false)}
                    />
                )}
            </div>
            
            {/* Frame */}
             <div className="bgfillm md:w-3/4 lg:w-1/2 h-4/4  rounded-md overflow-y-auto text-2xl font-semibold animate-popup">
                <div className="border-b border-[#4A4A4A] flex items-center">
                    <h1 className="w-60 font-semibold pl-7 pt-8 pr-8 pb-5">Edit Profile</h1>
                    <div className="w-full items-center justify-end flex pr-12">
                        <button onClick={close}>
                            <h1>X</h1>
                        </button>
                    </div>
                    
                </div>
                <div className="p-5 pl-8 text-base flex border-b border-[#4A4A4A]">
                    <h1 className="w-32">Profile Photo</h1>
                    <div className="w-full items-center justify-center flex pr-20">
                        <div className="bgfill w-24 h-24 rounded-full"></div>
                    </div>
                </div>
                <div className="p-5 pl-8 text-base flex border-b border-[#4A4A4A]">
                    <h1 className="w-32">Username</h1>
                    <div className="w-full items-start justify-center flex flex-col pr-28 pl-10">
                        <input
                            className="bg-[#EAEAEA] w-full h-5 p-5 pl-2"
                            type="text"
                            value={newUsername}
                            onChange={handleUsernameChange}
                        />
                        <div className="w-full items-start font-normal text-sm mt-4 flex flex-col">
                            <span>www.tiktok.com/</span>
                            <span className="mt-2 text-start">Usernames can only contain letters, numbers, underscores, and periods. Changing your username will also change your profile link.</span>
                        </div>
                    </div>
                </div>
                <div className="p-5 pl-8 text-base flex border-b border-[#4A4A4A]">
                    <h1 className="w-32">Name</h1>
                    <div className="w-full items-center justify-center flex flex-col pr-28 pl-10">
                        <input
                            className="bg-[#EAEAEA] w-full h-5 p-5 pl-2"
                            type="text"
                            value={newName}
                            onChange={handleNameChange}
                        />
                        <div className="w-full items-start font-normal text-sm mt-1 flex flex-col">
                            <span>Your nickname can only be changed once every 7 days.</span>
                        </div>
                    </div>
                </div>
                <div className="p-5 pl-8 text-base flex border-b border-[#4A4A4A]">
                    <h1 className="w-32">Bio</h1>
                    <div className="w-full items-center justify-center flex flex-col pr-28 pl-10">
                        <textarea className="bg-[#EAEAEA] w-full h-28 p-5 pt-2 pl-2 resize-none"
                        value={newBio}
                        onChange={handleBioChange}
                        />
                        <div className="w-full items-start font-normal text-sm mt-1 flex flex-col">
                            <span>{charCount}/{maxChars}</span>
                        </div>
                    </div>
                </div>
                <div className="p-5 pl-8 text-base flex w-full items-center justify-end">
                    <div className="w-48 flex justify-between text-sm">
                        <button className="border border-[#cccccc] hover:bg-[#f5f5f5] hover:text-black pl-6 pr-6 pb-1 pt-1">Cancel</button>
                        <button onClick={handleSave} className="bg-[#FF3B5C] text-white pl-6 pr-6 pb-1 pt-1">Save</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default EditProfileCom;