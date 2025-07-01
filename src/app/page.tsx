'use client'
import Category from "@/components/category";
import Search from "@/components/search";
import Products from "@/components/products";
import Navbar from "@/components/navbar";
import {useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";

export default function Page() {
    const [userId, setUserId] = useState<string|null>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);

    useEffect(() => {
        // Bu kod faqat client (brauzerda) ishlaydi
        const storedId = localStorage.getItem('userId');
        if (storedId) {
            setUserId(storedId);
        }
    }, []);
    return (
        <div className={'bg-[#FAFAF5] h-[100vh]'}>
            <>
                <Navbar/>
                <Toaster position={'top-center'} reverseOrder={false}/>
                <Search onSearch={setSearchQuery}/>
                <Category onSelectCategory={(id) => {
                    setCategoryId(id);
                    setSearchQuery('');
                }}/>
                <Products query={searchQuery} categoryId={categoryId}  userId={userId} />
            </>
        </div>
    )
}