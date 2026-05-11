import { getPublicProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";
import { useState, useEffect } from "react";
import {FaSearch} from "react-icons/fa";

function Explore(){
    const [searchTerm, setSearchTerm] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error , setError] = useState(null);

    // Load Projects from Supabase
    useEffect(() => {
    async function loadProjects() {
      try{
        const data = await getPublicProjects();
        setProjects(data);
      } catch(err) {
        console.log(err);
        setError("Could not load projects.");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
    }, []);

    if (loading){
    return (
      <main className="dashboard-page">
        <h1>My Projects</h1>
        <p>Loading projects...</p>
      </main>
    );
    }

    if(error){
    return(
      <main className='dashboard-page'>
        <h1>My Projects</h1>
        <p>{error}</p>
      </main>
    );
    }

   

    const filteredData = 
    searchTerm === ""
    ? projects
    : projects.filter((project) => (
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.designer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.project_tags || []).some((projectTag) =>
        projectTag.tags.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ));

    return(
        <div className='page explore-page'>
            <div className='explore-page-row'>
                <h1 className='explore-top-text page-title'>Explore</h1>
                <div className='searchbar'>
                    <input type='text' placeholder='Search...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    ></input>
                    <button type='button'> <FaSearch /> </button>
                </div>
            </div>
            <h4 className='explore-top-text page-description'>Browse Public projects from other stitchers</h4>
            <div className='start-explore'>
              {filteredData.length > 0 ? (
                filteredData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))
              ):(
                <div className="empty-state">
                  <h2>No projects found</h2>
                  <p>Try searching for a different title, designer, or tag</p>
                </div>
              )}
            </div>
        </div>
    )
}
export default Explore;