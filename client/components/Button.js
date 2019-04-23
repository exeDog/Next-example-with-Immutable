import styled from 'styled-components';

export const Button = styled.button`
  padding: 12px;
  text-transform: uppercase;
  background-color: ${props => props.theme.primary};
  border-radius: 4px;
  font-size: 14px;
  color: white;
`;
