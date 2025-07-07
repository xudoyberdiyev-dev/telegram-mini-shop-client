'use client';

import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full  text-center py-2 bg-white border-t border-gray-200 text-sm text-gray-600">
            Bot yaratuvchisi:{" "}
            <Link
                href="https://t.me/@M_Javoxir_1"
                target="_blank"
                className="text-yellow-600 hover:underline font-semibold"
            >
                Javohir
            </Link>
        </div>
    );
}
