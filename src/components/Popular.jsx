import React from "react";
import Repos from "./Repos";
let languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      language: "all",
    };
  }
  componentDidMount() {
    fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${this.state.language}&sort=stars&order=desc&type=Repositories`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ data: data.items }));
  }
  handleClick = (language) => {
    this.setState({
      data: null,
      language,
    });
    this.componentDidMount();
  };
  render() {
    return (
      <>
        <ul className="flex languages">
          {languages.map((language) => {
            return (
              <li
                key={language}
                onClick={() => this.handleClick(language)}
                className={this.state.language === language ? "active" : ""}
              >
                {language}
              </li>
            );
          })}
        </ul>
        <Repos data={this.state.data} darkMode={this.props.darkMode} />
      </>
    );
  }
}
