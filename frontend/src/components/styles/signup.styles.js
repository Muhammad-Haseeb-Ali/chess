import styled from "styled-components";
import { Form, Input } from "./login.styles";

export const Title = styled.div`
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
  letter-spacing: 2px;
  margin: 30px auto;
`;
export const Subtitle = styled.div`
  font-size: 1.3rem;
  color: #c9c8c7;
  margin-bottom: 4rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export const Div = styled.div`
  max-width: 500px;
  background: rgb(96 94 94 / 74%);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.7px);
  -webkit-backdrop-filter: blur(11.7px);
  border: 1px solid rgba(33, 32, 32, 0.69);
  padding: 10px 40px 15px 40px;
  @media (max-width: 640px) {
    width:350px
  }
`;

export const SignupForm = styled(Form)`
  background: transparent;
  border-radius: 0px;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border: none;
  padding: 0px;
 
`;
export const SignupInput = styled(Input)`
  height: 3rem;
  width: 100%;
  padding: 0px 20px;
  
`;
