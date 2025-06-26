import { useCallback, useEffect, useState } from 'react';

function parseJSON(value) {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value);
  } catch (error) {
    console.warn('Error parsing sessionStorage value:', value);
    return undefined;
  }
}

export function useSessionStorage(key, initialValue) {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? parseJSON(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    value => {
      if (typeof window === 'undefined') {
        console.warn(`Tried setting sessionStorage key “${key}” in non-client environment`);
        return;
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.sessionStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);

        // Notify only this tab via custom event
        window.dispatchEvent(new CustomEvent('session-storage', { detail: { key } }));
      } catch (error) {
        console.warn(`Error setting sessionStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    const handleCustomChange = event => {
      if (event.detail?.key !== key) return;
      setStoredValue(readValue());
    };

    window.addEventListener('session-storage', handleCustomChange);

    return () => {
      window.removeEventListener('session-storage', handleCustomChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}
