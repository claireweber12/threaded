import sampleProjects from "../data/sampleProjects";
import ProjectCard from "../components/ProjectCard";

function Explore(){
    return(
        <div className='explore page'>
            <h3 className='explore-top-text'>Explore</h3>
            <h4 className='explore-top-text'>Browse Public projects from other stitchers</h4>
            <div class='start-explore'>
                {sampleProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}

            </div>
        </div>
    )
}
export default Explore;