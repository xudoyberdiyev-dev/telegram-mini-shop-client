'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
    FaHome,
    FaShoppingBasket,
    FaBox,
    FaList,
    FaClipboardList
} from 'react-icons/fa'

export default function TabNavigation() {
    const pathname = usePathname()
    const [activeTab, setActiveTab] = useState('home')
    const [cartItemsCount] = useState(3)

    const adminChatId = '123456789' // o‘zgaruvchi: haqiqiy admin ID
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        // localStorage dan chatId ni olish
        const chatId = localStorage.getItem('chatId')

        // Adminligini tekshirish
        if (chatId === adminChatId) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }

        // pathga qarab active tabni aniqlash
        if (pathname.includes('/card')) setActiveTab('cart')
        else if (pathname === '/') setActiveTab('home')
        else if (pathname.includes('/category')) setActiveTab('category')
        else if (pathname.includes('/product')) setActiveTab('product')
        else if (pathname.includes('/orders')) setActiveTab('orders')
    }, [pathname])

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="flex">
                {/* Mahsulotlar */}
                <Link
                    href="/"
                    onClick={() => setActiveTab('home')}
                    className={`flex-1 py-3 flex flex-col items-center justify-center ${activeTab === 'home' ? 'text-yellow-500' : 'text-gray-500'}`}
                >
                    <FaHome className="text-xl mb-1" />
                    <span className="text-xs font-medium">Mahsulotlar</span>
                </Link>

                {/* Oddiy user uchun savat */}
                {!isAdmin && (
                    <Link
                        href="/card"
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
                )}

                {/* Admin uchun 3 ta tab */}
                {isAdmin && (
                    <>
                        <Link
                            href="/category"
                            onClick={() => setActiveTab('category')}
                            className={`flex-1 py-3 flex flex-col items-center justify-center ${activeTab === 'category' ? 'text-yellow-500' : 'text-gray-500'}`}
                        >
                            <FaList className="text-xl mb-1" />
                            <span className="text-xs font-medium">Bo‘limlar</span>
                        </Link>

                        <Link
                            href="/product"
                            onClick={() => setActiveTab('product')}
                            className={`flex-1 py-3 flex flex-col items-center justify-center ${activeTab === 'product' ? 'text-yellow-500' : 'text-gray-500'}`}
                        >
                            <FaBox className="text-xl mb-1" />
                            <span className="text-xs font-medium">Mahsulotlar</span>
                        </Link>

                        <Link
                            href="/orders"
                            onClick={() => setActiveTab('orders')}
                            className={`flex-1 py-3 flex flex-col items-center justify-center ${activeTab === 'orders' ? 'text-yellow-500' : 'text-gray-500'}`}
                        >
                            <FaClipboardList className="text-xl mb-1" />
                            <span className="text-xs font-medium">Buyurtmalar</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
