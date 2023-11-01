'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuList,
	MenuHandler,
	MenuItem,
	Chip,
} from '@material-tailwind/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	UserCircleIcon,
	PlusIcon,
} from '@heroicons/react/20/solid';
import { Skeleton } from '../ui/Skeleton';

export function Header() {
	const [openNav, setOpenNav] = useState(false);
	const { data: session, status } = useSession();

	console.log(`status = ${status}, session => ${session}`);
	// if (status === 'loading') {
	// 	return <>we're loading bitch</>;
	// }

	const NavLinks = useCallback(() => {
		const [openMenu, setOpenMenu] = useState(false);

		if (status === 'loading') {
			return <Skeleton className="w-[100px] h-[35px] rounded-md" />;
		} else if (status === 'authenticated' && session) {
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
						<Link href={'/profile'}>
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
						{session.user.accountType === 'seller' ? (
							<Link href={`/profile`}>
								<MenuItem className="flex items-center gap-2">
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
										className="font-medium"
									>
										My Sellings
									</Typography>
								</MenuItem>
							</Link>
						) : null}
						{session.user.accountType === 'seller' ? (
							<Link href={'/profile/sell'}>
								<MenuItem className="flex items-center gap-2">
									{/* <svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="none"
									className="w-5 h-5"
								>
									<path
										fill="#90A4AE"
										d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
									/>
									<path
										fill="#90A4AE"
										d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
									/>
								</svg> */}

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
							className="hidden lg:inline-block"
						>
							<span>Sign up</span>
						</Button>
					</Link>
				</div>
			);
		}
	}, [session, status]);

	// useEffect(() => {
	// 	window.addEventListener(
	// 		'resize',
	// 		() => window.innerWidth >= 960 && setOpenNav(false),
	// 	);
	// }, []);

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
						className="p-1 font-medium"
					>
						<Link
							href="#"
							className="flex items-center hover:text-blue-500 transition-colors"
						>
							Home
						</Link>
					</Typography>
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-medium"
					>
						<Link
							href="/profile/listings"
							className="flex items-center hover:text-blue-500 transition-colors"
						>
							Sellings
						</Link>
					</Typography>
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-medium"
					>
						<Link
							href="/cart"
							className="flex items-center hover:text-blue-500 transition-colors"
						>
							Cart
						</Link>
					</Typography>
					<Typography
						as="li"
						variant="small"
						color="blue-gray"
						className="p-1 font-medium"
					>
						<Link
							href="/profile"
							className="flex items-center hover:text-blue-500 transition-colors"
						>
							Profile
						</Link>
					</Typography>
					<NavLinks />
				</div>

				{/* <IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							className="h-6 w-6"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</IconButton> */}
			</div>
			{/* <MobileNav open={openNav}>
				<div className="container mx-auto">
					<div className="flex items-center gap-x-1">
						<Button
							fullWidth
							variant="text"
							size="sm"
							onClick={() => signIn()}
							className=""
						>
							<span>Log In</span>
						</Button>
						<Button
							fullWidth
							variant="gradient"
							size="sm"
							className=""
							onClick={() => redirect('/authenticate/signup')}
						>
							<span>Sign up</span>
						</Button>
					</div>
				</div>
			</MobileNav> */}
		</Navbar>
	);
}
