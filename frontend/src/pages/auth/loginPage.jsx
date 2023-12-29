import React from "react";
import {
  StyledLink as Link,
  FormFooter,
  Div,
} from "../../components/styles/login.styles";

import { Container, Section } from "../../components/styles/global.styles";
import LoginForm from "../../components/auth/loginForm";

const LoginPage = () => {
  return (
    <Section>
      <Container>
        <Div>
          <LoginForm />
          <FormFooter>
            <Div>New?</Div>
            <Link to="/signup">Sign Up - and start Playing!</Link>
          </FormFooter>
        </Div>
      </Container>
    </Section>
  );
};

export default LoginPage;
