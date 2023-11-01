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

export const revalidate = async (path: string) => {
	revalidateTag(path);
};
