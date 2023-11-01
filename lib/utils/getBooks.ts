import { cache } from 'react';
import 'server-only';

const preload = () => {
	void getBooks();
};

const getBooks = cache(async () => {
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/books`, {
		next: { revalidate: 1, tags: ['books'] },
	});
	const data = await response.json();
	const contents = data.data;

	console.log(`data from '/' => `, contents.length);

	return contents;
});

export default getBooks;
export { preload };
