import { NavLink } from "react-router-dom";
export default function Header(props) {
  return (
    <header className="flex">
      <NavLink exact to="/" className={props.darkMode ? "darkmode-text" : ""}>
        Popular
      </NavLink>
      <NavLink to="/battle" className={props.darkMode ? "darkmode-text" : ""}>
        Battle
      </NavLink>
      <button onClick={props.toggleDarkMode} className="toggle">
        {props.darkMode ? "🔦" : "💡"}
      </button>
    </header>
  );
}
