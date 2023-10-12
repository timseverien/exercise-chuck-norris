import { Joke, JokeClient } from '../clients/joke';

export function getRandomJoke(client: JokeClient): Promise<Joke> {
	return client.getRandomJoke();
}

export function getRandomJokeList(
	client: JokeClient,
	count: number
): Promise<Joke[]> {
	return Promise.all(
		Array.from({ length: count }).map(() => client.getRandomJoke())
	);
}
