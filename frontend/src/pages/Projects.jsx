import React, { useState, useEffect } from 'react';
import { FiFolder, FiGithub, FiExternalLink, FiThumbsUp, FiPlus, FiX } from 'react-icons/fi';
import api from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '', description: '', techStack: '', githubLink: '', liveLink: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data || []);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', {
        ...newProject,
        techStack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean)
      });
      setShowModal(false);
      setNewProject({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' });
      fetchProjects();
    } catch (err) {
      console.error('Failed to create project', err);
    }
  };

  const handleUpvote = async (id) => {
    try {
      await api.put(`/projects/${id}/upvote`);
      fetchProjects();
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FiFolder className="text-amber-400" /> Project Showcase
          </h1>
          <p className="text-slate-400">Share your projects and discover what others are building.</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="btn-primary py-2.5 px-5 rounded-lg font-medium flex items-center gap-2 shrink-0">
          <FiPlus /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-panel p-10 text-center text-slate-400">
          <FiFolder size={48} className="mx-auto mb-4 text-slate-600" />
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
          <p>Be the first to showcase your work!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="glass-panel p-0 flex flex-col h-full hover:-translate-y-1 transition-all overflow-hidden group border-t-4 border-t-amber-500">
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-500/10 text-amber-300 text-xs rounded-full border border-amber-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-dark-border flex justify-between items-center bg-slate-900/30">
                <button onClick={() => handleUpvote(project.id)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary-400 transition-colors">
                  <FiThumbsUp /> <span className="font-medium">{project.upvotes || 0}</span>
                </button>
                <div className="flex gap-3">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors" title="Source Code">
                      <FiGithub size={18} />
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="text-slate-400 hover:text-primary-400 transition-colors" title="Live Demo">
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="glass-panel p-8 max-w-lg w-full animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2"><FiPlus className="text-amber-400" /> New Project</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Project Title</label>
                <input type="text" required className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-amber-500"
                  value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Description</label>
                <textarea rows={3} required className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-amber-500 resize-none"
                  value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Tech Stack (comma-separated)</label>
                <input type="text" className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-amber-500"
                  value={newProject.techStack} onChange={e => setNewProject({...newProject, techStack: e.target.value})} placeholder="React, Node.js, MongoDB" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">GitHub Link</label>
                <input type="url" className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-amber-500"
                  value={newProject.githubLink} onChange={e => setNewProject({...newProject, githubLink: e.target.value})} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Live Link</label>
                <input type="url" className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-amber-500"
                  value={newProject.liveLink} onChange={e => setNewProject({...newProject, liveLink: e.target.value})} />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border border-dark-border text-slate-300 hover:bg-slate-800 transition">Cancel</button>
                <button type="submit" className="flex-1 btn-primary py-2.5 rounded-lg font-medium">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
