export type Joke = {
	id: string;
	text: string;
};

export type JokeClient = {
	getRandomJoke(): Promise<Joke>;
};
