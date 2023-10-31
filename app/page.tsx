import { BookCard } from '@/components/primitives/BookCard';
import SearchFilter from '@/components/primitives/SearchFilter';
import { mansoryGrid } from '@/lib/helper';
import { Books } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

const dynamic = 'force-dynamic';

export default async function Home() {
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/books`, {
		next: { revalidate: 10 },
	});
	const data = await response.json();

	console.log('data from home => ', data);
	const contents: Books[] = data.data;

	return (
		<section className=" container mx-auto my-28">
			<section className="flex flex-col justify-start items-center md:flex-row md:justify-between">
				{/* searchbar and filter goes here...//  */}
				<div>searchbar</div>
				<div>filters</div>
			</section>
			<SearchFilter books={contents} />
			{/* <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
				{contents.map((item, _) => {
					return <BookCard key={data.id} data={item} />;
				})}
			</div> */}
		</section>
	);
}
