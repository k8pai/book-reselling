'use client';

import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/Button';
import { Books, Cart, User } from '@prisma/client';
import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Text,
	Title,
} from '@tremor/react';
import { DeleteSellingBook } from '../../app/_actions';
import toast, { Toaster } from 'react-hot-toast';
import { useFormStatus } from 'react-dom';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			aria-disabled={pending}
			color="red"
			type="submit"
			variant="destructive"
			className="flex items-center space-x-2"
		>
			<span>Delete</span>
			<TrashIcon className="h-4 w-4" />
		</Button>
	);
}

type BookData = Books & {
	user: User;
	favorites: Cart[];
};

const Sellings = ({
	data = [],
	error,
}: {
	data: BookData[];
	error: string;
}) => {
	const handleDelete = async (id: Books['id']) => {
		const { data, error } = await DeleteSellingBook(id);

		if (!data && error) {
			toast.error(
				(t) => (
					<span className="flex items-center space-x-3">
						<b>{`${error}`}</b>
					</span>
				),
				{ position: 'bottom-center' },
			);
		}

		if (data) {
			toast.success(
				(t) => (
					<span className="flex items-center space-x-3">
						<b>{`${data.name} Deleted Successfully`}</b>
					</span>
				),
				{ position: 'bottom-center' },
			);
		}
	};
	return (
		<Card>
			<Title>List Of Posted Books For Selling</Title>
			<Table className="mt-5">
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Author</TableHeaderCell>
						<TableHeaderCell>Price</TableHeaderCell>
						<TableHeaderCell>Status</TableHeaderCell>
						<TableHeaderCell>Wishlisted</TableHeaderCell>
						<TableHeaderCell>Actions</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{error ? (
						<span>something went wrong, try again!</span>
					) : (
						data &&
						data.map((item) => (
							<TableRow key={item.id}>
								<TableCell>
									<Link href={`/books/${item.id}`}>
										{item.name}
									</Link>
								</TableCell>
								<TableCell>
									<Text>{item.author}</Text>
								</TableCell>
								<TableCell>
									<Text>{item.price}</Text>
								</TableCell>
								<TableCell>
									<Badge
										color="emerald"
										icon={ArrowLeftOnRectangleIcon}
										className="rounded-md"
									>
										{'Yet to be bought'}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge
										color="blue"
										icon={HeartFilledIcon}
										className="rounded-md"
									>
										{item.favorites.length}
									</Badge>
								</TableCell>

								<TableCell>
									<form action={() => handleDelete(item.id)}>
										<SubmitButton />
									</form>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
			<Toaster />
		</Card>
	);
};

export default Sellings;
