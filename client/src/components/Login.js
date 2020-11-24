import React, { useState } from "react";
import { useData } from "../StateProvider";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    state: { loading },
    dispatch,
  } = useData();

  const setLoader = status => {
    dispatch({
      type: "SET_LOADING",
      payload: status,
    });
  };

  // Empty all the fields
  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  // Submit form and login user
  const handleSubmit = e => {
    e.preventDefault();
    setLoader(true);

    axios
      .post("/api/user/login", { email, password })
      .then(res => {
        dispatch({
          type: "SET_USER",
          payload: res.data,
        });
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        alert(err.message);
      });

    clearFields();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button disabled={loading && true}>Login</button>
      </form>
    </div>
  );
};

export default Login;
