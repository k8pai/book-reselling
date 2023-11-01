import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../prisma';
import { compare } from 'bcrypt';
import { userType } from '@/typings';
import {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from 'next';

export const authConfig: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Book Reselling',
			credentials: {
				email: {
					label: 'email',
					type: 'text',
					placeholder: 'johndeo@gmail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials as Pick<
					userType,
					'email' | 'password'
				>;

				if (!email || !password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});

				if (!user) {
					return null;
				}

				const passwordsMatch = await compare(
					password,
					user.password as string,
				);

				if (!passwordsMatch) {
					return null;
				}

				return user;
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user, session }) {
			if (user) {
				return {
					...token,
					// @ts-ignore
					accountType: user.accountType,
					userId: user.id,
				};
			}
			return token;
		},
		async session({ session, token, user }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.userId,
					accountType: token.accountType,
				},
			};
		},
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export function auth(
	...args:
		| [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authConfig);
}
