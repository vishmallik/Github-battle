import React from "react";
import { Link } from "react-router-dom";

export default function Battle(props) {
  return (
    <>
      <h1>Instructions</h1>
      <div className="flex battle">
        <div className="flex-33">
          <h3>Enter Two Github user</h3>
          <i
            className={`fa-solid fa-users ${props.darkMode ? "dark-card" : ""}`}
          ></i>
        </div>
        <div className="flex-33">
          <h3>Battle</h3>
          <i
            className={`fa-solid fa-plane ${props.darkMode ? "dark-card" : ""}`}
          ></i>
        </div>
        <div className="flex-33">
          <h3>See the Winner</h3>
          <i
            className={`fa-solid fa-trophy ${
              props.darkMode ? "dark-card" : ""
            }`}
          ></i>
        </div>
      </div>
      <h1>Players</h1>
      <Players darkMode={props.darkMode} />
    </>
  );
}

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user1: "",
      user2: "",
      user1_data: null,
      user2_data: null,
    };
  }
  handleChange = (event, player) => {
    let user = "user" + player;
    console.log(event.target.value);
    this.setState({
      [user]: event.target.value,
    });
  };

  handleSubmit = (event, player) => {
    event.preventDefault();
    let user = "user" + player;
    console.dir(event.target[user]);
    console.log(user);
    this.setState({
      [user]: event.target[user].value,
    });
    fetch(`https://api.github.com/users/${this.state[user]}`)
      .then((res) => res.json())
      .then((data) => {
        if (user === "user1") {
          this.setState({
            user1_data: data,
          });
        }
        if (user === "user2") {
          this.setState({
            user2_data: data,
          });
        }
      });
  };
  handleDelete = (user) => {
    if (user === "user1") {
      this.setState({
        user1_data: null,
        user1: "",
      });
    }
    if (user === "user2") {
      this.setState({
        user2_data: null,
        user2: "",
      });
    }
  };
  render() {
    let { user1_data, user2_data, user1, user2 } = this.state;
    return (
      <>
        <div className="flex">
          <div className="flex-48">
            <label>Player One</label>
            {user1_data ? (
              <UserInfo
                data={user1_data}
                handleDelete={this.handleDelete}
                user="user1"
                darkMode={this.props.darkMode}
              />
            ) : (
              <form
                action=""
                className={`form-control ${this.props.darkMode ? "dark" : ""}`}
                onSubmit={(event) => this.handleSubmit(event, 1)}
              >
                <input
                  type="text"
                  name="user1"
                  id="user1"
                  placeholder="Github Username"
                  onChange={(event) => this.handleChange(event, 1)}
                  value={user1}
                />
                <input type="submit" value="Submit" />
              </form>
            )}
          </div>
          <div className="flex-48">
            <label>Player Two</label>
            {user2_data ? (
              <UserInfo
                data={user2_data}
                handleDelete={this.handleDelete}
                user="user2"
                darkMode={this.props.darkMode}
              />
            ) : (
              <form
                action=""
                className="form-control"
                onSubmit={(event) => this.handleSubmit(event, 2)}
              >
                <input
                  type="text"
                  name="user2"
                  id="user2"
                  placeholder="Github Username"
                  onChange={(event) => this.handleChange(event, 2)}
                  value={user2}
                />
                <input type="submit" value="Submit" />
              </form>
            )}
          </div>
        </div>
        {user1_data && user2_data ? (
          <Link to={`/battle/result?playerOne=${user1}&playerTwo=${user2}`}>
            <button disabled={user1_data.message || user2_data.message}>
              BATTLE
            </button>
          </Link>
        ) : (
          ""
        )}
      </>
    );
  }
}

function UserInfo(props) {
  return (
    <div className={`flex user ${props.darkMode ? "dark-card" : ""}`}>
      <img src={props.data.avatar_url} alt={props.data.login} />
      {props.data.message ? <p>User not Found!</p> : <p>{props.data.login}</p>}
      <i
        className="fas fa-xmark-circle"
        onClick={() => props.handleDelete(props.user)}
      ></i>
    </div>
  );
}
