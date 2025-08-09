import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookDetails } from '../services/booksApi';
import { useFavorites } from '../contexts/FavoritesContext';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBookDetails(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="book-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-details-error">
        <h2>Error Loading Book</h2>
        <p>{error}</p>
        <button onClick={handleBackClick} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-details-error">
        <h2>Book Not Found</h2>
        <p>The book you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Go to Search
        </Link>
      </div>
    );
  }

  const {
    volumeInfo: {
      title,
      authors = [],
      description = '',
      imageLinks = {},
      publishedDate,
      pageCount,
      categories = [],
      publisher,
      language,
      isbn = []
    }
  } = book;

  const thumbnail = imageLinks.thumbnail || imageLinks.smallThumbnail;
  const authorNames = authors.join(', ');
  const isbn13 = isbn.find(item => item.type === 'ISBN_13')?.identifier || '';
  const isbn10 = isbn.find(item => item.type === 'ISBN_10')?.identifier || '';

  return (
    <div className="book-details">
      <div className="book-details-header">
        <button onClick={handleBackClick} className="btn btn-secondary back-btn">
          ← Back
        </button>
        <h1>{title}</h1>
      </div>

      <div className="book-details-content">
        <div className="book-details-image">
          {thumbnail ? (
            <img 
              src={thumbnail.replace('http://', 'https://')} 
              alt={`Cover of ${title}`}
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
            className={`favorite-btn ${isFavorite(book.id) ? 'favorite' : ''}`}
            onClick={handleFavoriteToggle}
            aria-label={isFavorite(book.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(book.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>

        <div className="book-details-info">
          {authorNames && (
            <div className="info-section">
              <h3>Author{authors.length > 1 ? 's' : ''}</h3>
              <p>{authorNames}</p>
            </div>
          )}

          {publishedDate && (
            <div className="info-section">
              <h3>Published</h3>
              <p>{new Date(publishedDate).toLocaleDateString()}</p>
            </div>
          )}

          {publisher && (
            <div className="info-section">
              <h3>Publisher</h3>
              <p>{publisher}</p>
            </div>
          )}

          {pageCount && (
            <div className="info-section">
              <h3>Pages</h3>
              <p>{pageCount}</p>
            </div>
          )}

          {language && (
            <div className="info-section">
              <h3>Language</h3>
              <p>{language.toUpperCase()}</p>
            </div>
          )}

          {isbn13 && (
            <div className="info-section">
              <h3>ISBN-13</h3>
              <p>{isbn13}</p>
            </div>
          )}

          {isbn10 && (
            <div className="info-section">
              <h3>ISBN-10</h3>
              <p>{isbn10}</p>
            </div>
          )}

          {categories.length > 0 && (
            <div className="info-section">
              <h3>Categories</h3>
              <div className="categories">
                {categories.map((category, index) => (
                  <span key={index} className="category-tag">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {description && (
            <div className="info-section">
              <h3>Description</h3>
              <div className="description">
                {description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

