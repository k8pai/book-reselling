import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const res = await prisma.books.findMany({});

		// console.log('res for all books => ', res);
		return NextResponse.json(
			{
				data: res,
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		return NextResponse.json(
			{
				error,
			},
			{
				status: 400,
			},
		);
	}
}
