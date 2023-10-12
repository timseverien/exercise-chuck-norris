import { useEffect, useState } from 'preact/hooks';
import { Joke, JokeClient, JokeListSchema } from '../clients/joke';
import { useLocalStorage } from './localeStorage';

const STORAGE_FAVORITE_KEY = 'favoriteJokes';

export function getRandomJoke(client: JokeClient): Promise<Joke> {
	return client.getRandomJoke();
}

// I realize that there's a change this results in double jokes; something I'll ignore for this assignment
export function getRandomJokeList(
	client: JokeClient,
	count: number
): Promise<Joke[]> {
	return Promise.all(
		Array.from({ length: count }).map(() => getRandomJoke(client))
	);
}

export function useJokes(
	client: JokeClient,
	count: number = 10
): [Joke[], boolean, () => Promise<void>] {
	const [jokes, setJokes] = useState<Joke[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const getRandomJokes = async () => {
		setIsLoading(true);

		const jokes = await getRandomJokeList(client, count);
		setJokes(jokes);

		setIsLoading(false);
	};

	useEffect(() => {
		getRandomJokes();
	}, []);

	return [jokes, isLoading, getRandomJokes];
}

export function useFavoriteJokes(): [
	Joke[],
	(joke: Joke) => void,
	(joke: Joke) => void
] {
	const [jokes, setJokes] = useLocalStorage<Joke[]>(
		STORAGE_FAVORITE_KEY,
		(v) => {
			const r = JokeListSchema.safeParse(JSON.parse(v ?? '[]'));
			return r.success ? r.data : [];
		},
		(v) => JSON.stringify(v),
		[]
	);

	const addJoke = (joke: Joke) => setJokes([...jokes, joke]);
	const removeJoke = (joke: Joke) =>
		setJokes(jokes.filter((j) => j.id !== joke.id));

	useEffect(() => {
		try {
			const jokes = JokeListSchema.parse(
				JSON.parse(window.localStorage.getItem(STORAGE_FAVORITE_KEY) ?? '[]')
			);
			setJokes(jokes);
		} catch {}
	}, []);

	return [jokes, addJoke, removeJoke];
}
