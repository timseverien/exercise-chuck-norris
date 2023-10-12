import { z } from 'zod';
import type { JokeClient } from './joke';

const JokeSchema = z.object({
	icon_url: z.string(),
	value: z.string(),
	id: z.string(),
	url: z.string(),
});

export function createClient(): JokeClient {
	return {
		async getRandomJoke() {
			const response = await fetch('https://api.chucknorris.io/jokes/random');
			const data = await response.json();
			const joke = JokeSchema.parse(data);

			return {
				id: joke.id,
				text: joke.value,
			};
		},
	};
}
