'use client';

import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import Image from 'next/image';
import {FaShoppingBasket} from 'react-icons/fa';
import {BASE_URL} from '@/connection/BaseUrl';
import {APP_API} from '@/connection/AppApi';

type Product = {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity?: number;
    description?: string;
    category?: { name: string };
};

interface Props {
    query: string;
    categoryId?: string | null;
}

export default function Products({query, categoryId}: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [cart, setCart] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [count, setCount] = useState(1);

    const handleAddToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    const handleProductClick = async (id: string) => {
        try {
            const response = await axios.get(`${BASE_URL}${APP_API.product}/${id}`);
            setSelectedProduct(response.data);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { msg?: string } } };
            const msg = error.response?.data?.msg || 'Mahsulotni olishda xatolik yuz berdi';
            alert(msg);
        }

    };

    const fetchProducts =useCallback(async () => {
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
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                alert(err.response.data?.message || 'Xatolik yuz berdi');
            } else {
                alert('Nomaʼlum xatolik yuz berdi');
            }
        }
    },[])

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchProducts();
        }, 300);
        return () => clearTimeout(delay);
    }, [query, categoryId]);

    const displayProducts = products.slice(0, visibleCount);

    return (
        <div className="px-3">
            {/* Mahsulotlar */}
            <div className="grid grid-cols-2 gap-3 mt-6">
                {displayProducts.map((product) => (
                    <div
                        key={product._id}
                        onClick={() => handleProductClick(product._id)}
                        className="cursor-pointer bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4 flex flex-col items-center"
                    >
                        <div
                            className="bg-gray-100 rounded-full w-[120px] h-[120px] flex items-center justify-center mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-base font-semibold text-gray-800 mb-2 text-center">{product.name}</h2>
                        <div className="flex justify-between items-center w-full px-2 mt-auto">
                            <span className="text-yellow-600 font-bold text-sm">{product.price}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product);
                                }}
                                className="bg-yellow-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                            >
                                <FaShoppingBasket/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={'w-full h-[15vh] mt-6 mb-6 flex justify-center'}>
                {visibleCount < products.length && (
                    <div>
                        <button
                            onClick={() => setVisibleCount(visibleCount + 6)}
                            className="bg-yellow-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-yellow-900 transition"
                        >
                            Yana ko‘rish
                        </button>
                    </div>
                )}
            </div>

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

                    <div className="relative flex justify-center items-center mb-6">
                        <div
                            className="absolute w-48 h-48 bg-gradient-to-tr from-yellow-100 to-pink-100 rounded-full blur-2xl opacity-30 -z-10"/>
                        <Image
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            width={180}
                            height={180}
                            className="rounded-xl object-contain"
                        />
                    </div>

                    <p className="text-center text-xl font-semibold text-gray-800 mb-1">{selectedProduct.name}</p>

                    <div
                        className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-6 bg-gray-50 rounded-xl px-4 py-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCount(Math.max(1, count - 1))}
                                className="bg-gray-200 w-9 h-9 rounded-full text-xl font-bold text-gray-800 hover:bg-gray-300"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                min={1}
                                value={count}
                                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-14 text-center border border-gray-300 rounded px-1 py-1 text-md font-medium text-gray-800"
                            />
                            <button
                                onClick={() => setCount(count + 1)}
                                className="bg-gray-200 w-9 h-9 rounded-full text-xl font-bold text-gray-800 hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>
                        <span className="text-yellow-600 text-lg font-bold">
              {parseInt(String(selectedProduct.price).replace(/[^\d]/g, '')) * count} so‘m
            </span>
                    </div>

                    <div className="mb-6">
                        <p className="text-md text-black font-semibold mb-1">Maxsulot haqida:</p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {selectedProduct.description ||
                                'Bu maxsulot haqida qisqacha maʼlumot. Agar siz batafsil tavsif qo‘shmoqchi bo‘lsangiz, uni shu yerga yozing.'}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            handleAddToCart({...selectedProduct, quantity: count});
                            setSelectedProduct(null);
                            setCount(1);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white w-full py-3 rounded-xl text-base font-semibold shadow-md transition"
                    >
                        Savatga qo‘shish
                    </button>
                </div>
            )}
        </div>
    );
}
