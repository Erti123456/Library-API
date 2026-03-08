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
- **Phase 4 (Persistence & Architecture - Partial):**
  - [x] **Folder Structure:** Implemented `/src` with `controllers`, `middleware`, `models`, `routes`, and `utils`.
  - [x] **Data Migration:** Data moved to `books.json`.
  - [x] **Async Controllers:** `getBooks`, `getBookById`, `createBook`, and `deleteBook` are fully refactored to be asynchronous and persistent.
  - [x] **Error Propagation:** All async controllers use `try/catch` with `next(err)`.

### Evolutionary Roadmap:

#### Phase 4: Persistence & Architecture (Remaining)
- [ ] **Remaining Controllers:** Move `PATCH` and `PUT` logic to `booksController.js` and implement persistence.
- [ ] **Router Refactor:** Move route definitions from `index.js` to `src/routes/booksRouter.js`.
- [ ] **Clean index.js:** The final `index.js` should only contain server setup and global middleware.

#### Phase 5: Authentication & Advanced Security
- **JWT Implementation:** Protecting routes with tokens.
- **User Models:** Storing user credentials.
