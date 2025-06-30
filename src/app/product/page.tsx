'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/connection/BaseUrl";
import { APP_API } from "@/connection/AppApi";

interface Category {
    _id: string;
    name: string;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category?: Category;
    description?: string;
}

interface PaginatedResponse {
    products: Product[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export default function ProductPage() {
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null as File | null,
    });

    const getPaginatedProducts = async (page: number) => {
        try {
            const res = await axios.get<PaginatedResponse>(`${BASE_URL}${APP_API.product}/paginated?page=${page}&limit=8`);
            setProducts(res.data.products);
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        }
    };

    const getCategory = async () => {
        try {
            const res = await axios.get(`${BASE_URL}${APP_API.category}`);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const { name, value } = target;

        if (target instanceof HTMLInputElement && target.type === 'file' && target.files) {
            setFormData({
                ...formData,
                [name]: target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const saveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('price', formData.price);
            data.append('description', formData.description);
            data.append('category', formData.category);
            if (formData.image) {
                data.append('file', formData.image);
            }

            if (editingProductId) {
                await axios.put(`${BASE_URL}${APP_API.product}/${editingProductId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(`${BASE_URL}${APP_API.product}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            getPaginatedProducts(currentPage);
            setShowForm(false);
            setEditingProductId(null);
            setFormData({ name: '', price: '', description: '', category: '', image: null });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error("Xatolik:", err.response?.data || err.message);
            } else {
                console.error("Nomaʼlum xatolik:", err);
            }
        }
    };

    const handleEdit = (product: Product) => {
        setFormData({
            name: product.name,
            price: String(product.price),
            description: product.description || '',
            category: product.category?._id || '',
            image: null,
        });
        setEditingProductId(product._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Rostdan ham o‘chirmoqchimisiz?")) {
            try {
                await axios.delete(`${BASE_URL}${APP_API.product}/${id}`);
                getPaginatedProducts(currentPage);
            } catch (err) {
                console.error("O‘chirish xatoligi:", err);
            }
        }
    };

    useEffect(() => {
        getPaginatedProducts(currentPage);
        getCategory();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-gray-100 p-3">
            <div className="w-full h-14 px-4 rounded-xl shadow-md flex items-center justify-between bg-white">
                <h1 className="text-2xl font-semibold text-yellow-600">Mahsulotlar</h1>
                <button onClick={() => {
                    setShowForm(true);
                    setEditingProductId(null);
                    setFormData({ name: '', price: '', description: '', category: '', image: null });
                }} className="bg-white border border-yellow-800 rounded px-3 py-2">
                    <p className="text-md text-yellow-700 font-semibold">{"Qo‘shish"}</p>
                </button>
            </div>

            <div className="mt-6 mb-3 overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                    <tr className="bg-yellow-100 text-left text-gray-700 text-sm font-semibold">
                        <th className="p-3 border-b">#</th>
                        <th className="p-3 border-b">Rasm</th>
                        <th className="p-3 border-b">Nomi</th>
                        <th className="p-3 border-b">Kategoriya</th>
                        <th className="p-3 border-b text-center">Amallar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id} className="hover:bg-yellow-50 transition text-sm text-gray-800">
                            <td className="p-3 border-b">{(currentPage - 1) * 8 + index + 1}</td>
                            <td className="p-3 border-b">
                                <div className="w-16 h-12 rounded overflow-hidden border">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={64}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </td>
                            <td className="p-3 border-b">{product.name}</td>
                            <td className="p-3 border-b">{product.category?.name || "–"}</td>
                            <td className="p-3 border-b">
                                <div className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition">
                                        Tahrirlash
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition">
                                        {"O‘chirish"}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Oldingi
                </button>
                <span className="text-sm py-1 px-3">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Keyingi
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 p-2 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-bold text-yellow-700 mb-4 text-center">
                            {editingProductId ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo‘shish'}
                        </h2>
                        <form onSubmit={saveProduct}>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium text-sm text-gray-700">Rasm yuklang</label>
                                <input type="file" accept="image/*" name="image" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" />
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium text-sm text-gray-700">Kategoriya</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2">
                                    <option value="">Tanlang</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium text-sm text-gray-700">Mahsulot nomi</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" />
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium text-sm text-gray-700">Narxi</label>
                                <input type="number" name="price" value={formData.price} onChange={handleInputChange} inputMode="numeric" onKeyDown={(e) => {
                                    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                                }} className="w-full border border-gray-300 rounded-lg p-2" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium text-sm text-gray-700">Tavsifi</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => { setShowForm(false); setEditingProductId(null); }} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                                    Bekor qilish
                                </button>
                                <button type="submit" className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-600">
                                    Saqlash
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
