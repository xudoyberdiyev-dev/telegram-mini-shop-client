'use client';

import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import Image from 'next/image';
import {FiTrash2} from 'react-icons/fi';
import Navbar from '@/components/navbar';
import {BASE_URL} from '@/connection/BaseUrl';
import {APP_API} from '@/connection/AppApi';
import {useCartStore} from '@/utils/cartStore';
import Link from "next/link";
import toast from "react-hot-toast";
import {useUserId} from "@/hooks/useUserId";

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
    const userId =useUserId()
    const [items, setItems] = useState<BasketItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const {setCartCount} = useCartStore();

    const fetchBasket = useCallback(async () => {
        try {
            const response = await axios.get<BasketResponse>(`${BASE_URL}${APP_API.basket}/${userId}`);
            setItems(response.data.products);
            setTotalPrice(response.data.totalPrice);
            setCartCount(response.data.products.length);
        } catch {
            alert('Savatni olishda xatolik yuz berdi');
        }
    }, [userId, setCartCount]);

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
            await axios.post(`${BASE_URL}${APP_API.basket}/remove-multiple`, {basketIds: [id]});
            fetchBasket();
        } catch {
            alert('O‘chirishda xatolik');
        }
    };

    const makeOrder = async () => {
        if (!phone.trim()) {
            toast.error('Telefon raqamni kiriting');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/order/makeOrder`, {
                user_id: userId,
                phone: phone,
            });
            alert(res.data.msg || "Buyurtma qabul qilindi");
            setPhone('');
            fetchBasket(); // savatni yangilash (bo‘shatish)
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.msg || 'Buyurtma berishda xatolik yuz berdi';
                alert(msg);
            } else {
                alert('Nomaʼlum xatolik yuz berdi');
            }
        }

    };

    useEffect(() => {
        if (userId) fetchBasket();
    }, [userId, fetchBasket]);



    return (
        <div className={'bg-[#FAFAF5] h-[100vh] '}>
            <Navbar/>
            <div className="mt-4 mb-28 px-3">
                {items.length > 0 ? (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Sizning savatingiz</h2>

                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="flex w-full items-start gap-3 px-4 py-3 bg-white shadow-xl rounded-xl max-w-md mx-auto mb-3"
                            >
                                <div className="w-[90px] h-[100px] flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        width={90}
                                        height={100}
                                        className="rounded-lg object-contain"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between text-sm">
                                    <p className="font-semibold text-gray-900 leading-tight mb-1">
                                        {item.product.name}
                                    </p>
                                    <p className="text-sm font-bold text-yellow-600">{item.total_price} so‘m</p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div
                                            className="flex items-center border border-gray-300 rounded-md overflow-hidden">
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
                                                    const value = e.target.value.replace(/\D/g, '');
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
                                            <FiTrash2 className="text-lg"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div
                            className="fixed m-3 rounded-xl left-0 right-0 bg-white border-t border-gray-200 shadow-md p-4">
                            {!showInput ? (
                                <div className={''}>
                                    <button
                                        onClick={() => setShowInput(true)}
                                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg"
                                    >
                                        Buyurtma qilish
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <label>Telifon raqam</label>
                                    <input
                                        type="tel"
                                        placeholder="Masalan: 998872212 "
                                        value={phone}
                                        onChange={(e) => {
                                            const onlyNums = e.target.value.replace(/\D/g, ''); // Faqat raqamlar
                                            if (onlyNums.length <= 9) {
                                                setPhone(onlyNums);
                                            }
                                        }}
                                        maxLength={9}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="w-full border border-yellow-500 px-4 py-2 rounded-lg mb-3"
                                    />


                                    <div className="flex justify-between items-center gap-2">
        <span className="text-gray-700 font-medium whitespace-nowrap">
          Umumiy narx:
          <span className="text-yellow-600 font-bold ml-1">{totalPrice} so‘m</span>
        </span>

                                        <button
                                            onClick={makeOrder}
                                            disabled={loading}
                                            className={`flex-1 py-3 rounded-lg text-white font-semibold transition text-center ${
                                                loading ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-700'
                                            }`}
                                        >
                                            {loading ? 'Yuborilmoqda...' : 'Rasmiylashtirish'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                    </>
                ) : (
                    <div className="flex items-center justify-center min-h-[70vh]">
                        <div className="bg-white rounded-xl shadow-md text-center p-6 max-w-md w-full">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{"Sizning savatingiz bo'sh"}</h2>
                            <p className="text-gray-600 text-sm mb-4">{"Savatingizni mahsulotlar bilan to‘ldiring"}</p>
                            <button
                                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg">
                                <Link href="/">Xarid qilish</Link>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
