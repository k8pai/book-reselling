import SearchFilter from '@/components/primitives/SearchFilter';
import { Books } from '@prisma/client';

export const dynamic = 'force-dynamic';

const fetchData = async (): Promise<any> => {
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/books`, {
		next: { tags: ['books'] },
		cache: 'no-store',
	});
	const data = await response.json();
	const contents = data.data;
	console.log(`data from '/books' => `, contents.length);

	return contents;
};

export default async function Home() {
	const contents = await fetchData();

	return (
		<section className=" container mx-auto py-6">
			<SearchFilter books={contents} />
		</section>
	);
}
