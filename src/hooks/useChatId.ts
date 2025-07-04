import {useEffect, useState} from "react";

export function useChatId() {
    const [chatId, setChatId] = useState<string | null>(null);

    useEffect(() => {
        const url = new URL(window.location.href);
        const idFromUrl = url.searchParams.get("chatId");

        if (idFromUrl) {
            localStorage.setItem("chatId", idFromUrl);
            setChatId(idFromUrl);
        } else {
            const idFromStorage = localStorage.getItem("chatId");
            if (idFromStorage) setChatId(idFromStorage);
        }
    }, []);

    return chatId;
}
