# Library API

Monorepo project with a React frontend and an Express + Prisma backend for managing a book library.

## What It Does

- User registration and login with JWT auth
- Book listing with pagination and search
- Create, update, and delete books for authenticated users
- Daily delete limit: each user can delete up to 10 books per day
- PostgreSQL database through Prisma
- Seed support through `backend/books.json` and the Prisma seed script
- Vercel routing for frontend + backend under one project

## Project Structure

```text
.
├── backend
│   ├── prisma
│   ├── src
│   ├── books.json
│   └── package.json
├── frontend
│   ├── src
│   └── package.json
└── vercel.json
```

## Stack

### Frontend

- React
- React Router
- Vite
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- bcrypt
- jsonwebtoken

## API Routes

All backend routes are mounted under `/api`.

### Auth

- `POST /api/users/register`
- `POST /api/users/login`

### Books

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `PATCH /api/books/:id`
- `DELETE /api/books/:id`

### Books Query Params

- `page`
- `limit`
- `search`
- `author`
- `title`
- `year`
- `sortBy`
- `order`

## Local Setup

### 1. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Create `backend/.env`:

```env
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_secret_key"
PORT=3000
```

### 3. Generate Prisma client

```bash
cd backend
npx prisma generate
```

### 4. Apply migrations

```bash
cd backend
npx prisma migrate deploy
```

### 5. Seed the database

This project includes `backend/books.json` and a seed script in `backend/prisma/seed.js`.

```bash
cd backend
node --env-file=.env prisma/seed.js
```

### 6. Run locally

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

The frontend dev server proxies `/api` requests to the backend on `http://localhost:3000`.

## Frontend Features

- Home page with auth-aware navigation
- Login page
- Register page
- Bookshelf page
- Search books by query
- Jump directly to a page number
- Add / update form
- Protected update and delete controls

## Daily Delete Limit

Authenticated users can delete at most 10 books per day.

The backend stores:

- `deleteCountToday`
- `deleteCountDate`

on the `User` model and resets the counter when the day changes.

## Vercel Deployment

This repo is configured for a single Vercel project.

### Required environment variables in Vercel

- `DATABASE_URL`
- `JWT_SECRET`

### Deployment notes

- Frontend is built from `frontend/package.json`
- Backend is deployed from `backend/src/index.js`
- API traffic goes through `/api/*`
- SPA routes fall back to `index.html`

The deployment config is in [vercel.json](/home/samuel/Library-API/vercel.json).
