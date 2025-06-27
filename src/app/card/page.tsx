'use client';

import Link from 'next/link';
import Navbar from "@/components/navbar";
import {useState} from "react";
import Image from "next/image";
import {FiTrash2} from "react-icons/fi";

export default function Page() {
    const [count, setCount] = useState(1)

    const handleDecrease = () => {
        setCount(prev => Math.max(1, prev - 1))
    }

    const handleIncrease = () => {
        setCount(prev => prev + 1)
    }

    const handleDelete = () => {
        // Mahsulotni o‘chirish funksiyasi
        alert("O‘chirish bosildi!")
    }
    return (
        <>
            <Navbar/>
            <div className={'mx-2 mt-2'}>
                <div className="flex  w-full  items-start gap-3 px-4 py-3 bg-white shadow-md rounded-lg max-w-sm mx-auto">

                    {/* Checkbox va rasm */}
                    <div className="flex flex-col bg-red-100 items-center gap-1">
                        <Image
                            src="/images/example.jpg"
                            alt="Mahsulot"
                            width={90}
                            height={120}
                            className="rounded-md object-contain"
                        />
                    </div>

                    {/* O‘ng qismi */}
                    <div className="flex-1 flex flex-col justify-between gap-1 text-sm">
                        <p className="font-medium text-gray-800 mb-2 leading-tight">
                            NIVEA MEN erkaklar uchun dezodorant sprey...
                        </p>
                        <p className="text-base font-bold text-purple-700 mb-2">29 691 so‘m</p>


                        {/* + / – / trash */}
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <button
                                    onClick={handleDecrease}
                                    className="px-2 text-lg text-gray-700 hover:bg-gray-200">−</button>
                                <input
                                    type="number"
                                    value={count}
                                    onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-8 text-center text-sm outline-none border-x border-gray-200"
                                />
                                <button
                                    onClick={handleIncrease}
                                    className="px-2 text-lg text-gray-700 hover:bg-gray-200">+</button>
                            </div>

                            <button onClick={handleDelete} className="text-gray-400 hover:text-red-500">
                                <FiTrash2 className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex  w-full m-2 items-start gap-3 px-4 py-3 bg-white shadow-md rounded-lg max-w-sm mx-auto">

                    {/* Checkbox va rasm */}
                    <div className="flex flex-col bg-red-100 items-center gap-1">
                        <Image
                            src="/images/example.jpg"
                            alt="Mahsulot"
                            width={90}
                            height={120}
                            className="rounded-md object-contain"
                        />
                    </div>

                    {/* O‘ng qismi */}
                    <div className="flex-1 flex flex-col justify-between gap-1 text-sm">
                        <p className="font-medium text-gray-800 mb-2 leading-tight">
                            NIVEA MEN erkaklar uchun dezodorant sprey...
                        </p>
                        <p className="text-base font-bold text-purple-700 mb-2">29 691 so‘m</p>


                        {/* + / – / trash */}
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <button
                                    onClick={handleDecrease}
                                    className="px-2 text-lg text-gray-700 hover:bg-gray-200">−</button>
                                <input
                                    type="number"
                                    value={count}
                                    onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-8 text-center text-sm outline-none border-x border-gray-200"
                                />
                                <button
                                    onClick={handleIncrease}
                                    className="px-2 text-lg text-gray-700 hover:bg-gray-200">+</button>
                            </div>

                            <button onClick={handleDelete} className="text-gray-400 hover:text-red-500">
                                <FiTrash2 className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/*<div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">*/}
            {/*    <div className="bg-white rounded-xl shadow-md text-center p-6 max-w-md w-full">*/}
            {/*        /!* Title *!/*/}
            {/*        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">*/}
            {/*            Savatingiz hozircha bo‘sh*/}
            {/*        </h2>*/}

            {/*        /!* Sub text *!/*/}
            {/*        <p className="text-gray-600 text-sm sm:text-base mb-6">*/}
            {/*            Bosh sahifadan boshlang — kerakli maxshulotlarni qidiruv orqali topishingiz yoki to‘plamlarni ko‘rishingiz mumkin*/}
            {/*        </p>*/}

            {/*        /!* Button *!/*/}
            {/*        <Link href="/">*/}
            {/*            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded-lg transition-all duration-200">*/}
            {/*                Bosh sahifa*/}
            {/*            </button>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>

    );
}
