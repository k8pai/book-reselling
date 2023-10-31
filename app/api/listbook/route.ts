import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { auth } from '@/lib/auth';
import { Books } from '@prisma/client';

export async function GET(request: Request) {
	try {
		const res = await prisma.books.findMany({});
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

export async function POST(request: Request) {
	const body = await request.json();

	const {
		name,
		author,
		image,
		price,
		contact,
		email,
		audience,
		genre,
		theme,
		tone,
	} = body as Books & { email: string };

	if (
		!name ||
		!author ||
		!image ||
		!price ||
		!contact ||
		!audience ||
		!genre ||
		!theme ||
		!tone
	) {
		return NextResponse.json(
			{
				error: 'Missing Mandatory fields. Try again',
			},
			{
				status: 400,
			},
		);
	}

	const res = await prisma.books.create({
		data: {
			name,
			author,
			contact,
			price: typeof price === 'string' ? parseInt(price) : price,
			image,
			audience,
			genre,
			theme,
			tone,
			user: {
				connect: {
					email,
				},
			},
		},
	});

	return NextResponse.json({ res }, { status: 200 });
}
