import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi';
import api from '../api/axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post('/auth/signin', {
        username,
        password
      });
      // Save token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="glass-panel p-8 md:p-10 w-full max-w-md animate-fade-in relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/20 blur-3xl rounded-full"></div>
        
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Sign in to your Engineering portal</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 mb-6 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-lg">
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Username</label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-3 text-slate-500" />
              <input 
                type="text"
                required
                className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
            </div>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3 text-slate-500" />
              <input 
                type="password"
                required
                className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-2.5 rounded-lg font-medium flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : "Sign In"}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6 relative z-10">
          Don't have an account? <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
