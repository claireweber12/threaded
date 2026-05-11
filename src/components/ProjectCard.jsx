import { Link } from 'react-router-dom';

function ProjectCard({ project }) {

  function getStatusClass(status){
    if (status === "planned") return "status-planned";
    if (status === "inProgress") return "status-progress";
    if (status === "completed") return "status-completed";
    if (status === "paused") return "status-paused";
    if (status === "abandoned") return "status-abandoned";

    return "status-default";
  }
  return (
    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="project-card">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="project-card-image"
          />
        ) : (
          <div className="project-image-placeholder">
            No image yet
          </div>
        )}

        <div className="project-card-content">
          <div className='row-wrapper'>
            <div className={`${getStatusClass(project.status)}`}>{project.status}</div>
            <div className="thread-palette">
              {(project.project_threads || []).map((thread) => (
                <span
                  key={`${thread.brand}-${thread.color_number}`}
                  className="thread-dot"
                  style={{ backgroundColor: thread.color_hex }}
                  title={`${thread.brand} ${thread.color_number} - ${thread.color_name}`}
                ></span>
              ))}
            </div>
          </div>

          <h2>{project.title}</h2>

          <p className="project-designer">
            Designed by {project.designer}
          </p>

          {(project.project_tags || []).length > 0 && (
            <div className="project-tags">
              {project.project_tags.map((projectTag) => (
                <span key={projectTag.tags.id} className="project-tag">
                  #{projectTag.tags.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export default ProjectCard;