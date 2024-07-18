import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  return (
    <CheckboxContainer>
      <StyledCheckbox type="checkbox" />
      <Label>{label}</Label>
    </CheckboxContainer>
  );
}

export default Checkbox;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  font-size: 1em;
`;