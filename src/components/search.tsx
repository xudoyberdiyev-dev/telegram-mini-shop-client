'use client';

import { FiSearch } from 'react-icons/fi';
import SkeletonWrapper from '@/components/SkeletonWrapper';

interface Props {
    onSearch: (value: string) => void;
}

export default function Search({ onSearch }: Props) {
    return (
        <SkeletonWrapper
            fallback={
                <div className="px-4 mt-4 animate-pulse">
                    <div className="h-12 rounded-xl bg-gray-200" />
                </div>
            }
        >
            <div className="px-4 mt-4">
                <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500 text-lg" />
                    <input
                        type="search"
                        placeholder="Mahsulot qidirish..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-sm text-[15px] placeholder-gray-400 transition duration-200"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </div>
        </SkeletonWrapper>
    );
}
