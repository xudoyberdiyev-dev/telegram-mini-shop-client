'use client';

import { useState } from 'react';
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
    const [visibleCount, setVisibleCount] = useState(4);
    const [cart, setCart] = useState<Product[]>([]);

    const handleAddToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-6">
                {allProducts.slice(0, visibleCount).map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4 flex flex-col items-center"
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
                                onClick={() => handleAddToCart(product)}
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
        </div>
    );
}
