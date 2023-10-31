'use client';

import React from 'react';
import { BookDataType } from './BookCard';
import { Button, Typography } from '@material-tailwind/react';
import { Card, CategoryBar, Divider, Flex, Legend, Text } from '@tremor/react';
import { BookPost } from '@/typings';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ph } from '@/lib/helper';
import { Badge } from '../ui/Badge';
import { Books, User } from '@prisma/client';

const RatingStars = () => {
	return (
		<div>
			<div className="flex items-center mb-2">
				<svg
					className="w-4 h-4 text-yellow-300 mr-1"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 22 20"
				>
					<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
				</svg>
				<svg
					className="w-4 h-4 text-yellow-300 mr-1"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 22 20"
				>
					<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
				</svg>
				<svg
					className="w-4 h-4 text-yellow-300 mr-1"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 22 20"
				>
					<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
				</svg>
				<svg
					className="w-4 h-4 text-yellow-300 mr-1"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 22 20"
				>
					<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
				</svg>
				<svg
					className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 22 20"
				>
					<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
				</svg>
				<p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
					4.95 out of 5
				</p>
			</div>
			<div>
				<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
					1,745 global ratings
				</p>
			</div>
		</div>
	);
};

const Rating = ({ name }: { name: string }) => (
	<>
		<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
			Ratings
		</p>
		<div className="flex items-center mt-4">
			<a
				href="#"
				className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
			>
				5 star
			</a>
			<div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
				<div
					className="h-5 bg-yellow-300 rounded"
					style={{ width: '70%' }}
				></div>
			</div>
			<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
				70%
			</span>
		</div>
		<div className="flex items-center mt-4">
			<a
				href="#"
				className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
			>
				4 star
			</a>
			<div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
				<div
					className="h-5 bg-yellow-300 rounded"
					style={{ width: '17%' }}
				></div>
			</div>
			<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
				17%
			</span>
		</div>
		<div className="flex items-center mt-4">
			<a
				href="#"
				className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
			>
				3 star
			</a>
			<div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
				<div
					className="h-5 bg-yellow-300 rounded"
					style={{ width: '8%' }}
				></div>
			</div>
			<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
				8%
			</span>
		</div>
		<div className="flex items-center mt-4">
			<a
				href="#"
				className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
			>
				2 star
			</a>
			<div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
				<div
					className="h-5 bg-yellow-300 rounded"
					style={{ width: '4%' }}
				></div>
			</div>
			<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
				4%
			</span>
		</div>
		<div className="flex items-center mt-4">
			<a
				href="#"
				className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
			>
				1 star
			</a>
			<div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
				<div
					className="h-5 bg-yellow-300 rounded"
					style={{ width: '1%' }}
				></div>
			</div>
			<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
				1%
			</span>
		</div>
	</>
);

export default function ProductDetails({
	data,
}: {
	data: Books & { user: User };
}) {
	const {
		author,
		id,
		image,
		name,
		contact,
		audience,
		genre,
		theme,
		tone,
		price,
		user: { name: seller, email },
	} = data;

	console.log('data from ProductDetails => ', data);
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto flex items-start h-full gap-8 px-4 md:px-6">
				<img
					alt="Sneaker Image"
					className="aspect-[1/1] object-cover object-center rounded-md"
					height="500"
					src={`data:image/jpeg;base64,${image}`}
					width="500"
				/>
				<div className="flex items-start w-full">
					<div className=" flex-grow p-4 space-y-6 min-w-[250px] max-w-full w-full">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<Typography
									variant={'h4'}
									className="font-bold tracking-tighter"
								>
									{name}
								</Typography>

								<Typography
									variant={'paragraph'}
									className="font-normal tracking-tighter"
								>
									$ {price}
								</Typography>
							</div>
							<Typography variant="small" className="font-medium">
								By <code className="font-bold">{author}</code>{' '}
								(author)
							</Typography>
						</div>
						<div className="space-y-2">
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Genre:{' '}
								<Badge variant={'outline'}>{genre}</Badge>
							</p>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Themes:{' '}
								<Badge variant={'outline'}>{theme}</Badge>
							</p>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Tone: <Badge variant={'outline'}>{tone}</Badge>
							</p>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Audience:{' '}
								<Badge variant={'outline'}>{audience}</Badge>
							</p>
						</div>
						{/* <Typography variant="h5" className="">
							Last Price:{' '}
							<span className="text-foreground-900">
								${price}
							</span>
						</Typography> */}
						{/* <Typography variant="h4" className="">
							Ratings
						</Typography> */}
						<Rating name={name} />
					</div>
					<div className="p-4 rounded-md h-full space-y-6 min-w-[250px]">
						<div className="space-y-3">
							<Typography variant="h4" className="">
								Seller Details
							</Typography>
							<hr />
							<Typography variant="small" className="">
								Seller:{' '}
								<span className="text-foreground-900 font-semibold text-black">
									{seller}
								</span>
							</Typography>
							<Typography variant="small" className="">
								Contact:{' '}
								<span className="text-foreground-900 font-semibold text-black">
									{ph(contact)}
								</span>
							</Typography>
							<Typography variant="small" className="">
								Last Price:{' '}
								<span className="text-foreground-900 font-semibold text-black">
									${price}
								</span>
							</Typography>
							<hr />
							<RatingStars />
						</div>

						<Button>Add to Cart</Button>
						{/* <Button className="w-full h-12 rounded-md bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900">
							Add to Cart
						</Button> */}
					</div>
				</div>
			</div>
		</section>
	);
}

// export default ProductDetails;
