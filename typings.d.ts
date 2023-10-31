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
	| 'selfhelp'
	| 'youngadult';

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

export type filterCategories = 'genres' | 'audiences' | 'themes' | 'tones';
export type bookFilterFields = 'genre' | 'audience' | 'theme' | 'tone';
