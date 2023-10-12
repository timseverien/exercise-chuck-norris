import { createClient as createJokeClient } from './clients/chuckNorrisJoke';
import { IconButton } from './components/Button';
import { Card } from './components/Card';
import { Icon } from './components/Icon';
import { JokeCard } from './components/JokeCard';
import { OverviewLayout } from './components/Layout';
import { VisuallyHidden } from './components/VisuallyHidden';
import { useFavoriteJokes, useJokes } from './services/joke';
import './styles/base.css';
import './styles/reset.css';
import './styles/tokens.css';

export function App() {
	const [jokes, isLoading, getRandomJokes] = useJokes(createJokeClient());
	const [favoriteJokes, addFavoriteJoke, removeFavoriteJoke] =
		useFavoriteJokes();

	return (
		<main>
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
								{jokes.map((joke) => (
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
						)}
					</div>
				</Card>

				<Card header={<h2>Favorites</h2>}>
					{favoriteJokes.length === 0 ? (
						<>
							Click the <Icon name="heart" size={0.75} />
							<VisuallyHidden element="span">heart icon</VisuallyHidden> to add
							jokes to favorites!
						</>
					) : (
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
					)}
				</Card>
			</OverviewLayout>
		</main>
	);
}
