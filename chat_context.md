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
- **Status:** **Phase 1 Completed**.
- **Goal:** Build a CRUD API for managing a collection of books.
- **Key Learnings:**
  - **Status Code Precision:** Mastery of `201 Created` for POST and `204 No Content` for DELETE.
  - **Mutation vs. Reassignment:** Understanding how references work with `.find()` vs. needing `.findIndex()` for full array updates (`PUT`).
  - **Immutability Patterns:** Introduction to using the spread operator (`...`) for safe object merging.

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

### Phase 2: Professional Querying (Current)
- **Filtering:** Filtering results by specific fields (e.g., `?author=Orwell`).
- **Searching:** Global search across multiple fields (e.g., `?search=1984`).
- **Sorting:** Ordering results (e.g., `?sort=year:desc`).
- **Pagination:** Managing large datasets with `page` and `limit`.

### Phase 3: Middleware & Safety
- **Validation:** Enforcing data integrity (e.g., ensuring `title` is a string).
- **Error Handling:** Centralized middleware for consistent error responses.
- **Logging:** Tracking requests for debugging and monitoring.

### Phase 4: Persistence & Architecture
- **Persistence:** Moving data to a `data.json` file.
- **Refactoring:** Organizing code into a Controller/Router structure for better maintainability.
