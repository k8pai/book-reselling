'use client';

import React from 'react';
import {
	Input,
	Checkbox,
	Button,
	Typography,
	Select,
	Option,
} from '@material-tailwind/react';
import { userType } from '@/typings';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const SignupForm = () => {
	const [formValues, setFormValues] = useState<userType>({
		name: '',
		accountType: 'buyer',
		email: '',
		password: '',
	});
	const router = useRouter();

	const handleFormValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormValues((formdata) => ({ ...formdata, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: formValues }),
		});

		const userInfo = await response.json();
		const { data, error, errorCode } = userInfo;

		if (data) {
			toast.success(
				(t) => (
					<span className="flex items-center space-x-3">
						<b>{`Account Created Successfully!`}</b>
					</span>
				),
				{ position: 'bottom-center' },
			);
			setTimeout(() => {
				router.push('/login');
			}, 3000);
		}

		if (error && errorCode === '409') {
			console.error(error);
			toast.error(
				(t) => (
					<span className="flex items-center space-x-3">
						<b>{`${error}, Try Loggin in!`}</b>
					</span>
				),
				{ position: 'bottom-center' },
			);
			setTimeout(() => {
				router.push('/login');
			}, 3000);
		}
	};

	return (
		<form
			className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
			onSubmit={handleSubmit}
		>
			<div className="mb-1 flex flex-col gap-6">
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Your Name
				</Typography>
				<Input
					crossOrigin={Input}
					size="lg"
					name="name"
					value={formValues.name}
					onChange={handleFormValueChange}
					placeholder="John Deo"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Account Type
				</Typography>
				<Select
					label="Select Version"
					animate={{
						mount: { y: 0 },
						unmount: { y: 25 },
					}}
					name="accountType"
					value={formValues.accountType}
					onChange={(value) =>
						setFormValues((formdata) => ({
							...formdata,
							accountType: value as userType['accountType'],
						}))
					}
				>
					<Option value="seller">Seller</Option>
					<Option value="buyer">Buyer</Option>
				</Select>
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Your Email
				</Typography>
				<Input
					crossOrigin={Input}
					size="lg"
					name="email"
					value={formValues.email}
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
					value={formValues.password}
					onChange={handleFormValueChange}
					placeholder="********"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
			</div>
			<Checkbox
				crossOrigin={Checkbox}
				label={
					<Typography
						variant="small"
						color="gray"
						className="flex items-center font-normal"
					>
						I agree the
						<a
							href="#"
							className="font-medium transition-colors hover:text-gray-900"
						>
							&nbsp;Terms and Conditions
						</a>
					</Typography>
				}
				containerProps={{ className: '-ml-2.5' }}
			/>
			<Button className="mt-6" fullWidth type="submit">
				sign up
			</Button>
			<Typography
				color="gray"
				className="mt-4 text-center font-normal flex items-center "
			>
				Already have an account?{' '}
				<Button
					className="font-medium hover:bg-transparent text-gray-900 p-0 ml-1"
					variant="text"
					onClick={() => signIn()}
				>
					Sign In
				</Button>
			</Typography>
		</form>
	);
};

export default SignupForm;
