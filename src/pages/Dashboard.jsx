
import ProjectCard from "../components/ProjectCard";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  useEffect(() => {
    async function loadProjects() {
      try{
        const data = await getProjects();
        console.log("Projects from supaBase:", data);
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
  const filteredProjects = 
    selectedStatus === 'All'
    ? projects
    : projects.filter((project) => project.status === selectedStatus);

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

  return (
    <main className='projects-page'>
      <h1>My Projects</h1>
      <p>View and manage your needlepoint projects.</p>
      <div className="filter-buttons">
        <button 
          className={`filter-button ${selectedStatus === "All" ? "active" : ""}`}
          onClick={() => setSelectedStatus("All")}
        >All</button>
        <button
          className={`filter-button ${selectedStatus === "Planned" ? "active" : ""}`}
          onClick={() => setSelectedStatus("Planned")}
         >Planned</button>
        <button
          className={`filter-button ${selectedStatus === "In Progress" ? "active" : ""}`}
          onClick={() => setSelectedStatus("In Progress")} 
         >In Progress</button>
        <button
          className={`filter-button ${selectedStatus === "Completed" ? "active" : ""}`}
          onClick={() => setSelectedStatus("Completed")} 
        >Completed</button>
        <button
          className={`filter-button ${selectedStatus === "Paused" ? "active" : ""}`}
          onClick={() => setSelectedStatus("Paused")}
        >Paused</button>
        <button
          className={`filter-button ${selectedStatus === "Abandoned" ? "active" : ""}`}
          onClick={() => setSelectedStatus("Abandoned")} >Abandoned</button>
      </div>

      <section className="project-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;