import React, { useState } from 'react';
import axios from 'axios';
import * as authService from '../services/authService'; // Import the authentication service
import '../assets/loginstyle.css'
/**
 * send email and password using axios to backend then to db and checks validaty  
 * @returns a token and sets it in local storage so the user can easily retrieve it and get authenticated requests to todos
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
  
      if (response && response.data && response.data.jwtToken) {
        const { jwtToken } = response.data;
        authService.setToken(jwtToken);
        console.log('Token set:', jwtToken);
        window.location.href = '/';
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  return (
    <div className='containerlogin'>
      <h2>Login</h2>
      <label for="username">Email:</label>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <label for="password">Password:</label>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <a href='/register' style={{marginLeft:'10px'}}>Dont have an account??</a>
    </div>
  );
};

export default Login;