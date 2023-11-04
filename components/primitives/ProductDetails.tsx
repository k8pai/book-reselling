'use client';

import React, { SetStateAction, useCallback, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { ph } from '@/lib/helper';
import { Badge } from '../ui/Badge';
import { Books, Cart, User } from '@prisma/client';
import { addToCart } from '@/app/_actions';
import { useFormStatus } from 'react-dom';
import { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';

const RatingStars = () => {
	return (
		<div>
			<div className="flex items-center justify-end mb-2">
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
				<p className="text-sm flex justify-end font-medium text-gray-500 dark:text-gray-400">
					1,745 global ratings
				</p>
			</div>
		</div>
	);
};

const Rating = ({ name }: { name: string }) => (
	<>
		<Typography variant="h6" className="font-semibold">
			Ratings
		</Typography>

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
	session,
}: {
	data: Books & { user: User } & { favorites: Cart[] };
	session: Session | null;
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
		user: { name: seller, email, id: userId },
		favorites,
	} = data;

	const [isFav, setIsFav] = useState<boolean>(
		session && favorites.find((fav) => fav.userId === session.user.id)
			? true
			: false,
	);

	const path = usePathname();

	const AddtocartButton = useCallback(() => {
		// console.log(`isFav = `, isFav);

		const handleSubmit = async () => {
			// console.log('handling-submit...', session);
			if (!session) {
				signIn('credentials', {
					callbackUrl: path,
				});
			}

			const {
				data: res,
				isFav: fav,
				error,
			} = await addToCart(id, session?.user.id);
			setIsFav(fav);
		};

		return (
			<div>
				<form action={handleSubmit}>
					<Button
						type="submit"
						variant="outlined"
						className={`w-full flex items-center justify-center space-x-2`}
					>
						<span>{isFav ? 'Wishlisted' : 'Add to Wishlist'}</span>
						{isFav ? (
							<HeartFilledIcon className="h-5 w-5 fill-red-500 text-red-500" />
						) : (
							<HeartIcon />
						)}
					</Button>
				</form>
				<Link href={'/cart'}>
					<Button className={`w-full mt-4`}>Go to cart</Button>
				</Link>
			</div>
		);
	}, [isFav]);

	return (
		<section className="w-full py-8 md:py-16 lg:py-24">
			<div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start h-full gap-8 px-4 md:px-6">
				<img
					alt="Sneaker Image"
					className="aspect-[1/1] object-cover object-center rounded-md w-[300px] h-[300px] xl:w-[500px] xl:h-[500px]"
					src={`data:image/jpeg;base64,${image}`}
				/>
				<div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0 w-full h-full ">
					<div className=" flex-grow p-4 space-y-6 min-w-[350px] max-w-[400px] w-full mx-auto">
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
							<Typography variant="h6" className="font-semibold">
								tags
							</Typography>
							<div className="text-xs text-zinc-500 dark:text-zinc-400">
								Tone: <Badge variant={'outline'}>{tone}</Badge>
							</div>
							<div className="text-xs text-zinc-500 dark:text-zinc-400">
								Genre:{' '}
								<Badge variant={'outline'}>{genre}</Badge>
							</div>
							<div className="text-xs text-zinc-500 dark:text-zinc-400">
								Themes:{' '}
								<Badge variant={'outline'}>{theme}</Badge>
							</div>
							<div className="text-xs text-zinc-500 dark:text-zinc-400">
								Audience:{' '}
								<Badge variant={'outline'}>{audience}</Badge>
							</div>
						</div>
						<Rating name={name} />
					</div>
					<div className="p-4 rounded-md h-full space-y-6 min-w-[240px] w-full max-w-[275px] shadow-md mx-auto">
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

						<AddtocartButton />
					</div>
				</div>
			</div>
		</section>
	);
}

// export default ProductDetails;
