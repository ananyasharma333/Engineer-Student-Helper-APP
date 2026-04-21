import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiExternalLink, FiSearch } from 'react-icons/fi';
import api from '../api/axios';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await api.get('/internships');
      setInternships(response.data || []);
    } catch (err) {
      console.error('Failed to fetch internships', err);
    } finally {
      setLoading(false);
    }
  };

  const types = ['All', ...new Set(internships.map(i => i.type))];

  const filteredInternships = internships.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          i.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || i.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const companyColors = {
    'Google': 'border-t-blue-500',
    'Microsoft': 'border-t-cyan-500',
    'Amazon': 'border-t-orange-500',
    'Flipkart': 'border-t-yellow-500',
    'Swiggy': 'border-t-orange-400',
    'Razorpay': 'border-t-blue-400',
    'Adobe': 'border-t-red-500',
    'Uber': 'border-t-slate-300',
    'PhonePe': 'border-t-purple-500',
    'Atlassian': 'border-t-blue-600',
    'Palo Alto Networks': 'border-t-emerald-500',
    'Google Summer of Code': 'border-t-green-500',
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FiTrendingUp className="text-indigo-400" /> Internship Opportunities
        </h1>
        <p className="text-slate-400">Discover {internships.length} curated tech internships at top companies.</p>
      </div>

      {/* Search and Filter */}
      <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text"
            className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Search by company, role, or location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                typeFilter === t
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          Loading internships...
        </div>
      ) : filteredInternships.length === 0 ? (
        <div className="glass-panel p-10 text-center text-slate-400">
          {searchQuery || typeFilter !== 'All' ? 'No internships match your filter.' : 'No internships posted yet. Check back soon!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map(internship => (
            <div key={internship.id} className={`glass-panel p-0 flex flex-col h-full hover:-translate-y-1 transition-all relative overflow-hidden group border-t-4 ${companyColors[internship.company] || 'border-t-indigo-500'}`}>
              <div className="p-6 flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{internship.title}</h3>
                  <p className="text-indigo-400 font-medium text-sm flex items-center gap-2">
                    <FiBriefcase /> {internship.company}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <FiMapPin className="text-slate-500 shrink-0" /> {internship.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <FiClock className="text-slate-500 shrink-0" /> {internship.type}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                    <FiDollarSign className="text-emerald-500 shrink-0" /> {internship.stipend}
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {internship.description}
                </p>
                
                {internship.requirements && internship.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {internship.requirements.map((req, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800/80 text-xs rounded-full text-slate-300 border border-dark-border">
                        {req}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-dark-border flex justify-between items-center bg-slate-900/30">
                <span className="text-xs text-slate-500">
                  {new Date(internship.postedAt).toLocaleDateString()}
                </span>
                <a 
                  href={internship.applyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white transition-all rounded-lg font-medium text-sm flex items-center gap-2"
                >
                  Apply Now <FiExternalLink />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Internships;
