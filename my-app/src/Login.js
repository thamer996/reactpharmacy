import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import backgroundImage from './background.jpg'; // Import the image
import Dashboard from './Dashbord';

const Login = ({ onRouteChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    try {
      const response = await axios.post('http://192.168.203.34:3010/api/admin/login', { email, password });
      console.log("my email is " + email);

      const data = response.data; 

      if (response.status === 200) {
        console.log("chouchane");

        const token = data.token;

        handleLogin1();
        // Handle the token, e.g., store it in local storage or state
        console.log('Token:', token);
      } else {
        console.log("aziza");
        setErrorMessage('Identifiants incorrects') // Display error message to the user
      }
    } catch (error) {
      // Network or server error
      console.log("goujou");
    }
  };

  const handleLogin1 = () => {
    // Perform login logic and validate credentials

    // Switch to the dashboard route
    onRouteChange('sidebar');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h1 style={{ marginBottom: '30px', color: 'green', textAlign: 'center' }}>Bienvenue à ma pharmacie</h1>
        <form
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
          onSubmit={handleLogin}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Email"
            required
          />
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc', }}
              placeholder="Password"
              required
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={handleTogglePassword}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(to right, #006064, #00838f)',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
  
  
};

export default Login;
