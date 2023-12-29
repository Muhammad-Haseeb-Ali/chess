import React from "react";
import { Container, Section } from "../../components/styles/global.styles";
import { Title, Div, Subtitle } from "../../components/styles/signup.styles";
import SignUpForm from "../../components/auth/signupForm";
import {
  Flex,
  FormFooter,
  StyledLink as Link,
} from "../../components/styles/login.styles";

const SignUp = () => {
  return (
    <Section>
      <Container column>
        <Div>
          <Title>
            Enter your Email and <br /> a Password
          </Title>
          <Subtitle>This allows you to log in on any device</Subtitle>
          <SignUpForm />
          <Flex>
            <Link margintop="12px" color="#80deff" to="/">
              Login - instead?
            </Link>
          </Flex>
        </Div>
      </Container>
    </Section>
  );
};

export default SignUp;
