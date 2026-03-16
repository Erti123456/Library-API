# Project Context: Backend Learning Journey

## AI Role & Guidelines
- **Role:** Tutor (not a worker).
- **Primary Directive:** Do not perform any actions (code changes, refactoring, etc.) unless explicitly asked. Focus on analysis, guidance, and answering questions.

## Project 2: Book Library API (Current)
- **Status:** **Phase 6: Database Integration with Prisma (Current)**.
- **Goal:** Move from local JSON file storage to a professional relational database (PostgreSQL) using an ORM (Prisma).

### Key Learnings (Completed in Phase 5.5):
- **3-Layer Architecture:**
    - **Repositories:** Abstracting data access logic (`fs/promises`).
    - **Services:** Centralizing complex business logic, validation, and error handling.
    - **Controllers:** Keeping handlers "thin" by delegating to the service layer.
- **Environment Variables:** Secured JWT secrets using `.env`.
- **Error Handling:** Centralized definitions in `errors.js` used across all layers.

### Completed Features:
- **Phase 3 (Middleware & Safety):** Global logging, data validation, and error handling.
- **Phase 4 (Persistence & Architecture):** Transitioned to `books.json` with asynchronous I/O.
- **Phase 5 (Authentication & Security):** User registration/login with `bcrypt` and route protection with `JWT`.
- **Phase 5.5 (Refactoring):** Completed the 3-layer refactor for both User and Book modules.

### Phase 6: Database Integration (Current)
- [ ] **Dependency Setup:** Install `prisma` and `@prisma/client`.
- [ ] **Prisma Initialization:** Initialize Prisma and configure the database connection string in `.env`.
- [ ] **Schema Definition:** Define `User` and `Book` models in `prisma/schema.prisma`.
- [ ] **Migration:** Run migrations to create the PostgreSQL tables.
- [ ] **Repository Refactor (Prisma):** 
    - [ ] `userRepository.js`: Replace JSON logic with Prisma Client.
    - [ ] `bookRepository.js`: Replace JSON logic with Prisma Client.
- [ ] **Cleanup:** Remove `books.json` and `users.json` once migration is fully verified.
