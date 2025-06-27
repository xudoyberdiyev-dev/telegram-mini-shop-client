'use client';

import React from 'react';

const Pagination = () => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                    <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </a>
                </li>
                {[1, 2, 3, 4, 5].map((page) => (
                    <li key={page}>
                        <a
                            href="#"
                            aria-current={page === 3 ? 'page' : undefined}
                            className={`flex items-center justify-center px-3 h-8 leading-tight border
                                ${
                                page === 3
                                    ? 'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                            {page}
                        </a>
                    </li>
                ))}
                <li>
                    <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
