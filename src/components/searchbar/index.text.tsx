import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './index';

test('renders search bar and handles input', () => {
  const searchMovies = jest.fn();
  render(<SearchBar searchMovies={searchMovies} />);

  const inputElement = screen.getByPlaceholderText('Search movies');
  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: 'Inception' } });
  expect(inputElement).toHaveValue('Inception');

  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  expect(searchMovies).toHaveBeenCalledWith('Inception');
});