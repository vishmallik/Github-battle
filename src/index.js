import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";

import App from "./components/App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Battle from "./components/Battle";
import Result from "./components/Result";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
        <Route path="/battle/result">
          <Result />
        </Route>
        <Route path="/battle">
          <Battle />
        </Route>
      </Switch>
    </BrowserRouter>
  </StrictMode>
);
