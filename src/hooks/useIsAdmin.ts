import {useChatId} from "@/hooks/useChatId";

export function useIsAdmin() {
    const chatId = useChatId();
    return chatId === '1364069488';
}
