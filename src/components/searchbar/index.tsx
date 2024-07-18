import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";

interface SearchBarProps {
  searchMovies: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchMovies }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <SearchBarContainer>
      <InputContainer className="mobile-only">
        <IconWrapper>
          <img src={SearchIcon} alt="Search" />
        </IconWrapper>
        <Input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search for movies..."
          style={{ fontWeight: query ? 'bold' : 'normal' }}
        />
      </InputContainer>
      <InputContainer className="desktop-only">
        <IconWrapper>
          <img src={CalendarIcon} alt="Calendar" />
        </IconWrapper>
        <Input
          type="text"
          placeholder="Year of release"
        />
      </InputContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  background-color: white;
  border-radius: 3px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: unset;

  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${colors.primaryColor};
  margin-bottom: 20px;

  &.mobile-only {
    @media (max-width: 769px) {
      width: 348px;
      // display: none;
    }
  }

  &.desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const IconWrapper = styled.div`
  padding: 10px;
  img {
    width: 24px;
    height: 24px;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  color: ${colors.primaryColor};
  &::placeholder {
    color: ${colors.primaryColor};
  }
`;