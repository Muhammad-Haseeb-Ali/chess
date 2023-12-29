import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  StyledLink as Link,
  Flex,
} from "../styles/login.styles";
import { login } from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    // console.log(res);
    if (res?.status === "success") {
      navigate(state?.from || "/game");
      toast.success("Successfully logged in");
    } else {
      toast.error("Wrong Email or Password");

    }
  };
  return (
    <Form onSubmit={handleSubmit} >
      <Input
        onChange={handleChange}
        type="text"
        name="email"
        placeholder="Username or Email"
      />
      <Input
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="Password"
      />
      <Flex>
        <Link marginleft>Forgot Password?</Link>
      </Flex>
      <Button>LOG IN</Button>
    </Form>
  );
};

export default LoginForm;
