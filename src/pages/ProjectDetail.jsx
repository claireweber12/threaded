import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";


function ProjectDetail(){
    const {id} = useParams();
    const [project, setProject] = useState([]);
    const[error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // loads data from supabase and chooses project with matching id
    useEffect(() => {
        async function loadProjects() {
          try{
            const data = await getProjects();
            const selectedProject = data.find((p) => p.id === id);
            setProject(selectedProject);
          } catch(err) {
            console.log(err);
            setError("Could not load projects.");
          } finally {
            setLoading(false);
          }
        }
        loadProjects();
    }, []);
    if(!project){
        return(
            <main className="dashboard-page">
                <h1>Project not found</h1>
            </main>
        );
    }
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
    
    
    return(
        <div className='project-detail page'>
            <div className='left-column'>
                <div className='project-image'>
                    <p>image placeholder</p>
                </div>
                {project.tags && (
                    <div className='project-tags'>
                            {project.tags.map((tag) => (
                                <span key={tag} className='detailed-project-tag'>
                                    #{tag}
                                </span>
                            ))}
                    </div>
                )}
            </div>
            <div className='detailPage-content'>
                <h1 className='project-name-detailPage'>{project.title}</h1>
                <div className='details'>
                    <p>{project.status}</p>
                    <p>{project.designer}</p>
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
            </div>
        </div>
    )
}

export default ProjectDetail;