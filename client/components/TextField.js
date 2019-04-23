import styled from 'styled-components';

export const TextField = styled.input.attrs({
  type: 'text',
})`
  -webkit-appearance: none;
  outline: none;

  font-size: 14px;
  padding: 10px 10px 10px 5px;
  background: transparent;
  display: block;
  width: 300px;
  border: none;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  margin: 3px;
`;
