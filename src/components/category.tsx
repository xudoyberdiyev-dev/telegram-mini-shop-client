'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';

type Category = {
    id: number;
    name: string;
    imageUrl: string;
};

const category: Category[] = [
    {
        id: 1,
        name: '',
        imageUrl: 'https://as2.ftcdn.net/jpg/00/41/23/51/1000_F_41235195_07oLBoDGjjIENt1R9ifNmtx0Be0k059r.jpg'
    },
    {
        id: 2,
        name: 'Nonlar',
        imageUrl: 'https://as2.ftcdn.net/jpg/00/41/23/51/1000_F_41235195_07oLBoDGjjIENt1R9ifNmtx0Be0k059r.jpg'
    },
    {
        id: 3,
        name: 'Sabzavot',
        imageUrl: 'https://as2.ftcdn.net/jpg/00/41/23/51/1000_F_41235195_07oLBoDGjjIENt1R9ifNmtx0Be0k059r.jpg'
    },
    {
        id: 4,
        name: 'Sut',
        imageUrl: 'https://as2.ftcdn.net/jpg/00/41/23/51/1000_F_41235195_07oLBoDGjjIENt1R9ifNmtx0Be0k059r.jpg'
    },
    {id: 5, name: 'Mevalar', imageUrl: ''},
];
export default function Category() {
    const [activeId, setActiveId] = useState(1);
    return (
        <div className="mt-1 px-4 pb-2 overflow-x-auto scrollbar-hide">
            <div className="flex mt-2  gap-4 w-max">
                {category.map((cat) => {
                    const isActive = activeId === cat.id;

                    return (
                        <div
                            key={cat.id}
                        >
                            <motion.div
                                onClick={() => setActiveId(cat.id)}
                                whileTap={{scale: 0.95}}
                                animate={{scale: isActive ? 1.05 : 1}}
                                transition={{duration: 0.3}}
                                className={`w-[90px] h-[90px]  flex flex-col items-center justify-center cursor-pointer px-1 py-1  rounded-xl transition-all duration-300 shadow-sm ${
                                    isActive
                                        ? 'bg-yellow-100 border border-yellow-400 shadow-md'
                                        : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <div  className="w-[85px] rounded-xl h-[85px] ">
                                    <Image src={cat.imageUrl} alt={cat.name} width={200} height={200} />
                                </div>


                            </motion.div>
                            <p
                                className={` p-1 text-[13px] font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-[90px] ${
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
    );
}
