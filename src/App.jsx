import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import Explore from "./pages/Explore.jsx";
import NewProject from './pages/NewProject.jsx';
import ProjectDetail from "./pages/ProjectDetail.jsx";
import EditProject from "./pages/EditProject.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-projects" element={<Dashboard />} />
        <Route path='/projects/:id' element = {<ProjectDetail />}/>
        <Route path="/projects/:id/edit" element={<EditProject />}/>
        <Route path="/explore" element={<Explore />} />
        <Route path="/new-project" element={<NewProject />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;