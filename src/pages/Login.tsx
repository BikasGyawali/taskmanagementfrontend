import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate("/tasks")
      // Redirect to dashboard or home page
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
        <div className="flex py-12 flex-col h-screen bg-gray-100 font-bold rounded px-auto justify-center items-center">
        <div className="shadow-lg rounded  w-[90%] md:w-[60%] lg:w-[40%] pt-6  bg-white flex flex-col justify-center items-center">
            <p className="font-sans px-3 pt-2 text-red-500 text-xl">
                Task Management
            </p>
    <form onSubmit={handleLogin}>
        <div className="px-8 pt-6 pb-8 h-400 w-96 flex flex-col justify-center items-center">
        <div className="mb-4 flex flex-col justify-start ">
      <div className="mt-1 flex flex-col justify-start">
            <label
            htmlFor="Email"
            className="font-sans text-md">
            Email
            </label>
        </div>
      <div className="mt-2 font-sans appearance-none border h-12 py-2 px-3  w-72 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline">
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
        />
      </div>
      <div className="mt-1 flex flex-col justify-start">
            <label
            htmlFor="Password"
            className="font-sans text-md">
            Password
            </label>
        </div>
      <div className="mt-2 font-sans appearance-none border h-12 py-2 px-3  w-72 lg:w-[30vw] leading-tight focus:outline-none focus:shadow-outline">
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
        />
      </div>
      <div className="mt-2 flex justify-center items-center ">
      <button 
      type="submit"
      className="bg-blue-600 hover:bg-blue-500 font-sans text-white py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 md:hover:scale-105 duration-300 hover:shadow-xl"
      >Login
      </button>
      </div>
    </div>
    </div>
    </form>
 </div>
</div>
</>
  );
};

export default Login;
