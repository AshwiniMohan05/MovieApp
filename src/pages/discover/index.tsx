import React, { useState, useEffect, useCallback } from "react";
import * as colors from "../../colors";
import styled from 'styled-components';
import { getPopularMovies, getGenres, searchMovies } from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

type Genre = { id: number; name: string };
type RatingOption = { id: number; name: string };
type LanguageOption = { id: string; name: string };

interface StateType {
  keyword: string;
  year?: number;
  results: any[];
  movieDetails: any;
  totalCount: number;
  genreOptions: Genre[];
  ratingOptions: RatingOption[];
  languageOptions: LanguageOption[];
}

export default function Discover() {
  const [state, setState] = useState<StateType>({
    keyword: '',
    year: undefined,
    results: [],
    movieDetails: null,
    totalCount: 0,
    genreOptions: [],
    ratingOptions: [
      { id: 7.5, name: '7.5' },
      { id: 8, name: '8' },
      { id: 8.5, name: '8.5' },
      { id: 9, name: '9' },
      { id: 9.5, name: '9.5' },
      { id: 10, name: '10' }
    ],
    languageOptions: [
      { id: 'GR', name: 'Greek' },
      { id: 'EN', name: 'English' },
      { id: 'RU', name: 'Russian' },
      { id: 'PO', name: 'Polish' }
    ]
  });

  useEffect(() => {
    preloadPopularMovies();
    getMovieGenres();
  }, []);

  const preloadPopularMovies = async () => {
    try {
      const popularMovies = await getPopularMovies();
      setState(prevState => ({
        ...prevState,
        results: popularMovies.results,
        totalCount: popularMovies.total_results
      }));
    } catch (error) {
      console.error("Failed to load popular movies:", error);
    }
  };

  const getMovieGenres = async () => {
    try {
      const genres = await getGenres();
      setState(prevState => ({
        ...prevState,
        genreOptions: genres.genres.map((genre: Genre) => ({ id: genre.id, name: genre.name }))
      }));
    } catch (error) {
      console.error("Failed to load genres:", error);
    }
  };

  const debouncedSearchMovies = useCallback(
    debounce(async (keyword: string, year?: number) => {
      try {
        const results = await searchMovies(keyword, year);
        setState(prevState => ({
          ...prevState,
          results: results.results,
          totalCount: results.total_results
        }));
      } catch (error) {
        console.error("Failed to search movies:", error);
      }
    }, 300),
    []
  );

  const handleSearchMovies = (keyword: string, year?: number) => {
    setState(prevState => ({
      ...prevState,
      keyword,
      year
    }));
    debouncedSearchMovies(keyword, year);
  };

  const { genreOptions, languageOptions, ratingOptions, totalCount, results } = state;

  return (
    <DiscoverWrapper>
      <Header>
        <MobilePageTitle>Discover</MobilePageTitle>
      </Header>
      <ContentWrapper>
        <MovieResults>
          {totalCount > 0 && <TotalCounter>{totalCount} results</TotalCounter>}
          <MovieList
            movies={results || []}
            genres={genreOptions || []}
          />
        </MovieResults>
        <Sidebar>
          <SearchFilters
            genres={genreOptions}
            ratings={ratingOptions}
            languages={languageOptions}
            searchMovies={handleSearchMovies}
          />
        </Sidebar>
      </ContentWrapper>
    </DiscoverWrapper>
  );
}

const DiscoverWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  color: ${colors.black};
  padding-left: 70px;
  padding-top: 26px;
  @media (min-width: 768px) {
    background-color: ${colors.white};
    display: none;
  }
`;

const MobilePageTitle = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding-left: 301px;
  }
`;

const Sidebar = styled.div`
  padding: 20px;
  border-radius: 3px;
  width: 300px;

  @media (max-width: 768px) {
    position: absolute;
    top: 48px;
    z-index: 0;
    padding: 0;
    width: unset;
  }
`;

const TotalCounter = styled.div`
  font-weight: 900;
  margin-bottom: 20px;
  color: #a9a9a9;
`;

const MovieResults = styled.div`
  margin-top: 30px;
  flex: 1;
`;

const MovieFilters = styled.div`
  @media (min-width: 768px) {
    margin-right: 20px;
    width: 30%;
  }
`;

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}