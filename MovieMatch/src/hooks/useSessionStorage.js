import { useState, useEffect } from 'react';

export default function useSessionStorage(key, initialValue) {
    const getValue = () => {
        try {
            const stored = sessionStorage.getItem(key);
            if (stored === null || stored === "undefined") {
                return initialValue;
            }
            return JSON.parse(stored);
        } catch (error) {
            console.error("Failed to parse sessionStorage item", error);
            return initialValue;
        }
    };

    const [value, setValue] = useState(getValue);

    useEffect(() => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Failed to set sessionStorage item", error);
        }
    }, [key, value]);

    return [value, setValue];
}
