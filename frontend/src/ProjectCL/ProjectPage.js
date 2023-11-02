import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './projectPage.css';
import img2 from "../image/icons8-sign-in-64.png";
import icon from "../image/icons8-add-properties-100.png";

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the API
        fetch("http://localhost:3000/projects")
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: " + error);
                setLoading (false);
            });
    }, []);

    // Function to get the CSS class for each status
    const getStatusClass = (status) => {
        switch (status) {
            case "approved":
                return "status-accepted";
            case "waiting":
                return "status-waiting";
            case "rejected":
                return "status-rejected";
            default:
                return "";
        }
    };

    const navigateToProjectDetails = (projectID) => {
        // Navigate to the project details page when clicking on a row
        window.location.href = `/projects/${projectID}`;
    };

    return (
        <div>
            <section className="content-body">
                <div className="text">
                    <h2>PROJECT</h2>
                </div>

                <div className="listProject">
                        <Link to="/createProject"  className='CreateProject'>
                            <p>Create Project</p>
                            <img src={icon} className='textAlign'/>
                        </Link>
                </div>

                <div className="listMyExistingProj">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        projects.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>ProjectID</th>
                                        <th>Project Name</th>
                                        <th>Quantity</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Address</th>
                                        <th>Ability List</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr
                                            key={project.projectID}
                                            onClick={() => navigateToProjectDetails(project.projectID)}
                                            className="hover-pointer" // Add this class for the hover effect
                                        >
                                            <td>{project.projectID}</td>
                                            <td>{project.projectName}</td>
                                            <td>{project.quantity}</td>
                                            <td>{project.startDate}</td>
                                            <td>{project.endDate}</td>
                                            <td>{project.address}</td>
                                            <td>{project.abilityList}</td>
                                            <td className={getStatusClass(project.status)}>{project.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No projects found.</p>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}

export default ProjectPage;
