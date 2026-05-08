
function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image-placeholder">
        No image yet
      </div>

      <div className="project-card-content">
        <p className="project-status">{project.status}</p>

        <h2>{project.title}</h2>

        <p className="project-designer">
          Designed by {project.designer}
        </p>

        <div className="thread-palette">
          {project.threads.map((thread) => (
            <span
              key={`${thread.brand}-${thread.colorNumber}`}
              className="thread-dot"
              style={{ backgroundColor: thread.colorHex }}
              title={`${thread.brand} ${thread.colorNumber} - ${thread.colorName}`}
            ></span>
          ))}
        </div>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;