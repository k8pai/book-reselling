import { auth } from '@/lib/auth';
import { getCartItems } from '@/lib/database/cart';
import React from 'react';
import CartItem from './CartItem';
import { Typography } from '@/components/ui';

const page = async () => {
	const session = await auth();

	const { data, error, loginError } = await getCartItems(session);

	// console.log(
	// 	'wishlist items => ',
	// 	data?.map((item) => ({
	// 		itemid: item.id,
	// 		bookid: item.bookId,
	// 		userId: item.userId,
	// 	})),
	// );

	return (
		<div>
			<div>
				{loginError
					? 'You need to login first to see your cart details.'
					: null}
			</div>
			<div className="min-w-[500px] w-full max-w-5xl px-3 md:px-10 lg:mx-auto ">
				{data && data.length > 0 ? (
					data?.map((item) => {
						return (
							<CartItem
								key={item.id}
								book={item.book}
								item={item}
							/>
						);
					})
				) : (
					<Typography
						variant="h3"
						className="font-bold font-serif capitalize text-center"
					>
						Your wishlist is empty
					</Typography>
				)}
			</div>
		</div>
	);
};

export default page;
