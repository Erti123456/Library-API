# Project Context: Backend Learning Journey

## AI Role & Guidelines
- **Role:** Tutor (not a worker).
- **Primary Directive:** Do not perform any actions (code changes, refactoring, etc.) unless explicitly asked. Focus on analysis, guidance, and answering questions.

## Project 2: Book Library API (Current)
- **Status:** **Phase 6: Database Integration with Prisma (Current)**.
- **Goal:** Move from local JSON file storage to a professional relational database (PostgreSQL) using an ORM (Prisma).

### Key Learnings (Completed in Phase 5.5 & 6):
- **3-Layer Architecture:**
    - **Repositories:** Abstracting data access logic (`prisma` client).
    - **Services:** Centralizing complex business logic, validation, and error handling.
    - **Controllers:** Keeping handlers "thin" by delegating to the service layer.
- **Environment Variables:** Secured JWT secrets and `DATABASE_URL` using `.env`.
- **Database Integration:**
    - **Prisma Schema:** Defined `User` and `Book` models in `prisma/schema.prisma`.
    - **Prisma Migrations:** Successfully migrated schema to a PostgreSQL database on Neon.
    - **Prisma Client:** Instantiated and configured a global `PrismaClient` in `src/utils/prismaClient.js`.
    - **Seeding:** Created a `prisma/seed.js` script to bulk-import books from `books.json` into the database.
    - **ESM/CJS Interop:** Handled `PrismaClient` import with `import pkg from "@prisma/client"; const { PrismaClient } = pkg;`.

### Completed Features:
- **Phase 3 (Middleware & Safety):** Global logging, data validation, and error handling.
- **Phase 4 (Persistence & Architecture):** Transitioned to `books.json` with asynchronous I/O.
- **Phase 5 (Authentication & Security):** User registration/login with `bcrypt` and route protection with `JWT`.
- **Phase 5.5 (Refactoring):** Completed the 3-layer refactor for both User and Book modules.
- **Phase 6 (Book Database Migration):**
    - [x] **Book Repository Refactor:** `bookRepository.js` now uses Prisma to communicate with PostgreSQL.
    - [x] **Book Service Refactor:** `bookServices.js` now uses optimized repository methods for DB access.
    - [x] **Seeding:** Initial book data migrated to the database from `books.json`.

### Phase 6: Database Integration (Current)
- [ ] **User Repository Refactor:**
    - [ ] `userRepository.js`: Replace JSON logic with Prisma Client.
- [ ] **User Service Refactor:**
    - [ ] `userServices.js`: Update to use the new repository methods.
- [ ] **Cleanup:** Once all modules are verified, remove `books.json` and `users.json`.
