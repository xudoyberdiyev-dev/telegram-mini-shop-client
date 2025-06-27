'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { FaHome, FaShoppingBasket } from "react-icons/fa"

export default function TabNavigation() {
    const [activeTab, setActiveTab] = useState("home")
    const [chatId, setChatId] = useState("")
    const [cartItemsCount] = useState(3)

    // 👉 chatId ni localStorage ga yozish
    useEffect(() => {
        const url = new URL(window.location.href)
        const idFromUrl = url.searchParams.get("chatId")
        if (idFromUrl) {
            localStorage.setItem("chatId", idFromUrl)
            setChatId(idFromUrl)
        } else {
            const idFromStorage = localStorage.getItem("chatId")
            if (idFromStorage) setChatId(idFromStorage)
        }
    }, [])

    const isAdmin = chatId === "1364069488" // bu yerga admin chat ID yozing

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="flex">
                {/* Mahsulotlar */}
                <Link
                    href="/"
                    onClick={() => setActiveTab("home")}
                    className={`flex-1 py-3 flex flex-col items-center justify-center ${activeTab === "home" ? "text-yellow-500" : "text-gray-500"}`}
                >
                    <FaHome className="text-xl mb-1" />
                    <span className="text-xs font-medium">Mahsulotlar</span>
                </Link>

                {/* Savat */}
                <Link
                    href="/card"
                    onClick={() => setActiveTab("cart")}
                    className={`flex-1 py-3 flex flex-col items-center justify-center ${activeTab === "cart" ? "text-yellow-500" : "text-gray-500"}`}
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

                {/* Admin panel uchun */}
                {isAdmin && (
                    <>
                        <Link
                            href="/category"
                            className="flex-1 py-3 flex flex-col items-center justify-center text-yellow-500"
                        >
                            📁
                            <span className="text-xs font-medium">Kategoriya</span>
                        </Link>
                        <Link
                            href="/product"
                            className="flex-1 py-3 flex flex-col items-center justify-center text-yellow-500"
                        >
                            📦
                            <span className="text-xs font-medium">Mahsulotlar</span>
                        </Link>
                        <Link
                            href="/orders"
                            className="flex-1 py-3 flex flex-col items-center justify-center text-yellow-500"
                        >
                            📋
                            <span className="text-xs font-medium">Buyurtmalar</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
