import prisma from '../prisma';

export const getBooks = async () => {
	try {
		const data = await prisma.books.findMany({});

		if (!data) {
			return { error: 'No data found' };
		}

		return { data };
	} catch (error) {
		return { error };
	}
};
