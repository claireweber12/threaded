import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Threaded
      </Link>

      <div className="nav-links">
        <Link to="/" className='links-nav'>Home</Link>
        <Link to="/my-projects" className='links-nav'>My Projects</Link>
        <Link to="/explore" className='links-nav'>Explore</Link>
        <Link to="/new-project" className='links-nav'>+ New Project</Link>
      </div>
    </nav>
  );
}

export default Navbar;