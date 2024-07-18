import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchFilters from './index';

jest.mock('../searchbar', () => jest.fn(() => <div>SearchBar Component</div>));
jest.mock('../expandablefilters', () => jest.fn(() => <div>ExpandableFilters Component</div>));

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Drama' },
];

const ratings = [
  { id: 7.5, name: '7.5' },
  { id: 8, name: '8' },
];

const languages = [
  { id: 'EN', name: 'English' },
  { id: 'FR', name: 'French' },
];

const searchMovies = jest.fn();

test('renders SearchFilters component', () => {
  render(<SearchFilters genres={genres} ratings={ratings} languages={languages} searchMovies={searchMovies} />);

  expect(screen.getByText('SearchBar Component')).toBeInTheDocument();

  expect(screen.getAllByText('ExpandableFilters Component')).toHaveLength(3);

  expect(screen.getByText('Movie')).toBeInTheDocument();
});