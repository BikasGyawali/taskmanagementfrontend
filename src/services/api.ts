import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// export const loginUser = async (email: string, password: string): Promise<{ token: string; user: User }> => {
//   const response = await api.post('/login', { email, password });
//   return response.data;
// };

// export const fetchTasks = async (token: string): Promise<Task[]> => {
//   const response = await api.get('/tasks', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

export default api;
