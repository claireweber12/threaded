
function Home(){
    return(
       <div className='section homepage'>
            <div className='home-text'>
                <h1 id='title'>Threaded</h1>
                <h3 id='subtitle'>A creative home for every canvas, color, and stitch</h3>
                <p id='description'>Track your needlepoint projects, save the threads you used, document your progress, 
                    and find inspiration from other stitchers
                </p>
            </div>
            <div className="home-buttons-container">
                <button className='home-button' type='button'>Start Tracking</button>
                <button className='home-button' type='button'>Explore Projects</button>
            </div>
       </div> 
    )
}
export default Home; 