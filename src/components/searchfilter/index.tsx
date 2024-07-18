import React from "react";
import styled from 'styled-components';
import * as colors from "../../colors";
import SearchBar from "../searchbar";
import ExpandableFilters from "../expandablefilters";

interface SearchFiltersProps {
  genres: Array<{ id: number | string; name: string }>;
  ratings: Array<{ id: number | string; name: string }>;
  languages: Array<{ id: number | string; name: string }>;
  searchMovies: (keyword: string, year?: number) => void;
}

export default function SearchFilters({ genres, ratings, languages, searchMovies }: SearchFiltersProps) {
  return (
    <FiltersWrapper>
      <SearchFiltersCont className="search_inputs_cont">
        <SearchBar searchMovies={searchMovies} />
      </SearchFiltersCont>
      <SearchFiltersCont>
        <CategoryTitle>Movie</CategoryTitle>
        <ExpandableFilters title="Select genre(s)" options={genres} defaultExpanded />
        <ExpandableFilters title="Select min. vote" options={ratings} />
        <ExpandableFilters title="Select language" options={languages} />
      </SearchFiltersCont>
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    .search_inputs_cont {
      display: block;
      background-color: unset;
    }
  }
`;

const SearchFiltersCont = styled.div`
  background-color: ${colors.white};
  border-radius: 3px;
  transition: all .3s ease-in-out;
  padding: 20px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    padding: 0;
    margin-top: 20px;
    &:not(.search_inputs_cont) {
      display: none;
    }
  }
`;

const CategoryTitle = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
`;