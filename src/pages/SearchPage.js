import React, { useState, useCallback } from 'react';
import SearchForm from '../components/SearchForm';
import BookCard from '../components/BookCard';
import { searchBooks } from '../services/booksApi';
import './SearchPage.css';

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchBooks(searchParams);
      setBooks(data.items || []);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="search-page">
      <SearchForm onSearch={handleSearch} loading={loading} />
      
      {loading && (
        <div className="loading" role="status" aria-live="polite">
          <div className="loading-spinner"></div>
          <p>Searching for books...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message" role="alert">
          <h3>Search Error</h3>
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && hasSearched && books.length === 0 && (
        <div className="no-results">
          <h3>No books found</h3>
          <p>Try adjusting your search criteria or try a different search term.</p>
        </div>
      )}
      
      {!loading && !error && books.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <h2>Search Results</h2>
            <p>Found {books.length} book{books.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="books-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
      
      {!hasSearched && !loading && (
        <div className="welcome-section">
          <h2>Welcome to Book Explorer</h2>
          <p>Use the search form above to find your favorite books. You can search by title, author, or genre.</p>
          <div className="search-tips">
            <h3>Search Tips:</h3>
            <ul>
              <li>Try searching for popular authors like "Stephen King" or "J.K. Rowling"</li>
              <li>Search by genre like "Science Fiction" or "Mystery"</li>
              <li>Use specific book titles for more accurate results</li>
              <li>You can combine multiple search terms for better results</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

