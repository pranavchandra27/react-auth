import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./StateProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateProvider>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
