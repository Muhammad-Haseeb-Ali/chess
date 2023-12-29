import React, { useState } from "react";
import { Option, SeletedLable, Text, Wrapper } from "../styles/options.styles";
import { Button } from "../styles/login.styles";
import InviteLinkPopup from "../popups/inviteLink";
import { Navigate } from "react-router-dom";

const content = [
  {
    text: "Play online",
    icon: "",
  },
  {
    text: "Play with a friend",
    icon: "",
  },
  {
    text: "Play against computer",
    icon: "",
  },
];

const Options = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };
  const Components = {
    0: <Navigate to="/game/playonline" />,
    1: <InviteLinkPopup onClose={() => setIsOpen(false)} />,
    2: <Navigate to="/game/vscomp" />,
  };
  return (
    <>
      <Wrapper>
        {content.map((option, index) => (
          <Option
            tabIndex={index}
            selected={index === selectedIndex}
            onPointerDown={() => setSelectedIndex(index)}
            key={index}
          >
            {(index === selectedIndex) && <SeletedLable/>}
            <Text>{option.text}</Text>
          </Option>
        ))}
        <Button onPointerDown={handleClick} tabIndex="100">
          Continue
        </Button>
      </Wrapper>
      {isOpen && Components[selectedIndex]}
    </>
  );
};

const ComingSoon = () => (
  <div
    style={{
      backgroundColor: "#fff",
      color: "#000",
      padding: "25px",
      fontSize: "2.5rem",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    Coming Soon!!
  </div>
);

export default Options;
