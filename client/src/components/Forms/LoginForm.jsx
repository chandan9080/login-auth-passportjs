import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";

import "./Form.css";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    if (data.status === 400) {
      console.log(data.message);
      setError(data.message);
      setEmail("");
      setPassword("");
    } else {
      const { username, useremail, useravatar } = data;
      dispatch(
        setUser({
          name: username,
          email: useremail,
          avatar: useravatar,
          isLogin: true,
        })
      );

      alert("Login is successfull");
      navigate("/");
    }
  };
  return (
    <>
      <form action="POST" className="form-signup" onSubmit={handleSubmit}>
        <label className="form_label">
          Email:
          <input
            type="email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label className="form_label">
          Password:
          <input
            type="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <div className="checkbox_forgot">
          <label className="checkbox">
            <input
              type="checkbox"
              onChange={() => {
                setRemember(!remember);
              }}
            />
            Remember me
          </label>
          <Link to="/forgot_pass" className="forget_pass">
            Forgot Password?
          </Link>
        </div>
        <span>{error}</span>
        <input type="submit" value="Login" className="btn btn-signup" />
      </form>
    </>
  );
};

export default LoginForm;
