import { FunctionComponent } from 'preact';
import { Joke } from '../../clients/joke';
import { IconButton } from '../Button';
import { Icon } from '../Icon';
import { Surface } from '../Surface';
import styles from './style.module.css';

export const JokeCard: FunctionComponent<{
	joke: Joke;
	favoriteJokes: Joke[];
	addFavoriteJoke: (joke: Joke) => void;
	removeFavoriteJoke: (joke: Joke) => void;
}> = (props) => {
	const isFavorite = props.favoriteJokes.some((j) => j.id === props.joke.id);
	const isFavoritesFull = props.favoriteJokes.length === 10;

	return (
		<Surface>
			<div className={styles.layout}>
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
			</div>
		</Surface>
	);
};
