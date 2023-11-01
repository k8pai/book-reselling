# Book Reselling Website Documentation

Welcome to the documentation for the Book Reselling Website built with Next.js! This repository contains the source code and documentation for the website, designed to help users buy and sell books.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Contributing](#contributing)
5. [License](#license)

## Getting Started

1. First, clone the Project

```bash
git clone https://github.com/k8pai/book-reselling.git
```

2. Then, install the dependencies

```bash
npm install
# or
yarn add
# or
pnpm add
# or
bun install
```

3. Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. `.env` you need to know, should have...

```bash
DATABASE_URL="mongodb://localhost:27017" // or connect to your database for development purposes.
NEXTAUTH_SECRET='' // generate a secret from https://generate-secret.vercel.app/64
NEXTAUTH_URL='http://localhost:3000'
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

-   Feature 1 - Login

    -   Users will be able to log in to the system.
    -   User will be directed on the landing page after logging in which will have Purchasing Order page or List of Books Page.

-   Feature 2 - Registration

    -   Users will be able to Register into the system.
    -   User will be directed on the login page after registration.

-   Feature 3 - List Book

    -   User Can See List of Books.
    -   User Can View selected book details.
    -   User Can Search Book by Categories and Sub-Categories.

-   Feature 4 - Post Book

    -   Seller can Add books in the list.
    -   Seller get notification after book purchased by Buyer.

-   Add ons...
    -   Sellers can Delete the post that they added.
    -   ...

## Technologies Used

-   [Next.js (14.0V `/app` Router)](https://nextjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Node.js](https://nodejs.org/)
-   [MongoDB](https://www.mongodb.com/)
-   [Nextauth.js](https://next-auth.js.org/)
-   [Prisma](https://prisma.io/)
-   [...add any other technologies used]

## Contributing

If you'd like to contribute to this project, please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE.md).
