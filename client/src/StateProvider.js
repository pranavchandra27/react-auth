import { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useData = () => useContext(StateContext);
