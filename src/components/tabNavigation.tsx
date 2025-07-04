'use client';

import {JSX, useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaHome, FaShoppingBasket} from "react-icons/fa";
import {TbCategoryPlus} from "react-icons/tb";
import {MdProductionQuantityLimits} from "react-icons/md";
import {FaClipboardList} from "react-icons/fa";
import { FaUser } from 'react-icons/fa';

import axios from "axios";
import {BASE_URL} from "@/connection/BaseUrl";
import {APP_API} from "@/connection/AppApi";
import {useCartStore} from "@/utils/cartStore";
import {useUserId} from "@/hooks/useUserId";

export function TabNavigation() {
    const pathname = usePathname();
    const [chatId, setChatId] = useState("");
    const userId = useUserId()
    const {cartCount, setCartCount} = useCartStore();

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const res = await axios.get(`${BASE_URL}${APP_API.basket}/${userId}`);
                setCartCount(res.data.products.length);
            } catch {
                setCartCount(0);
            }
        };

        fetchCartCount();
    }, [userId, setCartCount]);

    useEffect(() => {
        const url = new URL(window.location.href);
        const idFromUrl = url.searchParams.get("userId");

        if (idFromUrl) {
            localStorage.setItem("chatId", idFromUrl);
            setChatId(idFromUrl);
        } else {
            const idFromStorage = localStorage.getItem("chatId");
            if (idFromStorage) setChatId(idFromStorage);
        }
    }, []);


    const isAdmin = chatId === "1085241246";

    const navLink = (href: string, icon: JSX.Element, label: string) => (
        <Link
            href={href}
            className={`flex-1 py-3 flex flex-col items-center justify-center ${
                pathname === href ? "text-yellow-500" : "text-gray-500"
            }`}
        >
            {icon}
            <span className="text-xs font-medium">{label}</span>
        </Link>
    );

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="flex w-full">
                {!isAdmin ? (
                    <>
                        {navLink("/", <FaHome className="text-xl mb-1"/>, "Mahsulotlar")}

                        <Link
                            href="/card"
                            className={`flex-1 py-3 flex flex-col items-center justify-center ${
                                pathname === "/card" ? "text-yellow-500" : "text-gray-500"
                            }`}
                        >
                            <div className="relative">
                                <FaShoppingBasket className="text-xl mb-1"/>
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-2 -right-4 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                                )}
                            </div>
                            <span className="text-xs font-medium">Savat</span>
                        </Link>
                        {navLink("/user", <FaUser className="text-xl mb-1"/>, "Kabinet")}
                    </>
                ) : (
                    <>
                        {navLink("/category", <TbCategoryPlus className="text-xl mb-1"/>, "Kategoriya")}
                        {navLink("/product", <MdProductionQuantityLimits className="text-xl mb-1"/>, "Mahsulotlar")}
                        {navLink("/orders", <FaClipboardList className="text-xl mb-1"/>, "Buyurtmalar")}
                    </>
                )}
            </div>
        </div>
    );
}
