import React, { useState } from 'react';
import axios from 'axios';
import '../assets/loginstyle.css'
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//gets user data and registers it in the database with the post method that calls auth/register which is the path to register the user in the db
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <label for="username">Email:</label>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <label for="password">Password:</label>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <a href='/login' style={{marginLeft:'10px'}}>already have an account??</a>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
