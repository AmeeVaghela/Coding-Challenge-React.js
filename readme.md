# Take-Home Exercise: Book Explorer

## Project Overview
The **Book Explorer** is a React-based web application that allows users to search for books using the **Google Books API**, view detailed book information, and manage a personal list of favorite books. This exercise tests your skills in modern JavaScript, React fundamentals, state management, routing, form handling, testing, and best practices in accessibility and performance optimization.

---

## Functional Requirements

### 1. Search Functionality
- **Feature**: Provide a multi-field search form where users can input queries by title, author, or genre/keyword.
- **Behavior**: 
  - On submission, fetch a list of books from the Google Books API based on the provided inputs.
  - Display search results in a responsive grid or list format.
- **Display**: Each book should show:
  - Title
  - Author(s)
  - Cover image (thumbnail)
  - Brief description (if available)

### 2. Book Details
- **Feature**: Allow users to click on a book to view more detailed information.
- **Implementation**:
  - Use a dedicated details page accessible via a unique URL (e.g., `/book/:id`).
  - Optionally, implement a modal overlay as an alternative.
- **Optimization**: Use **code-splitting** (e.g., `React.lazy` and `Suspense`) to lazy load the details view for performance.

### 3. Favorites Management
- **Feature**: Enable users to add and remove books from a "favorites" list.
- **State Management**: Use a global state solution such as:
  - **Context API**
  - **Redux**
  - **MobX**
- **Display**: Provide a dedicated page (e.g., `/favorites`) to view all favorite books.

### 4. Routing and Navigation
- **Feature**: Implement client-side routing using **React Router**.
- **Routes**:
  - `/`: Search page with the search form and results.
  - `/book/:id`: Book details page for a specific book.
  - `/favorites`: Page displaying the user's favorite books.
- **Navigation**: Include a navigation bar or menu with links to the **Search** and **Favorites** pages.

### 5. Form Handling
- **Feature**: Implement a search form with multiple fields (title, author, genre) and validation.
- **Behavior**:
  - Ensure at least one field is filled before allowing submission.
  - Display user-friendly error messages for invalid submissions.
- **Optional Enhancement**: Add a form to allow users to attach notes or tags when adding a book to favorites.

### 6. User Interface & Experience
- **Responsiveness**: Ensure the application is fully responsive and works on mobile, tablet, and desktop devices.
- **Accessibility**: Use **semantic HTML** and include proper **ARIA attributes** to meet accessibility standards.
- **Styling**: Use CSS (or a CSS-in-JS solution) with attention to maintainability and scalability.

---

## Technical Requirements

### 1. Modern React & JavaScript
- Use **functional components** and **hooks** (e.g., `useState`, `useEffect`, `useMemo`) for most of the implementation.
- Write clean, modular, and well-documented code using **ES6+** features.

### 2. React Router
- Implement routing with at least three routes: `/`, `/book/:id`, and `/favorites`.
- Use dynamic routing for the book details page (e.g., `/book/:id`).
- Ensure proper navigation between pages using `Link` or `NavLink`.

### 3. Form Handling
- Use controlled components to manage form state.
- Implement form validation to ensure at least one search field is filled.
- Handle form submissions and integrate with the Google Books API.

### 4. Optional: TypeScript
- You may choose to use **TypeScript** to add type safety to your application. (This is optional but considered a plus.)

### 5. Build Tools & Bundlers
- Set up the project using a modern build toolchain (e.g., **Create React App**, **Vite**, or a custom Webpack/Babel configuration).
- Ensure that the project can be built and served locally with clear instructions.

### 6. Testing
- Write **unit and integration tests** using **Jest** and **React Testing Library**.
- Test critical components, including:
  - Search form (validation and submission)
  - Routing (navigation between pages)
  - Favorites functionality (adding/removing books)
- Aim for good test coverage to demonstrate a commitment to code quality.

### 7. Performance Optimization
- Implement performance optimizations where applicable:
  - Use **memoization** (e.g., `useMemo`, `React.memo`) to avoid unnecessary re-renders.
  - Apply **code-splitting** for lazy loading the book details page.
- Document any performance considerations in your README.

### 8. Version Control & Documentation
- Use **Git** for version control and commit your work in a logical, well-documented manner.
- Provide a **README.md** file that includes:
  - A brief overview of the project.
  - Instructions on how to set up, run, and test the application.
  - An explanation of your approach to routing, form handling, state management, and any trade-offs made.

---

## How to Use the Google Books API

### Overview
The **Google Books API** allows you to search for books and retrieve their details. In this project, it will be used to power the search functionality by fetching book data based on user queries.

### API Endpoint
- **Base URL**: `https://www.googleapis.com/books/v1/volumes?q={searchQuery}`
- **Usage**: Replace `{searchQuery}` with the user's input. For multi-field searches, construct the query accordingly (e.g., `?q=intitle:JavaScript+inauthor:Smith`).

### Key Parameters
- **`q`**: Required search query. Supports advanced search terms like `intitle:`, `inauthor:`, etc.
  - Examples: `?q=react`, `?q=intitle:JavaScript+inauthor:John`
- **`maxResults`**: Optional, limits the number of results (default: 10, max: 40).
  - Example: `?q=javascript&maxResults=20`
- **`startIndex`**: Optional, for pagination (starting index of results).
  - Example: `?q=javascript&startIndex=10`

### Response Structure
The API returns a JSON object with a list of book items under the `items` key. Each item includes:
- **`id`**: Unique book identifier.
- **`volumeInfo`**: Book details, including:
  - **`title`**: Book title.
  - **`authors`**: Array of authors.
  - **`description`**: Brief summary (optional).
  - **`imageLinks`**: Object with image URLs (e.g., `thumbnail`).

**Example Response**:
```json
{
  "items": [
    {
      "id": "xyz789",
      "volumeInfo": {
        "title": "JavaScript Basics",
        "authors": ["John Smith"],
        "description": "An introduction to JavaScript programming.",
        "imageLinks": {
          "thumbnail": "https://books.google.com/books/content?id=xyz789&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        }
      }
    }
  ]
}
