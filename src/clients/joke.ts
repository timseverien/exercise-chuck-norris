import { z } from 'zod';

export const JokeSchema = z.object({
	icon_url: z.string(),
	value: z.string(),
	id: z.string(),
	url: z.string(),
});

export type Joke = z.infer<typeof JokeSchema>;

export type JokeClient = {
	getRandomJoke(): Promise<Joke>;
};
