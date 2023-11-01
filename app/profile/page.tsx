import { Books } from '@prisma/client';
import { auth } from '@/lib/auth';
import Dashboard from '../../components/primitives/Dashboard';
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';

const fetchData = async () => {
	try {
		const session = await auth();

		// console.log('session => ', session);
		if (!session) {
			toast.error(
				(t) => (
					<span className="flex items-center space-x-3">
						<b>{`Login First To Edit Your Profile!`}</b>
					</span>
				),
				{ position: 'bottom-center' },
			);
			return { error: 'You need to login first!' };
		}
		// console.log('session after checking => ', session);

		const res = await fetch(
			`${process.env.NEXTAUTH_URL}/api/sellings/${session?.user?.id}`,
			{ next: { revalidate: 1 } },
		);
		const data: { data: Books[] } = await res.json();
		return { data: data.data };
	} catch (error) {
		return { error };
	}
};

export default async function Page() {
	const session = await auth();
	if (session === null) {
		redirect('/');
	}
	const { data, error } = await fetchData();

	return (
		<div>
			<Dashboard
				data={data!}
				error={(error as string) || ''}
				session={session}
			/>
			<Toaster />
		</div>
	);
}
