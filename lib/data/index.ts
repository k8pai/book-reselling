import {
	AudienceValue,
	GenreValue,
	ThemeValue,
	ToneValue,
	Categories,
	Values,
	FilterValues,
} from '@/typings';

const audiences: {
	name: string;
	value: AudienceValue;
}[] = [
	{ name: 'Children', value: 'children' },
	{ name: 'Middle Grade', value: 'middlegrade' },
	{ name: 'Young Adult', value: 'youngadult' },
	{ name: 'Adult', value: 'adult' },
];

const themes: {
	name: string;
	value: ThemeValue;
}[] = [
	{ name: 'Good vs. Evil', value: 'goodvsevil' },
	{ name: 'Love and Loss', value: 'loveandloss' },
	{ name: 'Identity', value: 'identity' },
	{ name: 'Coming of Age', value: 'comingofage' },
	{ name: 'Survival', value: 'survival' },
	{ name: 'Friendship', value: 'friendship' },
	{ name: 'Revenge', value: 'revenge' },
	{ name: 'Discovery', value: 'discovery' },
	{ name: 'Courage', value: 'courage' },
];

const tones: {
	name: string;
	value: ToneValue;
}[] = [
	{ name: 'Adventurous', value: 'adventurous' },
	{ name: 'Dark', value: 'dark' },
	{ name: 'Humorous', value: 'humorous' },
	{ name: 'Melancholic', value: 'melancholic' },
	{ name: 'Mysterious', value: 'mysterious' },
	{ name: 'Optimistic', value: 'optimistic' },
	{ name: 'Suspenseful', value: 'suspenseful' },
	{ name: 'Whimsical', value: 'whimsical' },
];

const genres: {
	name: string;
	value: GenreValue;
}[] = [
	{ name: 'Fantasy', value: 'fantasy' },
	{ name: 'Mystery', value: 'mystery' },
	{ name: 'Romance', value: 'romance' },
	{ name: 'Science Fiction', value: 'scifi' },
	{ name: 'Thriller', value: 'thriller' },
	{ name: 'Historical Fiction', value: 'historical' },
	{ name: 'Horror', value: 'horror' },
	{ name: 'Non-fiction', value: 'nonfiction' },
	{ name: 'Biography', value: 'biography' },
	{ name: 'Self-help', value: 'selfhelp' },
];

export const sortOptions: Record<string, string>[] = [
	{ label: 'Name', value: 'name' },
	{ label: 'Price', value: 'price' },
	{ label: 'Author', value: 'author' },
];

const categories: {
	name: Categories;
	data: {
		name: string;
		value: ToneValue | GenreValue | ThemeValue | AudienceValue | 'all';
	}[];
}[] = [
	{ name: 'genres', data: genres },
	{ name: 'audiences', data: audiences },
	{ name: 'themes', data: themes },
	{ name: 'tones', data: tones },
];

type FilterOptions<T extends Values> = { name: string; value: T }[];

const filters: Record<string, FilterOptions<Values>> = {
	audiences: [{ name: 'None', value: 'all' }, ...audiences],
	genres: [{ name: 'None', value: 'all' }, ...genres],
	themes: [{ name: 'None', value: 'all' }, ...themes],
	tones: [{ name: 'None', value: 'all' }, ...tones],
};

export { audiences, genres, themes, tones, categories, filters };
