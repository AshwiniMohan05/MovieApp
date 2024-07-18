import React from "react";
import styled from 'styled-components';
import * as colors from "../../colors";

interface MovieItemProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    genre_ids: number[];
    release_date: string;
    vote_average: number;
  };
  genres: { id: number; name: string }[];
}

export default function MovieItem({ movie, genres }: MovieItemProps) {
  const genreNames = movie.genre_ids.map(genreId => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : '';
  });

  return (
    <MovieItemWrapper>
      <LeftCont>
        <Poster src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      </LeftCont>
      <RightCont>
        <TopRow>
          <MovieTitle>{movie.title}</MovieTitle>
          <Rating>{movie.vote_average.toFixed(1)}</Rating>
        </TopRow>
        <MovieGenres>
          {genreNames.map((name, index) => (
            <Genre key={index}>
              {name}
              {index < genreNames.length - 1 && <Separator>|</Separator>}
            </Genre>
          ))}
        </MovieGenres>
        <MovieOverview>{movie.overview}</MovieOverview>
        <ReleaseDate>{movie.release_date}</ReleaseDate>
      </RightCont>
    </MovieItemWrapper>
  );
}

const MovieItemWrapper = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  border-radius: 3px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    padding: 15px;

  }
`;

const LeftCont = styled.div`
  flex-shrink: 0;
`;

const Poster = styled.img`
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 3px;
  @media (max-width: 768px) {
    width: 100px;
    height: 160px;
  }
`;

const RightCont = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  flex: 1;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MovieTitle = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
  color: #333;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const MovieGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  color: ${colors.primaryColor};
  @media (max-width: 768px) {
    font-size: 0.7em;
  }
`;

const Genre = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9em;
`;

const Separator = styled.span`
  margin: 0 5px;
`;

const MovieOverview = styled.div`
  margin: 10px 0;
  color: #666;
  flex: 1;
  @media (max-width: 768px) {
    margin: 5px 0;
    font-size: 0.7em;
    max-height: 5.9em;
    overflow: hidden;
    position: relative;
    line-height: 1.2em;
    max-width: 100%;
    text-overflow: ellipsis;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1.2em;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, white 100%);
    }
  }
`;

const ReleaseDate = styled.div`
  font-size: 0.9em;
  color: ${colors.primaryColor};
  margin-top: 10px;
  @media (max-width: 768px) {
    font-size: 0.6em;
  }
`;

const Rating = styled.div`
  font-size: 1em;
  font-weight: bold;
  color: ${colors.white};
  background-color: ${colors.primaryColor};
  padding: 5px 10px;
  border-radius: 3px;
  @media (max-width: 768px) {
    padding: 2px 8px;
    font-size: 0.7em
  }
`;