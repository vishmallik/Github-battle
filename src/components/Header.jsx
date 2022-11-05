import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <NavLink exact to="/">
        Popular
      </NavLink>
      <NavLink to="/battle">Battle</NavLink>
    </header>
  );
}
