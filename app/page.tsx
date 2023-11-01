import SearchFilter from '@/components/primitives/SearchFilter';
import { Books } from '@prisma/client';

export const dynamic = 'force-dynamic';

const fetchData = async (): Promise<Books[]> => {
	'server only';
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/books`, {
		next: { revalidate: 1 },
	});
	const data = await response.json();

	return { ...data };
};

export default async function Home() {
	// console.log('data from home => ', data);
	const contents = await fetchData();

	return (
		<section className=" container mx-auto py-6">
			<SearchFilter books={contents} />
		</section>
	);
}
