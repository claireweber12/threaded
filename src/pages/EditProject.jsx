import { useParams, useNavigate } from "react-router-dom";
import { updateProject, getProjectById, uploadProjectImage } from "../services/ProjectService";
import { useState, useEffect } from "react";


function EditProject() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDesigner, setProjectDesigner] = useState("");
    const [projectStatus, setProjectStatus] = useState("");
    const [notes, setNotes] = useState("");
    const [project, setProject] = useState(null);
    const[error, setError] = useState(null);
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(true);
    const [thread, setThread] = useState({
        brand:"", 
        colorNumber:"",
        colorName:"",
        colorHex:"",
    });
    const [threads, setThreads] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [removeImage, setRemoveImage] = useState(false);


    useEffect(() => {
        async function loadProject() {
            try{
            const data = await getProjectById(id);
            console.log(data);
            setProject(data)
            setProjectTitle(data.title || "");
            setProjectDesigner(data.designer || "");
            setProjectStatus(data.status || "");
            setNotes(data.notes || "");
            setImageUrl(data.image_url || "");
            const formattedThreads = (data.project_threads || []).map((thread) => ({
                brand: thread.brand || "",
                colorNumber: thread.color_number || "",
                colorName: thread.color_name || "",
                colorHex: thread.color_hex || "",
            }));
            setThreads(formattedThreads);
            } catch(err) {
            console.log(err);
            setError("Could not load project");
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

    async function handleSubmit(e) {
        e.preventDefault();
        if (!projectTitle.trim()){
            setFormError("Project title is required");
            return;
        }
        if(!ProjectStatus){
            setFormError("Project status is required");
            return;
        }
        let finalImageUrl = imageUrl;
        if(imageFile){
            finalImageUrl = await uploadProjectImage(imageFile);
        }

        if (removeImage){
            finalImageUrl = null;
        }
        const updatedProject={
            title : projectTitle,
            designer : projectDesigner,
            status : projectStatus,
            notes,
            threads,
            image_url:finalImageUrl,
        };
        try{
            await updateProject(id, updatedProject);
            navigate("/my-projects");
        }catch(err){
            console.error(err);
            alert("Something went wrong while editing the project");
        }
        
    }

    function handleThreadChange(e){
        const {name,value} = e.target;

        setThread({
            ...thread,
            [name]:value,
        });
    }

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

    function handleRemoveThread(indexToRemove){
        const updatedThreads = threads.filter((thread, index) => index != indexToRemove);
        setThreads(updatedThreads);
    }

    function handleDeleteImage(){
        setImageUrl("");
        setImageFile(null);
        setRemoveImage(true);
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
        <main className='edit-project-page'>
            <h1>Edit Project</h1>
            <p>start editing your project</p>
            <form className='form-card' onSubmit={handleSubmit}>
                <h3>Project Details:</h3>
                <div>
                    {project.image_url ? (
                        <>
                            <img src={imageUrl}
                            className="edit-project-image" />
                        
                            <button type='button' className="delete-picture-btn" 
                            onClick={handleDeleteImage}
                            >Delete Image</button>
                        </>
                        ) : (
                        <input type='file'
                            accept='image/*'
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    )}
                    
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
                            value={thread.colorNumber} onChange={handleThreadChange}
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
                        <h3>Threads</h3>
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
                                    <button type="button" onClick={() => handleRemoveThread(index)}
                                    >Remove</button>
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
                        ></textarea>
                    </div>
                </div>
                {formError && <p className="form-error">{formError}</p>}
                <div className='save-cancel-btns'>
                    <button type="button" id="cancel-btn" onClick={() => navigate(`/projects/${id}`)}>
                        Cancel
                    </button>
                    <button id='create-btn' type='submit'>Save Changes</button>
                </div>

            </form>


        </main>
        
    )

    
}

export default EditProject;