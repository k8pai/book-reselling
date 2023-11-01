import ProductDetails from '@/components/primitives/ProductDetails';
import React from 'react';

const fetchData = async (id: string) => {
	const response = await fetch(
		`${process.env.NEXTAUTH_URL}/api/books/${id}`,
		{ next: { tags: ['books'] }, cache: 'no-store' },
	);
	const data = await response.json();

	console.log(`data from '/books/id' => `, data);

	return data;
};

const page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const data = await fetchData(id);

	return (
		<div className="flex-grow flex justify-center items-center ">
			<ProductDetails data={data.data || []} />
		</div>
	);
};

export default page;
