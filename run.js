const bcArr = (arr = 'home/') => {
	const segments = arr.split('/').filter(Boolean);

	const resultArray = [
		{ label: 'Home', path: '/' },
		...segments.map((segment, index) => {
			const path = `/${segments.slice(0, index + 1).join('/')}`;
			const label = segment.charAt(0).toUpperCase() + segment.slice(1);
			return { label, path };
		}),
	];

	console.log(resultArray);
	return resultArray;
};

bcArr('/profile/sell');
bcArr('/profile/sell');
bcArr('/');
