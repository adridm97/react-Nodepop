import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { configureClient } from "./api/client";
import storage from "./utils/storage";
import { BrowserRouter as Router } from "react-router-dom";
const accessToken = storage.get("auth");
configureClient({ accessToken });

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App isInitiallyLogged={!!accessToken} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
