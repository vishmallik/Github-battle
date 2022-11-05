import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Battle from "./Battle";
import Header from "./Header";
import Popular from "./Popular";
import Result from "./Result";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      darkMode: false,
    };
  }
  toggleDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    });
  };
  render() {
    let { darkMode } = this.state;
    return (
      <BrowserRouter>
        <div className={darkMode ? "dark" : ""}>
          <div className="container">
            <Header toggleDarkMode={this.toggleDarkMode} darkMode={darkMode} />
            <Switch>
              <Route path="/" exact>
                <Popular darkMode={darkMode} />
              </Route>
              <Route path="/battle/result">
                <Result darkMode={darkMode} />
              </Route>
              <Route path="/battle">
                <Battle darkMode={darkMode} />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
