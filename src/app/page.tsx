'use client'

import Search from "@/components/search";
import Products from "@/components/products";
import Navbar from "@/components/navbar";
import {useEffect, useState} from "react";
import {Toaster} from "react-hot-toast";
import CategoryFilter from "@/components/category";
import Footer from "@/components/Footer";
import {useUserId} from "@/hooks/useUserId";

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    const userId = useUserId();

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!isClient || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5]">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAF5] min-h-screen">
            <Navbar/>
            <Toaster position="top-center" reverseOrder={false}/>
            <Search onSearch={setSearchQuery}/>
            <CategoryFilter onSelectCategory={(id) => {
                setCategoryId(id);
                setSearchQuery('');
            }}/>
            <Products query={searchQuery} categoryId={categoryId} userId={userId}/>
            <div className="mb-16 ">
                <Footer/>
            </div>
        </div>
    );
}
