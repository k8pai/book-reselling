'use server';

import prisma from '@/lib/prisma';

export const DeleteSellingBook = async (id: string) => {
	try {
		const res = await prisma.books.delete({
			where: { id },
		});
		return { data: res, error: null };
	} catch (error) {
		return { data: null, error };
	}
};
