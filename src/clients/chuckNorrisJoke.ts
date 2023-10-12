import { Joke, JokeClient, JokeSchema } from './joke';

export function createClient(): JokeClient {
	return {
		async getRandomJoke(): Promise<Joke> {
			const response = await fetch('https://api.chucknorris.io/jokes/random');
			const data = await response.json();
			return JokeSchema.parse(data);
		},
	};
}
