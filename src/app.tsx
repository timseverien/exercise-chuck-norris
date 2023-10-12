import { FunctionComponent } from 'preact';
import { createClient as createJokeClient } from './clients/chuckNorrisJoke';
import { Joke } from './clients/joke';
import { IconButton } from './components/Button';
import { Icon } from './components/Icon';
import { Surface } from './components/Surface';
import { useFavoriteJokes, useJokes } from './services/joke';
import './styles/base.css';
import './styles/reset.css';
import './styles/tokens.css';
import { OverviewLayout } from './components/Layout';
import { Card } from './components/Card';

const JokeCard: FunctionComponent<{
	joke: Joke;
	favoriteJokes: Joke[];
	addFavoriteJoke: (joke: Joke) => void;
	removeFavoriteJoke: (joke: Joke) => void;
}> = (props) => {
	const isFavorite = props.favoriteJokes.some((j) => j.id === props.joke.id);
	const isFavoritesFull = props.favoriteJokes.length === 10;

	return (
		<Surface>
			{isFavorite ? (
				<IconButton
					icon={<Icon name="heartOff" />}
					onClick={() => props.removeFavoriteJoke(props.joke)}
				>
					Remove from favorites
				</IconButton>
			) : (
				<IconButton
					icon={<Icon name="heart" />}
					onClick={() => props.addFavoriteJoke(props.joke)}
					disabled={isFavoritesFull}
				>
					Add to favorites
				</IconButton>
			)}
			<span>{props.joke.text}</span>
		</Surface>
	);
};

export function App() {
	const [jokes, isLoading, getRandomJokes] = useJokes(createJokeClient());
	const [favoriteJokes, addFavoriteJoke, removeFavoriteJoke] =
		useFavoriteJokes();

	return (
		<OverviewLayout>
			<Card
				header={
					<>
						<h2>Random jokes</h2>
						<IconButton
							onClick={() => getRandomJokes()}
							disabled={isLoading}
							icon={<Icon name="refreshCcw" />}
						>
							Get new jokes
						</IconButton>
					</>
				}
			>
				<div aria-live="polite">
					{isLoading ? (
						<>Loading</>
					) : (
						<ul role="list">
							{jokes.map((joke, index) => (
								<li key={index}>
									<JokeCard
										joke={joke}
										favoriteJokes={favoriteJokes}
										addFavoriteJoke={addFavoriteJoke}
										removeFavoriteJoke={removeFavoriteJoke}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</Card>

			<Card header={<h2>Favorites</h2>}>
				<ul role="list">
					{favoriteJokes.map((joke) => (
						<li key={joke.id}>
							<JokeCard
								joke={joke}
								favoriteJokes={favoriteJokes}
								addFavoriteJoke={addFavoriteJoke}
								removeFavoriteJoke={removeFavoriteJoke}
							/>
						</li>
					))}
				</ul>
			</Card>
		</OverviewLayout>
	);
}
