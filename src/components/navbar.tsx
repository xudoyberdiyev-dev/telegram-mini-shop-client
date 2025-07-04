'use client';

import Link from 'next/link';


export default function Navbar() {


    return (
        <>
            <nav className="w-full backdrop-blur-md bg-white/70 border-b border-gray-200 px-5 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <Link href="/" className="text-[20px] font-extrabold tracking-wide text-yellow-500 drop-shadow-sm">
                    Hasan Husan optom
                </Link>
            </nav>

            {/* Bottom Navbar with 2 tabs */}
        </>
    );
}
