import React, { useState } from "react";
import { useData } from "../StateProvider";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const {
    state: { loading },
    dispatch,
    setCookie,
  } = useData();

  const setLoader = status => {
    dispatch({
      type: "SET_LOADING",
      payload: status,
    });
  };

  // Submit form and login user
  const handleSubmit = e => {
    e.preventDefault();
    setLoader(true);

    axios
      .post("/api/user/login", { email, password })
      .then(({ data }) => {
        dispatch({
          type: "SET_USER",
          payload: data,
        });
        setCookie(data.token);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        setErr(err.response.data.msg);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {err && <p className='errors'>{err}</p>}
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
