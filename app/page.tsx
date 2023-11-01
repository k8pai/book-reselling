import SearchFilter from '@/components/primitives/SearchFilter';
import { getBooks } from '@/lib/database';

export const dynamic = 'force-dynamic';

export default async function Home() {
	const { data, error } = await getBooks();

	return (
		<section className="container mx-auto py-6">
			<SearchFilter books={data ?? []} />
		</section>
	);
}
