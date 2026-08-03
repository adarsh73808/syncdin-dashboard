import React, { useState } from 'react';
import { MapPin, Briefcase, Sparkles, Star, MessageSquareShare, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function MatchCard({ match, onSaveToggle, onSendIntroduction }) {
  const [introRequested, setIntroRequested] = useState(match.introductionStatus === 'Pending');

  const handleIntroClick = () => {
    if (introRequested) return;
    setIntroRequested(true);
    onSendIntroduction(match.id);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const getAvailabilityClass = (avail) => {
    switch (avail) {
      case 'Available':
      case 'Open to Chat':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200/50';
      case 'Looking for Co-founder':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200/50';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200/50';
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-3xl bg-white/70 p-6 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      {/* Decorative top dynamic slide line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Grid: Header with portrait and scoring details */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="relative shrink-0">
            <img
              src={match.profileImage}
              alt={match.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow"
            />
            <span className={`absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border border-white shadow ${getAvailabilityClass(match.availability)}`}>
              {match.availability}
            </span>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {match.name}
            </h4>
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {match.designation} <span className="text-slate-400">at</span> {match.company}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {match.location}
            </p>
          </div>
        </div>

        {/* Scoring circle box */}
        <div className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center shrink-0 min-w-[70px] shadow-sm ${getScoreColor(match.matchScore)}`}>
          <span className="text-2xl font-extrabold tracking-tight">{match.matchScore}%</span>
          <span className="text-[10px] uppercase font-bold tracking-wide mt-0.5 opacity-80">Match</span>
        </div>
      </div>

      {/* AI recommendation snippet container */}
      <div className="mt-5 rounded-2xl bg-indigo-50/40 border border-indigo-100/50 p-4 relative overflow-hidden">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5 fill-indigo-500/10" />
          <div>
            <span className="text-[10px] font-extrabold uppercase text-indigo-600 tracking-wider">AI Recommendation</span>
            <p className="text-xs font-medium text-slate-700 leading-relaxed mt-1">
              {match.aiReason}
            </p>
          </div>
        </div>
      </div>

      {/* Key skills display tags */}
      <div className="mt-5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Key Skills</span>
        <div className="flex flex-wrap gap-1.5">
          {match.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="my-5 border-t border-slate-100" />

      {/* Primary actions button bar */}
      <div className="flex items-center gap-2 w-full">
        {/* Toggle star save */}
        <button
          onClick={() => onSaveToggle(match.id)}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm shrink-0 ${
            match.isSaved
              ? 'bg-amber-500 border-amber-500 text-white shadow-amber-500/20'
              : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-slate-300'
          }`}
          title={match.isSaved ? 'Remove from Saved' : 'Save Match'}
        >
          <Star className={`w-4 h-4 ${match.isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* View Profile Mock */}
        <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer">
          View Profile
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* AI Introduction button */}
        <button
          onClick={handleIntroClick}
          disabled={introRequested}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer ${
            introRequested
              ? 'bg-emerald-500 text-white shadow-emerald-500/10 cursor-default'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/15'
          }`}
        >
          {introRequested ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Intro Sent
            </>
          ) : (
            <>
              <MessageSquareShare className="w-3.5 h-3.5" />
              AI Introduction
            </>
          )}
        </button>
      </div>
    </div>
  );
}
