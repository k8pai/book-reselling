import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	const { id } = params;

	// console.log(params);
	try {
		const data = await prisma.books.findMany({
			where: { userId: id },
			include: {
				user: true,
			},
		});

		// console.log('data => ', data);
		return NextResponse.json(
			{
				data,
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
