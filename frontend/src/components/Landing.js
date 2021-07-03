import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="registration">
      <h1>Stater Pack.</h1>
      <p>Sign in to get to your dashboard:</p>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </section>
  );
};

export default Landing;
