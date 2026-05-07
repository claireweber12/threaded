import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import Explore from "./pages/Explore.jsx";
import NewProject from './pages/NewProject.jsx';


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-projects" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/new-project" element={<NewProject />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;