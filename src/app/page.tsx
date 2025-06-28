'use client'
import Category from "@/components/category";
import Search from "@/components/search";
import Products from "@/components/products";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const userId ='685ee0acf08ef18a957452b1'
    return (
        <div className={'bg-[#FAFAF5] h-[100vh]'}>
            <>
                <Navbar/>
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