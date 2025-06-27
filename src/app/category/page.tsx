'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';

export default function Page() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSave = () => {
        if (!name || !image) {
            alert("Barcha maydonlarni to‘ldiring!");
            return;
        }

        // TODO: APIga yuborish joyi
        alert(`Kategoriya: ${name}, Rasm: ${image.name}`);
        setName('');
        setImage(null);
        setShowForm(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };
    const categories = [
        { id: 1, name: 'Ichimliklar', image: '/images/example.jpg' },
        { id: 2, name: 'Salqin ichimlik', image: '/images/example.jpg' },
        { id: 3, name: 'Fast Food', image: '/images/example.jpg' },
    ]

    return (
        <div className="relative w-full min-h-screen bg-gray-100 p-4">
            {/* Header */}
            <div className="w-full h-14 px-4 rounded-xl shadow-md flex items-center justify-between bg-white">
                <h1 className="text-3xl font-semibold text-yellow-600 text-center">
                    Bulimlar
                </h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-white border border-yellow-800 rounded px-3 py-2"
                >
                    <p className="text-md text-yellow-700 font-semibold">Qo‘shish</p>
                </button>
            </div>

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 p-3 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-bold text-yellow-700 mb-4 text-center">
                            Yangi kategoriya qo‘shish
                        </h2>

                        {/* Rasm input */}
                        <div className="mb-3">
                            <label className="block mb-1 font-medium text-sm text-gray-700">
                                Rasm yuklang
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        {/* Nomi input */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm text-gray-700">
                                Kategoriya nomi
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masalan: Ichimliklar"
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        {/* Tugmalar */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-600"
                            >
                                Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Kategoriya kartasi */}
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                    <tr className="bg-yellow-100 text-left text-gray-700 text-sm font-semibold">
                        <th className="p-3 border-b">#</th>
                        <th className="p-3 border-b">Rasm</th>
                        <th className="p-3 border-b">Kategoriya nomi</th>
                        <th className="p-3 border-b text-center">Amallar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((cat, index) => (
                        <tr key={cat.id} className="hover:bg-yellow-50 transition">
                            <td className="p-3 border-b text-sm text-gray-800">{index + 1}</td>
                            <td className="p-3 border-b">
                                <div className="w-16 h-12 rounded overflow-hidden border">
                                    <Image
                                        src={cat.image}
                                        alt="Kategoriya rasmi"
                                        width={64}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </td>
                            <td className="p-3 border-b text-sm text-gray-900">{cat.name}</td>
                            <td className="p-3 border-b">
                                <div className="flex gap-2 justify-center">
                                    <button className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition">
                                        Tahrirlash
                                    </button>
                                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition">
                                        O‘chirish
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
