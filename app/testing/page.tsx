"use client"
import EditProfileCom from "@/components/home/profile/editprofile";
import React, { useState } from "react";

const PageTesting: React.FC = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const openEditProfile = () => {
      setIsEditProfileOpen(true);
  };

  const closeEditProfile = () => {
      setIsEditProfileOpen(false);
  };

  return (
    <main>
      {isEditProfileOpen && (
        <EditProfileCom close={closeEditProfile} />
      )}
    </main>
  );
};

export default PageTesting;
