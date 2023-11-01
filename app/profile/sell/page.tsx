import { Card, Typography } from '@/components/ui';
import { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';
import BookListingForm from './BookListingForm';
import { auth } from '@/lib/auth';

export default async function Page() {
	const session = await auth();

	if (!session || !session.user) {
		redirect('/');
	}

	return (
		<div className="flex-grow flex items-center justify-center py-10">
			<Card
				color="transparent"
				className="p-10 rounded-lg border border-slate-700"
				shadow={false}
			>
				<Typography variant="h4" color="blue-gray">
					Post A Book
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Add your books to listing, and who visits the website can
					see and reach out to you!
				</Typography>
				<BookListingForm email={session.user.email!} />
			</Card>
			<Toaster />
		</div>
	);
}
