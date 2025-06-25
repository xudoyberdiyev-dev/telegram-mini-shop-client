'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import { FaShoppingBasket } from 'react-icons/fa';

type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
};

const allProducts: Product[] = [
    { id: 1, name: 'Mahsulot 1', price: '150,000 soʻm', image: 'data:image/jpeg;base64,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' },
    { id: 2, name: 'Mahsulot 2', price: '200,000 soʻm', image: '/product2.png' },
    { id: 3, name: 'Mahsulot 3', price: '180,000 soʻm', image: '/product3.png' },
    { id: 4, name: 'Mahsulot 4', price: '220,000 soʻm', image: '/product4.png' },
    { id: 5, name: 'Mahsulot 5', price: '190,000 soʻm', image: '/product5.png' },
    { id: 6, name: 'Mahsulot 6', price: '170,000 soʻm', image: '/product6.png' },
    { id: 7, name: 'Mahsulot 7', price: '210,000 soʻm', image: '/product7.png' },
    { id: 8, name: 'Mahsulot 8', price: '160,000 soʻm', image: '/product8.png' },
];

export default function Products() {
    const [count, setCount] = useState(1);
    const [visibleCount, setVisibleCount] = useState(4);
    const [cart, setCart] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleAddToCart = (product: Product) => {
        setCart([...cart, product]);
    };
    useEffect(() => {
        if (selectedProduct) setCount(1);
    }, [selectedProduct]);


    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-6">
                {allProducts.slice(0, visibleCount).map((product) => (
                    <div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="cursor-pointer bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4 flex flex-col items-center"
                    >
                        <div className="bg-gray-100 rounded-full w-[120px] h-[120px] flex items-center justify-center mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-base font-semibold text-gray-800 mb-2 text-center">
                            {product.name}
                        </h2>
                        <div className="flex justify-between items-center w-full px-2 mt-auto">
                            <span className="text-yellow-600 font-bold text-sm">{product.price}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Modal chiqmasligi uchun
                                    handleAddToCart(product);
                                }}
                                className="bg-yellow-600 hover:bg-green-700 text-white p-2 rounded-full transition"
                            >
                                <FaShoppingBasket />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < allProducts.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setVisibleCount(visibleCount + 4)}
                        className="bg-yellow-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-yellow-900 transition"
                    >
                        Yana ko‘rish
                    </button>
                </div>
            )}

            {/* Modal pastdan chiqadi */}
            {selectedProduct && (
                <div className="w-full h-[80%] fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl px-6 pt-4 pb-6 z-50 animate-slide-up">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-bold text-gray-800">{selectedProduct.name}</p>
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="text-gray-600 hover:text-red-600 text-3xl font-extrabold"
                            aria-label="Yopish"
                        >
                            ×
                        </button>
                    </div>

                    {/* Image */}
                    <div className="relative flex justify-center items-center mb-6">
                        <div className="absolute  w-48 h-48 bg-gradient-to-tr from-yellow-100 to-pink-100 rounded-full blur-2xl opacity-30 -z-10" />
                        <Image
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            width={180}
                            height={180}
                            className="rounded-xl object-contain"
                        />
                    </div>

                    {/* Product Name */}
                    <p className="text-center text-xl font-semibold text-gray-800 mb-6">{selectedProduct.name}</p>

                    {/* Quantity and Price */}
                    <div className="flex justify-between items-center mb-6 bg-gray-50 rounded-xl px-4 py-3 shadow-sm">
                        {/* Counter */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCount(Math.max(1, count - 1))}
                                className="bg-gray-200 w-9 h-9 rounded-full text-xl font-bold text-gray-800 hover:bg-gray-300"
                            >
                                −
                            </button>
                            <span className="text-lg font-medium w-6 text-center">{count}</span>
                            <button
                                onClick={() => setCount(count + 1)}
                                className="bg-gray-200 w-9 h-9 rounded-full text-xl font-bold text-gray-800 hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>

                        {/* Price */}
                        <span className="text-yellow-600 text-lg font-bold">{selectedProduct.price}</span>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <p className="text-md text-black font-semibold mb-1">Maxsulot haqida:</p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Bu maxsulot haqida qisqacha maʼlumot. Agar siz batafsil tavsif qo‘shmoqchi bo‘lsangiz, uni shu yerga yozing.
                        </p>
                    </div>

                    {/* Add to cart button */}
                    <button
                        onClick={() => {
                            handleAddToCart(selectedProduct);
                            setSelectedProduct(null);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white w-full py-3 rounded-full text-base font-semibold shadow-md transition"
                    >
                        Savatga qo‘shish
                    </button>
                </div>
            )}


        </div>
    );
}
