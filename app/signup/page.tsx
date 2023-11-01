import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { Card, Typography } from '@/components/ui/MaterialTailwind';
import SignupForm from './SignupForm';

export default async function Page() {
	const session = await auth();

	if (session && session.user) {
		redirect('/');
	}

	return (
		<div className="flex-grow flex items-center justify-center">
			<Card
				color="transparent"
				className="p-10 rounded-lg border border-slate-700"
				shadow={false}
			>
				<Typography variant="h4" color="blue-gray">
					Sign Up
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Nice to meet you! Enter your details to register.
				</Typography>
				<SignupForm />
			</Card>
			<Toaster />
		</div>
	);
}
