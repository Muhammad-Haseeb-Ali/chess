import styled from "styled-components";

export const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  // @media (max-width: 640px) {
  //   width:80%;
  // }
`;

export const Status = styled.div`
  position: fixed;
  z-index: 300;
  inset: 0;
  text-align: center;
  font-size: 5rem;
  font-weight: 600;
  font-family: "poppins";
  letter-spacing: 10px;
  color: white;
  border: 2px;
  border-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  

`;
