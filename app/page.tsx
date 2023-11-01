import SearchFilter from '@/components/primitives/SearchFilter';
import { Books } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function Home() {
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/books`, {
		next: { revalidate: 1 },
	});
	const data = await response.json();

	// console.log('data from home => ', data);
	const contents: Books[] = data.data;

	return (
		<section className=" container mx-auto py-6">
			<SearchFilter books={contents} />
		</section>
	);
}
