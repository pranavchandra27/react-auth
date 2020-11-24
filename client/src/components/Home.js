import React from "react";
import { useData } from "../StateProvider";

const Home = () => {
  const {
    state: { user },
  } = useData();
  return (
    <div>
      <h1>Homepage</h1>
      <h3>
        {user ? `You are logged in as ${user.name}` : "You are not logged in"}
      </h3>
    </div>
  );
};

export default Home;
