'use client';

import { Books } from '@prisma/client';
import React, {
	ChangeEvent,
	ChangeEventHandler,
	useEffect,
	useState,
} from 'react';
import { BookCard } from './BookCard';
import {
	Button,
	Input,
	Option,
	Select,
	useSelect,
} from '@material-tailwind/react';
import { Badge } from '../ui/Badge';
import { Divider } from '@tremor/react';
import { Toggle } from '../ui/Toogle';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { filterCategory, categories as filters } from '@/lib/data';
import { bookFilterFields, filterCategories } from '@/typings';
import { getField } from '@/lib/helper';

const sortOptionsAsc: Sort[] = [
	{ label: 'Name', value: 'Name,ascending', type: 'ascending' },
	{ label: 'Price', value: 'Price,ascending', type: 'ascending' },
	{ label: 'Author', value: 'Author,ascending', type: 'ascending' },
];

interface Sort {
	label: 'Name' | 'Price' | 'Author';
	value: string;
	type: 'ascending' | 'descending';
}

const SearchFilter = ({ books = [] }: { books: Books[] }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('all');
	const [sortBy, setSortBy] = useState<Sort>({
		label: sortOptionsAsc[0].label,
		value: sortOptionsAsc[0].value,
		type: sortOptionsAsc[0].type,
	});
	const [currFilter, setCurrFilter] = useState<filterCategories>(
		filters[0].name,
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		console.log('change triggered -> ', sortBy);
	}, [sortBy]);

	const handleSortBy = (value: string | undefined) => {
		console.log('value => ', value);
		if (!value) {
			return;
		}
		const [label, type] = value.split(',');
		console.log(`name = ${label}, type =  ${type}`);
		setSortBy((val) => ({
			...val,
			label: label as Sort['label'],
			value,
		}));
	};

	const filteredBooks = books.filter((book) => {
		if (!selectedFilter || !currFilter) {
			return book;
		}

		return (
			book[getField(currFilter)].toLowerCase() ===
			selectedFilter.toLowerCase()
		);
	});

	const sortedBooks = [...filteredBooks].sort((a, b) => {
		const { label, type } = sortBy;

		if (label === 'Name') {
			return type === 'ascending'
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name);
		} else if (label === 'Price') {
			return type === 'ascending' ? a.price - b.price : b.price - a.price;
		} else if (label === 'Author') {
			return type === 'ascending'
				? a.author.localeCompare(b.author)
				: b.author.localeCompare(a.author);
		}

		return 0;
	});
	return (
		<div>
			<div className="flex flex-col justify-start items-center md:flex-row md:justify-between">
				<div className="relative flex w-full max-w-[24rem]">
					<Input
						crossOrigin={Input}
						type="text"
						label="Search By Name"
						value={searchTerm}
						onChange={handleSearch}
						className="pr-20"
						containerProps={{
							className: 'min-w-0',
						}}
					/>
				</div>
				<div className="flex items-center space-x-2 mt-4 lg:mt-0">
					<Select
						variant="outlined"
						label="Category"
						name="cateogry"
						onChange={(value) =>
							setCurrFilter(value as filterCategories)
						}
					>
						<Option value="">None</Option>
						{filters.map(({ name }, _) => {
							return (
								<Option
									key={name}
									value={name}
									className="capitalize"
								>
									{name}
								</Option>
							);
						})}
					</Select>
					<Select
						variant="outlined"
						label="Filter By"
						name="filter"
						onChange={(value) => setSelectedFilter(value || '')}
					>
						{!filterCategory || !currFilter ? (
							<Option value="">None</Option>
						) : (
							filterCategory[currFilter].map(
								({ name, value }, _) => {
									return (
										<Option
											key={value}
											value={value}
											className="capitalize"
										>
											{name}
										</Option>
									);
								},
							)
						)}
					</Select>
				</div>

				<div className="flex items-center justify-start space-x-2 mt-4 lg:mt-0">
					<Select
						variant="outlined"
						label="Sort By"
						name="sort"
						defaultValue={sortBy.label}
						onChange={(value) => handleSortBy(value)}
					>
						{sortOptionsAsc.map(({ label, value, type }, _) => {
							return (
								<Option
									key={value}
									value={value}
									className="capitalize"
								>
									{label}
								</Option>
							);
						})}
					</Select>
					<Toggle
						onClick={() =>
							setSortBy((val) => ({
								...val,
								type:
									val.type === 'ascending'
										? 'descending'
										: 'ascending',
							}))
						}
					>
						<ArrowUpIcon
							className={`mr-2 h-4 w-4 font-bold transition-all ${
								sortBy.type === 'descending' ? 'rotate-180' : ''
							}`}
						/>
						{sortBy.type}
					</Toggle>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
				{sortedBooks.map((item, _) => {
					return <BookCard key={item.id} data={item} />;
				})}
			</div>
		</div>
	);
};

export default SearchFilter;
