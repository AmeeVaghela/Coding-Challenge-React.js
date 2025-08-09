import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check if at least one field is filled
    const hasValue = Object.values(formData).some(value => value.trim() !== '');
    
    if (!hasValue) {
      newErrors.general = 'Please fill in at least one search field';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Remove empty fields from search params
      const searchParams = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value.trim() !== '')
      );
      
      onSearch(searchParams);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      genre: ''
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="search-form" noValidate>
      <div className="form-header">
        <h2>Search Books</h2>
        <p>Search for books by title, author, or genre</p>
      </div>
      
      {errors.general && (
        <div className="error-message" role="alert">
          {errors.general}
        </div>
      )}
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter book title..."
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <div id="title-error" className="error" role="alert">
              {errors.title}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter author name..."
            aria-describedby={errors.author ? "author-error" : undefined}
          />
          {errors.author && (
            <div id="author-error" className="error" role="alert">
              {errors.author}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="genre">Genre/Subject</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter genre or subject..."
            aria-describedby={errors.genre ? "genre-error" : undefined}
          />
          {errors.genre && (
            <div id="genre-error" className="error" role="alert">
              {errors.genre}
            </div>
          )}
        </div>
      </div>
      
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Searching...' : 'Search Books'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchForm;

