'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingBasket, FaHome } from 'react-icons/fa';

export default function Navbar() {
    const [activeTab, setActiveTab] = useState('home');
    const [cartItemsCount] = useState(3); // Normally you would fetch this from state/context

    return (
        <>
            {/* Top Navbar */}
            <nav className="w-full backdrop-blur-md bg-white/70 border-b border-gray-200 px-5 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                {/* Logo */}
                <Link href="/" className="text-[20px] font-extrabold tracking-wide text-yellow-500 drop-shadow-sm">
                    Mini Shop
                </Link>
            </nav>

            {/* Bottom Navbar with 2 tabs */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
                <div className="flex">
                    {/* Home/Mahsulotlar tab */}
                    <Link 
                        href="/"
                        onClick={() => setActiveTab('home')}
                        className={`flex-1 py-3 flex flex-col items-center justify-center ${activeTab === 'home' ? 'text-yellow-500' : 'text-gray-500'}`}
                    >
                        <FaHome className="text-xl mb-1" />
                        <span className="text-xs font-medium">Mahsulotlar</span>
                    </Link>

                    {/* Cart/Savat tab */}
                    <Link 
                        href="/cart"
                        onClick={() => setActiveTab('cart')}
                        className={`flex-1 py-3 flex flex-col items-center justify-center relative ${activeTab === 'cart' ? 'text-yellow-500' : 'text-gray-500'}`}
                    >
                        <div className="relative">
                            <FaShoppingBasket className="text-xl mb-1" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-4 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </div>
                        <span className="text-xs font-medium">Savat</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
