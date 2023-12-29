import styled from "styled-components";

export const Wrapper = styled.div`
  max-height: 90vh;
  width: 430px;
  padding: 20px 35px;
  background-color: #ffffff33;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  @media (max-width: 640px) {
    width:80%
   
  }
`;
export const Option = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #262522;
  background: rgb(28 28 28/ 74%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(35.7px);
  -webkit-backdrop-filter: blur(11.7px);
  border: 1px solid rgba(33, 32, 32, 0.69);
  padding-left: 30px;
  margin: 10px 0px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 2px solid;
  border-color: ${({ selected }) => (selected ? "#778899" : "#262522")};
  transform: scale(0.9);
  transition: transform 0.1s ease-out;

  &:hover {
    cursor: pointer;
    transform: scale(1);
  }
`;
export const Text = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  position: relative;
  color: #fff;
  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

export const SeletedLable = styled.div`
width: 20px;
aspect-ratio: 1/1;
background-color: transparent;
border: 5px solid white;
border-radius: 10px;
margin-right: 10px;
`
