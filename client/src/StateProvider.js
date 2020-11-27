import { createContext, useContext, useEffect, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import axios from "axios";
import cookie from "js-cookie";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoader = status => {
    dispatch({
      type: "SET_PAGE_LOADING",
      payload: status,
    });
  };

  useEffect(() => {
    const token = cookie.get("jwt-token");
    setLoader(true);
    if (token) {
      axios
        .get("/api/user/me", {
          headers: { "x-auth-token": token },
        })
        .then(res => {
          dispatch({
            type: "SET_USER",
            payload: res.data,
          });
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  }, []);

  const setCookie = token => {
    cookie.set("jwt-token", token);
  };

  return (
    <StateContext.Provider value={{ state, dispatch, setCookie }}>
      {children}
    </StateContext.Provider>
  );
};

export const useData = () => useContext(StateContext);
