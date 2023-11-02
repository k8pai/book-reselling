import { Books } from '@prisma/client';
import { auth } from '@/lib/auth';
import Dashboard from '../../components/primitives/Dashboard';
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { getSellingList } from '@/lib/database';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const session = await auth();
	if (session === null) {
		redirect('/');
	}
	const { data, error } = await getSellingList(session?.user?.id);

	console.log('data => ', data);

	return (
		<div>
			<Dashboard data={data!} error={error as string} session={session} />
			<Toaster />
		</div>
	);
}
