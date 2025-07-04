'use client'
import Search from "@/components/search";
import Products from "@/components/products";
import Navbar from "@/components/navbar";
import {useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";
import CategoryFilter from "@/components/category";

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null); // 👈

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userIdFromUrl = urlParams.get("userId");

        if (userIdFromUrl) {
            localStorage.setItem("userId", userIdFromUrl);
            setUserId(userIdFromUrl);
            console.log("userId URL dan saqlandi:", userIdFromUrl);
        } else {
            const storedUserId = localStorage.getItem("userId");
            if (storedUserId) {
                setUserId(storedUserId);
                console.log("userId localStorage dan olindi:", storedUserId);
            }
        }
    }, []);

    return (
        <div className={'bg-[#FAFAF5] h-[100%]'}>
            <>
                <Navbar/>
                <Toaster position={'top-center'} reverseOrder={false}/>
                <Search onSearch={setSearchQuery}/>
                <CategoryFilter onSelectCategory={(id) => {
                    setCategoryId(id);
                    setSearchQuery('');
                }}/>
                {userId && (
                    <Products query={searchQuery} categoryId={categoryId} userId={userId} />
                )}

            </>
        </div>
    )
}