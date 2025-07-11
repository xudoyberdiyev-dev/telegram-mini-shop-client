'use client';

import {ReactNode, useEffect, useState} from 'react';

interface Props {
    children: ReactNode;
    fallback: ReactNode;
    delay?: number;
}

export default function SkeletonWrapper({children, fallback, delay = 1000}: Props) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return <>{ready ? children : fallback}</>;
}
