import { Card, Typography } from '@/components/ui/MaterialTailwind';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import { auth } from '@/lib/auth';

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
					Login
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Nice to meet you! Enter your details to Login.
				</Typography>
				<LoginForm />
			</Card>
		</div>
	);
}
