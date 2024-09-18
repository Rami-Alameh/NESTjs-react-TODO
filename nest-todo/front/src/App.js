import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Todos from './components/Todos';
import * as authService from './services/authService'; // Adjust the import for your authentication service
import TodaysTasks from'./components/TodaysTasks'
function App() {
  const isAuthenticated = () => {
    // Check if the user is authenticated using your authService
    return authService.getToken() !== null;
  };

  const PrivateRoute = ({ element }) => {
    // Redirect to login if not authenticated
    return isAuthenticated() ? (
      element
    ) : (
      <Navigate to="/login" state={{ from: window.location.pathname }} />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Use PrivateRoute for the protected route */}
        <Route path="/" element={<PrivateRoute element={<Todos />} />} />
        <Route path="/todaysTodos" element={< TodaysTasks/>} />
      </Routes>
    </Router>
  );
}

export default App;
