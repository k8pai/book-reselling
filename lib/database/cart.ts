import { Session } from 'next-auth';
import prisma from '../prisma';

export const getCartItems = async (session: Session | null) => {
	if (!session) {
		return { data: null, loginError: true };
	}

	const user = session.user;
	try {
		const res = await prisma.cart.findMany({
			where: {
				userId: user.id,
			},
			include: {
				book: true,
			},
		});
		return { data: res, error: null };
	} catch (error) {
		return { data: null, error };
	}
};
