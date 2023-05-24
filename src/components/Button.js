import styled from 'styled-components';

const Button = styled.button`
  background-color: #fff;
  border-radius: 8px;

  border: 1px solid #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: 100%;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export default Button;
