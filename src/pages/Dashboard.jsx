import sampleProjects from "../data/sampleProjects";
import ProjectCard from "../components/ProjectCard";
import { useState } from "react";

function Dashboard() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const filteredProjects = 
    selectedStatus === 'All'
    ? sampleProjects
    : sampleProjects.filter((project) => project.status === selectedStatus);
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