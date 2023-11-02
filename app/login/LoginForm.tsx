'use client';

import { userType } from '@/typings';
import { signIn } from 'next-auth/react';
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
	checkbox,
	Select,
	Option,
} from '@material-tailwind/react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const LoginForm = () => {
	const searchParams = useSearchParams();

	const callback = searchParams.get('callbackUrl');

	// console.log('path from login => ', callback);
	const [data, setData] = useState<Pick<userType, 'email' | 'password'>>({
		email: '',
		password: '',
	});

	const handleFormValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setData((formdata) => ({ ...formdata, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signIn('credentials', {
			...data,
			callbackUrl: callback ?? '/',
			redirect: true,
		});
	};
	return (
		<form
			className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
			onSubmit={handleSubmit}
		>
			<div className="mb-1 flex flex-col gap-6">
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Your Email
				</Typography>
				<Input
					crossOrigin={Input}
					size="lg"
					name="email"
					value={data.email}
					onChange={handleFormValueChange}
					placeholder="johndeo@gmail.com"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Password
				</Typography>
				<Input
					crossOrigin={Input}
					type="password"
					size="lg"
					name="password"
					value={data.password}
					onChange={handleFormValueChange}
					placeholder="********"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
			</div>
			<Button className="mt-6" fullWidth type="submit">
				Login
			</Button>
			<Typography color="gray" className="mt-4 text-center font-normal">
				Doesn't have an account?{' '}
				<a href="/signup" className="font-medium text-gray-900">
					Sign up
				</a>
			</Typography>
		</form>
	);
};

export default LoginForm;
