'use client';

import Link from 'next/link';

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
            <div className="bg-white rounded-xl shadow-md text-center p-6 max-w-md w-full">
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                    Savatingiz hozircha bo‘sh
                </h2>

                {/* Sub text */}
                <p className="text-gray-600 text-sm sm:text-base mb-6">
                    Bosh sahifadan boshlang — kerakli maxshulotlarni qidiruv orqali topishingiz yoki to‘plamlarni ko‘rishingiz mumkin
                </p>

                {/* Button */}
                <Link href="/">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded-lg transition-all duration-200">
                        Bosh sahifa
                    </button>
                </Link>
            </div>
        </div>
    );
}
