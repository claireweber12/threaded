import {useNavigate} from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    return(
       <div className='section homepage page' >
            <div className='home-text'>
                <h1 id='title'>Threaded</h1>
                <h2 id='subtitle'>A creative home for every canvas, color, and stitch</h2>
                <p id='description'>Track your needlepoint projects, save the threads you used, document your progress, 
                    and find inspiration from other stitchers
                </p>
            </div>
            <div className="home-buttons-container">
                <button className='home-button' onClick={() => navigate('./new-project')} type='button'>Start Tracking</button>
                <button className='home-button' type='button' onClick={() => navigate('./explore')}>Explore Projects</button>
            </div>
            <div className='feature-cards'>
                <div className='feature-card'>
                    <h2>Track Projects</h2>
                    <p>A personal stitch-book of all your projects...past and present! Keep track of project status, threads used, and so much more!</p>
                </div>
                <div className='feature-card'>
                    <h2>Save Thread Palettes</h2>
                    <p>Never deal with saving thread tags again! With threaded you can keep track of your threads and lot numbers easily. </p>
                </div>
                <div className='feature-card'>
                    <h2>Browse Inspiration</h2>
                    <p>Looking for inspiration? Search public projects by designer, tags, or canvas name.</p>
                </div>
                <div className='feature-card'>
                    <h2>Save Your Favorite Canvases</h2>
                    <p>Never search for a canvas again! Save all your favorites right to your library!</p>
                </div>
                
            </div>
       </div> 
    )
}
export default Home; 