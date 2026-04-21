import React, { useState, useEffect } from 'react';
import { FiDownload, FiUploadCloud, FiBook, FiPlus, FiSearch, FiFilter, FiFileText } from 'react-icons/fi';
import api from '../api/axios';

const SUBJECTS = [
  'All Subjects',
  'Data Structures & Algorithms',
  'Operating Systems',
  'Database Management Systems',
  'Computer Networks',
  'Object-Oriented Programming',
  'Software Engineering',
  'Theory of Computation',
  'Compiler Design',
  'Machine Learning & AI'
];

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({ title: '', subject: '', file: null });
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/notes');
      setNotes(response.data || []);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSubject = selectedSubject === 'All Subjects' || note.subject === selectedSubject;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const subjectCounts = {};
  notes.forEach(n => {
    subjectCounts[n.subject] = (subjectCounts[n.subject] || 0) + 1;
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadData.file) return;
    
    const formData = new FormData();
    formData.append('file', uploadData.file);
    formData.append('title', uploadData.title);
    formData.append('subject', uploadData.subject);

    try {
      await api.post('/notes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowUploadModal(false);
      setUploadData({ title: '', subject: '', file: null });
      fetchNotes();
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const subjectColors = {
    'Data Structures & Algorithms': 'from-blue-500 to-cyan-500',
    'Operating Systems': 'from-purple-500 to-pink-500',
    'Database Management Systems': 'from-orange-500 to-yellow-500',
    'Computer Networks': 'from-green-500 to-teal-500',
    'Object-Oriented Programming': 'from-indigo-500 to-blue-500',
    'Software Engineering': 'from-rose-500 to-red-500',
    'Theory of Computation': 'from-violet-500 to-purple-500',
    'Compiler Design': 'from-amber-500 to-orange-500',
    'Machine Learning & AI': 'from-emerald-500 to-green-500'
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FiBook className="text-teal-400" /> Study Notes
          </h1>
          <p className="text-slate-400">Access CS resources across {Object.keys(subjectCounts).length} subjects • {notes.length} notes available</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="btn-primary py-2.5 px-5 rounded-lg font-medium flex items-center gap-2 shrink-0"
        >
          <FiUploadCloud /> Upload Note
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text"
            className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="Search notes by title, subject, or content..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative shrink-0">
          <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <select
            className="bg-slate-900/50 border border-dark-border rounded-lg py-2.5 pl-10 pr-8 text-white focus:outline-none focus:border-primary-500 appearance-none cursor-pointer"
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
          >
            {SUBJECTS.map(s => (
              <option key={s} value={s}>{s} {s !== 'All Subjects' && subjectCounts[s] ? `(${subjectCounts[s]})` : ''}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subject Pills */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSubject(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedSubject === s
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {s === 'All Subjects' ? '📚 All' : s}
          </button>
        ))}
      </div>

      {/* Notes Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          Loading notes...
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="glass-panel p-10 text-center text-slate-400">
          {searchQuery || selectedSubject !== 'All Subjects' ? 'No notes match your filter.' : 'No notes uploaded yet. Be the first to share!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map(note => {
            const gradient = subjectColors[note.subject] || 'from-slate-500 to-slate-600';
            return (
              <div key={note.id} className="glass-panel p-0 hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${gradient}`}></div>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-20 shrink-0`}>
                      <FiFileText className="text-white" size={18} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate">{note.title}</h3>
                      <p className="text-xs font-medium text-teal-400">{note.subject}</p>
                    </div>
                  </div>
                  
                  {note.description && (
                    <p className="text-sm text-slate-400 mb-4 line-clamp-3">{note.description}</p>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-dark-border">
                    <span className="text-xs text-slate-500">
                      {new Date(note.uploadedAt).toLocaleDateString()}
                    </span>
                    {note.fileUrl ? (
                      <a 
                        href={`${api.defaults.baseURL.replace('/api', '')}${note.fileUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs hover:bg-primary-500 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <FiDownload size={12} /> Download
                      </a>
                    ) : (
                      <span className="px-3 py-1 bg-slate-800/50 text-slate-500 rounded-full text-xs">Reference Note</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowUploadModal(false)}>
          <div className="glass-panel p-8 max-w-md w-full animate-fade-in relative z-10" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <FiPlus className="text-primary-400" /> Share a Note
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Title</label>
                <input type="text" required className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-primary-500"
                  value={uploadData.title} onChange={e => setUploadData({...uploadData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">Subject</label>
                <select required className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-primary-500 appearance-none"
                  value={uploadData.subject} onChange={e => setUploadData({...uploadData, subject: e.target.value})}
                >
                  <option value="">Select a subject...</option>
                  {SUBJECTS.filter(s => s !== 'All Subjects').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1">File (PDF, DOC, etc.)</label>
                <input type="file" required
                  className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2 px-3 text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500/20 file:text-primary-300 hover:file:bg-primary-500/30"
                  onChange={e => setUploadData({...uploadData, file: e.target.files[0]})}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 py-2.5 rounded-lg border border-dark-border text-slate-300 hover:bg-slate-800 transition">Cancel</button>
                <button type="submit" className="flex-1 btn-primary py-2.5 rounded-lg font-medium">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
