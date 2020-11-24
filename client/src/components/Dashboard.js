import React from "react";
import { useData } from "../StateProvider";

const Dashboard = () => {
  const {
    state: { user },
  } = useData();
  return (
    <div className='Dash'>
      <h1>This is a private route</h1>
      <h3>
        Name: <span>{user?.name}</span>
      </h3>
      <h3>
        Email: <span>{user?.email}</span>
      </h3>
    </div>
  );
};

export default Dashboard;
