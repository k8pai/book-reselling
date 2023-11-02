'use client';

import { createWorkflow } from '@/lib/helper';
import { Breadcrumbs } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Workflow() {
	const router = usePathname();

	const url = createWorkflow(router);
	const len = url.length;
	return (
		<div className="p-3 md:p-6 md:px-10">
			<Breadcrumbs>
				{url.map(({ label, path }, _) => {
					return (
						<Link
							href={path}
							key={path}
							className={_ + 1 !== len ? 'opacity-60' : ''}
						>
							{label}
						</Link>
					);
				})}
			</Breadcrumbs>
		</div>
	);
}
