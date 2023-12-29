import React from "react";
import {
  Buttons,
  Link,
  PopupButton,
  Text,
  Wrapper,
  BlurredBackdrop,
} from "../styles/inviteLink.styles";
import { v4 as uuidv4 } from "uuid";

const InviteLinkPopup = ({ onClose }) => {
  const uniqueId = uuidv4();
  const link = `http://54.144.87.229/game/${uniqueId}`;
  return (
    <>
      <BlurredBackdrop onPointerDown={onClose} />
      <Wrapper>
        <Text>
          <Link href={link}>{link}</Link>
        </Text>
        <Buttons>
          <PopupButton
            onPointerDown={() => navigator.clipboard.writeText(link)}
          >
            Copy
          </PopupButton>
          <PopupButton as="a" href={link} target="_blank">
            Open
          </PopupButton>
          {/* <PopupButton>Share</PopupButton> */}
        </Buttons>
      </Wrapper>
    </>
  );
};

export default InviteLinkPopup;
