"use client"
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { firebaseFirestore } from '@/libs/firebase/config'; // Pastikan path ini benar

interface EditProfileProps {
  close: () => void;
  uid: string;
  currentUsername: string;
  onUsernameUpdated: () => void; // New prop
}

const EditProfileCom: React.FC<EditProfileProps> = ({ close, uid, currentUsername, onUsernameUpdated }) => {
  const [newUsername, setNewUsername] = useState('');

  const handleSave = async () => {
      if (!newUsername || newUsername.trim() === '') {
          alert('Username cannot be empty');
          return;
      }

      if (!uid) {
          console.error('UID is undefined or invalid');
          alert('Failed to update username: User ID is missing');
          return;
      }

      try {
          console.log('Attempting to update username for UID:', uid);
          const userDocRef = doc(firebaseFirestore, 'users', uid);
          await updateDoc(userDocRef, { username: newUsername });

          onUsernameUpdated(); // Call the callback on success
          close();

          // Redirect to /home after 2 seconds
          setTimeout(() => {
              window.location.assign('/home');
          }, 2000);
      } catch (error) {
          if (error instanceof Error) {
              console.error('Error updating username:', error);
              alert(`Failed to update username: ${error.message}`);
          } else {
              console.error('Unexpected error:', error);
              alert('Failed to update username due to an unexpected error');
          }
      }
  };
      
      
      
    return(
        <div className="post fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
            {/* Frame */}
             <div className="bgfillm md:w-3/4 lg:w-1/2 h-4/4  rounded-md overflow-y-auto text-2xl font-semibold">
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
            onChange={(e) => setNewUsername(e.target.value)}
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
                        <input className="bg-[#EAEAEA] w-full h-5 p-5 pl-2" type="text" />
                        <div className="w-full items-start font-normal text-sm mt-1 flex flex-col">
                            <span>Your nickname can only be changed once every 7 days.</span>
                        </div>
                    </div>
                </div>
                <div className="p-5 pl-8 text-base flex border-b border-[#4A4A4A]">
                    <h1 className="w-32">Bio</h1>
                    <div className="w-full items-center justify-center flex flex-col pr-28 pl-10">
                        <textarea className="bg-[#EAEAEA] w-full h-28 p-5 pt-2 pl-2 resize-none"/>
                        <div className="w-full items-start font-normal text-sm mt-1 flex flex-col">
                            <span>0/80</span>
                        </div>
                    </div>
                </div>
                <div className="p-5 pl-8 text-base flex w-full items-center justify-end">
                    <div className="w-48 flex justify-between text-sm">
                        <button className="border border-[#cccccc] hover:bg-[#f5f5f5] pl-6 pr-6 pb-1 pt-1">Cancel</button>
                        <button onClick={handleSave} className="bg-[#FF3B5C] text-white pl-6 pr-6 pb-1 pt-1">Save</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default EditProfileCom;