import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import App from '../App';

const renderWithProviders = (component) => {
  return render(
    <FavoritesProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </FavoritesProvider>
  );
};

test('renders Book Explorer title', () => {
  renderWithProviders(<App />);
  const titleElement = screen.getByText(/Book Explorer/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  renderWithProviders(<App />);
  const searchLink = screen.getByText(/Search/i);
  const favoritesLink = screen.getByText(/Favorites/i);
  expect(searchLink).toBeInTheDocument();
  expect(favoritesLink).toBeInTheDocument();
});

