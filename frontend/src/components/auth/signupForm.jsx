import React, { useState } from "react";
import { Button } from "../styles/login.styles";
import { registerUser } from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignupForm, SignupInput } from "../styles/signup.styles";

const SignUpForm = () => {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
    const res = await registerUser(formData);
    // console.log(res);
    if (res) {
      toast.success("User registered successfully!", {
        autoClose: 700,
        hideProgressBar: true,
      });
      navigate("/");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <SignupForm onSubmit={handleSubmit}>
      <SignupInput
        name="username"
        placeholder="Username"
        type="text"
        onChange={handleChange}
      ></SignupInput>
      <SignupInput
        name="email"
        placeholder="Email"
        type="text"
        onChange={handleChange}
      ></SignupInput>
      <SignupInput
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      ></SignupInput>
      <Button type="submit" required>
        Continue
      </Button>
    </SignupForm>
  );
};

export default SignUpForm;
