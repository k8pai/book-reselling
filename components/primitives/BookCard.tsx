'use client';

import React from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from '@material-tailwind/react';
import Link from 'next/link';
import { Books } from '@prisma/client';
import { Badge } from '../ui/Badge';

export interface BookDataType {
	createdAt: Date;
	name: string;
	image: string;
	price: number;
	description: string;
	contact: string;
	author: string;
	id: number;
}

export function BookCard(data: { data: Books }) {
	const { author, name, image, price, id, genre, theme, tone, audience } =
		data.data;

	return (
		<Card className="w-72 h-fit">
			<CardHeader shadow={false} floated={false} className="h-56">
				<img
					src={`data:image/jpeg;base64,${image}`}
					alt="card-image"
					className="h-full w-full object-cover"
				/>
			</CardHeader>
			<CardBody>
				<div className="mb-2 flex items-center justify-between">
					<Typography
						color="blue-gray"
						variant="paragraph"
						className="font-medium text-md"
					>
						{name}
					</Typography>
					<Typography
						color="blue-gray"
						variant="small"
						className="font-semibold"
					>
						${price}
					</Typography>
				</div>
				<Typography
					variant="small"
					color="gray"
					className="font-normal opacity-75 font-sans"
				>
					{author}
				</Typography>
				<div className="mt-2 flex flex-wrap justify-start gap-2">
					<Badge variant={'secondary'}>{audience}</Badge>
					<Badge variant={'secondary'}>{tone}</Badge>
					<Badge variant={'secondary'}>{genre}</Badge>
					<Badge variant={'secondary'}>{theme}</Badge>
				</div>
			</CardBody>
			<CardFooter className="pt-0">
				<Link href={`/books/${id}`}>
					<Button
						ripple={false}
						fullWidth={true}
						className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
					>
						View Book
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
