'use client';

import { Books, Cart } from '@prisma/client';
import React from 'react';
import { Card, Metric, Text } from '@tremor/react';
import Image from 'next/image';
import { Typography } from '@material-tailwind/react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { removeCartItem } from '../_actions';

const CartItem = ({ book, item }: { book: Books; item: Cart }) => {
	const {
		audience,
		author,
		contact,
		genre,
		image,
		name,
		price,
		theme,
		tone,
	} = book;
	const { id, bookId, userId } = item;

	const handleDeleteCartItem = async () => {
		// console.log('deleting book with id => ', id);
		const { data, error } = await removeCartItem(id);

		// console.log('data and error after removing cart item = ', data, error);
	};

	return (
		<Card className="rounded-md p-3 my-3 flex">
			<div className="relative w-[150px] h-[150px]">
				<Image
					src={`data:image/jpeg;base64,${image}`}
					alt={name}
					fill
					className="aspect-square rounded-md"
				/>
			</div>
			<div className="px-4 flex-grow">
				<div className="mb-2 flex items-center justify-between">
					<Typography
						color="blue-gray"
						variant="paragraph"
						className="font-medium text-md"
					>
						{name}
					</Typography>
					<Metric>$ {price}</Metric>
				</div>
				<Typography
					variant="small"
					color="gray"
					className="font-normal opacity-75 font-sans"
				>
					Book By{' '}
					<code className="text-zinc-950 font-semibold">
						{author}
					</code>
				</Typography>
				<div className="mt-2 flex flex-wrap justify-start gap-2">
					<Badge variant={'secondary'}>{audience}</Badge>
					<Badge variant={'secondary'}>{tone}</Badge>
					<Badge variant={'secondary'}>{genre}</Badge>
					<Badge variant={'secondary'}>{theme}</Badge>
				</div>
				<div className="mt-4">
					<form action={handleDeleteCartItem}>
						<Button variant={'destructive'} type="submit">
							Remove From Cart
						</Button>
					</form>
				</div>
			</div>
		</Card>
	);
};

export default CartItem;
