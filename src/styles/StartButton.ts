import styled from 'styled-components'

export const StartButton = styled.button`
  margin-top: 40px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  color: ${(props) => props.theme.colors.background};
  background: ${(props) => props.theme.colors.red};
  outline: 1px solid ${(props) => props.theme.colors.red};
  outline-offset: 2px;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;

  &:disabled {
    background: ${(props) => props.theme.colors.disabled};
    outline: 3px solid ${(props) => props.theme.colors.disabled};
  }
`
