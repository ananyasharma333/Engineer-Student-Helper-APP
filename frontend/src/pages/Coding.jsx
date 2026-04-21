import React, { useState, useEffect } from 'react';
import { FiCode, FiGithub, FiSave, FiCheckCircle, FiTarget, FiAward, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import api from '../api/axios';

const Coding = () => {
  const [profile, setProfile] = useState({
    leetcodeUsername: '',
    githubUsername: '',
    codeforcesUsername: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [fetchingStats, setFetchingStats] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.leetcodeUsername) {
      fetchLeetcodeStats(profile.leetcodeUsername);
    }
  }, [profile.leetcodeUsername]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/coding');
      if (response.data) {
        setProfile(response.data);
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error('Failed to fetch coding profile', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchLeetcodeStats = async (username) => {
    if (!username) return;
    setFetchingStats(true);
    try {
      const response = await api.get(`/leetcode/${username}`);
      const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      if (data && data.status !== 'error') {
        setLeetcodeStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch LeetCode stats', err);
    } finally {
      setFetchingStats(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await api.post('/coding', profile);
      setProfile(response.data);
      setMessage('Profile updated successfully!');
      if (response.data.leetcodeUsername) {
        fetchLeetcodeStats(response.data.leetcodeUsername);
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to save profile', err);
      setMessage('Error updating profile. Please login first.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-400">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
        Loading coding profile...
      </div>
    );
  }

  const totalSolved = leetcodeStats?.totalSolved || 0;
  const easySolved = leetcodeStats?.easySolved || 0;
  const mediumSolved = leetcodeStats?.mediumSolved || 0;
  const hardSolved = leetcodeStats?.hardSolved || 0;
  const totalQuestions = leetcodeStats?.totalQuestions || 3350;
  const easyTotal = leetcodeStats?.totalEasy || 830;
  const mediumTotal = leetcodeStats?.totalMedium || 1750;
  const hardTotal = leetcodeStats?.totalHard || 770;
  const acceptanceRate = leetcodeStats?.acceptanceRate || 0;
  const ranking = leetcodeStats?.ranking || 0;

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FiCode className="text-primary-500" /> Coding Profile Tracker
        </h1>
        <p className="text-slate-400">Link your profiles and track your competitive programming journey.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium flex items-center gap-2 ${message.includes('Error') ? 'bg-red-950/50 text-red-400 border border-red-900' : 'bg-emerald-950/50 text-emerald-400 border border-emerald-900'}`}>
          {message.includes('Error') ? <FiAlertCircle /> : <FiCheckCircle />} {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Links Form */}
        <div className="glass-panel p-8">
          <h2 className="text-xl font-bold mb-6 text-white border-b border-dark-border pb-4 flex items-center gap-2">
            <FiTarget className="text-primary-400" /> Profile Links
          </h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="text-yellow-500">⚡</span> LeetCode Username
              </label>
              <input 
                type="text"
                className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                placeholder="e.g. janesmith"
                value={profile.leetcodeUsername || ''}
                onChange={(e) => setProfile({...profile, leetcodeUsername: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <FiGithub /> GitHub Username
              </label>
              <input 
                type="text"
                className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-colors"
                placeholder="e.g. janesmith-dev"
                value={profile.githubUsername || ''}
                onChange={(e) => setProfile({...profile, githubUsername: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="text-blue-400">🏆</span> Codeforces Username
              </label>
              <input 
                type="text"
                className="w-full bg-slate-900/50 border border-dark-border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="e.g. janesmith_cf"
                value={profile.codeforcesUsername || ''}
                onChange={(e) => setProfile({...profile, codeforcesUsername: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              disabled={saving}
              className="w-full btn-primary py-2.5 rounded-lg font-medium flex justify-center items-center gap-2 mt-4"
            >
              <FiSave /> {saving ? "Saving..." : "Save Profiles"}
            </button>
          </form>

          {/* Quick Links */}
          <div className="mt-6 pt-6 border-t border-dark-border space-y-3">
            <h3 className="text-sm font-semibold text-slate-400">Quick Links</h3>
            {profile.leetcodeUsername && (
              <a href={`https://leetcode.com/${profile.leetcodeUsername}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                ⚡ leetcode.com/{profile.leetcodeUsername}
              </a>
            )}
            {profile.githubUsername && (
              <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                <FiGithub /> github.com/{profile.githubUsername}
              </a>
            )}
            {profile.codeforcesUsername && (
              <a href={`https://codeforces.com/profile/${profile.codeforcesUsername}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                🏆 codeforces.com/profile/{profile.codeforcesUsername}
              </a>
            )}
          </div>
        </div>

        {/* LeetCode Stats Panel */}
        <div className="lg:col-span-2 space-y-6">
          {profile.leetcodeUsername && (
            <>
              {/* Stats Overview Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-5 text-center border-t-2 border-t-primary-500">
                  <p className="text-3xl font-bold text-white">{totalSolved}</p>
                  <p className="text-xs text-slate-400 mt-1">Total Solved</p>
                </div>
                <div className="glass-panel p-5 text-center border-t-2 border-t-emerald-500">
                  <p className="text-3xl font-bold text-emerald-400">{easySolved}</p>
                  <p className="text-xs text-slate-400 mt-1">Easy</p>
                </div>
                <div className="glass-panel p-5 text-center border-t-2 border-t-amber-500">
                  <p className="text-3xl font-bold text-amber-400">{mediumSolved}</p>
                  <p className="text-xs text-slate-400 mt-1">Medium</p>
                </div>
                <div className="glass-panel p-5 text-center border-t-2 border-t-red-500">
                  <p className="text-3xl font-bold text-red-400">{hardSolved}</p>
                  <p className="text-xs text-slate-400 mt-1">Hard</p>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="glass-panel p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <FiTrendingUp className="text-primary-400" /> Problem Solving Progress
                  {fetchingStats && <div className="w-4 h-4 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin ml-2"></div>}
                </h3>
                
                <div className="space-y-5">
                  {/* Easy */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-emerald-400">Easy</span>
                      <span className="text-sm text-slate-400">{easySolved} / {easyTotal}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${easyTotal > 0 ? (easySolved / easyTotal * 100) : 0}%` }}></div>
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-amber-400">Medium</span>
                      <span className="text-sm text-slate-400">{mediumSolved} / {mediumTotal}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${mediumTotal > 0 ? (mediumSolved / mediumTotal * 100) : 0}%` }}></div>
                    </div>
                  </div>

                  {/* Hard */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-red-400">Hard</span>
                      <span className="text-sm text-slate-400">{hardSolved} / {hardTotal}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal * 100) : 0}%` }}></div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-dark-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-primary-400">Overall Progress</span>
                      <span className="text-sm text-slate-400">{totalSolved} / {totalQuestions} ({totalQuestions > 0 ? Math.round(totalSolved / totalQuestions * 100) : 0}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary-500 to-teal-400 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${totalQuestions > 0 ? (totalSolved / totalQuestions * 100) : 0}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-panel p-5 flex items-center gap-4">
                  <div className="p-3 bg-indigo-900/50 rounded-lg">
                    <FiAward className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{ranking > 0 ? ranking.toLocaleString() : '—'}</p>
                    <p className="text-xs text-slate-400">Global Ranking</p>
                  </div>
                </div>
                <div className="glass-panel p-5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-900/50 rounded-lg">
                    <FiCheckCircle className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{acceptanceRate > 0 ? `${acceptanceRate}%` : '—'}</p>
                    <p className="text-xs text-slate-400">Acceptance Rate</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {!profile.leetcodeUsername && (
            <div className="glass-panel p-10 text-center text-slate-400 lg:col-span-2">
              <FiCode size={48} className="mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-white mb-2">Link Your LeetCode Profile</h3>
              <p>Enter your LeetCode username in the form and save to see your real-time coding stats here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coding;
