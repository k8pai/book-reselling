'use client';

import ProductDetails from '@/components/primitives/ProductDetails';
import { Typography } from '@material-tailwind/react';
import React from 'react';

const fetchData = async (id: string) => {
	const response = await fetch(
		`https://653fe28e45bedb25bfc16575.mockapi.io/books/${id}`,
		{ next: { revalidate: 10 } },
	);
	const data = await response.json();
	return data;
};

const page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const data = await fetchData(id);

	return (
		<div>
			<Typography variant="h4" className="font-semibold">
				My Selling Profile
			</Typography>
			<ProductDetails data={data} />
		</div>
	);
};

export default page;
