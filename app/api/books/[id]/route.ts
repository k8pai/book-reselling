import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params;
	try {
		const data = await prisma.books.findMany({
			where: { id },
			include: {
				user: true,
			},
		});

		// console.log('data from /api/books/id => ', data);
		return NextResponse.json(
			{
				data: data[0],
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
