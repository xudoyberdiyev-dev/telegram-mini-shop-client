// hooks/useIsAdmin.ts
import { useChatId } from "./useChatId";

export function useIsAdmin(): boolean {
    const chatId = useChatId();
    const ADMIN_ID = "1364069488";
    return chatId === ADMIN_ID;
}
