import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const name = useSelector((state) => state.user.name);
  return (
    <div>
      <h1>HELLO 👋 {name}</h1>
    </div>
  );
};

export default Home;
