import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './signUp.css';
import img1 from '../image/6207670.jpg';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`);
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching user: ', err);
    }
  };

  const handleRegisterUser = (user) => {
    axios
      .post(`http://localhost:3000/signUp`, user)
      .then(() => {
        alert('User registration successfully');
        fetchUser();
      })
      .catch((err) => console.log(err));
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      isValid = false;
    } else if (user.some((u) => u.email === email)) {
      isValid = false;
    }

    if (!confirmPassword || password !== confirmPassword) {
      isValid = false;
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }

    if (!password) {
      isValid = false;
    }

    if (!FullName) {
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        name: FullName,
        email,
        password,
        role: 'user',
      };
      handleRegisterUser(userData);
      console.log('User registered successfully');
      // Reset the form fields after successful submission
      setEmail('');
      setPassword('');
      setFullName('');
      setConfirmPassword('');
    }
  };

  return (
    <div class="Desktop3">
      <div class="img">
        <img src={img1} height="600px" width="900px" />
      </div>
      <div class="Login">
        <div class="text">
          <h2>SIGN UP</h2>
        </div>
        <div class="form">
          <form onSubmit={handleSubmit}>
            <label for="ID">
              <b>Email</b>
            </label>
            <input
              name="ID"
              className={!email ? 'error' : ''}
              placeholder="Your Email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label for="uname">
              <b>Your Name</b>
            </label>
            <input
              className={!FullName ? 'error' : ''}
              placeholder="Full name"
              type="text"
              required
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
            ></input>

            <label for="psw">
              <b>Password</b>
            </label>
            <input
              className={!password ? 'error' : ''}
              placeholder="Enter password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <label for="psw">
              <b>Confirm Password</b>
            </label>
            <input
              className={
                !confirmPassword || passwordMismatch ? 'error' : ''
              }
              placeholder="Confirm password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            {passwordMismatch && (
                <p className="error-message">Passwords do not match</p>
            )}
            <button type="submit">Sign up</button>
            <Link to="/login">Do not have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
