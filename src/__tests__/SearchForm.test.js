import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from '../components/SearchForm';

const mockOnSearch = jest.fn();

describe('SearchForm', () => {
  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search form with all fields', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    expect(screen.getByLabelText(/Book Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Genre\/Subject/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search Books/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });

  test('shows error when form is submitted with empty fields', async () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const submitButton = screen.getByRole('button', { name: /Search Books/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please fill in at least one search field/i)).toBeInTheDocument();
    });
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('calls onSearch with form data when valid form is submitted', async () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const titleInput = screen.getByLabelText(/Book Title/i);
    const submitButton = screen.getByRole('button', { name: /Search Books/i });
    
    await userEvent.type(titleInput, 'React');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith({ title: 'React' });
    });
  });

  test('disables submit button when loading', () => {
    render(<SearchForm onSearch={mockOnSearch} loading={true} />);
    
    const submitButton = screen.getByRole('button', { name: /Searching.../i });
    expect(submitButton).toBeDisabled();
  });

  test('resets form when reset button is clicked', async () => {
    render(<SearchForm onSearch={mockOnSearch} loading={false} />);
    
    const titleInput = screen.getByLabelText(/Book Title/i);
    const resetButton = screen.getByRole('button', { name: /Reset/i });
    
    await userEvent.type(titleInput, 'React');
    expect(titleInput).toHaveValue('React');
    
    fireEvent.click(resetButton);
    expect(titleInput).toHaveValue('');
  });
});

