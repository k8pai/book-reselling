import { User } from '@prisma/client';

export type userType = {
	name: string;
	accountType: 'buyer' | 'seller';
	email: string;
	password: string;
};

export interface BookPost {
	id: string;
	name: string;
	author: string;
	image: string;
	price: number;
	contact: string;
	user?: User;
}

export type GenreValue =
	| 'fantasy'
	| 'mystery'
	| 'romance'
	| 'scifi'
	| 'thriller'
	| 'historical'
	| 'horror'
	| 'nonfiction'
	| 'biography'
	| 'selfhelp';

export type AudienceValue = 'children' | 'middlegrade' | 'youngadult' | 'adult';

export type ThemeValue =
	| 'goodvsevil'
	| 'loveandloss'
	| 'identity'
	| 'comingofage'
	| 'survival'
	| 'friendship'
	| 'revenge'
	| 'discovery'
	| 'courage';

export type ToneValue =
	| 'adventurous'
	| 'dark'
	| 'humorous'
	| 'melancholic'
	| 'mysterious'
	| 'optimistic'
	| 'suspenseful'
	| 'whimsical';

export type Categories = 'genres' | 'audiences' | 'themes' | 'tones';

export type Values =
	| GenreValue
	| AudienceValue
	| ThemeValue
	| ToneValue
	| 'all';

type CategoryValuesMap = {
	genres: GenreValue;
	audiences: AudienceValue;
	themes: ThemeValue;
	tones: ToneValue;
};
export type FilterValues<T extends keyof CategoryValuesMap> =
	CategoryValuesMap[T][];

export type filterList = { name: string; value: Values };

export type bookFilterFields = 'genre' | 'audience' | 'theme' | 'tone';

export interface Sort {
	value: string;
	type: 'ascending' | 'descending';
}
