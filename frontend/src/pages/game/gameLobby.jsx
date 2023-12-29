import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Section } from "../../components/styles/global.styles";
import { RiLogoutCircleLine } from "react-icons/ri";
import styled from "styled-components";
import { clearAllCookies } from "../../utils/readCookies";
import { useNavigate } from "react-router-dom";

const Icon = styled(RiLogoutCircleLine)`
  position: fixed;
  left: 30px;
  top: 30px;
  align-self: flex-start;
  width: 2em;
  height: 2em;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;

const GameLobby = () => {
  const navigate = useNavigate();
  const logout = () => {
    clearAllCookies();
    navigate("/", { replace: true });
  };
  return (
    <Section>
      <Container>
        <Icon onClick={logout} />
        <Outlet />
      </Container>
    </Section>
  );
};

export default GameLobby;
