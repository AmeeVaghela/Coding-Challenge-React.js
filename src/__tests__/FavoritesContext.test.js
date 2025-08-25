import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../contexts/FavoritesContext';

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  return (
    <div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <button onClick={() => addFavorite({ id: '1', title: 'Test Book' })}>
        Add Favorite
      </button>
      <button onClick={() => removeFavorite('1')}>
        Remove Favorite
      </button>
      <div data-testid="is-favorite">{isFavorite('1') ? 'true' : 'false'}</div>
    </div>
  );
};

const renderWithProvider = (component) => {
  return render(
    <FavoritesProvider>
      {component}
    </FavoritesProvider>
  );
};

describe('FavoritesContext', () => {
  test('provides initial empty favorites', () => {
    renderWithProvider(<TestComponent />);
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false');
  });

  test('adds book to favorites', () => {
    renderWithProvider(<TestComponent />);
    
    const addButton = screen.getByText('Add Favorite');
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('true');
  });

  test('removes book from favorites', () => {
    renderWithProvider(<TestComponent />);
    
    const addButton = screen.getByText('Add Favorite');
    const removeButton = screen.getByText('Remove Favorite');
    
    fireEvent.click(addButton);
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
    
    fireEvent.click(removeButton);
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('false');
  });

  test('does not add duplicate books', () => {
    renderWithProvider(<TestComponent />);
    
    const addButton = screen.getByText('Add Favorite');
    
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
  });
});

