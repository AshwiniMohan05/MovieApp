import React from "react";
import styled from 'styled-components';
import MovieItem from '../movieitem';

type MovieListProps = {
  movies: Array<any>;
  genres: Array<Genre>;
}

type Genre = {
  id: number;
  name: string;
};

export default function MovieList({ movies, genres }: MovieListProps) {
  return (
    <MoviesWrapper>
      {movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} genres={genres} />
      ))}
    </MoviesWrapper>
  );
}

const MoviesWrapper = styled.div`
  position: relative;
  flex: 1;
`;