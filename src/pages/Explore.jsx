import sampleProjects from "../data/sampleProjects";
import ProjectCard from "../components/ProjectCard";
import { useState } from "react";
import {FaSearch} from "react-icons/fa";

function Explore(){
    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = 
    searchTerm === ""
    ? sampleProjects
    : sampleProjects.filter((project) => (
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.designer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(t=> t.toLowerCase().includes(searchTerm.toLowerCase()))
    ));

    return(
        <div className='explore page'>
            <div className='explore-page-row'>
                <h3 className='explore-top-text'>Explore</h3>
                <div className='searchbar'>
                    <input type='text' placeholder='Search...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    ></input>
                    <button type='button'> <FaSearch /> </button>
                </div>
            </div>
            <h4 className='explore-top-text'>Browse Public projects from other stitchers</h4>
            <div className='start-explore'>
                {filteredData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}

            </div>
        </div>
    )
}
export default Explore;