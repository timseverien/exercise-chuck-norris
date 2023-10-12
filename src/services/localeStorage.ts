import { StateUpdater, useEffect, useState } from 'preact/hooks';

export function useLocalStorage<T>(
	key: string,
	parse: (v: string | null) => T,
	serialize: (v: T) => string,
	initialValue: T
): [T, StateUpdater<T>] {
	const value = window.localStorage.getItem(key)
		? parse(window.localStorage.getItem(key))
		: initialValue;
	const [state, setState] = useState<T>(value);

	useEffect(() => {
		window.localStorage.setItem(key, serialize(state));
	}, [state]);

	return [state, setState];
}
