import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default class Result extends React.Component {
  constructor() {
    super();
    this.state = {
      player1: null,
      player2: null,
      winner: "",
    };
  }

  componentDidMount() {
    let player1 = new URLSearchParams(window.location.search).get("playerOne");
    let player2 = new URLSearchParams(window.location.search).get("playerTwo");
    fetch(`https://api.github.com/users/${player1}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          () => {
            return { player1: data };
          },
          () => {
            fetch(`https://api.github.com/users/${player2}`)
              .then((res) => res.json())
              .then((data) => {
                this.setState(
                  () => {
                    return { player2: data };
                  },
                  () => {
                    this.calculateWinner();
                  }
                );
              });
          }
        );
      });
  }
  calculateWinner = () => {
    if (this.state.player1 && this.state.player2) {
      if (
        calculateScore(this.state.player1) > calculateScore(this.state.player2)
      ) {
        this.setState({ winner: this.state.player1.login });
      } else {
        this.setState({ winner: this.state.player2.login });
      }
    }
  };

  render() {
    let { player1, player2 } = this.state;
    return (
      <>
        <div className="container">
          <Header />
          {player1 && player2 ? (
            <>
              <div className="flex card-wrapper">
                <UserCard player={player1} winner={this.state.winner} />
                <UserCard player={player2} winner={this.state.winner} />
              </div>
              <Link to="/battle">
                <button>RESET</button>
              </Link>
            </>
          ) : (
            <h2>
              Battling<span className="loading"></span>
            </h2>
          )}
        </div>
      </>
    );
  }
}

function UserCard(props) {
  let { player } = props;
  let score = calculateScore(player);
  return (
    <div className="card">
      <h2>{props.winner === player.login ? "Winner" : "Loser"}</h2>
      <img src={player.avatar_url} alt={player.login} />
      <p>Score: {score}</p>
      <h1>{player.login}</h1>
      <div className="user-info">
        <div>
          <i className="fa-solid fa-user"></i>
          <span>{player.name}</span>
        </div>
        {player.location && (
          <div>
            <i className="fa-solid fa-compass"></i>
            <span>{player.location}</span>
          </div>
        )}
        {player.company && (
          <div>
            <i className="fa-solid fa-briefcase"></i>
            <span>{player.company}</span>
          </div>
        )}
        <div>
          <i className="fa-solid fa-users"></i>
          <span>{player.followers} followers</span>
        </div>
        <div>
          <i className="lni lni-users"></i>
          <span>{player.following} following</span>
        </div>
        <div>
          <i className="fa-solid fa-code"></i>
          <span>{player.public_repos} repositories</span>
        </div>
      </div>
    </div>
  );
}

function calculateScore(player) {
  return player.followers * 20 + player.public_repos;
}
