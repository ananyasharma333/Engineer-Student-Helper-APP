import React, { useState, useEffect } from 'react';
import { FiFileText, FiSave, FiPlus, FiTrash2, FiCheckCircle, FiAlertCircle, FiDownload } from 'react-icons/fi';
import api from '../api/axios';

const Resume = () => {
  const [resume, setResume] = useState({
    fullName: '',
    email: '',
    phone: '',
    skills: [],
    experience: [],
    education: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState('');
  const [newEducation, setNewEducation] = useState('');

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await api.get('/resume');
      if (response.data) {
        setResume(response.data);
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error('Failed to fetch resume', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await api.post('/resume', resume);
      setResume(response.data);
      setMessage('Resume saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to save resume', err);
      setMessage('Error saving resume. Please login first.');
    } finally {
      setSaving(false);
    }
  };

  const addItem = (field, value, setter) => {
    if (!value.trim()) return;
    setResume({...resume, [field]: [...(resume[field] || []), value.trim()]});
    setter('');
  };

  const removeItem = (field, index) => {
    setResume({...resume, [field]: resume[field].filter((_, i) => i !== index)});
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-400">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
        Loading resume...
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FiFileText className="text-rose-400" /> Resume Builder
          </h1>
          <p className="text-slate-400">Build and manage your professional resume.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium flex items-center gap-2 ${message.includes('Error') ? 'bg-red-950/50 text-red-400 border border-red-900' : 'bg-emerald-950/50 text-emerald-400 border border-emerald-900'}`}>
          {message.includes('Error') ? <FiAlertCircle /> : <FiCheckCircle />} {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Personal Info */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-dark-border pb-3">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-1">Full Name</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary-500"
                    value={resume.fullName || ''} onChange={e => setResume({...resume, fullName: e.target.value})} placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-1">Email</label>
                  <input type="email" className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary-500"
                    value={resume.email || ''} onChange={e => setResume({...resume, email: e.target.value})} placeholder="john@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-1">Phone</label>
                  <input type="tel" className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-primary-500"
                    value={resume.phone || ''} onChange={e => setResume({...resume, phone: e.target.value})} placeholder="+91-XXXXXXXXXX" />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-dark-border pb-3">Skills</h2>
              <div className="flex gap-2 mb-3">
                <input type="text" className="flex-1 bg-slate-900/50 border border-dark-border rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary-500 text-sm"
                  value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add a skill..." 
                  onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); addItem('skills', newSkill, setNewSkill); } }} />
                <button type="button" onClick={() => addItem('skills', newSkill, setNewSkill)}
                  className="p-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500 hover:text-white transition-colors">
                  <FiPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(resume.skills || []).map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-primary-500/15 text-primary-300 rounded-full text-sm flex items-center gap-2 group">
                    {skill}
                    <button type="button" onClick={() => removeItem('skills', i)} className="text-slate-500 hover:text-red-400 transition-colors">
                      <FiTrash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-dark-border pb-3">Experience</h2>
              <div className="flex gap-2 mb-3">
                <input type="text" className="flex-1 bg-slate-900/50 border border-dark-border rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary-500 text-sm"
                  value={newExperience} onChange={e => setNewExperience(e.target.value)} placeholder="e.g. SDE Intern at Google (Summer 2025)"
                  onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); addItem('experience', newExperience, setNewExperience); } }} />
                <button type="button" onClick={() => addItem('experience', newExperience, setNewExperience)}
                  className="p-2 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500 hover:text-white transition-colors">
                  <FiPlus />
                </button>
              </div>
              <div className="space-y-2">
                {(resume.experience || []).map((exp, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg group">
                    <span className="text-sm text-slate-300">{exp}</span>
                    <button type="button" onClick={() => removeItem('experience', i)} className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-dark-border pb-3">Education</h2>
              <div className="flex gap-2 mb-3">
                <input type="text" className="flex-1 bg-slate-900/50 border border-dark-border rounded-lg py-2 px-3 text-white focus:outline-none focus:border-primary-500 text-sm"
                  value={newEducation} onChange={e => setNewEducation(e.target.value)} placeholder="e.g. B.Tech CSE - XYZ University (2022-2026)"
                  onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); addItem('education', newEducation, setNewEducation); } }} />
                <button type="button" onClick={() => addItem('education', newEducation, setNewEducation)}
                  className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition-colors">
                  <FiPlus />
                </button>
              </div>
              <div className="space-y-2">
                {(resume.education || []).map((edu, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg group">
                    <span className="text-sm text-slate-300">{edu}</span>
                    <button type="button" onClick={() => removeItem('education', i)} className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={saving}
              className="w-full btn-primary py-3 rounded-lg font-medium flex justify-center items-center gap-2">
              <FiSave /> {saving ? "Saving..." : "Save Resume"}
            </button>
          </form>
        </div>

        {/* Live Preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-panel p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-teal-600 p-6 text-center">
              <h2 className="text-2xl font-bold text-white">{resume.fullName || 'Your Name'}</h2>
              <div className="flex justify-center gap-4 mt-2 text-sm text-white/80">
                {resume.email && <span>{resume.email}</span>}
                {resume.phone && <span>{resume.phone}</span>}
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Skills */}
              {resume.skills && resume.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-3 border-b border-dark-border pb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {resume.experience && resume.experience.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-3 border-b border-dark-border pb-2">Experience</h3>
                  <ul className="space-y-2">
                    {resume.experience.map((exp, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-primary-500 mt-1">▸</span> {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education */}
              {resume.education && resume.education.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-3 border-b border-dark-border pb-2">Education</h3>
                  <ul className="space-y-2">
                    {resume.education.map((edu, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-primary-500 mt-1">▸</span> {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(!resume.skills?.length && !resume.experience?.length && !resume.education?.length) && (
                <p className="text-center text-slate-500 py-8">Start filling in the form to see your resume preview.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
