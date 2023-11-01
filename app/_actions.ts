'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const DeleteSellingBook = async (id: string) => {
	try {
		const res = await prisma.books.delete({
			where: { id },
		});
		revalidatePath('/profile');
		return { data: res, error: null };
	} catch (error) {
		return { data: null, error };
	}
};
