
function NewProject() {
    return(
        <main className='new-project-page'>
            <h1>Add New Project!</h1>
            <p>Start documenting a new project</p>
            <div className='form-card'>
                <h3>Project Details:</h3>
                <div className='form-section'>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor='title'>Title</label>
                            <input id='title' type='text'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='designer'>Designer</label>
                            <input id='designer' type='text'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Project Status</label>
                        <select id='status'>
                            <option value='planned'>Planned</option>
                            <option value='started'>Started</option>
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
                            <input id='brand' type='text'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='number'>Number</label>
                            <input id='number' type='text'/>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor='color-name'>Color Name</label>
                            <input id='color-name' type='text' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='num-skeins'>Number of Skeins</label>
                            <input id='num-skiens' type='text'/>
                        </div>
                    </div>
                </div>
                <div className='form-section'>
                    <div className='form-group'>
                        <label htmlFor='text-area'>Notes:</label>
                        <textarea id='text-area'></textarea>
                    </div>
                </div>

                <button id='create-btn'>Create Project</button>

            </div>
        </main>
        
    )
}
export default NewProject;