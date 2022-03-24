import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import "./Navbar.css";

const Navbar = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.open("http://localhost:5000/api/users/logout", "_self");
  };
  //console.log(isLogin);
  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo">
          GAME
        </Link>

        {isLogin ? (
          <div className="left-nav-element">
            <Link to="/">About us</Link>
            <div className="btn-logout" to="/logout" onClick={handleLogout}>
              Logout
            </div>
            <Link to="/profile">Profile</Link>
          </div>
        ) : (
          <div className="left-nav-element">
            <Link to="/">About us</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
