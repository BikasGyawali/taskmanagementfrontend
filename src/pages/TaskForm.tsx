import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Create a navigate instance
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentName, setAttachmentName] = useState('');
  const [completed, setCompleted]=useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id){
    const fetchTask = async () => {
      const response = await api.get(`/task/getById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle(response?.data?.task?.title);
      setDescription(response?.data?.task?.description);
      setDueDate(response?.data?.task?.dueDate);
      setCompleted(response?.data?.task?.completed);
      setAttachment(response?.data?.task?.attachment);
      setAttachmentName(response?.data?.task?.attachment);
    };
    fetchTask();
  }
  }, [id]);

  useEffect(() => {
    !token && navigate("/login");
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('dueDate', dueDate);
    formData.append('completed', JSON.stringify(completed));

    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      if (id) {
        // Editing an existing task
        await api.post(`/task/editTask/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'}
        });
      } else {
        // Adding a new task
        await api.post('/task/addTask', formData, {
          headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'},
        });
      }
      navigate('/tasks'); // Redirect to the task list
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file && file.type === 'application/pdf') {
      setAttachment(file);
    } 
  };

  const handleStatusChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setCompleted(e.target?.checked)
  }

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Task</h2>
        <form className="bg-white w-[90%] md:w-[60%] lg:w-[40%] p-6 border border-gray-200 rounded-lg shadow-md" onSubmit={handleSubmit }>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 mb-2">Attachment (PDF)</label>
          <input
            type="file"
            name="attachment"
            onChange={handleAttachmentChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
          {attachmentName && <p className="text-gray-600 mt-2">Current file: {attachmentName}</p>}
        </div>
          <div className="mb-4">
          <label className="block text-gray-700 mb-2">Task Status</label>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleStatusChange}
            className="mr-2 leading-tight"
          />
          <span>{completed ? 'Complete' : 'Incomplete'}</span>
        </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
           {id? "Update Task":"Create Task"}
          </button>
        </form>
    </div>
  );
};

export default TaskForm;
