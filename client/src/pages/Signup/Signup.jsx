import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../../components/Forms/SignUpForm";
import GoogleButton from "../../components/googleButton/Button";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup">
        <h1>SignUp</h1>
        <div className="btn-container">
          <GoogleButton />
        </div>
        <SignUpForm></SignUpForm>
        <span className="account_handling">
          Already have an Account?
          <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
