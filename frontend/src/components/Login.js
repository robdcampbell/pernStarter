import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const changeInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const body = { email, password };

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const parsedResponse = await response.json();

      if (parsedResponse.token) {
        localStorage.setItem("token", parsedResponse.token);
        // console.log(parsedResponse);
        setAuth(true);
        toast.success("Login Successfull");
      } else {
        setAuth(false);
        toast.error(parsedResponse);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {/* <button onClick={(e) => setAuth(true)}>Authenticate</button> */}
      <form className="register__form" onSubmit={(e) => onSubmitForm(e)}>
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => changeInput(e)}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => changeInput(e)}
        />
        <button>Log In</button>
        <p>Need an account?</p>
        <Link to="/register">Register here</Link>
      </form>
    </>
  );
};

export default Login;
