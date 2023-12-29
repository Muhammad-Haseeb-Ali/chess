import styled from "styled-components";
import { Container } from "./global.styles";
import { Link } from "react-router-dom";

export const Button = styled.button`
  font-size: 1rem;
  width: 100%;
  margin-top: 30px;
  background-color: #008080;
  font-weight: bold;
  color: #fff;
  padding: 15px 30px;
  border-radius: 15px;
  outline: none;
  border-color: #778899;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
 
`;

export const Form = styled.form`
 
  max-width: 450px;
  padding: 50px;
  /* background-color: #262421; */
  color: #fff;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;

  background: rgb(96 94 94 / 74%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.7px);
  -webkit-backdrop-filter: blur(11.7px);
  border: 1px solid rgba(33, 32, 32, 0.69);
  @media (max-width: 640px) {
    width:60%;
   margin:auto
  }
  @media (max-width: 768px) {
    width:80%;
margin:auto
    
   }
   @media (min-width: 1024px) {
     width:100%;
   }
`
export const StyledLink = styled(Link)`
  color: ${({ color }) => (color ? color : "#009fd9")};
  margin-left: ${({ marginleft }) => (marginleft ? "auto" : "")};
  margin-right: ${({ marginright }) => (marginright ? "auto" : "")};
  margin-top: ${({ margintop }) => (margintop ? margintop : "")};

  &:focus {
    outline: none;
  }
  font-size: 1rem;
  text-decoration: none;
`;
export const Flex = styled.div`
  display: flex;
  align-items: ${(props) => (props.items ? props.items : "center")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
`;

export const Input = styled.input`
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 20px;
  width: 100%;
  /* background-color: #3c3a38 !important; */
  background-color: #e8f0fe;
  color: #9e9d9c;
  margin: 10px auto;
  outline: none;
  &:-webkit-autofill {
    -webkit-text-fill-color: #9e9d9c;
    background-color: none;
  }
  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`;

export const FormFooter = styled(Container)`
  /* background-color: #211f1c; */
  padding: 20px;
  gap: 10px;
  background: rgb(24 22 22 / 74%);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.7px);
  -webkit-backdrop-filter: blur(11.7px);
  border: 1px solid rgba(33, 32, 32, 0.69);
  @media (max-width: 640px) {
    width:60%;
  
  }
  @media (max-width: 768px) {
    width:80%;
   }
   @media (min-width: 1024px) {
     width:100%;
   }
 
`;
export const Div = styled.div`
  color: #fff;
  font-size: 1rem;
`;
