'use client';

import React, { useCallback, useState } from 'react';
import {
	Navbar,
	Typography,
	Button,
	Menu,
	MenuList,
	MenuHandler,
	MenuItem,
	IconButton,
} from '@material-tailwind/react';

import { Button as UiButton } from '@/components/ui';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
	ChevronDownIcon,
	UserCircleIcon,
	PlusIcon,
} from '@heroicons/react/20/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Session } from 'next-auth';

export function Header({ user }: { user: Session['user'] | undefined }) {
	// console.log(`status = ${status}, session => ${session}`);

	const NavLinks = useCallback(() => {
		const [openMenu, setOpenMenu] = useState(false);

		// if (status === 'loading') {
		// 	return <Skeleton className="w-[100px] h-[35px] rounded-md" />;
		// } else
		if (user) {
			return (
				<Menu
					placement="bottom-end"
					open={openMenu}
					handler={setOpenMenu}
					offset={15}
				>
					<MenuHandler>
						<MenuItem className="flex items-center gap-2">
							<Typography
								variant="small"
								className="font-semibold"
							>
								Account
							</Typography>
							<ChevronDownIcon
								strokeWidth={2.5}
								className={`h-3.5 w-3.5 transition-transform ${
									openMenu ? 'rotate-180' : ''
								}`}
							/>
						</MenuItem>
					</MenuHandler>
					<MenuList>
						<Link
							href={'/profile'}
							className="outline-none hover:outline-none"
						>
							<MenuItem className="flex items-center gap-2">
								<UserCircleIcon className="h-5 w-5" />
								<Typography
									variant="small"
									className="font-medium"
								>
									Profile
								</Typography>
							</MenuItem>
						</Link>
						<hr className="my-2" />
						{user.accountType === 'seller' ? (
							<Link
								href={`/profile`}
								className="outline-none hover:outline-none whitespace-nowrap"
							>
								<MenuItem className="flex items-center gap-2 whitespace-nowrap">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										className="w-5 h-5"
									>
										<path
											fill="#90A4AE"
											d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z"
										/>
									</svg>

									<Typography
										variant="small"
										className="font-medium whitespace-nowrap"
									>
										My Sellings
									</Typography>
								</MenuItem>
							</Link>
						) : null}
						{user.accountType === 'seller' ? (
							<Link
								href={'/profile/sell'}
								className="outline-none hover:outline-none"
							>
								<MenuItem className="flex items-center gap-2">
									<PlusIcon className="w-5 h-5" />

									<Typography
										variant="small"
										className="font-medium"
									>
										Post Book
									</Typography>
								</MenuItem>
							</Link>
						) : null}
						<Link
							href={'/cart'}
							className="outline-none hover:outline-none"
						>
							<MenuItem className="flex items-center gap-2">
								<ShoppingBagIcon className="w-5 h-5" />

								<Typography
									variant="small"
									className="font-medium"
								>
									Wishlist
								</Typography>
							</MenuItem>
						</Link>
						<hr className="my-2" />
						<MenuItem
							className="flex items-center gap-2 "
							onClick={() => signOut()}
						>
							<svg
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
									fill="#90A4AE"
								/>
							</svg>
							<Typography variant="small" className="font-medium">
								Sign Out
							</Typography>
						</MenuItem>
					</MenuList>
				</Menu>
			);
		} else {
			return (
				<div className="flex items-center gap-x-1">
					<Button
						variant="text"
						size="sm"
						className="hidden lg:inline-block"
						onClick={() => signIn()}
					>
						<span>Log In</span>
					</Button>
					<Link href={'/signup'}>
						<Button
							variant="gradient"
							size="sm"
							className="inline-block"
						>
							<span>Sign up</span>
						</Button>
					</Link>
				</div>
			);
		}
	}, [user]);

	return (
		<Navbar className="mx-auto max-w-full px-4 py-2 rounded-lg lg:px-8 lg:py-4">
			<div className="mx-auto flex items-center justify-between text-blue-gray-900">
				<Typography
					as={Link}
					href="/"
					className="mr-4 cursor-pointer py-1.5 font-medium"
				>
					Book Reselling
				</Typography>

				<div className="flex items-center space-x-3">
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="hidden md:inline-block p-1 font-medium"
					>
						<Link
							href="/"
							className="flex items-center hover:text-blue-500 transition-colors"
						>
							Home
						</Link>
					</Typography>

					{user && user.accountType === 'seller' ? (
						<Typography
							as="li"
							variant="small"
							color="blue-gray"
							className="hidden md:inline-block p-1 font-medium whitespace-nowrap"
						>
							<Link
								href="/profile"
								className="hover:text-blue-500 transition-colors whitespace-nowrap"
							>
								My Sellings
							</Link>
						</Typography>
					) : null}
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-medium"
					>
						<Link href="/cart" className="group">
							<ShoppingBagIcon className="text-zinc-900 h-5 w-5 group-hover:scale-105" />
						</Link>
					</Typography>
					{/* <Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-medium"
					>
						<Link
							href=""
							aria-disabled="true"
							className="flex items-center hover:text-blue-500 transition-colors"
						>
							Cart
						</Link>
					</Typography> */}
					<NavLinks />
				</div>
			</div>
		</Navbar>
	);
}
