# Project Context: Backend Learning Journey

## AI Role & Guidelines
- **Role:** Tutor (not a worker).
- **Primary Directive:** Do not perform any actions (code changes, refactoring, etc.) unless explicitly asked. Focus on analysis, guidance, and answering questions.

## Project 1: Todo API (Completed)
- **Status:** In-memory CRUD logic fully implemented.
- **Features:** Create, Read, Update, Delete.

## Project 2: Book Library API (Current)
- **Status:** **Phase 3 in Progress**.
- **Goal:** Build a professional CRUD API with middleware, safety, and modularity.

### Key Learnings (Added Today):
- **Middleware Fundamentals:** Understanding the `(req, res, next)` cycle and the importance of `next()`.
- **Global vs. Route-Specific Middleware:** Using `app.use()` for logs and injecting named functions for specific route validation.
- **Data Integrity & Security:** 
  - Implementing `typeof` checks to ensure correct data formats.
  - **Whitelist Strategy:** Manually rebuilding `req.body` to prevent "Mass Assignment" vulnerabilities (ignoring unauthorized extra properties).
- **Time Formatting:** Using `.toLocaleString()` for human-readable server logs.

### Completed Features:
- **Phase 1 & 2:** Full CRUD, Semantic Status Codes (201, 204, 404), Filtering, Global Search, Sorting (String vs. Number), and Pagination.
- **Phase 3 (Partial):**
  - **Global Logger:** Logs method, URL, and local time for every request.
  - **POST/PUT Validation:** Ensures `title` (string), `author` (string), and `year` (number) are valid before processing.

### Evolutionary Roadmap:

#### Phase 3: Middleware & Safety (Current)
- [x] **Logging:** Request tracking with local timestamps.
- [x] **POST/PUT Validation:** Data integrity with a Whitelist strategy.
- [ ] **PATCH Validation:** Handling partial updates (validate only if field exists).
- [ ] **Centralized Error Handling:** Moving `res.status()` logic to a single middleware.
- [ ] **Immutability:** Ensuring operations don't mutate the original data source.

#### Phase 4: Persistence & Architecture
- **Persistence:** Moving data to `books.json`.
- **Refactoring:** Organizing into Controllers, Routes, and Middleware folders.
