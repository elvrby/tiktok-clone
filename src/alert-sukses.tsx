"use client"
import React from 'react';

interface AlertProps {
    type: 'sukses'; // Jenis notifikasi
    message: string; // Pesan notifikasi
    onClose: () => void; // Fungsi untuk menutup notifikasi
}

const AlertSukses: React.FC<AlertProps> = ({ type, message, onClose }) => {
    const alertStyles = {
        error: "bg-white text-red-800",
    };

    return (
        // gagal
        <div className='absolute w-full z-999999999999999999999999999 items-end justify-center flex'>
            <div className="fixed top-0 hijau text-white w-96 flex p-5 rounded-md text-lg  shadow-lg z-50 animate-popup text-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-5 sm:h-5 mr-3 text-green-600">
                        <path
                            fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                        />
                    </svg>        
                <h2 className='text-white'>{message}</h2>
            </div>
        </div>

    );
};

export default AlertSukses;
