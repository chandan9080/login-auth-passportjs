import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/Forms/LoginForm";
import GoogleButton from "../../components/googleButton/Button";
import "./Login.css";

const Login = () => {
  return (
    <div className="login_div">
      <div className="login">
        <h1 className="login-logo">Sign in</h1>
        <div className="btn-container">
          <GoogleButton />
        </div>
        <div className="btn-container"></div>
        <LoginForm />

        <span className="account_handling">
          Don't have account?
          <Link to="/register">Create One</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
