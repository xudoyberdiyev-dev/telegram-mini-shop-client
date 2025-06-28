'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';
import Navbar from '@/components/navbar';
import { BASE_URL } from '@/connection/BaseUrl';
import { APP_API } from '@/connection/AppApi';
import { useCartStore } from '@/utils/cartStore';
import Link from "next/link";

interface BasketItem {
    _id: string;
    product: {
        _id: string;
        name: string;
        image: string;
        price: number;
    };
    count: number;
    total_price: number;
}

interface BasketResponse {
    products: BasketItem[];
    totalPrice: number;
}

export default function BasketPage() {
    const userId = '685ee0acf08ef18a957452b1';
    const [items, setItems] = useState<BasketItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { setCartCount } = useCartStore();

    const fetchBasket = async () => {
        try {
            const response = await axios.get<BasketResponse>(`${BASE_URL}${APP_API.basket}/${userId}`);
            setItems(response.data.products);
            setTotalPrice(response.data.totalPrice);
            setCartCount(response.data.products.length);
        } catch {
            alert('Savatni olishda xatolik yuz berdi');
        }
    };

    const changeCount = async (productId: string, amount: number) => {
        try {
            await axios.post(`${BASE_URL}${APP_API.basket}/add`, {
                user_id: userId,
                product_id: productId,
                count: amount,
            });
            fetchBasket();
        } catch {
            alert('Mahsulot sonini yangilashda xatolik');
        }
    };

    const handleCountChange = async (basketId: string, newCount: number) => {
        try {
            await axios.post(`${BASE_URL}${APP_API.basket}/update-count`, {
                basketId,
                newCount,
            });
            fetchBasket();
        } catch {
            alert('Sonni o‘zgartirishda xatolik');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.post(`${BASE_URL}${APP_API.basket}/remove-multiple`, { basketIds: [id] });
            fetchBasket();
        } catch {
            alert('O‘chirishda xatolik');
        }
    };

    useEffect(() => {
        if (userId) fetchBasket();
    }, [userId]);

    return (
        <>
            <Navbar />
            <div className="mx-3 mt-4 mb-28">
                {items.length > 0 ? (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Sizning savatingiz</h2>

                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="flex w-full items-start gap-3 px-4 py-3 bg-white shadow-md shadow-slate-300 rounded-xl max-w-md mx-auto mb-3"
                            >
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={90}
                                    height={100}
                                    className="rounded-lg object-contain"
                                />
                                <div className="flex-1 flex flex-col justify-between text-sm">
                                    <p className="font-semibold text-gray-900 leading-tight mb-1">
                                        {item.product.name}
                                    </p>
                                    <p className="text-sm font-bold text-yellow-600">{item.total_price} so‘m</p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                            <button
                                                onClick={() => handleCountChange(item._id, item.count - 1)}
                                                className="px-2 text-lg text-gray-700 hover:bg-gray-200"
                                            >
                                                −
                                            </button>

                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={item.count}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, ''); // faqat raqam
                                                    const parsed = parseInt(value);
                                                    if (!isNaN(parsed) && parsed >= 1) {
                                                        handleCountChange(item._id, parsed);
                                                    }
                                                }}
                                                className="w-12 text-center text-sm border-x border-gray-200 outline-none"
                                            />


                                            <button
                                                onClick={() => handleCountChange(item._id, item.count + 1)}
                                                className="px-2 text-lg text-gray-700 hover:bg-gray-200"
                                            >
                                                +
                                            </button>
                                        </div>



                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-gray-400 hover:text-red-600"
                                        >
                                            <FiTrash2 className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md p-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-700 font-medium">Umumiy narx:</span>
                                <span className="text-yellow-600 font-bold">{totalPrice} so‘m</span>
                            </div>
                           <div className={'h-[13vh]'}>
                               <button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full py-3 rounded-lg font-semibold transition">
                                   Buyurtma berish
                               </button>
                           </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center min-h-[70vh]">
                        <div className="bg-white rounded-xl shadow-md text-center p-6 max-w-md w-full">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Savatingiz bo‘sh</h2>
                            <p className="text-gray-600 text-sm mb-4">Savatingizni maxsulotlar bilan to'ldiring</p>
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg">
                               < Link href={'/'}>
                                   Xarid qilish
                               </Link>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
