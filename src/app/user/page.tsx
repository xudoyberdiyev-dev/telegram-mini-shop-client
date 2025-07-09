'use client';

import {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '@/connection/BaseUrl';
import {APP_API} from '@/connection/AppApi';
import toast from 'react-hot-toast';
import {useUserId} from '@/hooks/useUserId';
import Loading from '@/components/Loading';

interface User {
    name: string;
    phone: string;
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

export default function UserPage() {
    const [user, setUser] = useState<User>({name: '', phone: ''});
    const [editableUser, setEditableUser] = useState<User>({name: '', phone: ''});
    const [orderHistory, setOrderHistory] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const userId = useUserId();

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
            fetchOrderHistory(userId); // <-- faqat tarix uchun
        }
    }, [userId]);


    const fetchUser = async (id: string) => {
        try {
            const res = await axios.get(`${BASE_URL}${APP_API.user}/${id}`);
            setUser({name: res.data.name, phone: res.data.phone});
            setEditableUser({name: res.data.name, phone: res.data.phone});
        } catch {
            toast.error("Ma'lumotlarni olib bo'lmadi");
        } finally {
            setLoading(false);
        }
    };


    const fetchOrderHistory = async (id: string) => {
        try {
            const res = await axios.get(`${BASE_URL}/order/history/${id}`);
            const rawHistory = res?.data?.history || [];

            const mapped = rawHistory.map((h: {
                order_id: OrderItem,
                status: string,
                cancel_reason?: string
            }) => {
                if (!h.order_id) return null; // agar order_id null bo‘lsa o‘tkazib yubor
                return {
                    ...h.order_id,
                    status: h.status,
                    cancel_reason: h.cancel_reason
                };
            }).filter(Boolean); // null bo‘lganlarni o‘chir

            setOrderHistory(mapped);
        } catch {
            toast.error('Tarixni olishda xatolik');
            setOrderHistory([]);
        }
    };


    const updateUser = async () => {
        if (!userId) return;
        try {
            await axios.put(`${BASE_URL}${APP_API.user}/${userId}`, editableUser);
            toast.success("Ma'lumotlar yangilandi");
            setUser(editableUser);
            setEditing(false);
        } catch {
            toast.error("Xatolik yuz berdi");
        }
    };

    const handleCancel = () => {
        setEditableUser(user);
        setEditing(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading/>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4 mb-8">
                <h2 className="text-2xl font-bold text-yellow-700 text-center">Sizning ma’lumotingiz</h2>
                <div className="space-y-3">
                    <div>
                        <label className="text-sm text-gray-700 block mb-1">Ismingiz</label>
                        <input
                            type="text"
                            value={editing ? editableUser.name : user.name}
                            onChange={(e) => setEditableUser({...editableUser, name: e.target.value})}
                            disabled={!editing}
                            placeholder="Ismingizni kiriting"
                            className={`w-full p-2 rounded border ${editing ? 'border-yellow-400' : 'border-gray-300 bg-gray-100'}`}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 block mb-1">Telefon raqamingiz</label>
                        <input
                            type="text"
                            value={editing ? editableUser.phone : user.phone}
                            onChange={(e) => setEditableUser({...editableUser, phone: e.target.value})}
                            disabled={!editing}
                            placeholder="Telefon raqam"
                            className={`w-full p-2 rounded border ${editing ? 'border-yellow-400' : 'border-gray-300 bg-gray-100'}`}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    {editing ? (
                        <>
                            <button onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm">
                                Bekor qilish
                            </button>
                            <button onClick={updateUser}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
                                Saqlash
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
                            Yangilash
                        </button>
                    )}
                </div>
            </div>


            <div className="w-full max-w-3xl bg-white shadow rounded-xl p-6 mb-8 max-h-[500px] overflow-y-auto">
                <h3 className="text-xl font-bold text-yellow-600 mb-5">📜 Buyurtma Tarixi</h3>
                {orderHistory.length === 0 ? (
                    <p className="text-gray-600 text-sm">Hali hech qanday tarix mavjud emas.</p>
                ) : (
                    <div className="space-y-4">
                        {orderHistory.map((order) => (
                            <div key={order._id} className="p-4 border border-gray-200 rounded-xl shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-md font-semibold text-gray-800">📦 {order.total_price} so‘m</p>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                        order.status === 'YUBORILDI' ? 'bg-blue-100 text-blue-700' :
                                            order.status === 'BEKOR QILINDI' ? 'bg-red-100 text-red-700' :
                                                order.status === 'FOYDALANUVCHI QABUL QILDI' ? 'bg-green-100 text-green-700' :
                                                    'bg-gray-100 text-gray-700'
                                    }`}>
                            {order.status}
                        </span>
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
                )}
            </div>


        </div>
    );
}
