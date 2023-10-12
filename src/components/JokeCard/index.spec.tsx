import { fireEvent, render } from '@testing-library/preact';
import { describe, expect, test, vi } from 'vitest';
import { JokeCard } from '.';
import { Joke } from '../../clients/joke';

function createJoke(overrides: Partial<Joke> = {}): Joke {
	return {
		id: '1',
		text: 'A',
		...overrides,
	};
}

describe(JokeCard, () => {
	test('given joke, renders joke text', () => {
		const joke = createJoke();

		const { queryByText } = render(
			<JokeCard
				joke={joke}
				favoriteJokes={[]}
				addFavoriteJoke={() => {}}
				removeFavoriteJoke={() => {}}
			/>
		);

		expect(queryByText(joke.text)).not.toBeNull();
	});

	test('given joke, renders joke favorite button', () => {
		const joke = createJoke();

		const { queryByRole } = render(
			<JokeCard
				joke={joke}
				favoriteJokes={[]}
				addFavoriteJoke={() => {}}
				removeFavoriteJoke={() => {}}
			/>
		);

		expect(queryByRole('button')).toHaveTextContent('Add to favorites');
	});

	test('given favorite joke, renders joke unfavorite button', () => {
		const joke = createJoke();

		const { queryByRole } = render(
			<JokeCard
				joke={joke}
				favoriteJokes={[joke]}
				addFavoriteJoke={() => {}}
				removeFavoriteJoke={() => {}}
			/>
		);

		expect(queryByRole('button')).toHaveTextContent('Remove from favorites');
	});

	test('given joke, favorite button calls addFavoriteJoke', () => {
		const joke = createJoke();
		const addFavoriteJoke = vi.fn();
		const removeFavoriteJoke = vi.fn();

		const { getByRole } = render(
			<JokeCard
				joke={joke}
				favoriteJokes={[]}
				addFavoriteJoke={addFavoriteJoke}
				removeFavoriteJoke={removeFavoriteJoke}
			/>
		);
		fireEvent.click(getByRole('button'));

		expect(addFavoriteJoke).toHaveBeenCalledOnce();
		expect(removeFavoriteJoke).not.toHaveBeenCalled();
	});

	test('given favorite joke, unfavorite button calls removeFavoriteJoke', () => {
		const joke = createJoke();
		const addFavoriteJoke = vi.fn();
		const removeFavoriteJoke = vi.fn();

		const { getByRole } = render(
			<JokeCard
				joke={joke}
				favoriteJokes={[joke]}
				addFavoriteJoke={() => {}}
				removeFavoriteJoke={removeFavoriteJoke}
			/>
		);
		fireEvent.click(getByRole('button'));

		expect(addFavoriteJoke).not.toHaveBeenCalled();
		expect(removeFavoriteJoke).toHaveBeenCalledOnce();
	});

	test('given joke and less than max number of favorites, renders favorite button without disabled attribute', () => {
		const joke = createJoke({ id: 'unique' });
		const addFavoriteJoke = vi.fn();
		const removeFavoriteJoke = vi.fn();

		const { getByRole } = render(
			<JokeCard
				joke={joke}
				favoriteJokes={[
					createJoke({ id: '1' }),
					createJoke({ id: '2' }),
					createJoke({ id: '3' }),
					createJoke({ id: '4' }),
					createJoke({ id: '5' }),
					createJoke({ id: '6' }),
					createJoke({ id: '7' }),
					createJoke({ id: '8' }),
					createJoke({ id: '9' }),
				]}
				addFavoriteJoke={addFavoriteJoke}
				removeFavoriteJoke={removeFavoriteJoke}
			/>
		);
		fireEvent.click(getByRole('button'));

		expect(getByRole('button')).not.toHaveAttribute('disabled');
	});

	test('given joke and max number of favorites, renders favorite button with disabled attribute', () => {
		const joke = createJoke({ id: 'unique' });
		const addFavoriteJoke = vi.fn();
		const removeFavoriteJoke = vi.fn();

		const { getByRole } = render(
			<JokeCard
				joke={joke}
				favoriteJokes={[
					createJoke({ id: '1' }),
					createJoke({ id: '2' }),
					createJoke({ id: '3' }),
					createJoke({ id: '4' }),
					createJoke({ id: '5' }),
					createJoke({ id: '6' }),
					createJoke({ id: '7' }),
					createJoke({ id: '8' }),
					createJoke({ id: '9' }),
					createJoke({ id: '10' }),
				]}
				addFavoriteJoke={addFavoriteJoke}
				removeFavoriteJoke={removeFavoriteJoke}
			/>
		);
		fireEvent.click(getByRole('button'));

		expect(getByRole('button')).toHaveAttribute('disabled');
	});
});
