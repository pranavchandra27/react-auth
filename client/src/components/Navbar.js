import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../StateProvider";

const Navbar = () => {
  const {
    state: { user },
    dispatch,
    setCookie,
  } = useData();

  const logout = () => {
    dispatch({
      type: "SET_USER",
      payload: null,
    });
    setCookie("");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to='login'>Login</Link>
            </li>
            <li>
              <Link to='register'>Sign up</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={logout} className='logout-btn'>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
