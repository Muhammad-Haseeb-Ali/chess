import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    /* background-color: ${({ theme }) => theme.color.body}; */
    margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  margin: auto;
`;
export const Section = styled.section`
  width: 100vw;
  height: 100vh;
  /* background-color: ${({ bg, theme }) => (bg ? bg : theme.color.body)}; */
`;
