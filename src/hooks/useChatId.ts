import {useEffect, useState} from "react";

export function useChatId(): string | null {
    const [chatId, setChatId] = useState<string | null>(null);

    useEffect(() => {
        const url = new URL(window.location.href);
        const chatIdFromUrl = url.searchParams.get("chatId");
        const storedChatId = localStorage.getItem("chatId");

        if (chatIdFromUrl) {
            localStorage.setItem("chatId", chatIdFromUrl);
            setChatId(chatIdFromUrl);
        } else if (storedChatId) {
            setChatId(storedChatId);
        }
    }, []);
    return chatId;
}
