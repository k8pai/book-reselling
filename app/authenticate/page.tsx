import Link from 'next/link';
import React from 'react';

const page = () => {
	return (
		<div>
			<Link href={'/authenticate/login'}>login</Link>
			<Link href={'/authenticate/signup'}>signup</Link>
		</div>
	);
};

export default page;
