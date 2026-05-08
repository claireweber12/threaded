import sampleProjects from "../data/sampleProjects";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {
  return (
    <main>
      <h1>My Projects</h1>
      <p>View and manage your needlepoint projects.</p>

      <section className="project-grid">
        {sampleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;