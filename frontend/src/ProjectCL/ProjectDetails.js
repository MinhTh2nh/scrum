import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './projectPage.css';

const ProjectDetails = () => {
    const { projectID } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch project data based on the projectID
        fetch(`http://localhost:3000/projects/${projectID}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProjectData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: " + error);
                setLoading(false);
            });
    }, [projectID]);

    const handleDeleteProject = () => {
        // Make a DELETE request to the server to delete the project
        fetch(`http://localhost:3000/projects/${projectID}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // Handle success with an alert message
                window.alert('Project deleted successfully');
                // Generate the URL for the Project Page
                const projectPageURL = new URL(window.location.origin);
                projectPageURL.pathname = '/projects';
                // Redirect to the Project Page
                window.location.href = projectPageURL.toString();
            })
            .catch((error) => {
                console.error("Error deleting project: " + error);
                // Handle errors with an alert message
                window.alert('Error deleting project');
                // Redirect to the Project Page
                const projectPageURL = new URL(window.location.origin);
                projectPageURL.pathname = '/projects';
                window.location.href = projectPageURL.toString();
            });
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : projectData ? (
                <section className='text'>
                    <h2>Project Details</h2>
                    <p>Project ID: {projectID}</p>
                    <p>Project Name: {projectData.projectName}</p>
                    <p>Project description: {projectData.description}</p>
                    <p>Project address: {projectData.address}</p>
                    <p>Project start date: {projectData.startDate}</p>
                    <p>Project end date: {projectData.endDate}</p>
                    <p>Project quantity: {projectData.quantity}</p>
                    <p>Project status: {projectData.status}</p>
                    <p>Project needed Ability: {projectData.abilityList}</p>
                    <div className='button-zone'>
                        <button onClick={handleDeleteProject}>Delete Project</button>

                        
                            <button><Link to="/projects">Back to Project Page </Link></button>
                       
                    </div>
                </section>
            ) : (
                <p>No project details found.</p>
            )}
        </div>
    );
};

export default ProjectDetails;
