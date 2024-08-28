import React from 'react';

interface AlertProps {
    type: 'success' | 'error'; // Jenis notifikasi
    message: string; // Pesan notifikasi
    onClose: () => void; // Fungsi untuk menutup notifikasi
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    const alertStyles = {
        success: "bg-green-200 text-green-800",
        error: "bg-red-200 text-red-800",
    };

    return (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-md text-lg flex items-center mx-auto max-w-lg z-50 ${alertStyles[type]}`}>
            <svg viewBox="0 0 24 24" className={`w-5 h-5 sm:w-5 sm:h-5 mr-3 ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {type === 'success' ? (
                    <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
                ) : (
                    <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.27,16.97a1,1,0,0,1-1.418.192L12,15.414l-4.851,3.747a1,1,0,0,1-1.418-.192l-2-2.5a1,1,0,0,1,.192-1.418L9.585,12,4.192,7.272a1,1,0,0,1,.192-1.418l2-2.5a1,1,0,0,1,1.418.192L12,8.586l4.851-3.747a1,1,0,0,1,1.418.192l2,2.5a1,1,0,0,1-.192,1.418L14.415,12l5.393,4.728a1,1,0,0,1-.192,1.418Z"></path>
                )}
            </svg>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-sm text-gray-600 hover:text-gray-800">Close</button>
        </div>
    );
};

export default Alert;
