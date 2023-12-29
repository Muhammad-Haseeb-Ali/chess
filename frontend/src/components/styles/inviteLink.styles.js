import styled from "styled-components";
import { Button } from "./login.styles";

export const BlurredBackdrop = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(2px);
  z-index: 100; /* Adjust the z-index based on your application's needs */
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* background-color: aqua; */
 
`;

export const Wrapper = styled.div`
  position: fixed;
  padding: 35px 25px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: #262522; */
  background: rgb(28 28 28/ 74%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(35.7px);
  -webkit-backdrop-filter: blur(11.7px);
  height: fit-content;
  min-width: 500px;
  z-index: 200;
  @media (max-width: 640px) {
    min-width: 200px;
  }
 
`;
export const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  
`;
export const Link = styled.a`
  text-decoration: underline;
  color: #008080;
  font-size: 1rem;
  &:focus {
  }
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;
`;
export const PopupButton = styled(Button)`
  text-decoration: underline;
  line-height: 2px;
  background-color: transparent;
  color: #008080;
  border: none;
  padding: 0.6rem;
  margin: 10px;
  width: fit-content;
  
`;
