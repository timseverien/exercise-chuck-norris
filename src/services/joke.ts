import { useEffect, useState } from 'preact/hooks';
import { Joke, JokeClient } from '../clients/joke';

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
