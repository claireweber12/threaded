
function Navbar() {
    return(
        
        <nav className = "navbar section">
            <a className="logo" href="#">Threaded</a>
            <ul className='links'>
                <li><a id='home' href='#'>Home</a></li>
                <li><a id='projects' href='#'>My Projects</a></li>
                <li><a id='explore' href='#'>Explore</a></li>
                <li><a id='addProject' href='#'>+ New Project</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;