import { useCallback, useState } from 'react';

export default function useLocalStorage(key) {
  const [state, setState] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue || '';
  });

  const set = useCallback(
    val => {
      localStorage.setItem(key, val);
      setState(val);
    },
    [key],
  );

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setState('');
  }, [key]);

  return [state, set, remove];
}
