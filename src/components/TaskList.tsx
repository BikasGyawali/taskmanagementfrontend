import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const navigate = useNavigate(); // Create a history instance for navigation
  const [completed, setCompleted] = useState('All');
  const token=localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async (token : String) => {
      const response = await api.get('/task/getAll', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response?.data.task);
    };
    token ? fetchTasks(token): navigate("/login");
  }, []);

  // Function to handle task deletion
  const handleDelete = async (id: number) => {
    await api.delete(`/task/deleteTask/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Refresh task list after deletion
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to navigate to edit page
  const handleEdit = (id: number) => {
    navigate(`/task/edit/${id}`); // Navigate to edit task page
  };

  const handleAddTask = () => {
    navigate(`/task/addTask`); // Navigate to edit task page
  };

  const handleDropDownStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompleted(e.target.value); // Update completed state based on selection
  };

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      if (completed === 'Complete') return task.completed === true;
      if (completed === 'Incomplete') return task.completed === false;
      return true; // Return all tasks when completed is undefined
    });
    setFilteredTasks(filtered);
  }, [tasks, completed]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">My Tasks</h2>
      <div className='flex w-[90%] md:w-[60%] lg:w-[40%] justify-between m-2'>
        <div className='max-w-[50]'>
          <select
            value={completed}
            onChange={(e)=>handleDropDownStatusChange(e)}
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="All">Task Status</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Complete">Complete</option>
          </select>
          </div>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 mb-2 py-2 rounded shadow hover:bg-blue-600"
        >
          Add Task
        </button>
    </div>
      <div className="grid gap-6 w-full max-w-2xl">
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">{task.title}</h3>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="text-sm  mb-4">
                Due Date: <span className="font-medium text-gray-700">{task.dueDate}</span>
              </div>
              <div className="text-sm mb-4">
                Status: 
                <span className={`font-semibold ml-2 ${task.completed? 'text-green-500' : 'text-red-500'}`}>
                  {task.completed ? "Completed" : "Not Completed"}
                </span>
              </div>
              <div className="text-sm  mb-4">
                Attachment: <span className="font-medium text-gray-700">{task.attachment}</span>
              </div>
              <div className="flex justify-end">
                <div className='px-2'>
                <button
                  onClick={() => handleEdit(task.id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='flex justify-center items-center'>
            <p className="text-gray-500">No tasks available at the moment. Add a task if you'd like.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;