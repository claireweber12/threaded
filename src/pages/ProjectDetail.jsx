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
            <div className='card'>
                <h1 className='project-name-detailPage'>{project.title}</h1>
                <div className='project-image'>
                    <p>image placeholder</p>
                </div>
                <div className='detailPage-content'>
                    <p>{project.status}</p>
                    <p>{project.designer}</p>
                </div>
                <div className='project-tags'>
                    {project.tags.map((tag) => (
                        <span key={tag} className='project-tag'>
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className='thread-palette'>
                    {project.threads.map((thread) => (
                        <span key={`${thread.brand} - ${thread.colorNumber}`}
                        className = 'thread-dot'
                        style={{backgroundColor: thread.colorHex}}
                        title={`${thread.brand} ${thread.colorNumber}-${thread.colorName}`}>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail;