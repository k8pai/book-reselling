import ProductDetails from '@/components/primitives/ProductDetails';
import { getBooksById } from '@/lib/database';
import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const { data, error } = await getBooksById(id);

	return (
		<div className="flex-grow flex justify-center items-center ">
			<ProductDetails data={data!} />
		</div>
	);
};

export default page;
