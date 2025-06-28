'use client';
import './globals.css';

import { useEffect, useState } from 'react';
import {TabNavigation} from "@/components/tabNavigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            // Ekran kengligi 768px dan kichik bo‘lsa — mobil deb hisoblaymiz
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // birinchi yuklanganda
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Admin sahifalarni aniqlash

    return (
        <html lang="uz">
        <body>
        {isMobile ? (
            <>
                {children}
                <TabNavigation />
            </>
        ) : (
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: '#f8f8f8',
                }}
            >
                <h2 style={{ color: '#333' }}>
                    Ushbu sayt faqat mobil qurilmalarda ishlaydi. Iltimos, telefon yoki planshetdan foydalaning 📱
                </h2>
            </div>
        )}
        </body>
        </html>
    );
}
