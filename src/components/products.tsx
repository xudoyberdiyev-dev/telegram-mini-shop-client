'use client';

import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import Image from 'next/image';
import {FaShoppingBasket} from 'react-icons/fa';
import {BASE_IMAGE_URL, BASE_URL} from '@/connection/BaseUrl';
import {APP_API} from '@/connection/AppApi';
import {useCartStore} from '@/utils/cartStore';
import toast from "react-hot-toast";
import SkeletonWrapper from '@/components/SkeletonWrapper';

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

interface Props {
    query: string;
    categoryId?: string | null;
    userId: string | null;
}

export default function Products({query, categoryId, userId}: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [count, setCount] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

    const {setCartCount} = useCartStore();

    const handleAddToBasket = async (product: Product) => {
        if (!userId) {
            alert('Foydalanuvchi ID mavjud emas');
            return;
        }
        setIsSaving(true);

        try {
            await axios.post(`${BASE_URL}${APP_API.basket}/add`, {
                user_id: userId,
                product_id: product._id,
                count,
            });

            const res = await axios.get(`${BASE_URL}${APP_API.basket}/${userId}`);
            setCartCount(res.data.products.length);

            toast.success('Mahsulot savatga qo‘shildi');
            setSelectedProduct(null);
            setCount(1);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleProductClick = async (id: string) => {
        try {
            const response = await axios.get(`${BASE_URL}${APP_API.product}/${id}`);
            setSelectedProduct(response.data);
        } catch {
            alert('Mahsulotni olishda xatolik yuz berdi');
        }
    };

    const fetchProducts = useCallback(async () => {
        try {
            let response;
            if (query) {
                response = await axios.get(`${BASE_URL}${APP_API.product}/search?query=${query}`);
            } else if (categoryId) {
                response = await axios.get(`${BASE_URL}${APP_API.product}/category/${categoryId}`);
            } else {
                response = await axios.get(`${BASE_URL}${APP_API.product}`);
            }
            setProducts(response.data);
        } catch {
            alert('Mahsulotlarni yuklashda xatolik yuz berdi');
        }
    }, [query, categoryId]);

    useEffect(() => {
        fetchProducts();
    }, [query, categoryId, fetchProducts]);

    const displayProducts = products.slice(0, visibleCount);

    const productSkeletons = Array(6).fill(null).map((_, index) => (
        <div
            key={index}
            className="bg-white rounded-3xl shadow-xl p-4 flex flex-col items-center animate-pulse"
        >
            <div className="bg-gray-200 rounded-full w-[120px] h-[120px] mb-4"/>
            <div className="h-4 bg-gray-200 w-3/4 rounded mb-2"/>
            <div className="h-4 bg-gray-200 w-1/2 rounded mb-2"/>
        </div>
    ));

    return (
        <div className="px-3">

            <SkeletonWrapper
                fallback={
                    <div className="text-center text-2xl font-bold p-1">
                        <div className="w-40 h-6 bg-gray-200 rounded mx-auto animate-pulse"/>
                    </div>
                }
            >
                <div>
                    <h1 className="text-center text-2xl font-bold p-1 text-yellow-500">Maxsulotlar</h1>
                </div>
            </SkeletonWrapper>

            <SkeletonWrapper fallback={
                <div className="grid grid-cols-2 gap-3 mt-6">{productSkeletons}</div>
            }>
                <div className="grid grid-cols-2 gap-3 mt-6">
                    {displayProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => handleProductClick(product._id)}
                            className="cursor-pointer bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4 flex flex-col items-center"
                        >
                            <div
                                className="bg-gray-100 rounded-full w-[120px] h-[120px] flex items-center justify-center overflow-hidden mb-4">
                                <Image
                                    src={`${BASE_IMAGE_URL}/${product.image}`}
                                    alt={product.name}
                                    width={120}
                                    height={120}
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </div>
                            <h2 className="text-base font-semibold text-gray-800 mb-2 text-center">{product.name}</h2>
                            <div className="flex justify-between items-center w-full px-2 mt-auto">
                                <span className="text-yellow-600 font-bold text-sm">{product.price} {"so'm"}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProduct(product);
                                    }}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-full transition"
                                >
                                    <FaShoppingBasket/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </SkeletonWrapper>

            {products.length === 0 && (
                <div>
                    {query && (
                        <p className="text-center text-xl text-red-500 font-semibold mt-6">
                            Qidiruv natijasida mahsulot topilmadi
                        </p>
                    )}
                    {!query && categoryId && (
                        <p className="text-center text-xl text-red-500 font-semibold mt-6">
                            Ushbu bo‘limga tegishli maxsulotlar hozirda mavjud emas
                        </p>
                    )}
                </div>
            )}

            <div className="w-full mt-6 h-[5vh] mb-6 flex justify-center">
                {visibleCount < products.length && (
                    <button
                        onClick={() => setVisibleCount(visibleCount + 6)}
                        className="bg-yellow-600 text-white px-6 py-1 font-semibold rounded-full text-sm font-medium hover:bg-yellow-900 transition"
                    >
                        Yana ko‘rish
                    </button>
                )}
            </div>

            {/* Modal: Savatga qo‘shish */}
            {selectedProduct && (
                <div
                    className="w-full h-[91%] fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl px-6 pt-4 pb-6 z-50 animate-slide-up overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-bold text-gray-800">{selectedProduct.name}</p>
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="text-gray-600 hover:text-red-600 text-3xl font-extrabold"
                        >
                            ×
                        </button>
                    </div>

                    <div className="flex justify-center w-full">
                        <div
                            className="w-[180px] h-[180px] rounded-full overflow-hidden flex justify-center items-center mb-6 bg-gray-100">
                            <Image
                                src={`${BASE_IMAGE_URL}/${selectedProduct.image}`}
                                alt={selectedProduct.name}
                                width={180}
                                height={180}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>

                    <p className="text-center text-xl font-semibold text-gray-800 mb-1">{selectedProduct.name}</p>

                    <div
                        className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-6 bg-gray-50 rounded-xl px-4 py-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setCount(Math.max(1, count - 1))}
                                    className="bg-gray-200 w-9 h-9 rounded-full text-xl font-bold text-gray-800 hover:bg-gray-300">−
                            </button>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={count === 0 ? '' : count}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    if (val === '') {
                                        setCount(0);
                                    } else {
                                        setCount(parseInt(val));
                                    }
                                }}
                                onBlur={() => {
                                    if (count < 1) setCount(1);
                                }}
                                className="w-14 text-center border border-gray-300 rounded px-1 py-1 text-md font-medium text-gray-800"
                            />
                            <button onClick={() => setCount(count + 1)}
                                    className="bg-gray-200 w-9 h-9 rounded-full text-xl font-bold text-gray-800 hover:bg-gray-300">+
                            </button>
                        </div>
                        <span className="text-yellow-600 text-lg font-bold">
                            {selectedProduct.price * count} so‘m
                        </span>
                    </div>

                    <div className="mb-6">
                        <p className="text-md text-black font-semibold mb-1">Maxsulot haqida:</p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {selectedProduct.description || 'Maxsulot tavsifi mavjud emas.'}
                        </p>
                    </div>

                    <button
                        onClick={() => handleAddToBasket(selectedProduct)}
                        disabled={isSaving}
                        className={`w-full py-3 rounded-xl text-base font-semibold shadow-md transition ${
                            isSaving
                                ? 'bg-yellow-800 cursor-not-allowed text-white'
                                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        }`}
                    >
                        {isSaving ? 'Savatga saqlanmoqda...' : 'Savatga qo‘shish'}
                    </button>
                </div>
            )}
        </div>
    );
}
