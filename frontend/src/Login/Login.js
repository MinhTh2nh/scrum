import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router
import axios from 'axios';
import img1 from '../image/6207670.jpg';
import { Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState([]);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    fetchUser();
    // Check local storage for "rememberMe" flag and email
    const storedRememberMe = localStorage.getItem('rememberMe');
    const storedEmail = localStorage.getItem('email');
    if (storedRememberMe === 'true' && storedEmail) {
      setRememberMe(true);
      setemail(storedEmail);
    }
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

  const handleMailChange = (e) => {
    setemail(e.target.value);
    setHasEmailError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasPasswordError(false);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setHasEmailError(true);
      isValid = false;
    }

    if (!password) {
      setHasPasswordError(true);
      isValid = false;
    }

    return isValid;
  };

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const foundUser = user.find((u) => u.email === email);
      console.log('foundUser:', foundUser);

      if (foundUser) {
        if (foundUser.password && foundUser.password === password) {
          if (foundUser.role === 'admin') {
            // User is an admin, redirect to the admin page
            console.log('password:', password);
            console.log('role:', foundUser.role);
            // Add an alert for successful login
            alert("Login successfully as an admin");
          } else if (foundUser.role === 'leaders') {
            // User is a regular user, redirect to the home page
            console.log('email:', email);
            console.log('password:', password);
            console.log('role:', foundUser.role);
            // Add an alert for successful login
            alert("Login successfully as a community leader");
            navigate('/');

          }
          else {
            console.log('email:', email);
            console.log('password:', password);
            console.log('role:', foundUser.role);
            // Redirect to the "/homepageUser" route
          }

          // Store email and "rememberMe" flag in local storage if "Remember me" is checked
          if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('rememberMe', 'true');
          } else {
            // Clear stored email and "rememberMe" flag
            localStorage.removeItem('email');
            localStorage.removeItem('rememberMe');
          }
        } else {
          // Invalid password
          console.log('Invalid password');
          // Add an alert for an invalid password
          alert("Invalid password");
        }
      } else {
        // User not found
        alert("User not found");
      }
    }
  };
  
  return (
    <div class="Desktop3">
      <div class="img"><img src={img1} height="600px" width="900px"/></div>

      <div class="Login">
        <div class="text">
          <h2>LOGIN</h2>
        </div>
        <form onSubmit={handleSubmit} class="form">
          <label for="uname"><b>User Name</b></label>
          <input
            placeholder="Enter email"
            type="text"
            id="email"
            value={email}
            onChange={handleMailChange}
            className={hasEmailError ? "error" : ""}
            required
          />

          <label for="psw"><b>Password</b></label>
          <input
            placeholder="Enter password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={hasPasswordError ? "error" : ""}
            required
          />

          <div class="regis">
            <p class="regis">
              <i>
                <Link to="/signup">Do not have an account?</Link>
              </i>
            </p>
          </div>

          <label class="check">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              name="remember"
            /> Remember me
          </label>

          <button type="submit" onClick={handleSubmit}>
            Sign in
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
