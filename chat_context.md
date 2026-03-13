# Project Context: Backend Learning Journey

## AI Role & Guidelines
- **Role:** Tutor (not a worker).
- **Primary Directive:** Do not perform any actions (code changes, refactoring, etc.) unless explicitly asked. Focus on analysis, guidance, and answering questions.

## Project 1: Todo API (Completed)
- **Status:** In-memory CRUD logic fully implemented.

## Project 2: Book Library API (Current)
- **Status:** **Phase 4 in Progress**.
- **Goal:** Transition from in-memory data to persistent storage and professional MVC architecture.

### Key Learnings (Added Today):
- **Asynchronous Programming:** Using `async/await` to handle non-blocking I/O operations (reading/writing files).
- **File System (fs) Module:** Using `node:fs/promises` to interact with the hard drive.
- **Persistence:** Moving data from RAM (`inMemoryArr`) to a permanent storage file (`books.json`).
- **MVC Architecture (Refactoring):** 
  - **Models:** Interacting with the data source (`books.json`).
  - **Controllers:** Containing the business logic (filtering, sorting, updating).
  - **Routes:** Defining the URL paths (Switchboard).
  - **Middleware:** Separated into `logger.js` and `validator.js`.
  - **Utils:** Centralized error definitions in `errors.js`.
- **JSON Serialization:** Using `JSON.parse()` and `JSON.stringify(data, null, 2)` to bridge the gap between text files and JavaScript objects.
- **Scope & Blocks:** Understanding that `let/const` variables are block-scoped (e.g., inside a `try` block).

### Completed Features:
- **Phase 3 (Middleware & Safety):** Completed. Global logging, data validation, and centralized error handling are all functional and modular.
- **Phase 4 (Persistence & Architecture):** **Completed**. 
  - [x] **Folder Structure:** Implemented `/src` with `controllers`, `middleware`, `models`, `routes`, and `utils`.
  - [x] **Data Migration:** Data moved to `books.json`.
  - [x] **Async Controllers:** All CRUD operations are fully refactored to be asynchronous and persistent.
  - [x] **Router Refactor:** Route definitions moved to `src/routes/booksRouter.js`.
  - [x] **Clean index.js:** Main entry point only contains server setup and global middleware.

### Phase 5: Authentication & Advanced Security (Completed)
- [x] **User Registration:** Implemented with `bcrypt` password hashing and duplicate checks.
- [x] **User Login:** Logic implemented to verify credentials and issue JWT tokens.
- [x] **Auth Middleware:** Created a middleware to protect modification routes.
- [x] **Secure Routing:** Applied middleware to protect POST, PUT, PATCH, and DELETE routes.

### Phase 5.5: Refactoring & Environment Variables (Current)
- **Status:** **New Session - Day 3 of Phase 5.5**.
- [x] **Environment Variables:** Moved the JWT secret to a `.env` file for better security.
- [x] **Refactoring to 3-Layered Architecture (User Module):**
    - `userRepository.js` created and implemented.
    - `userServices.js` created and implemented with full business logic and error handling.
    - `usersController.js` refactored to be thin, calling the service layer.
- [x] **Refactoring to 3-Layered Architecture (Book Repository):** `bookRepository.js` created and implemented with data access logic.
- [ ] **Refactoring to 3-Layered Architecture (Book Service):** `bookServices.js` created, ready for implementation of complex business logic (getBooks, CRUD).
- [ ] **Refactoring to 3-Layered Architecture (Book Controller):** Remaining task after service implementation.
