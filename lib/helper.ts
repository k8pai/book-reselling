import { bookFilterFields, Categories } from '@/typings';

export function mansoryGrid(
	arr: Array<any> = [],
	groupSize: number = arr.length / 4,
) {
	let result = [];
	for (let i = 0; i < arr.length; i += groupSize) {
		result.push(arr.slice(i, i + groupSize));
	}
	return result;
}
export const ph = (phoneNumber: string) => {
	// Check if the input is a valid 10-digit number
	if (!/^\d{10}$/.test(phoneNumber)) {
		return 'Invalid phone number';
	}

	// Format the phone number
	const formattedNumber = `+91 ${phoneNumber.slice(0, 4)} ${phoneNumber.slice(
		4,
		7,
	)} ${phoneNumber.slice(7)}`;

	return formattedNumber;
};

export const createWorkflow = (arr = '/') => {
	const segments = arr.split('/').filter(Boolean);

	const resultArray = [
		{ label: 'Home', path: '/' },
		...segments.map((segment, index) => {
			const path = `/${segments.slice(0, index + 1).join('/')}`;
			const label = segment.charAt(0).toUpperCase() + segment.slice(1);
			return { label, path };
		}),
	];

	return resultArray;
};

export const getField = (str: Categories): bookFilterFields => {
	switch (str) {
		case 'genres':
			return 'genre';
		case 'audiences':
			return 'audience';
		case 'themes':
			return 'theme';
		case 'tones':
			return 'tone';
	}
};
