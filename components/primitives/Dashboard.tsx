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
	Title,
} from '@tremor/react';
import Sellings from './Sellings';
import { Books } from '@prisma/client';
import { Session } from 'next-auth';
import { Typography } from '@material-tailwind/react';

const Dashboard = ({
	data,
	error,
	session,
}: {
	data: Books[];
	error: string;
	session: Session;
}) => {
	const isSeller = useCallback(
		() => session?.user.accountType === 'seller',
		[session],
	);

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
							<Card>
								{/* Placeholder to set height */}
								<div className="h-28" />
							</Card>
							<Card>
								{/* Placeholder to set height */}
								<div className="h-28" />
							</Card>
							<Card>
								{/* Placeholder to set height */}
								<div className="h-28" />
							</Card>
						</Grid>
						<div>
							<Typography
								variant={'h4'}
								className="font-semibold font-serif"
							>
								Profile Information
							</Typography>
						</div>
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
