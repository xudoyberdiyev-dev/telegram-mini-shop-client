// hooks/useIsAdmin.ts
import { useChatId } from "./useChatId";

export function useIsAdmin(): boolean {
    const chatId = useChatId();
    const ADMIN_ID = "1085241246";
    return chatId === ADMIN_ID;
}
