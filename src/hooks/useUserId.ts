import {useEffect, useState} from "react";

export function useUserId() {
    // const [userId, setUserId] = useState<string | null>(null);
    //
    // useEffect(() => {
    //     const url = new URL(window.location.href);
    //     const idFromUrl = url.searchParams.get("userId");
    //
    //     if (idFromUrl) {
    //         localStorage.setItem("userId", idFromUrl);
    //         setUserId(idFromUrl);
    //     } else {
    //         const idFromStorage = localStorage.getItem("userId");
    //         if (idFromStorage) setUserId(idFromStorage);
    //     }
    // }, []);
    const userId = '686b8fa2edf903027a78c406';

    return userId;
}