import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import api from '../api/axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/auth/signup', {
        username,
        email,
        password,
        roles: ["user"] // Default role for engineering student super app
      });
      // Route directly to login on success
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try a different username or email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="glass-panel p-8 md:p-10 w-full max-w-md animate-fade-in relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
        
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400 text-sm">Join the Engineering Portal</p>
        </div>

        {error && (
          <div className="flex flex-col gap-2 p-3 mb-6 text-sm text-red-400 bg-red-950/50 border border-red-900 rounded-lg">
            <div className="flex items-center gap-2">
               <FiAlertCircle size={18} />
               <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Username</label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-3 text-slate-500" />
              <input 
                type="text"
                required
                className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3 text-slate-500" />
              <input 
                type="email"
                required
                className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 mb-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3 text-slate-500" />
              <input 
                type="password"
                required
                className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-2.5 rounded-lg font-medium flex justify-center items-center mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6 relative z-10">
          Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
