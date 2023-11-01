import SearchFilter from '@/components/primitives/SearchFilter';
import { Books } from '@prisma/client';

export const dynamic = 'force-dynamic';

const fetchData = async (): Promise<any> => {
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/books`, {
		next: { tags: ['books'] },
	});
	const data = await response.json();
	const contents: Books[] = data.data;
	console.log(`data from '/' => `, contents.length);

	return contents;
};
export default async function Home() {
	const contents = await fetchData();

	console.log('contents => ', contents.length);

	return (
		<section className="container mx-auto py-6">
			<SearchFilter books={contents} />
		</section>
	);
}

// <<section className="container mx-auto py-6">
// <SearchFilter books={contents} />
// </section>>
