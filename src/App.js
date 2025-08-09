import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Navigation from './components/Navigation';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

// Lazy load the BookDetails component for code splitting
const BookDetails = lazy(() => import('./pages/BookDetails'));

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="container">
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;

