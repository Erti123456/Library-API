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
  - **Whitelist Strategy:** Manually rebuilding `req.body` to prevent "Mass Assignment" vulnerabilities.
- **Immutability (The "Why"):** Understanding that modifying data in-place (mutation) can lead to bugs in larger systems; using spread operator and `.map()` to create new state.
- **Array Methods for Immutability:** 
  - `[...arr, newItem]` for adding (POST).
  - `arr.filter()` for removing (DELETE).
  - `arr.map()` for updating (PATCH/PUT).

### Completed Features:
- **Phase 1 & 2:** Full CRUD, Semantic Status Codes (201, 204, 404), Filtering, Global Search, Sorting, and Pagination.
- **Phase 3 (Current State):**
  - [x] **Global Logger:** Logs method, URL, and local time.
  - [x] **POST/PUT/PATCH Validation:** Data integrity with Whitelist strategy.
  - [x] **Centralized Error Handling:** Moving `res.status()` logic to a single middleware.
  - [x] **Immutability (Partial):** POST, DELETE, and PATCH are now fully immutable. PUT has been refactored to use `.map()`.
  - [x] **Next Parameter:** Added `next` to all route signatures to ensure correct error propagation.

### Evolutionary Roadmap:

#### Phase 3: Middleware & Safety (Remaining)
- [ ] **Sorting Mutation:** Fix the `GET /books` route to sort a copy (`[...inMemoryArr]`) instead of the original.
- [ ] **PUT Refinement:** Clean up the `PUT` route to remove the `findIndex` dependency and fix the missing `return book` in the `.map()`.

#### Phase 4: Persistence & Architecture
- **Persistence:** Moving data to `books.json`.
- **Refactoring:** Organizing into Controllers, Routes, and Middleware folders.
