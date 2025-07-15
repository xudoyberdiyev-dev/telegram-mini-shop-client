'use client';

import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';
import axios from 'axios';
import {BASE_IMAGE_URL, BASE_URL} from '@/connection/BaseUrl';
import {APP_API} from '@/connection/AppApi';
import SkeletonWrapper from '@/components/SkeletonWrapper';

interface Category {
    _id: string;
    name: string;
    image: string;
}

interface Props {
    onSelectCategory: (id: string | null) => void;
}

export default function CategoryFilter({onSelectCategory}: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get(`${BASE_URL}${APP_API.category}`)
            .then((res) => {
                const allCategory: Category = {
                    _id: 'all',
                    name: 'Hammasi',
                    image: 'https://andstat.uz/images/000000000000000000fdgdfg.jpg',
                };
                setCategories([allCategory, ...res.data]);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleSelect = (id: string) => {
        setActiveId(id);
        onSelectCategory(id === 'all' ? null : id);
    };

    const categorySkeletons = Array(6).fill(null).map((_, i) => (
        <div key={i} className="w-[90px] h-[110px] flex flex-col items-center animate-pulse">
            <div className="w-[85px] h-[85px] bg-gray-200 rounded-xl mb-2"/>
            <div className="w-[70%] h-3 bg-gray-200 rounded"/>
        </div>
    ));

    return (
        <SkeletonWrapper
            fallback={
                <div className="mt-1 px-4 pb-2 overflow-x-auto scrollbar-hide">
                    <div className="flex mt-2 gap-4 w-max">
                        {categorySkeletons}
                    </div>
                </div>
            }
        >
            <div className="mt-1 px-4 pb-2 overflow-x-auto scrollbar-hide">
                <div className="flex mt-2 gap-4 w-max">
                    {categories.map((cat) => {
                        const isActive = activeId === cat._id;

                        return (
                            <div key={cat._id}>
                                <motion.div
                                    onClick={() => handleSelect(cat._id)}
                                    whileTap={{scale: 0.95}}
                                    animate={{scale: isActive ? 1.05 : 1}}
                                    transition={{duration: 0.3}}
                                    className={`w-[90px] h-[90px] flex flex-col items-center justify-center cursor-pointer px-1 py-1 rounded-xl transition-all duration-300 shadow-sm ${
                                        isActive
                                            ? 'bg-yellow-100 border border-yellow-400 shadow-md'
                                            : 'bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="w-[85px] h-[85px] relative rounded-xl overflow-hidden">
                                        <Image
                                            src={
                                                cat.image?.startsWith('http') // <-- bu qism muhim
                                                    ? cat.image
                                                    : `${BASE_IMAGE_URL}/${cat.image}` // BASE_IMAGE_URL = https://shop-bot.javohir-dev.uz/uploads
                                            }
                                            alt={cat.name}
                                            fill
                                            className="object-cover"
                                        />

                                    </div>

                                </motion.div>
                                <p
                                    className={`p-1 text-[13px] font-semibold text-center w-[90px] truncate ${
                                        isActive ? 'text-yellow-600' : 'text-gray-700'
                                    }`}
                                >
                                    {cat.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SkeletonWrapper>
    );
}
