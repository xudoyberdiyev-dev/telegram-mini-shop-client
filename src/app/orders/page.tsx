'use client';

import {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from "@/connection/BaseUrl";
import Loading from "@/components/Loading";

interface Product {
    _id: string;
    name: string;
    price: number;
}

interface User {
    _id: string;
    name: string;
    phone: string;
}

interface Order {
    _id: string;
    user_id: User;
    products: {
        product_id: Product;
        count: number;
    }[];
    total_price: number;
    phone: string;
    createdAt: string;
}

interface ResponseType {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
    orders: Order[];
}

export default function Page() {
    const [chatId, setChatId] = useState<string | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = new URL(window.location.href);
        const chatIdFromUrl = url.searchParams.get("chatId");
        const storedChatId = localStorage.getItem("chatId");

        if (chatIdFromUrl) {
            localStorage.setItem("chatId", chatIdFromUrl);
            setChatId(chatIdFromUrl);
        } else if (storedChatId) {
            setChatId(storedChatId);
        }
    }, []);

    useEffect(() => {
        if (!chatId) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.get<ResponseType>(`${BASE_URL}/order/getAllOrders?page=${currentPage}&limit=5&chatId=${chatId}`);
                setOrders(res.data.orders);
                setCurrentPage(res.data.currentPage);
                setTotalPages(res.data.totalPages);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    const msg = err.response?.data?.msg || 'Buyurtma olishda xatolik';
                    alert(msg);
                } else {
                    alert('Nomaʼlum xatolik yuz berdi');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [chatId, currentPage]);

    if (!chatId) return <div className="text-center mt-10"><Loading/></div>;

    if (chatId !== '1085241246') {
        return <div className="text-center text-red-600 mt-10 text-lg">⛔ Sizda ruxsat yo‘q</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 bg-[#FAFAF5]">
            <div className="w-full h-11 mb-3 px-4 rounded-xl shadow-md bg-white">
                <h1 className="text-3xl font-semibold text-yellow-600 text-center">Buyurtmalar</h1>
            </div>

            {loading ? (
                <Loading/>
            ) : (
                <>
                    {orders.map((order) => (
                        <div key={order._id} className="border p-4 rounded-lg mb-4 shadow-sm bg-white">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <p className="text-gray-700">
                                        <strong>Foydalanuvchi:</strong> {order.user_id?.name || 'Nomaʼlum'}</p>
                                    <p className="text-gray-700"><strong>Telefon:</strong> {order.phone}</p>
                                </div>
                                <span className="text-yellow-600 font-semibold">{order.total_price} so‘m</span>
                            </div>
                            <div>
                                {order.products.map((item, i) => (
                                    <div key={i} className="text-sm text-gray-600">
                                        {item.product_id.name} × {item.count} = {item.product_id.price * item.count} so‘m
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">📅 {new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                    ))}

                    <div className="flex justify-center gap-2 mt-6">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                        >
                            ⬅️ Oldingi
                        </button>
                        <span className="px-4 py-2 border rounded">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                        >
                            Keyingi ➡️
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
