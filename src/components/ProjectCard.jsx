import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="project-card">
        <div className="project-image-placeholder">
          No image yet
        </div>

        <div className="project-card-content">
          <div className='row-wrapper'>
            <p className="project-status">{project.status}</p>
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

          {project.tags && (
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  #{tag}
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