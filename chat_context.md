# Project Context: Backend Learning Journey

## Project 1: Todo API (Completed)
- **Status:** In-memory CRUD logic fully implemented.
- **Features:** 
  - Create (POST)
  - Read (GET)
  - Update (PATCH with Object.assign)
  - Delete (DELETE with .filter)
- **Note:** Decided to move to a new project instead of implementing JSON file storage to broaden skills.

## Project 2: Book Library API (Current)
- **Status:** **Phase 2 Completed**.
- **Goal:** Build a professional CRUD API with advanced querying capabilities.
- **Key Learnings:**
  - **Status Code Precision:** Mastery of `201 Created` for POST and `204 No Content` for DELETE.
  - **Mutation vs. Reassignment:** Understanding how references work with `.find()` vs. needing `.findIndex()` for full array updates (`PUT`).
  - **Immutability Patterns:** Introduction to using the spread operator (`...`) for safe object merging.
  - **Type Safety in Queries:** Converting `req.query` strings to `Number` and handling `NaN` and `0`.
  - **Advanced Sorting:** Implementing logic for both numeric subtraction and `localeCompare()` for strings.
  - **Pagination Math:** Calculating `startIndex` and `endIndex` for array slicing based on `page` and `limit`.

## Technical Decisions
- **Module System:** ES Modules (`"type": "module"`).
- **Server:** Node.js + Express.
- **Working Preference:** Collaborative, step-by-step with explanations.
- **Constraint:** Do not write or modify code unless explicitly directed by the user. Always wait for a Directive before applying changes.

## Evolutionary Roadmap

### Phase 1: Structured CRUD & Status Codes (Done)
- **Semantic Responses:** Proper use of HTTP status codes (e.g., `201 Created`, `204 No Content`).
- **Resource Identification:** Implement `/books/:id` for specific item access.
- **Update Semantics:** Use `PUT` for full replacements and `PATCH` for partial updates.

### Phase 2: Professional Querying (Done)
- **Filtering:** Filtering results by specific fields (author, year, title).
- **Searching:** Global search across multiple fields (search).
- **Sorting:** Ordering results with `sortBy` and `order` (asc/desc), handling both strings and numbers.
- **Pagination:** Managing datasets with `page` and `limit`, including robust error handling for invalid inputs.

### Phase 3: Middleware & Safety (Next)
- **Validation:** Enforcing data integrity (e.g., ensuring `title` is a string in POST/PATCH).
- **Error Handling:** Centralized middleware for consistent error responses.
- **Logging:** Tracking requests for debugging and monitoring.
- **Immutability:** Ensuring query operations don't mutate the original data source.

### Phase 4: Persistence & Architecture
- **Persistence:** Moving data to a `data.json` file.
- **Refactoring:** Organizing code into a Controller/Router structure for better maintainability.
