import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import TaskList from './components/TaskList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TaskForm from './pages/TaskForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login   />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/task/edit/:id" element={<TaskForm />} />
        <Route path="/task/addTask" element={<TaskForm />} />
      </Routes>
    </Router>
  );
};

export default App;
