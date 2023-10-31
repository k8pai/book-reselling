import { userType } from '@/typings';
import { id } from '@material-tailwind/react/types/components/tabs';
import { User } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			accountType: userType['accountType'];
			id: User[id];
		} & DefaultSession['user'];
	}
}
