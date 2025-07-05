'use client';

import {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '@/connection/BaseUrl';
import {APP_API} from '@/connection/AppApi';
import toast from 'react-hot-toast';
import {useUserId} from "@/hooks/useUserId";
import Loading from "@/components/Loading";

interface User {
    name: string;
    phone: string;
}

export default function UserPage() {
    const [user, setUser] = useState<User>({name: '', phone: ''});
    const [editableUser, setEditableUser] = useState<User>({name: '', phone: ''});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const userId = useUserId();

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    const fetchUser = async (id: string) => {
        try {
            const res = await axios.get(`${BASE_URL}${APP_API.user}/${id}`);
            setUser({name: res.data.name, phone: res.data.phone});
            setEditableUser({name: res.data.name, phone: res.data.phone});
        } catch (err) {
            console.error('Foydalanuvchini olishda xatolik:', err);
            toast.error("Ma'lumotlarni olib bo'lmadi");
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async () => {
        if (!userId) return;
        try {
            await axios.put(`${BASE_URL}${APP_API.user}/${userId}`, editableUser);
            toast.success("Ma'lumotlar yangilandi");
            setUser(editableUser); // backenddan qayta olish shart emas
            setEditing(false);
        } catch (err) {
            console.error('Yangilash xatoligi:', err);
            toast.error("Xatolik yuz berdi");
        }
    };

    const handleCancel = () => {
        setEditableUser(user); // avvalgi qiymatlarni tiklash
        setEditing(false);
    };

    if (loading) {
        return (
                <div className="flex  justify-center items-center h-screen">
                    <Loading/>
                </div>

        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4">
                <h2 className="text-2xl font-bold text-yellow-700 text-center">{'Sizning ma’lumotingiz'}</h2>

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
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={updateUser}
                                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                            >
                                Saqlash
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                        >
                            Yangilash
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
