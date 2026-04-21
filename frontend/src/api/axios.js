import axios from 'axios';

// Dynamically determine the base URL
const getBaseURL = () => {
  // Check if we are running locally
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  
  // Use the environment variable if defined (for Vercel), otherwise fallback to the last known working public link
  // NOTE: If using a tunnel like Serveo, update this URL or set VITE_API_URL in Vercel settings
  return import.meta.env.VITE_API_URL || 'https://engineering-student-backend.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
