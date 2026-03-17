# Book Library API

A robust, 3-layer architecture API for managing a library of books and user authentication, fully migrated to a PostgreSQL database using Prisma ORM.

## Features

- **3-Layer Architecture:** Clean separation between Controllers, Services, and Repositories.
- **Database:** PostgreSQL (via Neon) with Prisma ORM.
- **Authentication:** JWT (JSON Web Token) based authentication with bcrypt password hashing.
- **Security:** Environment variable management using `dotenv`.
- **API Standards:** Centralized error handling and standard HTTP status codes.

## Technologies

- Node.js (v24.1.0)
- Express.js
- Prisma ORM
- PostgreSQL
- Bcrypt
- JSONWebToken

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="your_neon_postgresql_connection_string"
   JWT_SECRET="your_secret_key"
   PORT=3000
   ```

3. **Database Migration:**
   Generate Prisma client:

   ```bash
   npx prisma generate
   ```

4. **Start Server:**

   ```bash
   npm start
   ```

## API Endpoints

### Users

- `POST /users`: Register a new user.
- `POST /users/login`: Log in to receive a JWT.

### Books

- `GET /books`: List all books (Supports filtering by `author`, `year`, `title`, and search).
- `GET /books/:id`: Get a specific book.
- `POST /books`: Create a new book (Requires Bearer Token).
- `PATCH/PUT /books/:id`: Update a book (Requires Bearer Token).
- `DELETE /books/:id`: Delete a book (Requires Bearer Token).
