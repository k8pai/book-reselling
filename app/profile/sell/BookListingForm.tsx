'use client';

import React from 'react';

import { AudienceValue, GenreValue, ThemeValue, ToneValue } from '@/typings';
import {
	Card,
	Input,
	Button,
	Typography,
	Select,
	Option,
} from '@material-tailwind/react';
import { revalidate } from '@/app/_actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { audiences, genres, themes, tones } from '@/lib/data';

type bookData = {
	name: string;
	author: string;
	image: string;
	price: number;
	contact: string;
	genre: GenreValue | '';
	tone: ToneValue | '';
	theme: ThemeValue | '';
	audience: AudienceValue | '';
};

const BookListingForm = ({ email }: { email: string }) => {
	const router = useRouter();

	const [base64Image, setBase64Image] = useState('');
	const [data, setData] = useState<bookData>({
		name: '',
		author: '',
		image: '',
		price: 0,
		contact: '',
		genre: '',
		theme: '',
		tone: '',
		audience: '',
	});

	const handleFormValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === 'image') {
			const file = e.target.files![0];
			const reader = new FileReader();

			reader.onload = () => {
				const result = reader?.result as string;
				const base64String = result.split(',')[1];
				setBase64Image(base64String);
			};

			reader.readAsDataURL(file);
		}

		setData((formdata) => ({ ...formdata, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!base64Image) {
			toast.error(
				(t) => (
					<span className="flex items-center space-x-3">
						<b>{'Try Uploading Another Cover Picture.'}</b>
						<button onClick={() => toast.dismiss(t.id)}>
							Dismiss
						</button>
					</span>
				),
				{ position: 'bottom-center' },
			);
		}

		const contents = {
			...data,
			image: base64Image,
			email,
		};

		// console.log(contents);
		const response = await fetch(`/api/books`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(contents),
			next: { tags: ['books'] },
			cache: 'no-store',
		});

		const postInfo = await response.json();
		const { res: info, error, errorCode } = postInfo;

		console.log('postInfo => ', postInfo);
		if (error) {
			toast.error(
				(t) => (
					<span className="flex items-center space-x-3">
						<b>{error}</b>
						<button onClick={() => toast.dismiss(t.id)}>
							Dismiss
						</button>
					</span>
				),
				{ position: 'bottom-center' },
			);
		}

		if (info) {
			toast.success(
				(t) => (
					<span className="flex items-center space-x-3">
						<b>Book Listed for buying</b>
						<button onClick={() => toast.dismiss(t.id)}>
							Dismiss
						</button>
					</span>
				),
				{ position: 'bottom-center' },
			);

			setTimeout(() => {
				router.push('/');
			}, 3000);
		}

		await revalidate('books');
	};
	return (
		<form
			className="mt-8 mb-2 w-full sm:w-full mx-auto"
			onSubmit={handleSubmit}
		>
			<div className="mb-1 flex flex-col gap-6">
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Book Cover
				</Typography>
				<Input
					crossOrigin={Input}
					type="file"
					size="lg"
					name="image"
					accept="image/*"
					value={data.image}
					onChange={handleFormValueChange}
					placeholder="9999 999 999"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Book Name
				</Typography>
				<Input
					crossOrigin={Input}
					size="lg"
					name="name"
					value={data.name}
					onChange={handleFormValueChange}
					placeholder="One Piece"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Author Name
				</Typography>
				<Input
					crossOrigin={Input}
					size="lg"
					name="author"
					value={data.author}
					onChange={handleFormValueChange}
					placeholder="Oda"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Genre Type
				</Typography>
				<Select
					label="Select Account Type"
					animate={{
						mount: { y: 0 },
						unmount: { y: 25 },
					}}
					name="accountType"
					value={data.genre}
					onChange={(value) =>
						setData((formdata) => ({
							...formdata,
							genre: value as GenreValue,
						}))
					}
				>
					{genres.map(({ value, name: label }, _) => (
						<Option key={value} value={value}>
							{label}
						</Option>
					))}
				</Select>

				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Tone Type
				</Typography>
				<Select
					label="Select Tone"
					animate={{
						mount: { y: 0 },
						unmount: { y: 25 },
					}}
					name="tone"
					value={data.tone}
					onChange={(value) =>
						setData((formdata) => ({
							...formdata,
							tone: value as ToneValue,
						}))
					}
				>
					{tones.map(({ value, name: label }, _) => (
						<Option key={value} value={value}>
							{label}
						</Option>
					))}
				</Select>
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Theme Type
				</Typography>
				<Select
					label="Select Theme"
					animate={{
						mount: { y: 0 },
						unmount: { y: 25 },
					}}
					name="theme"
					value={data.theme}
					onChange={(value) =>
						setData((formdata) => ({
							...formdata,
							theme: value as ThemeValue,
						}))
					}
				>
					{themes.map(({ value, name: label }, _) => (
						<Option key={value} value={value}>
							{label}
						</Option>
					))}
				</Select>

				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Audience Type
				</Typography>
				<Select
					label="Select Audience"
					animate={{
						mount: { y: 0 },
						unmount: { y: 25 },
					}}
					name="audience"
					value={data.audience}
					onChange={(value) =>
						setData((formdata) => ({
							...formdata,
							audience: value as AudienceValue,
						}))
					}
				>
					{audiences.map(({ value, name: label }, _) => (
						<Option key={value} value={value}>
							{label}
						</Option>
					))}
				</Select>

				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Book Price
				</Typography>
				<Input
					crossOrigin={Input}
					size="lg"
					name="price"
					type="number"
					value={data.price}
					onChange={handleFormValueChange}
					placeholder="10"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
				<Typography variant="h6" color="blue-gray" className="-mb-3">
					Contact
				</Typography>
				<Input
					crossOrigin={Input}
					type="tel"
					size="lg"
					name="contact"
					value={data.contact}
					onChange={handleFormValueChange}
					placeholder="9999 999 999"
					className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
					labelProps={{
						className: 'before:content-none after:content-none',
					}}
				/>
			</div>

			<Button className="mt-6" fullWidth type="submit">
				Add Book To Selling List
			</Button>
		</form>
	);
};

export default BookListingForm;
