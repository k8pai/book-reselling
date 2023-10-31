import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
	const body = await request.json();

	const { name, email, password, accountType } = body.data;

	if (!name || !email || !password) {
		return NextResponse.json(
			{ error: 'Missing name, email, or password' },
			{
				status: 400,
			},
		);
	}

	const exist = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (exist) {
		return NextResponse.json(
			{ error: 'User Already Exist', errorCode: '409' },
			{ status: 400 },
		);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			accountType,
		},
	});

	return NextResponse.json({ data: user }, { status: 200 });
}
