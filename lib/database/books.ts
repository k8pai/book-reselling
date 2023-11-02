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

export const getBooksById = async (id: string) => {
	try {
		const data = await prisma.books.findMany({
			where: { id },
			include: {
				user: true,
				favorites: true,
			},
		});

		if (!data) {
			return { error: 'No data found' };
		}

		return { data: data[0] };
	} catch (error) {
		return { error };
	}
};

export const getSellingList = async (id: string) => {
	try {
		const data = await prisma.books.findMany({
			where: { userId: id },
			include: {
				user: true,
				favorites: true,
			},
		});

		if (!data) {
			return { error: 'No data found' };
		}

		return { data: data };
	} catch (error) {
		return { error };
	}
};
