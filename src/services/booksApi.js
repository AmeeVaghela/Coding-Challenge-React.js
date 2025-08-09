const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (searchParams) => {
  const { title, author, genre, maxResults = 20 } = searchParams;
  
  // Build search query
  let query = '';
  if (title) query += `intitle:${encodeURIComponent(title)} `;
  if (author) query += `inauthor:${encodeURIComponent(author)} `;
  if (genre) query += `subject:${encodeURIComponent(genre)} `;
  
  // If no specific fields, use general search
  if (!title && !author && !genre) {
    query = searchParams.query || '';
  }
  
  query = query.trim();
  
  if (!query) {
    throw new Error('Please provide at least one search parameter');
  }
  
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books. Please try again.');
  }
};

export const getBookDetails = async (bookId) => {
  const url = `${BASE_URL}/${bookId}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw new Error('Failed to fetch book details. Please try again.');
  }
};

