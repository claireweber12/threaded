import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Threaded
      </Link>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive}) => (isActive ? "links-nav active" : "links-nav")} end>Home</NavLink>
        <NavLink to="/my-projects" className={({ isActive}) => (isActive ? "links-nav active" : "links-nav")} >My Projects</NavLink>
        <NavLink to="/explore" className={({ isActive}) => (isActive ? "links-nav active" : "links-nav")}>Explore</NavLink>
        <NavLink to="/new-project" className={({ isActive}) => (isActive ? "links-nav active" : "links-nav")}>+ New Project</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;