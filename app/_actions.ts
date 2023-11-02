'use server';

import prisma from '@/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';
import { usePathname } from 'next/navigation';

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

export const addToCart = async (bookId: string, userId: string) => {
	try {
		console.log(`bookId = ${bookId}, userId = ${userId}`);
		const exist = await prisma.cart.findFirst({
			where: { bookId, userId },
		});

		if (exist) {
			console.log('existing record => ', exist);
			return { data: null, isFav: true, error: 'already favorite' };
		}

		const res = await prisma.cart.create({
			data: {
				bookId,
				userId,
			},
		});

		console.log('New Record created => ', res);
		return { data: res, isFav: true, error: null };
	} catch (error) {
		return { data: null, isFav: false, error };
	}
};

export const removeCartItem = async (id: string) => {
	try {
		console.log('id => ', id);
		const res = await prisma.cart.delete({
			where: {
				id,
			},
		});

		console.log('response from db => ', res);
		revalidatePath('/cart');
		return { data: res, error: null };
	} catch (error) {
		return { data: null, error };
	}
};
