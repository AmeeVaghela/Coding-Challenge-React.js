import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import './BookCard.css';

const BookCard = memo(({ book }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(book.id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  const {
    id,
    volumeInfo: {
      title,
      authors = [],
      description = '',
      imageLinks = {},
      publishedDate,
      pageCount,
      categories = []
    }
  } = book;

  const thumbnail = imageLinks.thumbnail || imageLinks.smallThumbnail;
  const authorNames = authors.join(', ');
  const shortDescription = description.length > 150 
    ? `${description.substring(0, 150)}...` 
    : description;

  return (
    <article className="book-card" data-testid="book-card">
      <div className="book-card-image">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={`Cover of ${title}`}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-book.png';
              e.target.alt = 'Book cover not available';
            }}
          />
        ) : (
          <div className="book-placeholder">
            <span>📚</span>
            <p>No cover available</p>
          </div>
        )}
        
        <button
          className={`favorite-btn ${favorite ? 'favorite' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="book-card-content">
        <Link to={`/book/${id}`} className="book-title">
          <h3>{title}</h3>
        </Link>
        
        {authorNames && (
          <p className="book-author" aria-label={`Author: ${authorNames}`}>
            by {authorNames}
          </p>
        )}
        
        {publishedDate && (
          <p className="book-date">
            Published: {new Date(publishedDate).getFullYear()}
          </p>
        )}
        
        {pageCount && (
          <p className="book-pages">
            {pageCount} pages
          </p>
        )}
        
        {categories.length > 0 && (
          <div className="book-categories">
            {categories.slice(0, 2).map((category, index) => (
              <span key={index} className="category-tag">
                {category}
              </span>
            ))}
          </div>
        )}
        
        {shortDescription && (
          <p className="book-description" aria-label="Book description">
            {shortDescription}
          </p>
        )}
      </div>
    </article>
  );
});

BookCard.displayName = 'BookCard';

export default BookCard;

