import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FavoritesContext = createContext();

const initialState = {
  favorites: [],
  loading: false,
  error: null
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const existingIndex = state.favorites.findIndex(
        book => book.id === action.payload.id
      );
      if (existingIndex === -1) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      }
      return state;
    
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(book => book.id !== action.payload)
      };
    
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('bookExplorerFavorites');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: 'SET_FAVORITES', payload: favorites });
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('bookExplorerFavorites', JSON.stringify(state.favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [state.favorites]);

  const addFavorite = (book) => {
    dispatch({ type: 'ADD_FAVORITE', payload: book });
  };

  const removeFavorite = (bookId) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: bookId });
  };

  const isFavorite = (bookId) => {
    return state.favorites.some(book => book.id === bookId);
  };

  const value = {
    favorites: state.favorites,
    loading: state.loading,
    error: state.error,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

