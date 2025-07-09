"use client";

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';
import Navbar from '@/components/navbar';
import { BASE_URL } from '@/connection/BaseUrl';
import { APP_API } from '@/connection/AppApi';
import { useCartStore } from '@/utils/cartStore';
import Link from "next/link";
import { useUserId } from "@/hooks/useUserId";
import toast from "react-hot-toast";

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

interface OrderItem {
    _id: string;
    products: {
        product_id: {
            name: string;
            price: number;
        };
        count: number;
    }[];
    status: string;
    total_price: number;
    createdAt: string;
    cancel_reason?: string;
}

export default function BasketPage() {
    const userId = useUserId();
    const [items, setItems] = useState<BasketItem[]>([]);
    const [userOrders, setUserOrders] = useState<OrderItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const { setCartCount } = useCartStore();

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

    const fetchOrders = async (id: string) => {
        try {
            const res = await axios.get(`${BASE_URL}/order/user/${id}`);
            setUserOrders(res.data.orders);
        } catch {
            toast.error('Buyurtmalarni olishda xatolik');
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

    const makeOrder = async () => {
        try {
            if (!userId) return;
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/order/makeOrder`, {
                user_id: userId,
            });
            alert(res.data.msg || "Buyurtma qabul qilindi");
            await fetchBasket();
            await fetchOrders(userId);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.msg || 'Buyurtma berishda xatolik yuz berdi';
                alert(msg);
            } else {
                alert('Nomaʼlum xatolik yuz berdi');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchBasket();
    }, [userId, fetchBasket]);

    const hasActiveOrder = userOrders.some(
        order => order.status !== 'FOYDALANUVCHI QABUL QILDI' && order.status !== 'BEKOR QILINDI'
    );

    return (
        <div className={'bg-[#FAFAF5] min-h-screen'}>
            <Navbar />
            <div className="mt-4 pb-20 px-3">
                {items.length > 0 ? (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Sizning savatingiz</h2>
                        {items.map((item) => (
                            <div key={item._id} className="flex w-full items-start gap-3 px-4 py-3 bg-white shadow-xl rounded-xl max-w-md mx-auto mb-3">
                                <div className="w-[90px] h-[100px] flex items-center justify-center overflow-hidden">
                                    <Image src={item.product.image} alt={item.product.name} width={90} height={100} className="rounded-lg object-contain" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between text-sm">
                                    <p className="font-semibold text-gray-900 leading-tight mb-1">{item.product.name}</p>
                                    <p className="text-sm font-bold text-yellow-600">{item.total_price} so‘m</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                            <button onClick={() => handleCountChange(item._id, item.count - 1)} className="px-2 text-lg text-gray-700 hover:bg-gray-200">−</button>
                                            <input type="text" inputMode="numeric" pattern="[0-9]*" value={item.count} onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                const parsed = parseInt(value);
                                                if (!isNaN(parsed) && parsed >= 1) {
                                                    handleCountChange(item._id, parsed);
                                                }
                                            }} className="w-12 text-center text-sm border-x border-gray-200 outline-none" />
                                            <button onClick={() => handleCountChange(item._id, item.count + 1)} className="px-2 text-lg text-gray-700 hover:bg-gray-200">+</button>
                                        </div>
                                        <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-600">
                                            <FiTrash2 className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!hasActiveOrder && (
                            <div className="sticky bottom-0  rounded-xl bg-white border-t border-gray-200 shadow-md p-4">
                                {!showInput ? (
                                    <button onClick={() => setShowInput(true)} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg">
                                        Buyurtma qilish
                                    </button>
                                ) : (
                                    <>
                                        <p className="mb-3 text-gray-700 font-medium">Rostdan ham buyurtma bermoqchimisiz?</p>
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-gray-700 font-medium whitespace-nowrap">Umumiy narx: <span className="text-yellow-600 font-bold ml-1">{totalPrice} so‘m</span></span>
                                            <button onClick={makeOrder} disabled={loading} className={`flex-1 py-3 rounded-lg text-white font-semibold transition text-center ${loading ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-700'}`}>
                                                {loading ? 'Yuborilmoqda...' : 'Rasmiylashtirish'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {userOrders.length > 0 && (
                            <div className="w-full max-w-3xl bg-white shadow rounded-xl p-6 mb-8 overflow-y-auto max-h-[400px]">
                                <h3 className="text-xl font-bold text-yellow-600 mb-5">📋 Buyurtmalar</h3>
                                <div className="space-y-4">
                                    {userOrders.map((order) => (
                                        <div key={order._id} className="p-4 border border-gray-200 rounded-xl shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-md font-semibold text-gray-800">📦 {order.total_price} so‘m</p>
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                                    order.status === 'YUBORILDI' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'BEKOR QILINDI' ? 'bg-red-100 text-red-700' :
                                                            order.status === 'FOYDALANUVCHI QABUL QILDI' ? 'bg-green-100 text-green-700' :
                                                                'bg-gray-100 text-gray-700'}`}>{order.status}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 mb-2">
                                                {order.products.map((p, i) => (
                                                    <div key={i} className="flex justify-between">
                                                        <span>{p.product_id.name}</span>
                                                        <span>× {p.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-500">📅 {new Date(order.createdAt).toLocaleString('uz-UZ')}</p>
                                            {order.status === 'BEKOR QILINDI' && order.cancel_reason && (
                                                <p className="text-xs text-red-500 mt-1">📝 Sabab: {order.cancel_reason}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {userOrders.length > 0 && userOrders.every(order => order.status === 'FOYDALANUVCHI QABUL QILDI' || order.status === 'BEKOR QILINDI') && (
                            <div className="flex items-center justify-center">
                                <Link href="/" className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg">
                                    {"Xarid qilish"}
                                </Link>
                            </div>
                        )}
                        {userOrders.length === 0 && (
                            <div className="flex items-center justify-center min-h-[70vh]">
                                <div className="bg-white rounded-xl shadow-md text-center p-6 max-w-md w-full">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{"Sizning savatingiz bo'sh"}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{"Savatingizni mahsulotlar bilan to‘ldiring"}</p>
                                    <Link href="/" className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg">
                                        {"Xarid qilish"}
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
