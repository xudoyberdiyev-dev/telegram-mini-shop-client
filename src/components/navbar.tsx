'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaRegUser, FaShoppingBasket } from 'react-icons/fa';

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // ✅ typeni to‘g‘riladik

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) // ✅ typeni to‘g‘riladik
            ) {
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="w-full backdrop-blur-md bg-white/70 border-b border-gray-200 px-5 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
            <Link href="/" className="text-[20px] font-extrabold tracking-wide text-yellow-500 drop-shadow-sm">
                Mini Shop
            </Link>

            <div className="flex items-center gap-4 text-gray-700 text-[22px] relative">
                <Link href="/card" className="relative group">
                    <FaShoppingBasket className="hover:text-yellow-600 transition-all duration-200" />
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-md group-hover:scale-110 transition">
                        3
                    </span>
                </Link>

                <div className="relative" ref={dropdownRef}>
                    <FaRegUser
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="hover:text-yellow-600 transition cursor-pointer"
                    />
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl p-3 text-sm z-50 animate-fadeIn">
                            <p className="text-gray-700 font-semibold">Salom, foydalanuvchi</p>
                            <p className="text-gray-500 text-xs mb-2">+998 90 123 45 67</p>
                            <hr className="my-1" />
                            <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-gray-700 transition">
                                Chiqish
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
