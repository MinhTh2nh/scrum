import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './createProject.css';


const ProjectCL = () => {
  const [project, setProject] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [address, setAddress] = useState('');
  const [abilityList, setAbilityList] = useState('');
  const [status, setStatus] = useState('');

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAbilityListChange = (e) => {
    setAbilityList(e.target.value);
  };

  useEffect(() => {
    if (projectName.length < 3) {
      console.log('Project name should be at least 3 characters long.');
    }
  }, [projectName]);

  // useEffect to validate the start and end date
  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      console.log('End date should be after the start date.');
    }
  }, [startDate, endDate]);


  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/projects`);
      setProject(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching projects: ', err);
    }
  };

  const handleRegisterProject = (projectData) => {
    axios
      .post(`http://localhost:3000/createProject`, projectData)
      .then(() => {
        alert('Project registration successful');
        fetchProjects();
      })
      .catch((err) => console.log(err));
  };

  const validateProjectForm = () => {
    let isValid = true;

    // Add validation logic for project fields here
    if (!projectName) {
      isValid = false;
    }
    // Add more validations as needed

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateProjectForm()) {
      const projectData = {
        projectName,
        description,
        quantity,
        startDate,
        endDate,
        address,
        abilityList,
        status: 'waiting', // Set the status to 'waiting'
      };
      
      handleRegisterProject(projectData);
      console.log('Project registered successfully');
      
      // Reset the form fields after successful submission
      setProjectName('');
      setDescription('');
      setQuantity('');
      setStartDate('');
      setEndDate('');
      setAddress('');
      setAbilityList('');
      setStatus(''); // You can reset the status if needed
    }
  };

  return (
    <div>
      <section class="centent-body">
        <div class="text">
          <h2>CREATE PROJECT</h2>
        </div>
        <form onSubmit={handleSubmit} class="form">
          <label for="uname"><b>Project's Name</b></label>
          <input type="text" placeholder="Enter Project's Name" name="uname" required value={projectName} onChange={handleProjectNameChange} />

          <label>Message</label>
          <textarea cols="90" rows="5" placeholder="Description" value={description} onChange={handleDescriptionChange}></textarea>

          <label for="quantity"><b>Quantity</b></label>
          <input type="number" placeholder="Enter the number of participants" name="quantity" required value={quantity} onChange={handleQuantityChange} />

          <label for="dateS">Start Date</label>
          <input type="date" id="dateInput" name="dateInput" required value={startDate} onChange={handleStartDateChange} />

          <label for="dateE">End Date</label>
          <input type="date" id="dateInput" name="dateInput" value={endDate} onChange={handleEndDateChange} />

          <label for="Add">Address</label>
          <input type="text" placeholder="Enter Address" name="Add" required value={address} onChange={handleAddressChange} />

          <label for="Abili">Ability List</label>
          <textarea cols="90" rows="5" placeholder="Description" value={abilityList} onChange={handleAbilityListChange}> </textarea>

          <button type="submit" onClick={handleSubmit}>SUBMIT</button>

        </form>
      </section>
      </div>
  )
}

export default ProjectCL
