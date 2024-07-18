import React, { useState } from "react";
import styled from 'styled-components';

interface ExpandableFiltersProps {
  title: string;
  options: Array<{ id: number | string; name: string }>;
  defaultExpanded?: boolean;
}

export default function ExpandableFilters({ title, options, defaultExpanded = false }: ExpandableFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <FiltersWrapper>
      <FilterTitle onClick={toggleExpand}>
        <ExpandIcon>{isExpanded ? '-' : '+'}</ExpandIcon>
        {title}
      </FilterTitle>
      {isExpanded && (
        <FilterOptions>
          {options.map(option => (
            <FilterOption key={option.id}>
              <input type="checkbox" id={option.id.toString()} />
              <label htmlFor={option.id.toString()}>{option.name}</label>
            </FilterOption>
          ))}
        </FilterOptions>
      )}
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  margin-bottom: 20px;
`;

const FilterTitle = styled.div`
  font-size: 1.2em;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ExpandIcon = styled.span`
  font-size: 1.2em;
  margin-right: 10px;
`;

const FilterOptions = styled.div`
  margin-top: 10px;
  label {
    margin-left: 10px;
  }
`;

const FilterOption = styled.div`
  margin-bottom: 10px;
`;