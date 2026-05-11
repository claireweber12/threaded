import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, deleteProject} from "../services/projectService";


function ProjectDetail(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const[error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // loads data from supabase and chooses project with matching id
    useEffect(() => {
        async function loadProject() {
          try{
            const data = await getProjectById(id);
            console.log(data);
            setProject(data)
          } catch(err) {
            console.log(err);
            setError("Could not load projects.");
          } finally {
            setLoading(false);
          }
        }
        if(id) loadProject();
    }, [id]);
    
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

    async function handleDelete(){
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (!confirmed){
            return;
        }
        try{
            await deleteProject(project.id);
            navigate("/my-projects");
        } catch(err) {
            console.error(err);
            alert("Something went wrong while deleting the project");
        }
    }
    if(!project){
        return(
            <main className="dashboard-page">
                <h1>Project not found</h1>
            </main>
        );
    }
    function getStatusClass(status){
    if (status === "planned") return "status-planned";
    if (status === "in_progress") return "status-progress";
    if (status === "completed") return "status-completed";
    if (status === "paused") return "status-paused";
    if (status === "abandoned") return "status-abandoned";

    return "status-default";
    }
    
    return(
        <div className='project-detail page'>
            <div className='left-column'>
                {project.image_url ? (
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="project-detail-image"
                />
                ) : (
                <div className="project-image">
                    <p>image placeholder</p>
                </div>
                )}
                {(project.project_tags || []).length > 0 && (
                    <div className='project-tags'>
                            {project.project_tags.map((projectTag) => (
                                <span key={projectTag.tags.id} className='detailed-project-tag'>
                                    #{projectTag.tags.name}
                                </span>
                            ))}
                    </div>
                )}
            </div>
            <div className='detailPage-content'>
                <h1 className='project-name-detailPage page-title'>{project.title}</h1>
                <div className='details'>
                    
                    <div className={`${getStatusClass(project.status)}`}>{project.status}</div>
                
                
                    <div>{project.designer}</div>
                    
                    
                </div>
                <p className='description'>{project.notes}</p>
                <div className="thread-list">
                    <h2>Threads Used</h2>

                    {(project.project_threads || []).map((thread) => (
                        <div key={`${thread.brand}-${thread.color_number}`} className="thread-item">
                        <span
                            className="thread-dot"
                            style={{ backgroundColor: thread.color_hex }}
                        ></span>

                        <p className="thread-info">
                            {thread.brand} {thread.color_number} — {thread.color_name}
                        </p>
                        </div>
                    ))}
                </div>
                <div className='del-edit'>
                    <button type='button' 
                    onClick={handleDelete}
                    >Delete Project</button>
                    <Link className='edit-link' to={`/projects/${project.id}/edit`}>
                    Edit Project
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail;