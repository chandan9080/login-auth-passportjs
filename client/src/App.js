import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/home/home";
import Navbar from "./components/navbar/Navbar";
// hooks
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userSlice";
function App() {
  const dispatch = useDispatch();
  //checking if the user is logged in
  useEffect(() => {
    const getUser = () => {
      return fetch("http://localhost:5000/api/users/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          dispatch(
            setUser({
              name: resObject.user.name,
              email: resObject.user.email,
              avatar: resObject.user.avatar,
              isLogin: true,
            })
          );
        });
    };
    getUser();
  }, []);
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/register"
          element={isLogin ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          exact
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
