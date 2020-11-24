import { useState } from "react";
import { useData } from "../StateProvider";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
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
    setName("");
    setEmail("");
    setPassword("");
  };

  // Signup user
  const handleSubmit = e => {
    e.preventDefault();
    setLoader(true);

    axios
      .post("/api/user/signup", { name, email, password })
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
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
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
