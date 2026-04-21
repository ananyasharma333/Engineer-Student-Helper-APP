import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FiHome, FiBook, FiCode, FiTrendingUp, FiLogOut, FiUser, FiFileText, FiFolder, FiMenu, FiX } from 'react-icons/fi';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Coding from './pages/Coding';
import Internships from './pages/Internships';
import Resume from './pages/Resume';
import Projects from './pages/Projects';

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const navLinks = [
    { to: '/', icon: <FiHome />, label: 'Home' },
    { to: '/notes', icon: <FiBook />, label: 'Notes' },
    { to: '/coding', icon: <FiCode />, label: 'Coding' },
    { to: '/internships', icon: <FiTrendingUp />, label: 'Internships' },
    { to: '/projects', icon: <FiFolder />, label: 'Projects' },
    { to: '/resume', icon: <FiFileText />, label: 'Resume' },
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-t-0 border-x-0 border-dark-border py-4 px-6 flex justify-between items-center rounded-none shadow-md">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-teal-200 cursor-pointer" onClick={() => navigate('/')}>
          SuperApp <span className="text-xs font-normal text-slate-400 ml-2 hidden sm:inline">Engineering Portal</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-5 items-center">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="text-slate-300 hover:text-primary-400 transition-colors flex items-center gap-1.5 text-sm">
              {link.icon} {link.label}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-dark-border">
               <span className="text-sm text-primary-400 flex items-center gap-1"><FiUser/> {user.username}</span>
               <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1" title="Logout">
                  <FiLogOut size={18} />
               </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary ml-4 px-4 py-1.5 text-sm flex items-center gap-2 rounded-lg">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 right-4 left-4 glass-panel p-4 rounded-xl space-y-2 animate-fade-in" onClick={e => e.stopPropagation()}>
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-primary-400 transition-colors flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50">
                {link.icon} {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left text-red-400 flex items-center gap-3 p-3 rounded-lg hover:bg-red-950/30">
                <FiLogOut /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}
                className="block btn-primary text-center py-2 rounded-lg">Login</Link>
            )}
          </div>
        </div>
      )}

      <main className="container mx-auto p-4 max-w-7xl pt-24 pb-12">
        <Routes>
          <Route path="/" element={<HomeOverview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-border py-6 text-center text-sm text-slate-500">
        Engineering Student Super App © {new Date().getFullYear()} — Built for students, by students.
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function HomeOverview() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const features = [
    {
      icon: <FiCode size={28} />,
      title: 'Coding Tracker',
      description: 'Link your LeetCode, GitHub & Codeforces profiles. Track problems solved, global ranking, and acceptance rate in real-time.',
      color: 'primary',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/coding'
    },
    {
      icon: <FiBook size={28} />,
      title: 'Study Notes',
      description: 'Access 27+ notes across 9 CS subjects — DSA, OS, DBMS, CN, OOP, SE, TOC, Compiler Design, and ML/AI.',
      color: 'teal',
      gradient: 'from-teal-500 to-emerald-500',
      path: '/notes'
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: 'Internships',
      description: 'Browse 12+ curated internship opportunities at Google, Microsoft, Amazon, Adobe, Uber, and more top companies.',
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-500',
      path: '/internships'
    },
    {
      icon: <FiFileText size={28} />,
      title: 'Resume Builder',
      description: 'Build your professional resume with a live preview. Add skills, experience, and education — all saved to your profile.',
      color: 'rose',
      gradient: 'from-rose-500 to-pink-500',
      path: '/resume'
    },
    {
      icon: <FiFolder size={28} />,
      title: 'Project Showcase',
      description: 'Share your side projects with the community. Add tech stacks, GitHub links, and get upvotes from peers.',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      path: '/projects'
    },
    {
      icon: <FiUser size={28} />,
      title: 'Student Profile',
      description: 'Your complete engineering profile — coding stats, resume, projects, and achievements all in one place.',
      color: 'slate',
      gradient: 'from-slate-400 to-slate-500',
      path: '/coding'
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in my-6">
      {/* Hero */}
      <div className="glass-panel p-10 md:p-14 text-center space-y-5 bg-gradient-to-br from-dark-card/80 to-primary-900/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-white relative z-10">
          {user ? `Welcome back, ${user.username}! 🚀` : 'Engineering Student Super App 🚀'}
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg relative z-10">
          Track your coding profiles, access study notes, discover internships, build your resume, and showcase projects — all in one place.
        </p>
        {!user && (
          <div className="flex gap-4 justify-center relative z-10 pt-4">
            <button onClick={() => navigate('/register')} className="btn-primary px-8 py-3 rounded-lg font-medium text-lg">
              Get Started
            </button>
            <button onClick={() => navigate('/login')} className="px-8 py-3 rounded-lg font-medium text-lg border border-dark-border text-slate-300 hover:bg-slate-800 transition-colors">
              Sign In
            </button>
          </div>
        )}
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div 
            key={i}
            onClick={() => navigate(feature.path)}
            className="glass-panel p-0 hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className={`h-1.5 bg-gradient-to-r ${feature.gradient}`}></div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">{feature.title}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              <div className="mt-4 text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Explore → 
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 text-center">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-teal-400">27+</p>
          <p className="text-xs text-slate-400 mt-1">Study Notes</p>
        </div>
        <div className="glass-panel p-5 text-center">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">12+</p>
          <p className="text-xs text-slate-400 mt-1">Internships</p>
        </div>
        <div className="glass-panel p-5 text-center">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">9</p>
          <p className="text-xs text-slate-400 mt-1">CS Subjects</p>
        </div>
        <div className="glass-panel p-5 text-center">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-400">3</p>
          <p className="text-xs text-slate-400 mt-1">Coding Platforms</p>
        </div>
      </div>
    </div>
  );
}

export default App;
