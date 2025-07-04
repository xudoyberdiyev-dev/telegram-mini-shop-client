'use client';

import {useState, ChangeEvent, useEffect} from 'react';
import Image from 'next/image';
import axios from "axios";
import {BASE_URL} from "@/connection/BaseUrl";
import {APP_API} from "@/connection/AppApi";
import Loading from "@/components/Loading";

interface Category {
    _id: string;
    name: string;
    image: string;
}

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

   const getCategory = async () => {
        try {
            const res = await axios.get(`${BASE_URL}${APP_API.category}`);
            setCategories(res.data);
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    };

    const saveCategory = async () => {
        if (!name || (!image && !editMode)) {
            alert("Barcha maydonlarni to‘ldiring!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("file", image);
        }

        try {
            if (editMode && editId) {
                await axios.put(`${BASE_URL}${APP_API.category}/${editId}`, formData);
            } else {
                await axios.post(`${BASE_URL}${APP_API.category}`, formData);
            }

            setName("");
            setImage(null);
            setEditMode(false);
            setEditId(null);
            setPreviewImage(null);
            setShowForm(false);
            getCategory();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.msg || "Xatolik yuz berdi";
                alert(msg);
            } else {
                alert("Noma’lum xatolik yuz berdi");
            }
        }
    }
    const deleteCategory = async (id: string) => {
        const confirmDelete = window.confirm("Rostdan ham o‘chirmoqchimisiz?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${BASE_URL}${APP_API.category}/${id}`);
            getCategory();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.msg || "Xatolik yuz berdi";
                alert(msg);
            } else {
                alert("Noma’lum xatolik yuz berdi");
            }
        }
    }

    const editeCategory = (category: Category) => {
        setEditMode(true);
        setEditId(category._id);
        setName(category.name);
        setPreviewImage(category.image);
        setShowForm(true);
    };

    const handleAddCategory = () => {
        setEditMode(false);
        setEditId(null);
        setName("");
        setImage(null);
        setPreviewImage(null);
        setShowForm(true);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setPreviewImage(url);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
       <div>
           {loading ? (
               <Loading/>
           ):
               <div className="relative w-full min-h-screen bg-gray-100 p-3">
                   <div className="w-full h-14 px-4 rounded-xl shadow-md flex items-center justify-between bg-white">
                       <h1 className="text-3xl font-semibold text-yellow-600 text-center">Bo‘limlar</h1>
                       <button
                           onClick={handleAddCategory}
                           className="bg-white border border-yellow-800 rounded px-3 py-2"
                       >
                           <p className="text-md text-yellow-700 font-semibold">Qo‘shish</p>
                       </button>
                   </div>

                   {showForm && (
                       <div className="fixed inset-0 p-3 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                           <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                               <h2 className="text-xl font-bold text-yellow-700 mb-4 text-center">
                                   {editMode ? "Kategoriyani tahrirlash" : "Yangi kategoriya qo‘shish"}
                               </h2>

                               {previewImage && editMode && (
                                   <div>
                                       <p className="text-sm text-gray-500 mb-1">Joriy rasm:</p>
                                       <Image
                                           src={previewImage}
                                           alt="Oldingi rasm"
                                           width={200}
                                           height={80}
                                           className="w-30 h-24 object-cover rounded border"
                                       />
                                   </div>
                               )}

                               <div className="mb-3">
                                   <label className="block mb-1 font-medium text-sm text-gray-700">Rasm yuklang</label>
                                   <input
                                       type="file"
                                       accept="image/*"
                                       onChange={handleFileChange}
                                       className="w-full border border-gray-300 rounded-lg p-2"
                                   />
                               </div>

                               <div className="mb-4">
                                   <label className="block mb-1 font-medium text-sm text-gray-700">Kategoriya nomi</label>
                                   <input
                                       type="text"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       placeholder="Masalan: Ichimliklar"
                                       className="w-full border border-gray-300 rounded-lg p-2"
                                   />
                               </div>

                               <div className="flex justify-end gap-3">
                                   <button
                                       onClick={() => {
                                           setShowForm(false);
                                           setEditMode(false);
                                           setEditId(null);
                                           setName("");
                                           setImage(null);
                                           setPreviewImage(null);
                                       }}
                                       className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                   >
                                       Bekor qilish
                                   </button>
                                   <button
                                       onClick={saveCategory}
                                       className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-600"
                                   >
                                       {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                   </button>
                               </div>
                           </div>
                       </div>
                   )}

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
                               <tr key={cat._id} className="hover:bg-yellow-50 transition">
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
                                           <button
                                               onClick={() => editeCategory(cat)}
                                               className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition"
                                           >
                                               Tahrirlash
                                           </button>
                                           <button
                                               onClick={() => deleteCategory(cat._id)}
                                               className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                                           >
                                               O‘chirish
                                           </button>
                                       </div>
                                   </td>
                               </tr>
                           ))}
                           </tbody>
                       </table>
                   </div>
               </div>}
       </div>
    );
}
