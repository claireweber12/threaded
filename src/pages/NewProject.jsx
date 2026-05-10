import { useState } from "react";
import { createProject, uploadProjectImage } from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

function NewProject() {
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDesigner, setProjectDesigner] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();
    const [notes, setNotes] = useState("");
    const [thread, setThread] = useState({
        brand:"",
        colorNumber:"",
        colorName: "",
        colorHex:"",
    });
    const[threads, setThreads] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    function handleAddThread(){
        if (!thread.brand && !thread.colorNumber && !thread.colorName && !thread.colorHex){
            return;
        }

        const newThread = {
            brand: thread.brand,
            colorNumber: thread.colorNumber,
            colorName: thread.colorName,
            colorHex: thread.colorHex,
        }
        setThreads([...threads, newThread]);

        setThread({
            brand: "",
            colorNumber:"",
            colorName:"",
            colorHex: "",
        });
    }

    function handleThreadChange(e){
        const {name, value} = e.target;
        setThread({
            ...thread,
            [name]:value,
        });
    }

     async function handleSubmit(e) {
        e.preventDefault();
        setFormError("");

        if(!projectTitle.trim()) {
            setFormError("Project title is required");
            return;
        }
        if (!projectStatus){
            setFormError("Project title is required");
            return;
        }
        setIsSubmitting(true);
        const imageUrl = await uploadProjectImage(imageFile);
        const newProject={
            title : projectTitle,
            designer : projectDesigner,
            status : projectStatus,
            notes : notes,
            threads : threads,
            image_url: imageUrl,
        };
        try{
            await createProject(newProject);
            setProjectTitle("");
            setProjectDesigner("");
            setProjectStatus("");
            setNotes("");

            setThread({
                brand: "",
                colorNumber: "",
                colorName: "",
                colorHex: "",
            });

            setThreads([]);

            navigate("/my-projects");
            }catch(err){
                console.error(err);
                alert("Something went wrong while creating the project");
            }finally{
                setIsSubmitting("true");
            }
        
        }
    
    


    return(
        <main className='add-project-page page'>
            <h1 className='page-title'>Add a New Canvas!</h1>
            <p className='page-description'>Start documenting a new project</p>
            <form className='form-card' onSubmit={handleSubmit}>
                <h3>Project Details:</h3>
                <div className='form-section'>
                    <input type='file'
                    className='file-field'
                    accept='image/*'
                    onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>
                <div className='form-section'>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor='title'>Title</label>
                            <input id='title' name='title' value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            required
                            type='text'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='designer'>Designer</label>
                            <input id='designer' type='text' name='designer'
                            value={projectDesigner}
                            onChange={(e) => setProjectDesigner(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='form-group form-row'>
                        <label htmlFor='status'>Project Status</label>
                        <select id='status' name='status' value={projectStatus}
                        onChange={(e) => setProjectStatus(e.target.value)}
                        required
                        >
                            <option value='planned'>Planned</option>
                            <option value='in progress'>In Progress</option>
                            <option value='completed'>Completed</option>
                            <option value='paused'>Paused</option>
                            <option value='abandoned'>Abandoned</option>
                        </select>
                    </div>
                </div>
                <h3>Threads Used:</h3>
                <div className='form-section'> 
                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor='brand'>Brand</label>
                            <input id='brand' name='brand' type='text' value={thread.brand}
                            onChange={handleThreadChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='colorNumber'>Number</label>
                            <input id='colorNumber' name='colorNumber' type='text'
                            value={thread.colorNumber} onChange={(handleThreadChange)}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor='colorName'>Color Name</label>
                            <input id='colorName' name='colorName' type='text'
                            value={thread.colorName} onChange={handleThreadChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='colorHex'>Hex Value</label>
                            <input id='colorHex' name='colorHex' type='text'
                            value={thread.colorHex} onChange={handleThreadChange}
                            />
                        </div>
                    </div>
                    <button id='add-thread-btn'type='button' onClick={handleAddThread}>
                        Add Thread
                    </button>
                    <div className='addedThreads'>
                        <h3>Threads Added</h3>
                        {threads.length === 0 ? (
                            <p>No threads added yet.</p>
                        ) : (
                            threads.map((thread, index) => (
                                <div key={index} className="added-thread-item">
                                    <span
                                        className='thread-dot'
                                        style={{backgroundColor:thread.colorHex}}
                                    ></span>
                                    <p>
                                        {thread.brand} {thread.colorNumber} {thread.colorName}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className='form-section'>
                    <div className='form-group'>
                        <label htmlFor='notes'>Notes:</label>
                        <textarea id='notes' name='notes' value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add project notes, stitch ideas, or anything you want to remember..."
                        ></textarea>
                    </div>
                </div>
                {formError && <p className="form-error">{formError}</p>}
                <button id='create-btn' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Project"}
                </button>

            </form>


        </main>
        
    )
}
export default NewProject;