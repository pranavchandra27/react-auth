import { useState } from "react";
import { useData } from "../StateProvider";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
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

  // Signup user
  const handleSubmit = e => {
    e.preventDefault();
    setLoader(true);

    axios
      .post("/api/user/signup", { name, email, password })
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
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        {err && <p className='errors'>{err}</p>}
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <button disabled={loading && true}>Sign up</button>
      </form>
    </div>
  );
};

export default Register;
