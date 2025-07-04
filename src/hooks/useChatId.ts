// hooks/useChatId.ts
import { useEffect, useState } from "react";

export function useChatId(): string | null {
    const [chatId, setChatId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            const fromUrl = url.searchParams.get("chatId");

            if (fromUrl) {
                localStorage.setItem("chatId", fromUrl);
                setChatId(fromUrl);
            } else {
                const fromStorage = localStorage.getItem("chatId");
                if (fromStorage) setChatId(fromStorage);
            }
        }
    }, []);

    return chatId;
}
