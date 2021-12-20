import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="registration">
      <h1>p.e.r.n. Stater Pack.</h1>
      <p>Sign in / Register to reach your dashboard:</p>
      <div className="landing-controls">
        <Link to="/login">Login Here</Link>
        <Link to="/register">Register a new account here</Link>
      </div>
    </section>
  );
};

export default Landing;
