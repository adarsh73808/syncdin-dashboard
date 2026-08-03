import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import Filters from '../components/Filters';
import MatchCard from '../components/MatchCard';
import Insights from '../components/Insights';
import Timeline from '../components/Timeline';
import { dummyMatches, dummyActivities, dummyInsights } from '../data/matches';
import { Sparkles, UserPlus, RefreshCw, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Dashboard() {
  const [matches, setMatches] = useState(dummyMatches);
  const [activities, setActivities] = useState(dummyActivities);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('Highest Match');
  
  // Custom toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const currentUser = {
    name: 'Alex Rivera',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
  };

  // Stats calculation
  const totalMatchesCount = matches.length;
  const newMatchesCount = useMemo(() => {
    const today = new Date('2026-08-03');
    return matches.filter(m => {
      const addedDate = new Date(m.dateAdded);
      return addedDate.toDateString() === today.toDateString();
    }).length;
  }, [matches]);

  const pendingIntrosCount = matches.filter(m => m.introductionStatus === 'Pending').length;
  const messagesSentCount = useMemo(() => {
    return matches.filter(m => m.introductionStatus === 'Accepted' || m.introductionStatus === 'Pending').length + 12;
  }, [matches]);

  // Handle Save toggle
  const handleSaveToggle = (id) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === id) {
          const updated = !m.isSaved;
          showToast(
            updated ? `Saved ${m.name} to your matches.` : `Removed ${m.name} from saved matches.`,
            'info'
          );
          return { ...m, isSaved: updated };
        }
        return m;
      })
    );
  };

  // Handle AI Introduction
  const handleSendIntroduction = (id) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === id) {
          showToast(`AI Introduction request sent to ${m.name}!`, 'success');
          
          // Add timeline entry
          const newAct = {
            id: `a-${Date.now()}`,
            type: 'intro',
            content: `You sent an AI Introduction to ${m.name} (${m.designation} at ${m.company}).`,
            timestamp: 'Just now',
          };
          setActivities(prevAct => [newAct, ...prevAct]);

          return { ...m, introductionStatus: 'Pending' };
        }
        return m;
      })
    );
  };

  // Filter & Search & Sort logic
  const filteredAndSortedMatches = useMemo(() => {
    let result = [...matches];

    // Filter by category
    if (activeFilter !== 'All') {
      result = result.filter(m => m.roleType === activeFilter);
    }

    // Filter by Search Query (name or skills)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        m =>
          m.name.toLowerCase().includes(query) ||
          m.skills.some(s => s.toLowerCase().includes(query))
      );
    }

    // Sort
    if (activeSort === 'Highest Match') {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else {
      result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return result;
  }, [matches, activeFilter, searchQuery, activeSort]);

  // Complete profile actions
  const handleCompleteProfile = () => {
    showToast("Profile successfully sync'd! AI Twin is searching...", 'success');
    setMatches(dummyMatches);
    setActiveFilter('All');
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setActiveFilter('All');
    setSearchQuery('');
    setActiveSort('Highest Match');
    showToast('Filters cleared', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden">
      {/* Decorative colored glow background circles */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Global animated alert toasts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md border ${
              toast.type === 'success'
                ? 'bg-emerald-500/90 text-white border-emerald-400/30'
                : toast.type === 'info'
                ? 'bg-indigo-600/90 text-white border-indigo-500/30'
                : 'bg-rose-500/90 text-white border-rose-400/30'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 animate-pulse" />
            ) : toast.type === 'info' ? (
              <MessageSquare className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="space-y-6">
          {/* Header Component */}
          <Header userName={currentUser.name} userImage={currentUser.image} />

          {/* Stats Bar Cards */}
          <StatsCards
            totalMatches={totalMatchesCount}
            newMatches={newMatchesCount}
            pendingIntros={pendingIntrosCount}
            messagesSent={messagesSentCount}
          />

          {/* Search, Filter & Sort Component */}
          <Filters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
          />

          {/* Bottom Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Matches list column (2 Columns layout) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-500/10" />
                  Recommended Matches
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                    {filteredAndSortedMatches.length}
                  </span>
                </h2>
              </div>

              {filteredAndSortedMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence mode="popLayout">
                    {filteredAndSortedMatches.map((match) => (
                      <motion.div
                        key={match.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                      >
                        <MatchCard
                          match={match}
                          onSaveToggle={handleSaveToggle}
                          onSendIntroduction={handleSendIntroduction}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                /* EMPTY STATE rendering */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-dashed border-slate-200 bg-white/40 p-12 text-center flex flex-col items-center justify-center shadow-inner"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                    <UserPlus className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No matches yet</h3>
                  <p className="text-sm font-medium text-slate-500 max-w-sm mt-2 mb-6 leading-relaxed">
                    Complete your profile to help your AI Twin find better matching opportunities or clear your active filters.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Clear Filters
                    </button>
                    <button
                      onClick={handleCompleteProfile}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/10 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      Complete Profile
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar widgets column (1 Column layout) */}
            <div className="space-y-6 lg:col-span-1">
              <Insights insights={dummyInsights} />
              <Timeline activities={activities} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
