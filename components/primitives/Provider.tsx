'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode, useEffect } from 'react';

const Provider = ({ children }: { children: ReactNode }) => {
	useEffect(() => {
		// @ts-ignore
		import('preline');
	}, []);

	return (
		<ThemeProvider>
			<SessionProvider>{children}</SessionProvider>
		</ThemeProvider>
	);
};

export default Provider;
