import React, { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  /// Validation
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError({ passwordError: "password not matched" });
    } else {
      const respone = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const res = await respone.json();
      console.log(res);
      if (res.status == 400) {
        setError({
          emailError: res.err.email,
          passwordError: res.err.password,
        });
      } else {
        alert("Successfully registered");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <form action="POST" className="form-signup" onSubmit={handleSubmit}>
        <label className="form_label">
          Name:
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="form_label">
          Email:
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form_label">
          Password:
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="form_label">
          Confirm Password:{" "}
          <input
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Signup" className="btn btn-signup" />
      </form>
      <h4>{error.emailError || error.passwordError}</h4>
    </>
  );
};

export default SignUpForm;
