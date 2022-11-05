import React from "react";

export default function Repos(props) {
  let { data } = props;
  if (!data) {
    return (
      <h2>
        Fetching Repos<span className="loading"></span>
      </h2>
    );
  } else {
    return (
      <ul className="repos">
        {data.map((item, index) => {
          return <SingleRepo item={item} key={item.id} index={index} />;
        })}
      </ul>
    );
  }
}

function SingleRepo(props) {
  let { open_issues_count, owner, html_url, watchers, forks_count } =
    props.item;
  return (
    <li>
      <h4>#{props.index + 1}</h4>
      <img src={owner.avatar_url} alt={owner.login} />
      <a href={html_url}>{owner.login}</a>
      <div className="user-info">
        <div>
          <i className="fa-solid fa-user"></i>
          <span>
            <a href={owner.html_url} style={{ display: "inline-block" }}>
              {owner.login}
            </a>
          </span>
        </div>
        <div>
          <i className="fas fa-star"></i>
          <span>{watchers} stars</span>
        </div>
        <div>
          <i className="fa-solid fa-code-fork"></i>
          <span>{forks_count} forks</span>
        </div>
        <div>
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{open_issues_count} open issues</span>
        </div>
      </div>
    </li>
  );
}
