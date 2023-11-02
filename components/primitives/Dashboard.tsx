'use client ';

import React, { useCallback } from 'react';
import {
	Card,
	Grid,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Text,
	TextInput,
	Title,
} from '@tremor/react';
// import { TextInput } from '@tremor/react';

import Sellings from './Sellings';
import { Books, Cart, User } from '@prisma/client';
import { Session } from 'next-auth';
// import { Typography } from '@material-tailwind/react';

type BookData = Books & {
	user: User;
	favorites: Cart[];
};

const Dashboard = ({
	data,
	error,
	session,
}: {
	data: BookData[];
	error: string;
	session: Session;
}) => {
	const isSeller = useCallback(
		() => session?.user.accountType === 'seller',
		[session],
	);

	const {
		user: { accountType, email, name, id },
	} = session;

	return (
		<main className="p-12">
			<Title>Account Settings</Title>
			<Text>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
			</Text>

			<TabGroup className="mt-6">
				<TabList>
					<Tab>Account</Tab>
					<Tab>Settings</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Grid
							numItemsMd={2}
							numItemsLg={3}
							className="gap-6 mt-6"
						>
							<Card className="space-y-5">
								<div className="space-y-3">
									<span>Name</span>
									<TextInput
										placeholder={name ?? ''}
										disabled={true}
										className="rounded-md w-full max-w-xl"
									/>
								</div>
								<div className="space-y-3">
									<span>User ID</span>
									<TextInput
										placeholder={id ?? ''}
										disabled={true}
										className="rounded-md w-full max-w-xl"
									/>
								</div>
							</Card>
							<Card>
								<div className="space-y-3">
									<span>Email</span>
									<TextInput
										placeholder={email ?? ''}
										disabled={true}
										className="rounded-md w-full max-w-xl"
									/>
								</div>
							</Card>
							<Card>
								<div className="space-y-3">
									<span>Account Type</span>
									<TextInput
										placeholder={accountType ?? ''}
										disabled={true}
										className="rounded-md w-full max-w-xl"
									/>
								</div>
							</Card>
						</Grid>
						{/* <div className="space-y-6">
							<div className="space-y-3">
								<span>Name</span>
								<TextInput
									placeholder={name ?? ''}
									disabled={true}
									className="rounded-md w-full max-w-xl"
								/>
							</div>
							<div className="space-y-3">
								<span>Email</span>
								<TextInput
									placeholder={email ?? ''}
									disabled={true}
									className="rounded-md w-full max-w-xl"
								/>
							</div>
							<div className="space-y-3">
								<span>Account Type</span>
								<TextInput
									placeholder={accountType ?? ''}
									disabled={true}
									className="rounded-md w-full max-w-xl"
								/>
							</div>
						</div> */}
						<div className="mt-6">
							{isSeller() && (
								<Sellings
									data={data!}
									error={(error as string) || ''}
								/>
							)}
						</div>
					</TabPanel>
					<TabPanel>
						<div className="mt-6">
							{isSeller() && (
								<Sellings
									data={data!}
									error={(error as string) || ''}
								/>
							)}
						</div>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</main>
	);
};

export default Dashboard;
