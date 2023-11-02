// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp'; 
// Import the SignUp component
import HomePage1 from './HomePage1';
import ProjectPage from './ProjectCL/ProjectPage';
import ProjectCL from './ProjectCL/ProjectCL';
import Navbar from './Navbar';
import ProjectDetails from './ProjectCL/ProjectDetails';
function App() {
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<HomePage1/>} />
          <Route path="/projects" element={<ProjectPage/>} />
          <Route path="/createProject" element={<ProjectCL/>} />
          <Route path="/projects/:projectID" element={<ProjectDetails />} />

        </Routes>
    </Router>
  );
}

export default App;
