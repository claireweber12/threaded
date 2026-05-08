import { useParams } from "react-router-dom";
import sampleProjects from "../data/sampleProjects";


function ProjectDetail(){
    const {id} = useParams();
    const projectid = Number(id);
    const project = sampleProjects.find((p) => p.id === projectid);
    
    if (!project){
        return <h2>Project not Found!</h2>
    }
    return(
        <div className='project-detail page'>
            <container className='left-column'>
                <div className='project-image'>
                    <p>image placeholder</p>
                </div>
                <div className='project-tags'>
                        {project.tags.map((tag) => (
                            <span key={tag} className='detailed-project-tag'>
                                #{tag}
                            </span>
                        ))}
                </div>
            </container>
            <div className='detailPage-content'>
                <h1 className='project-name-detailPage'>{project.title}</h1>
                <div className='details'>
                    <p>{project.status}</p>
                    <p>{project.designer}</p>
                </div>
                <p className='description'>{project.description}</p>
                <div className="thread-list">
                    <h2>Threads Used</h2>

                    {project.threads.map((thread) => (
                        <div key={`${thread.brand}-${thread.colorNumber}`} className="thread-item">
                        <span
                            className="thread-dot"
                            style={{ backgroundColor: thread.colorHex }}
                        ></span>

                        <p className="thread-info">
                            {thread.brand} {thread.colorNumber} — {thread.colorName}
                        </p>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}

export default ProjectDetail;