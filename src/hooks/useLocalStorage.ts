import { useState } from 'react';

type StateUpdater<T> = (newValue: T) => void;
type UseLocalStorageResult<T> = [T, StateUpdater<T>];

const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageResult<T> => {
    const [state, setState] = useState<T>(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const updateValue = (newValue: T) => {
        setState(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [state, updateValue];
};

export default useLocalStorage;
