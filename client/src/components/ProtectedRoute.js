import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useData } from "../StateProvider";

const ProtectedRoute = ({ children, ...rest }) => {
  const {
    state: { user },
  } = useData();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
