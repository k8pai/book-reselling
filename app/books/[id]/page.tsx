import ProductDetails from '@/components/primitives/ProductDetails';
import { auth } from '@/lib/auth';
import { getBooksById } from '@/lib/database';
import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const session = await auth();

	const { data, error } = await getBooksById(id);

	return (
		<div className="flex-grow flex justify-center items-center ">
			<ProductDetails data={data!} session={session} />
		</div>
	);
};

export default page;
