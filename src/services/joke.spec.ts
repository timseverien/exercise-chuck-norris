import { describe, expect, test, vi } from 'vitest';
import { Joke, JokeClient } from '../clients/joke';
import { getRandomJoke } from './joke';

function createJoke(overrides: Partial<Joke> = {}): Joke {
	return {
		id: '',
		text: '',
		...overrides,
	};
}

describe(getRandomJoke.name, () => {
	test('given client, calls client.getRandomJoke', async () => {
		const joke = createJoke();

		const client: JokeClient = {
			getRandomJoke: vi.fn().mockReturnValue(joke),
		};

		await getRandomJoke(client);

		expect(client.getRandomJoke).toHaveBeenCalledOnce();
	});

	test('given client, returns the return value of client.getRandomJoke', async () => {
		const joke = createJoke();

		const client: JokeClient = {
			getRandomJoke: vi.fn().mockReturnValue(joke),
		};

		const result = await getRandomJoke(client);

		expect(result).toEqual(joke);
	});
});
