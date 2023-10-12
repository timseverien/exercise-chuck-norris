import { z } from 'zod';

export const JokeSchema = z.object({
	id: z.string(),
	text: z.string(),
});

export const JokeListSchema = z.array(JokeSchema);

export type Joke = z.infer<typeof JokeSchema>;

export type JokeClient = {
	getRandomJoke(): Promise<Joke>;
};
