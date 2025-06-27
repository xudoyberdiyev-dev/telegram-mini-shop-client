'use client'

import { useState } from 'react'

export default function Page() {
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)

    const handleSave = () => {
        if (!name || !image) {
            alert("Barcha maydonlarni to‘ldiring!")
            return
        }

        // TODO: APIga yuborish joyi
        alert(`Kategoriya: ${name}, Rasm: ${image.name}`)
        setName('')
        setImage(null)
        setShowForm(false)
    }

    return (
        <div className="relative w-full min-h-screen bg-gray-100 p-4">
            {/* Header */}
            <div className="w-full h-14 px-4 rounded-xl shadow-md flex items-center justify-between bg-white">
                <h1 className="text-3xl font-semibold text-yellow-600 text-center">
                    Bo'limlar
                </h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-white border border-yellow-800 rounded px-3 py-2"
                >
                    <p className="text-md text-yellow-700 font-semibold">Qo‘shish</p>
                </button>
            </div>

            {/* MODAL */}
            {showForm && (
                <div className="fixed inset-0 p-3 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-bold text-yellow-700 mb-4 text-center">
                            Yangi kategoriya qo‘shish
                        </h2>

                        {/* Rasm */}
                        <div className="mb-3">
                            <label className="block mb-1 font-medium text-sm text-gray-700">
                                Rasm yuklang
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />
                        </div>

                        {/* Nomi */}
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

            {/* Kategoriya kartalari joylashadigan joy */}
            <div className="grid mt-5 grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-1 pb-1 flex flex-col items-center">
                    {/* Rasm */}
                    <img
                        className="w-full bg-red-300 h-32 object-cover rounded-lg"
                    />

                    {/* Nomi */}
                    <h2 className="text-lg font-semibold text-yellow-900 mt-1 text-center">
                        salom
                    </h2>

                    {/* Tugmalar */}
                    <div className="flex gap-2 mt-2">
                        <button
                            className="px-3 py-1.5 text-sm font-semibold  shadow-md shadow-black-200 text-yellow-900 rounded hover:bg-yellow-500-600"
                        >
                            Tahrirlash
                        </button>
                        <button
                            className="px-3 py-1.5 text-sm font-semibold  shadow-md shadow-black-200 text-yellow-900 rounded hover:bg-yellow-500-600"
                        >
                            O‘chirish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
