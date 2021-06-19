import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h1>Welcome!</h1>
      <p>Sign in and start buildng your list:</p>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  );
};

export default Landing;
