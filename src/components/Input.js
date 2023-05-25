import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 600px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  flex: 1;
  width: 100%;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const CustomInput = ({ label,  getAddressBalance, ...rest }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputWrapper >
        <Input {...rest}/>
        <IconWrapper>
          <SearchIcon style = {{cursor: "pointer"}} onClick = {getAddressBalance}/>
        </IconWrapper>
      </InputWrapper>
    </InputContainer>
  );
};

export default CustomInput;
