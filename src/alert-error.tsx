"use client"
import React from 'react';

interface AlertProps {
    type: 'error'; // Jenis notifikasi
    message: string; // Pesan notifikasi
    onClose: () => void; // Fungsi untuk menutup notifikasi
}

const AlertError: React.FC<AlertProps> = ({ type, message, onClose }) => {
    const alertStyles = {
        error: "bg-white text-red-800",
    };

    return (
        // gagal
        <div className='absolute w-full items-end justify-center flex'>
            <div className="fixed top-0 bg-[#FF3B5C] text-white w-96  p-5 rounded-md text-lg  shadow-lg z-50 animate-popup">
                        <h2 className='text-white'>{message}</h2>
            </div>
        </div>

    );
};

export default AlertError;
