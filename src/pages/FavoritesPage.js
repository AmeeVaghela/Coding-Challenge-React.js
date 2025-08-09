import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import BookCard from '../components/BookCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-empty">
          <h2>No Favorite Books Yet</h2>
          <p>You haven't added any books to your favorites yet.</p>
          <div className="empty-actions">
            <Link to="/" className="btn btn-primary">
              Search for Books
            </Link>
            <p className="empty-tip">
              💡 Tip: Click the heart icon on any book to add it to your favorites!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>My Favorite Books</h1>
        <p>You have {favorites.length} favorite book{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="favorites-grid">
        {favorites.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="favorites-actions">
        <Link to="/" className="btn btn-secondary">
          Search for More Books
        </Link>
      </div>
    </div>
  );
};

export default FavoritesPage;

