import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as authService from '../services/authService';
import '../assets/todo.css'

const TodaysTasks = () => {
  
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedStatus] = useState('');
    
    const [todayTodos, setTodayTodos] = useState([]);
    // Fetch todos 
   useEffect(() => {
     fetchTodayTodos();
   }, []);
   const handleLogout = () => {
    // Call the logout function from authService
    authService.logout();
    // Redirect to the login page
   window.location.href='/login';
  };
   const handleRemoveTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      fetchTodayTodos(); // Fetch updated todos
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
const fetchTodayTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos', {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
        params: {
          
          dueDate: new Date().toISOString().split('T')[0], // Filter by today's date
        },
      });
      console.log('Response from API (Today\'s Todos):', response.data);
      setTodayTodos(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
return(
    <div>
    <div className="top-bar" >
<a href='/' style={{marginTop:'40px' , marginLeft:'10px'}}>Go Back To home page</a>
  <div className="profile-icon" >👤</div>
  <button className = "logout" onClick={handleLogout} >Logout</button>
</div>
<br></br>
      <br></br>
      <br></br>
    <div className="gradient-cards">
    <h2>Today's Todos</h2>
    <br></br>
    {todayTodos.map((todo) => (
      <div
        key={todo.id}
        className={`card ${todo.status.toLowerCase()}-status`}
        onClick={() => handleTodoClick(todo)}
      >
        <div className="container-card">
          <p className="card-title">{todo.title}</p>
          {showDetails && selectedTodo && selectedTodo.id === todo.id && (
            <div>
              <p style={{ color: 'white' }}>Description: {todo.description}</p>
              <p style={{ color: 'white' }}>Status: {todo.status}</p>
              <p style={{ color: 'white' }}>Priority: {todo.priority}</p>
              <p style={{ color: 'white' }}>Due on: {formatDate(todo.dueDate)}</p>
            </div>
          )}
          <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
        </div>
      </div>
    ))}
  </div>
  </div>
)

}
export default TodaysTasks;