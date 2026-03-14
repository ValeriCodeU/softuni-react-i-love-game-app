import { useState } from "react";

export default function useLocalStorage(key, initialState) {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
    });

    const setPersistedState = (value) => {
        
        if (typeof value === 'function') {
            value = value(state);
        }
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    }

    return [state, setPersistedState];
}