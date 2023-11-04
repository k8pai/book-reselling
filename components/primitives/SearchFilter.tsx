'use client';

import { Books } from '@prisma/client';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { BookCard } from './BookCard';
import {
	Button,
	Input,
	Option,
	Select,
	Typography,
} from '@material-tailwind/react';
import { Toggle } from '../ui/Toogle';
import { ArrowDownIcon } from '@radix-ui/react-icons';
import { filters, categories, sortOptions } from '@/lib/data';
import { Categories, filterList, Sort, Values } from '@/typings';
import { getField } from '@/lib/helper';

const SearchFilter = ({ books = [] }: { books: Books[] }) => {
	// console.log('books => ', books);

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [filter, setFilter] = useState<{
		category: Categories;
		list: filterList[];
	}>({
		category: 'genres',
		list: filters['genres'],
	});

	const [filterBy, setFilterBy] = useState<Values>('all');
	const [sortBy, setSortBy] = useState<Sort>({
		value: 'name',
		type: 'ascending',
	});

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSortBy = (value: string | undefined) => {
		if (!value) {
			return;
		}
		setSortBy((val) => ({
			...val,
			value,
		}));
	};

	const filteredBooks = books.filter((book) => {
		if (!filter.category) {
			return book;
		}

		if (filterBy === 'all') {
			return (
				book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				book.author.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		return (
			(book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
			book[getField(filter.category)].toLowerCase() === filterBy
		);
	});

	const sortedBooks = filteredBooks.sort((a, b) => {
		const { value, type } = sortBy;

		if (value === 'name') {
			return type === 'ascending'
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name);
		} else if (value === 'price') {
			return type === 'ascending' ? a.price - b.price : b.price - a.price;
		} else if (value === 'author') {
			return type === 'ascending'
				? a.author.localeCompare(b.author)
				: b.author.localeCompare(a.author);
		}

		return 0;
	});

	const changeCategory = (val: Categories) => {
		setFilter((ref) => ({
			...ref,
			category: val as Categories,
			list: filters[val as Categories],
		}));

		setFilterBy('all');
	};

	const resetFilters = () => {
		setFilter({
			category: 'genres',
			list: filters['genres'],
		});

		setSortBy({
			value: 'name',
			type: 'ascending',
		});

		setFilterBy('all');
		setSearchTerm('');
	};

	const DynamicSelect = useCallback(
		({ data }: { data: filterList[] }) => {
			return (
				<Select
					variant="outlined"
					label="Filter By"
					name="filterby"
					value={filterBy}
					defaultValue={filterBy}
					onChange={(filterVal) => setFilterBy(filterVal as Values)}
				>
					{data.map(({ name, value }, _) => {
						return (
							<Option
								index={_ + 1}
								key={`${name}-${Math.random() * 12345}`}
								value={value}
								className="capitalize"
							>
								{name}
							</Option>
						);
					})}
				</Select>
			);
		},
		[filterBy, setFilterBy],
	);

	return (
		<div>
			<div className="flex flex-col justify-start items-start lg:items-start lg:flex-row lg:justify-between">
				<div className="w-full max-w-[24rem] space-y-4">
					<div>
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
					<div className="flex items-center space-x-2">
						<Select
							variant="outlined"
							label="Sort By"
							name="sort"
							value={sortBy.value}
							onChange={(value) => handleSortBy(value)}
						>
							{sortOptions.map(({ value }, _) => {
								return (
									<Option
										key={value}
										value={value}
										className="capitalize"
									>
										{value}
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
							Descending
							<ArrowDownIcon
								className={`ml-2 h-4 w-4 font-bold transition-all`}
							/>
						</Toggle>
					</div>
				</div>
				<div className="w-full max-w-[24rem] space-y-4">
					<div className="flex flex-wrap lg:flex-nowrap items-center justify-start space-y-4 lg:space-y-0 space-x-0 lg:space-x-2 mt-4 lg:mt-0">
						<Select
							variant="outlined"
							label="Category"
							name="category"
							value={filter.category}
							onChange={(val) =>
								changeCategory(val as Categories)
							}
						>
							{categories.map(({ name }, _) => {
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
						<DynamicSelect data={filter.list} />
					</div>
					<div className="flex justify-start lg:justify-end">
						<Button
							variant="outlined"
							className="flex items-center gap-2 p-2.5"
							onClick={() => resetFilters()}
						>
							Refresh
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>
						</Button>
					</div>
				</div>
			</div>
			{sortedBooks.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
					{sortedBooks.map((item, _) => {
						return <BookCard key={item.id} data={item} />;
					})}
				</div>
			) : (
				<div className="flex items-center justify-center my-20">
					<Typography variant="h1" className="font-bold font-serif">
						No Books Found!
					</Typography>
				</div>
			)}
		</div>
	);
};

export default SearchFilter;
