import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as authService from '../services/authService';
import '../assets/todo.css'
/**
 * Functional component representing the TodoApp.
 * Manages the state of todos, user input, and provides functionality
 * for interacting with the backend API.
 */
const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setDescription] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [darkMode, setDarkMode] = useState(false);
   // Fetch todos 
  useEffect(() => {
    fetchTodos();
  }, []);
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);
    
  /**
   * Fetches todos from the backend API based on selected status.
   */

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos', {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
        params: {
          status: selectedStatus,
        },
      });
      console.log("Response from API:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
    /**
   * Handles priority filter and fetches todos with the updated priority.
   * @param {string} priority - The selected priority.
   */
  const handlePriortyFilter = async (priority) => {
    setSelectedPriority(priority);
    // Fetch todos with the updated status
    try {
      const response = await axios.get('http://localhost:3000/api/todos', {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
        params: {
          priority: priority,
        },
      });
      console.log("Response from API:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  /**
   * Handles status filter and fetches todos with the updated status.
   * @param {string} status - The selected status.
   */

  const handleStatusFilter = async (status) => {
    setSelectedStatus(status);
    // Fetch todos with the updated status
    try {
      const response = await axios.get('http://localhost:3000/api/todos', {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
        params: {
          status: status,
        },
      });
      console.log("Response from API:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
    /**
   * Handles priority change for a specific todo.
   * @param {number} id - The ID of the todo.
   * @param {string} newPriority - The new priority.
   */

  const  handleChangePriority= async (id, newPriority) => {
    try {
      // Fetch the current todo
      const currentTodo = todos.find(todo => todo.id === id);
  
      // Update the status and priority
      await axios.patch(
        `http://localhost:3000/api/todos/${id}`,
        { status: currentTodo.status, priority: newPriority }, // Include priority
        {
          headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
        }
      );
      fetchTodos(); // Fetch updated todos
    } catch (error) {
      //error handling
      console.error(error.response.data.message);
    }
  };
 
      // Calculate time difference for each completed task

  
/**
   * Handles user logout, calls the logout function from authService.
   */

  const handleLogout = () => {
    // Call the logout function from authService
    authService.logout();
    // Redirect to the login page
   window.location.href='/login';
  };
/**
 * Handles the addition of a new todo.
 * Takes input and inserts while checking for input validity.
 */
const handleAddTodo = async () => {
  if (!newTodo.trim() && !newDescription.trim() && !newDueDate.trim()) {
    alert("Please add a title, description, and due date.");
    return;
  }

  if (!newTodo.trim()) {
    alert("Please add a title.");
    return;
  }

  if (!newDescription.trim()) {
    alert("Please add a description.");
    return;
  }

  if (!newDueDate.trim()) {
    alert("Please add a due date.");
    return;
  }

  try {
    await axios.post(
      'http://localhost:3000/api/todos',
      {
        title: newTodo,
        description: newDescription,
        dueDate: newDueDate, // Include due date in the request payload
      },
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
    setNewTodo('');
    setDescription('');
    setNewDueDate('');
    fetchTodos(); // Fetch updated todos instantly
  } catch (error) {
    console.error(error.response.data.message);
    alert("Failed to add todo. Please try again.");
  }
};

//formating date for better user visibilty and understanding 
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

//fetch the id and delete it using axios delete method 
  const handleRemoveTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      fetchTodos(); // Fetch updated todos
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
//change the statue of the todo instantly and patch using axios patch
const handleChangeStatus = async (id, newStatus) => {
  try {
    // Fetch the current todo
    const currentTodo = todos.find(todo => todo.id === id);

    // Update the status and priority
    await axios.patch(
      `http://localhost:3000/api/todos/${id}`,
      { status: newStatus, priority: currentTodo.priority }, // Include priority
      {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,//sends token in the header
        },
      }
    );
    fetchTodos(); // Fetch updated todos
  } catch (error) {
    //error handling
    console.error(error.response.data.message);
  }
};
//simple method that hides and shows full todo
const handleTodoClick = (todo) => {
  setSelectedTodo(todo);
  setShowDetails((prevShowDetails) => !prevShowDetails);
};
//calculate time by days and hours using math.floor to get the time and returns days and hours in string form 
const calculateTimeTaken = (timeTakenInMinutes) => {
  const hours = Math.floor(timeTakenInMinutes / 60);
  const days = Math.floor(hours / 24);
  return `${days} days ${hours % 24} hours`;
};

  
 

  return (
    <div>
      <div className="top-bar">
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <a href='/todaysTodos' style={{marginTop:'40px' , marginLeft:'10px'}}>Check todays todos</a>
        <div className="profile-icon">👤</div>
        <button className = "logout" onClick={handleLogout}>Logout</button>
      </div>
      <h1>TodoApp</h1>
      <h2>Add New Todo</h2>
      <div>
        
        <label htmlFor="inp" className="inp">
          <input
            type="text"
            id="inp"
            placeholder="&nbsp;"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <span className="label">Add title</span>
          <span className="focus-bg"></span>
        </label>
        <label htmlFor="inp" className="inp">
          <input
            type="text"
            id="inp"
            placeholder="&nbsp;"
            value={newDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="label">Add description</span>
          <span className="focus-bg"></span>
        </label>
        <label htmlFor="dueDate" className="inp">
        <input
          type="date"
          id="dueDate"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
        <span className="label">Select due date</span>
        <span className="focus-bg"></span>
      </label>
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className="filter-by-status">
      <h3>Filter by Status</h3>
      <button style={{marginRight:'10px'}} onClick={() => handleStatusFilter('OPEN')}>Open</button>
      <button style={{marginRight:'10px'}} onClick={() => handleStatusFilter('INPROGRESS')}>In Progress</button>
      <button onClick={() => handleStatusFilter('COMPLETE')}>Complete</button>
    </div>
    <div className="filter-by-priority" >
      <h3>Filter by Priority</h3>
      <button style={{marginRight:'10px'}} onClick={() => handlePriortyFilter('HIGH')}>High</button>
      <button style={{marginRight:'10px'}} onClick={() => handlePriortyFilter('MEDIUM')}>Medium</button>
      <button onClick={() => handlePriortyFilter('LOW')}>Low</button>
    </div>
      {selectedTodo && (
        <div className="select-container">
          <h3>Change Todo Status</h3>
          <select
            className="selectStatus"
            value={selectedTodo.status}
            onChange={(e) => handleChangeStatus(selectedTodo.id, e.target.value)}
          >
            <option value="OPEN">Open</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="COMPLETE">Complete</option>
          </select>
          <h3>Change Todo Priority</h3>
          <select
            className="selectPriority"
            value={selectedTodo.priority}
            onChange={(f) => handleChangePriority(selectedTodo.id, f.target.value)}
          >
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        
        </div>
      )}


      <div className="gradient-cards">
      {todos.map((todo) => (
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
                
                {/* Display time taken only if status is "COMPLETE" and timeTaken is available */}
                {todo.status === 'COMPLETE' && todo.timeTaken && (
                  <p style={{ color: 'white' }}>Time Taken: {calculateTimeTaken(todo.timeTaken)}</p>
                )}
      
              </div>
            )}
            <button onClick={() => setSelectedTodo(todo)} style={{ marginRight: '20px' }}>Status</button>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </div>
        </div>
      ))}
      
    </div>
    
    </div>
  );
};

export default Todos;
