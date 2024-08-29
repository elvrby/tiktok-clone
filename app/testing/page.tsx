"use client"
import React, { useState } from 'react';
import AlertSukses from '@/src/alert-sukses';

const Testing: React.FC = () => {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000); // Alert will disappear after 2 seconds
    };

    return (
        <div className=''>
            <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Show Success Alert
            </button>
            <div className='bg-green-500'>
            {showAlert && (
                <AlertSukses
                    type="sukses"
                    message="Berhasil"
                    onClose={() => setShowAlert(false)}
                />
            )}
            </div>
            
        </div>
    );
};

export default Testing;
