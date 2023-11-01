import SearchFilter from '@/components/primitives/SearchFilter';

export const dynamic = 'force-dynamic';

const fetchData = async (): Promise<any> => {
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/books`, {
		next: { revalidate: 1, tags: ['books'] },
		cache: 'no-store',
	});
	const data = await response.json();
	console.log(`data from '/books' => `, data);

	return { ...data };
};

export default async function Home() {
	// console.log('data from home => ', data);
	const contents = await fetchData();

	return (
		<section className=" container mx-auto py-6">
			<SearchFilter books={contents.data} />
		</section>
	);
}
