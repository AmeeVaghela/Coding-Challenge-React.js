import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import App from '../App';

const renderWithProviders = (component) => {
  return render(
    <FavoritesProvider>
      {component}
    </FavoritesProvider>
  );
};

test('renders Book Explorer title', () => {
  renderWithProviders(<App />);
  const titleElement = screen.getByText(/📚 Book Explorer/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  renderWithProviders(<App />);
  const searchLink = screen.getByRole('link', { name: /Search/i });
  const favoritesLink = screen.getByRole('link', { name: /Favorites/i });
  expect(searchLink).toBeInTheDocument();
  expect(favoritesLink).toBeInTheDocument();
});

