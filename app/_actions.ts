'use server';

import prisma from '@/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';

export const DeleteSellingBook = async (id: string) => {
	try {
		const res = await prisma.books.delete({
			where: { id },
		});
		revalidateTag('books');
		return { data: res, error: null };
	} catch (error) {
		return { data: null, error };
	}
};

// export const createBookListing = async (contents) => {
// 	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/book`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(contents),
// 	});

// 	const postInfo = await response.json();
// 	// console.log('postInfo => ', postInfo);
// 	revalidatePath('/');
// 	return postInfo;
// };

export const revalidate = async (path: string) => {
	revalidateTag(path);
};
