import React from "react";
import "./Button.css";
const google = () => {
  window.open("http://localhost:5000/api/users/google", "_self");
};
const GoogleButton = () => {
  return (
    <>
      <button className="btn" onClick={google}>
        Google
        <img src={require("../../assets/google.png")} alt="google" width={20} />
      </button>
    </>
  );
};

export default GoogleButton;
