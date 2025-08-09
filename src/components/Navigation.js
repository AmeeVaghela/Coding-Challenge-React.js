import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-brand" aria-label="Go to home page">
            <h1>📚 Book Explorer</h1>
          </Link>
          
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
              >
                Search
              </Link>
            </li>
            <li>
              <Link 
                to="/favorites" 
                className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                aria-current={location.pathname === '/favorites' ? 'page' : undefined}
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="favorites-count" aria-label={`${favorites.length} favorite books`}>
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

